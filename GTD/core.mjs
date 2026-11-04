export const ROLES = ['运动员', '数学家', '教授', '其它'];
export const LOCATIONS = ['办公室', '良乡家', '六里桥', '健身房', '任意'];
export const PERIODS = ['早上', '中午', '下午', '晚上', '任意'];
export const TYPES = ['日程', '截止', '每日', '每周', '每月', '每年', '行动', '等待'];
export const DIMENSIONS = { '角色': ROLES, '地点': LOCATIONS, '时段': PERIODS, '类型': TYPES };
export const DEFAULTS = { '角色': '其它', '地点': '任意', '时段': '任意', '类型': '行动' };
export const RECURRENCES = { '每日': 'every! day', '每周': 'every! week', '每月': 'every! month', '每年': 'every! year' };

export function beijingNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const p = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute), time: `${p.hour}:${p.minute}` };
}

export function periodOrder(minutes) {
  if (minutes < 690) return ['早上', '任意', '中午', '下午', '晚上'];
  if (minutes < 810) return ['中午', '早上', '任意', '下午', '晚上'];
  if (minutes < 1020) return ['下午', '早上', '中午', '任意', '晚上'];
  return ['晚上', '早上', '中午', '下午', '任意'];
}

export function locationOrder(selected = '任意') {
  const first = LOCATIONS.includes(selected) ? selected : '任意';
  return [...new Set([first, '任意', ...LOCATIONS])];
}

export function attributes(task) {
  const labels = task.labels || [];
  return Object.fromEntries(Object.entries(DIMENSIONS).map(([dimension, options]) => {
    let value = labels.find(label => label.startsWith(`${dimension}_`) && options.includes(label.slice(dimension.length + 1)))?.slice(dimension.length + 1);
    if (!value && dimension === '时段') value = labels.find(label => label.startsWith('时间_') && PERIODS.includes(label.slice(3)))?.slice(3);
    return [dimension, value || DEFAULTS[dimension]];
  }));
}

export function canonicalLabels(task, values = attributes(task)) {
  const unrelated = (task.labels || []).filter(label => !/^(角色|地点|时段|时间|类型)_/.test(label));
  return [...unrelated, ...Object.keys(DIMENSIONS).map(dimension => `${dimension}_${values[dimension] || DEFAULTS[dimension]}`)];
}

export function taskDate(task, fallback = beijingNow().date) {
  const date = task.due?.date;
  if (!date) return fallback;
  if (/T.*(?:Z|[+-]\d\d:\d\d)$/.test(date)) return beijingNow(new Date(date)).date;
  return date.slice(0, 10);
}

export function sortTasks(tasks, { now = new Date(), location = '任意' } = {}) {
  const bj = beijingNow(now);
  const currentPeriod = periodOrder(bj.minutes)[0];
  const periods = ['任意', '早上', '中午', '下午', '晚上'];
  const locations = ['任意', ...LOCATIONS.filter(value => value !== '任意')];
  const tuples = tasks.map((task, index) => {
    const a = attributes(task);
    const periodHit = a['时段'] === currentPeriod;
    const locationHit = location !== '任意' && LOCATIONS.includes(location) && a['地点'] === location;
    // Joint match first; a location-only match outranks a period-only match.
    const group = locationHit ? (periodHit ? 0 : 1) : (periodHit ? 2 : 3);
    return { task, index, key: [taskDate(task, bj.date), group, periods.indexOf(a['时段']), locations.indexOf(a['地点']), TYPES.indexOf(a['类型']), ROLES.indexOf(a['角色']), task.added_at || task.created_at || '', String(task.id || '')] };
  });
  tuples.sort((a, b) => {
    for (let i = 0; i < a.key.length; i++) {
      const result = typeof a.key[i] === 'number' ? a.key[i] - b.key[i] : a.key[i].localeCompare(b.key[i]);
      if (result) return result;
    }
    return a.index - b.index;
  });
  return tuples.map(({ task }) => task);
}

export function dueFor(date, type) {
  const recurrence = RECURRENCES[type];
  return { date, string: recurrence || date, lang: 'en', is_recurring: Boolean(recurrence), timezone: null };
}

export function needsLabelRepair(task) {
  return [...(task.labels || [])].sort().join('\n') !== canonicalLabels(task).sort().join('\n');
}

export function recurrenceMatches(task) {
  const wanted = RECURRENCES[attributes(task)['类型']];
  const actual = task.due?.string?.trim().toLowerCase();
  return wanted ? Boolean(task.due?.is_recurring && actual === wanted) : !task.due?.is_recurring;
}
