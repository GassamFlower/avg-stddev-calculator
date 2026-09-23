# AGENTS.md — Average and Standard Deviation Calculator 项目宪法

## 项目本质

纯静态单页工具站，目标关键词 `average and standard deviation calculator`。
所有决策以 SEO 和页面速度为最高优先级。

## 禁止事项（硬规则）

1. **禁止引入 JS 框架**（React/Vue/Angular）— 纯原生 JS，框架增加加载时间，损害 SEO
2. **禁止引入构建工具**（Webpack/Vite/npm scripts）— 零构建，文件直接部署
3. **禁止引入外部字体**（Google Fonts/Adobe Fonts）— 系统字体栈，避免 FOIT/FOUT
4. **禁止引入图标库**（FontAwesome/Bootstrap Icons）— 用 Unicode 字符或纯文本
5. **禁止引入分析脚本**（Google Analytics/Hotjar）— 首版不加第三方 JS，保护页面速度
6. **禁止图片公式** — 所有数学公式用 Unicode 文本（x̄, σ, Σ），图片不可爬取
7. **禁止 H1 重复** — 页面只有一个 H1，精确匹配目标关键词
8. **禁止关键词堆砌** — 关键词自然出现，每段最多 1 次目标词
9. **禁止内联 CSS/JS 到 HTML** — 分离文件，便于浏览器缓存
10. **禁止自动播放/弹窗/干扰元素** — 工具站的核心是"来了就用"，不要干扰

## 验收标准

| 维度 | 标准 |
|---|---|
| 功能 | 输入 `10, 12, 23, 23, 16, 23, 21, 15` → Mean = 17.875, s ≈ 5.303 |
| 速度 | Lighthouse Performance ≥ 95 |
| SEO | title/H1/meta description 含目标关键词 |
| 移动端 | 375px 宽度可用，无横向滚动 |
| 可访问性 | 输入框有 label，按钮可键盘触发 |

## 框架优先原则

- CSS：不用框架，原生 CSS（文件 < 5KB）
- JS：不用框架，原生 JS（文件 < 5KB）
- 部署：静态托管（GitHub Pages / Cloudflare Pages / Vercel）
- 如果必须引入第三方库，先评估体积（gzipped < 10KB 才考虑）

## SEO 角色（贯穿全程）

每次代码变更必须检查：
- [ ] 是否影响页面速度？
- [ ] 是否改变 H1/H2 结构？
- [ ] 是否引入不可爬取内容（图片/JS 渲染）？
- [ ] 是否稀释关键词信号（加了不相关内容）？

## 文件职责

| 文件 | 职责 | 不放什么 |
|---|---|---|
| `index.html` | 页面结构 + SEO 信号 | 不放业务逻辑（JS） |
| `css/style.css` | 视觉样式 + 响应式 | 不放布局结构（HTML） |
| `js/calculator.js` | 计算逻辑 + DOM 操作 | 不放样式（CSS） |
| `docs/*.md` | 项目文档 | 不部署到线上 |
