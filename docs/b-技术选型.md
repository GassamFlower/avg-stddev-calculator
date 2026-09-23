# 技术选型文档

## 产品形态

**静态单页工具网站**（纯前端，无后端，无数据库）

## 唯一推荐方案

| 层 | 选择 | 理由 |
|---|---|---|
| 前端 | **原生 HTML + CSS + JavaScript** | 零依赖，最快加载，SEO 友好 |
| 部署 | **静态托管**（GitHub Pages / Cloudflare Pages / Vercel） | 免费，全球 CDN，自动 HTTPS |
| 域名 | **含关键词的 .com 域名** | SEO 信号，品牌记忆 |

## 为什么不选其他方案

### 方案 A：React / Vue + 构建工具

**不选理由**：
- 增加 JS 框架体积（React ~40KB gzipped），拖慢首屏
- 需要构建步骤（npm build），增加复杂度
- SPA 默认对 SEO 不友好（需要额外 SSR/预渲染配置）
- 对于"输入数字→出结果"这个需求，框架是过度工程

### 方案 B：Next.js / Nuxt.js（SSR）

**不选理由**：
- SSR 解决了 SPA 的 SEO 问题，但引入了服务端复杂度
- 需要 Node.js 服务器或 serverless functions
- 对于纯计算逻辑（不需要数据获取），SSR 是杀鸡用牛刀
- 维护成本远高于纯静态

### 方案 C：WordPress + 计算器插件

**不选理由**：
- PHP + MySQL 过重，页面速度难优化
- 插件质量参差不齐，安全风险高
- 主题定制受限，难以精确控制 HTML 结构（影响 SEO）

## 什么情况下需要重新评估

- 如果后续要加用户系统 / 数据保存 → 考虑加轻量后端（Supabase / Firebase）
- 如果要做多语言（i18n）→ 考虑静态站点生成器（Astro / 11ty）
- 如果页面数量超过 20 个 → 考虑模板化生成（避免手工维护）

## SEO 技术选型要点

| 要点 | 本方案如何满足 |
|---|---|
| 页面速度 | 纯静态，零框架开销，目标 < 1s 加载 |
| 可爬取性 | 纯 HTML，无需 JS 渲染即可读取内容 |
| 结构化数据 | 可添加 Schema.org（SoftwareApplication / HowTo） |
| 移动端友好 | 响应式 CSS，viewport meta |
| HTTPS | 静态托管默认提供 |
