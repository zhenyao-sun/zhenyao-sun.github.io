const BASE = 'https://api.todoist.com/api/v1';

export class TodoistError extends Error {
  constructor(message, status = 0) { super(message); this.name = 'TodoistError'; this.status = status; }
}

export class TodoistAPI {
  constructor(token) { this.token = token; }

  async request(path, { method = 'GET', body, form = false } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const headers = { Authorization: `Bearer ${this.token}` };
      if (body !== undefined) headers['Content-Type'] = form ? 'application/x-www-form-urlencoded' : 'application/json';
      let response;
      try {
        response = await fetch(`${BASE}${path}`, { method, headers, body: body === undefined ? undefined : form ? new URLSearchParams(body) : JSON.stringify(body), signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store' });
      } catch (error) {
        throw new TodoistError(error.name === 'AbortError' ? '连接超时。请检查网络，然后刷新确认任务状态。' : '无法连接 Todoist。请检查网络连接后重试。');
      }
      if (!response.ok) {
        const messages = {
          400: 'Todoist 未接受这次修改。请检查任务内容、日期及属性。',
          401: 'API Token 无效或已过期，请重新填写。',
          403: '没有权限修改此任务，请检查 Todoist 的共享权限。',
          404: '任务已不存在，请刷新列表。',
          429: '操作过于频繁，请稍等片刻后重试。',
        };
        throw new TodoistError(messages[response.status] || 'Todoist 暂时无法处理请求，请稍后重试。', response.status);
      }
      if (response.status === 204) return null;
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } finally { clearTimeout(timer); }
  }

  async list(resource) {
    const results = [];
    let cursor;
    const seen = new Set();
    do {
      const params = new URLSearchParams({ limit: '200' });
      if (cursor) params.set('cursor', cursor);
      const page = await this.request(`/${resource}?${params}`);
      if (!page || !Array.isArray(page.results)) throw new TodoistError('Todoist 返回的数据格式不正确，请稍后重试。');
      results.push(...page.results);
      cursor = page.next_cursor;
      if (cursor && seen.has(cursor)) throw new TodoistError('任务分页读取异常，请刷新重试。');
      if (cursor) seen.add(cursor);
    } while (cursor);
    return results;
  }

  async sync(commands) {
    const result = await this.request('/sync', { method: 'POST', form: true, body: { commands: JSON.stringify(commands) } });
    for (const command of commands) {
      const status = result?.sync_status?.[command.uuid];
      if (status !== 'ok') {
        const code = status?.error_code;
        const auth = code === 401 || code === 403;
        throw new TodoistError(auth ? 'Todoist 未授权这次操作，请检查 Token 或任务权限。' : 'Todoist 未能保存全部修改。请刷新列表确认状态后重试。', auth ? code : 400);
      }
    }
    return result;
  }

  async close(id, uuid = crypto.randomUUID()) { return this.sync([{ type: 'item_close', uuid, args: { id } }]); }
  async reopen(id) { return this.request(`/tasks/${encodeURIComponent(id)}/reopen`, { method: 'POST' }); }
  async delete(id) { return this.request(`/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' }); }
}

export function command(type, args, extra = {}) {
  return { type, uuid: crypto.randomUUID(), args, ...extra };
}
