# GTD

部署于 `https://zhenyao-sun.github.io/GTD/` 的无构建静态网页，手机优先，直接连接 Todoist API v1。静态文件无需服务端，无外部脚本或样式依赖。

## 使用

1. 在 Todoist 的「设置 → 集成 → 开发者」取得个人 API Token。
2. 在网页首次打开时输入 Token。Token 只保存在当前浏览器的 localStorage；另一个浏览器或手机需单独输入。可在连接设置中清除。
3. 所有未完成任务自动载入；新增、编辑、完成、删除同步到 Todoist。任务数据不写进网站源码或静态文件。

## 用户需求

已确认的使用和行为规则见 [USER_REQUIREMENTS.md](USER_REQUIREMENTS.md)。

## 文件

- `index.html`、`style.css`：布局及手机编辑面板。
- `app.mjs`：交互、同步、规范化与撤销。
- `api.mjs`：Bearer 鉴权、分页读取、Sync 命令和错误处理。
- `core.mjs`：可独立测试的时间、标签和排序规则。

## 实现说明

API 凭证只在请求 Authorization 标头中发送到 `https://api.todoist.com`。没有代理服务、分析追踪、CDN 或 Service Worker。

使用 Sync API 的完整 due 对象保留指定日期，包括过期日期。完成操作使用带 UUID 的 `item_close`，撤销重复任务使用 `item_update_date_complete` 恢复原日期。保存使用保留的 Sync 命令 UUID，避免相同提交重试产生重复任务。

本机预览可在仓库根运行 `python3 -m http.server 8765`，访问 `http://localhost:8765/GTD/`。
