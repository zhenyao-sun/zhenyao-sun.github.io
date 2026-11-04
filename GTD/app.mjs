import { ROLES, LOCATIONS, PERIODS, TYPES, DIMENSIONS, DEFAULTS, RECURRENCES, beijingNow, periodOrder, attributes, canonicalLabels, taskDate, sortTasks, dueFor, needsLabelRepair, recurrenceMatches } from './core.mjs?v=20261104-2';
import { TodoistAPI, command } from './api.mjs';

const $ = id => document.getElementById(id);
const TOKEN_KEY = 'gtd.todoist.token';
const LOCATION_KEY = 'gtd.location';
const state = { api: null, tasks: [], loaded: false, busy: false, loading: false, editing: null, lastSync: null, location: '任意', undo: null, toastTimer: null, editorCommand: null, clockKey: '', completionIds: new Map() };

function readSetting(key) { try { return localStorage.getItem(key); } catch { return null; } }
function saveSetting(key, value) { try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch { showToast('浏览器未允许保存设置，关闭页面后需重新连接。'); } }
const savedLocation = readSetting(LOCATION_KEY);
if (LOCATIONS.includes(savedLocation)) state.location = savedLocation;

function text(tag, content, className) {
  const node = document.createElement(tag);
  node.textContent = content;
  if (className) node.className = className;
  return node;
}

function setBusy(busy) {
  state.busy = busy;
  for (const id of ['refresh', 'add-task', 'add-floating']) $(id).disabled = busy || !state.loaded || state.loading;
  for (const button of $('task-list').querySelectorAll('button')) button.disabled = busy || state.loading;
  for (const dialog of [$('task-dialog'), $('delete-dialog')]) {
    for (const element of dialog.querySelectorAll('button,input,textarea,select')) element.disabled = busy;
  }
  $('save-task').textContent = busy ? '正在保存…' : '保存任务';
}

function showError(error) {
  $('error-message').textContent = error.message || String(error);
  $('error-banner').hidden = false;
  if (error.status === 401) {
    $('connect-panel').hidden = false;
    $('api-token').value = '';
    $('api-token').focus();
  }
}
function clearError() { $('error-banner').hidden = true; }

function showToast(message, undo = null) {
  clearTimeout(state.toastTimer);
  state.undo = undo;
  $('toast-message').textContent = message;
  $('undo-complete').hidden = !undo;
  $('undo-complete').disabled = false;
  $('toast').hidden = false;
  state.toastTimer = setTimeout(() => { $('toast').hidden = true; state.undo = null; }, undo ? 8000 : 4500);
}

function updateClock(force = false) {
  const bj = beijingNow();
  const dateLabel = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', month: 'long', day: 'numeric', weekday: 'short' }).format(new Date());
  $('clock').textContent = `${dateLabel} · ${bj.time} 北京时间`;
  const order = periodOrder(bj.minutes);
  $('period-hint').textContent = `当前：${order[0]}`;
  const clockKey = `${bj.date}:${order.join(',')}`;
  if (force || clockKey !== state.clockKey) { state.clockKey = clockKey; if (state.loaded) renderTasks(); }
}

function renderLocations() {
  $('locations').replaceChildren(...LOCATIONS.map(location => {
    const button = text('button', location, 'location-button');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(location === state.location));
    button.addEventListener('click', () => { state.location = location; saveSetting(LOCATION_KEY, location); renderLocations(); renderTasks(); });
    return button;
  }));
}

function renderTasks() {
  const query = $('search').value.trim().toLocaleLowerCase();
  const matching = state.tasks.filter(task => !query || `${task.content}\n${task.description || ''}`.toLocaleLowerCase().includes(query));
  const sorted = sortTasks(matching, { location: state.location });
  const today = beijingNow().date;
  $('task-count').textContent = query ? `${matching.length} / ${state.tasks.length}` : String(state.tasks.length);
  const fragment = document.createDocumentFragment();
  for (const task of sorted) {
    const values = attributes(task);
    const row = document.createElement('article');
    row.className = `task-row${values['类型'] === '日程' ? ' schedule' : values['类型'] === '截止' ? ' deadline' : ''}`;
    row.dataset.taskId = task.id;
    const complete = document.createElement('button');
    complete.className = 'complete-button';
    complete.type = 'button';
    complete.title = '完成任务';
    complete.setAttribute('aria-label', `完成：${task.content}`);
    complete.disabled = state.busy || state.loading;
    const circle = document.createElement('span');
    circle.className = 'complete-circle'; circle.setAttribute('aria-hidden', 'true');
    complete.append(circle);
    complete.addEventListener('click', () => completeTask(task));
    const main = document.createElement('button');
    main.type = 'button'; main.className = 'task-main';
    main.setAttribute('aria-label', `编辑：${task.content}`);
    main.disabled = state.busy || state.loading;
    main.append(text('h3', task.content, 'task-title'));
    if (task.description) main.append(text('p', task.description, 'task-description'));
    const meta = document.createElement('div'); meta.className = 'task-meta';
    const date = taskDate(task);
    const dateNode = text('span', date, `task-date${date < today ? ' overdue' : ''}`);
    dateNode.title = date < today ? '日期已过，保留原日期' : '任务日期';
    meta.append(dateNode);
    for (const dimension of ['时段', '地点', '类型', '角色']) {
      const tag = text('span', values[dimension], `meta-tag${dimension === '类型' ? ' type-tag' : ''}`);
      tag.title = dimension;
      meta.append(tag);
    }
    main.append(meta);
    main.addEventListener('click', () => openEditor(task));
    const arrow = text('span', '›', 'task-arrow'); arrow.setAttribute('aria-hidden', 'true');
    row.append(complete, main, arrow); fragment.append(row);
  }
  $('task-list').replaceChildren(fragment);
  $('empty-state').hidden = !state.loaded || state.loading || sorted.length > 0;
  $('empty-title').textContent = query ? '没有找到匹配的任务' : '清单已清空';
  $('empty-text').textContent = query ? '试试其他关键词，或清除搜索条件。' : '添加任务，记录下一件要做的事。';
}

function updateSyncStatus(message) {
  $('sync-state').textContent = message || (state.lastSync ? `已同步 Todoist · ${state.lastSync}` : '正在连接…');
}

async function ensureLabels() {
  const labels = await state.api.list('labels');
  const known = new Set(labels.map(label => label.name));
  const missing = Object.entries(DIMENSIONS).flatMap(([name, options]) => options.map(option => `${name}_${option}`)).filter(name => !known.has(name));
  for (const name of missing) await state.api.request('/labels', { method: 'POST', body: { name } });
}

async function normalizeTasks(tasks) {
  const commands = [];
  for (const task of tasks) {
    const args = { id: task.id };
    if (needsLabelRepair(task)) args.labels = canonicalLabels(task);
    if (!task.due?.date || !recurrenceMatches(task)) args.due = dueFor(taskDate(task), attributes(task)['类型']);
    if (Object.keys(args).length > 1) commands.push(command('item_update', args));
  }
  if (!commands.length) return tasks;
  updateSyncStatus(`正在自动补齐 ${commands.length} 个任务的属性…`);
  for (let index = 0; index < commands.length; index += 50) await state.api.sync(commands.slice(index, index + 50));
  return state.api.list('tasks');
}

async function loadTasks() {
  if (!state.api || state.loading || state.busy) return;
  state.loading = true;
  clearError();
  $('toolbar').hidden = false;
  $('loading').hidden = state.loaded;
  $('loading').lastElementChild.textContent = '正在读取任务…';
  updateSyncStatus('正在同步 Todoist…');
  setBusy(false);
  try {
    await ensureLabels();
    const tasks = await state.api.list('tasks');
    state.tasks = await normalizeTasks(tasks);
    state.loaded = true;
    state.lastSync = beijingNow().time;
    $('connect-panel').hidden = true;
    $('add-floating').hidden = false;
    $('footer').hidden = false;
    updateSyncStatus();
  } catch (error) {
    showError(error);
    updateSyncStatus('同步未完成 · 请重试');
    if (!state.loaded) $('connect-panel').hidden = false;
  } finally {
    state.loading = false;
    $('loading').hidden = true;
    setBusy(false);
    renderTasks();
  }
}

async function connect(token) {
  if (state.loading || state.busy) return;
  state.api = new TodoistAPI(token);
  state.tasks = []; state.loaded = false; state.undo = null; state.completionIds.clear();
  clearTimeout(state.toastTimer); $('toast').hidden = true;
  $('task-list').replaceChildren(); $('empty-state').hidden = true;
  saveSetting(TOKEN_KEY, token);
  $('settings-dialog').close();
  $('api-token').value = '';
  $('settings-token').value = '';
  await loadTasks();
}

function openEditor(task = null) {
  if (!state.loaded || state.busy || state.loading) return;
  state.editing = task;
  state.editorCommand = null;
  const values = task ? attributes(task) : DEFAULTS;
  $('editor-title').textContent = task ? '编辑任务' : '新任务';
  $('task-content').value = task?.content || '';
  $('task-description').value = task?.description || '';
  $('task-date').value = task ? taskDate(task) : beijingNow().date;
  for (const name of Object.keys(DIMENSIONS)) $(`field-${name}`).value = values[name];
  $('delete-task').hidden = !task;
  $('editor-error').hidden = true;
  $('task-dialog').showModal();
  if (!task) setTimeout(() => $('task-content').focus(), 80);
}

function closeEditor() { if (!state.busy) $('task-dialog').close(); }

async function saveTask(event) {
  event.preventDefault();
  if (state.busy) return;
  const content = $('task-content').value.trim();
  if (!content) { $('task-content').setCustomValidity('请填写任务名称'); $('task-content').reportValidity(); return; }
  const date = $('task-date').value || beijingNow().date;
  const values = Object.fromEntries(Object.keys(DIMENSIONS).map(name => [name, $(`field-${name}`).value]));
  const args = { content, description: $('task-description').value, labels: canonicalLabels(state.editing || {}, values), due: dueFor(date, values['类型']) };
  const signature = JSON.stringify({ id: state.editing?.id, ...args });
  if (state.editing) args.id = state.editing.id;
  if (state.editorCommand?.signature !== signature) {
    state.editorCommand = { signature, value: command(state.editing ? 'item_update' : 'item_add', args, state.editing ? {} : { temp_id: crypto.randomUUID() }) };
  }
  $('editor-error').hidden = true;
  setBusy(true);
  try {
    await state.api.sync([state.editorCommand.value]);
    $('task-dialog').close();
    showToast(state.editing ? '任务已保存' : '任务已添加');
    clearError();
    const tasks = await state.api.list('tasks');
    state.tasks = tasks; state.lastSync = beijingNow().time; updateSyncStatus(); renderTasks();
  } catch (error) {
    if ($('task-dialog').open) {
      $('editor-error').textContent = error.message;
      $('editor-error').hidden = false;
    } else showError(error);
  } finally { setBusy(false); }
}

async function completeTask(task) {
  if (state.busy || state.loading) return;
  setBusy(true); clearError();
  // Keep the row until Todoist accepts the action; failures never hide an unfinished task.
  try {
    const completionKey = `${task.id}:${JSON.stringify(task.due)}`;
    if (!state.completionIds.has(completionKey)) state.completionIds.set(completionKey, crypto.randomUUID());
    await state.api.close(task.id, state.completionIds.get(completionKey));
    state.completionIds.delete(completionKey);
    state.tasks = state.tasks.filter(item => item.id !== task.id);
    renderTasks();
    const undo = { task: structuredClone(task), command: null };
    try {
      state.tasks = await state.api.list('tasks');
      state.lastSync = beijingNow().time; updateSyncStatus();
      renderTasks();
    } catch (error) { showError(error); updateSyncStatus('已完成，刷新任务失败'); }
    showToast('任务已完成', undo);
  } catch (error) { showError(error); }
  finally { setBusy(false); }
}

async function undoComplete() {
  if (!state.undo || state.busy || state.loading) return;
  const undo = state.undo;
  clearTimeout(state.toastTimer);
  setBusy(true); $('undo-complete').disabled = true;
  try {
    if (undo.task.due?.is_recurring) {
      undo.command ||= command('item_update_date_complete', { id: undo.task.id, due: undo.task.due, is_forward: false });
      await state.api.sync([undo.command]);
    } else await state.api.reopen(undo.task.id);
    state.tasks = await state.api.list('tasks');
    state.lastSync = beijingNow().time; updateSyncStatus(); renderTasks();
    clearError(); showToast('已撤销完成');
  } catch (error) { showError(error); showToast('撤销未完成，请重试', undo); }
  finally { setBusy(false); }
}

async function deleteTask() {
  if (!state.editing || state.busy) return;
  $('delete-error').hidden = true;
  setBusy(true);
  try {
    await state.api.delete(state.editing.id);
    state.tasks = state.tasks.filter(task => task.id !== state.editing.id);
    $('delete-dialog').close(); $('task-dialog').close();
    clearError(); showToast('任务已删除'); renderTasks();
    state.lastSync = beijingNow().time; updateSyncStatus();
  } catch (error) { $('delete-error').textContent = error.message; $('delete-error').hidden = false; }
  finally { setBusy(false); }
}

for (const name of ['时段', '地点', '类型', '角色']) {
  const group = document.createElement('div');
  const label = text('label', name); label.htmlFor = `field-${name}`;
  const select = document.createElement('select'); select.id = `field-${name}`; select.required = true;
  for (const value of DIMENSIONS[name]) { const option = text('option', value); option.value = value; select.append(option); }
  group.append(label, select); $('dimension-fields').append(group);
}
$('connect-form').addEventListener('submit', event => { event.preventDefault(); const token = $('api-token').value.trim(); if (token) connect(token); });
$('settings-form').addEventListener('submit', event => { event.preventDefault(); const token = $('settings-token').value.trim(); if (token) connect(token); });
$('refresh').addEventListener('click', loadTasks);
$('retry').addEventListener('click', loadTasks);
$('add-task').addEventListener('click', () => openEditor());
$('add-floating').addEventListener('click', () => openEditor());
$('search').addEventListener('input', renderTasks);
$('task-content').addEventListener('input', () => $('task-content').setCustomValidity(''));
$('task-date').addEventListener('change', () => { if (!$('task-date').value) $('task-date').value = beijingNow().date; });
$('task-form').addEventListener('submit', saveTask);
$('editor-close').addEventListener('click', closeEditor);
$('editor-cancel').addEventListener('click', closeEditor);
$('task-dialog').addEventListener('cancel', event => { if (state.busy) event.preventDefault(); });
$('delete-task').addEventListener('click', () => { $('delete-error').hidden = true; $('delete-dialog').showModal(); });
$('delete-cancel').addEventListener('click', () => { if (!state.busy) $('delete-dialog').close(); });
$('delete-confirm').addEventListener('click', deleteTask);
$('delete-dialog').addEventListener('cancel', event => { if (state.busy) event.preventDefault(); });
$('undo-complete').addEventListener('click', undoComplete);
$('settings-open').addEventListener('click', () => { if (!state.busy && !state.loading) { $('settings-token').value = ''; $('disconnect').hidden = !state.api; $('settings-dialog').showModal(); } });
$('settings-close').addEventListener('click', () => $('settings-dialog').close());
$('disconnect').addEventListener('click', () => {
  saveSetting(TOKEN_KEY, null);
  state.api = null; state.tasks = []; state.loaded = false; state.undo = null; state.completionIds.clear();
  clearTimeout(state.toastTimer); $('toast').hidden = true;
  $('task-list').replaceChildren(); $('toolbar').hidden = true; $('footer').hidden = true;
  $('add-floating').hidden = true; $('empty-state').hidden = true; $('connect-panel').hidden = false;
  $('settings-dialog').close(); clearError(); $('api-token').focus();
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateClock(true); });
window.addEventListener('online', () => { if (state.api && !state.busy && !state.loading) loadTasks(); });
renderLocations(); updateClock();
setInterval(() => updateClock(), 1000);
const token = readSetting(TOKEN_KEY);
if (token) { state.api = new TodoistAPI(token); $('connect-panel').hidden = true; loadTasks(); }
