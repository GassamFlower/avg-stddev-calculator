# 架构设计文档

## 1. 目录结构规则

```
avg-stddev-calculator/
├── index.html          ← 唯一页面，H1 精确匹配目标关键词
├── css/
│   └── style.css       ← 全部样式，无框架
├── js/
│   └── calculator.js   ← 计算逻辑 + DOM 操作
├── docs/               ← 项目文档（不部署）
│   ├── a-立项文档.md
│   ├── b-技术选型.md
│   └── c-架构设计.md
└── AGENTS.md           ← AI 协作宪法
```

**规则**：
- `index.html` 是唯一入口，所有 SEO 信号集中于此
- CSS 和 JS 分离，便于浏览器缓存
- `docs/` 目录不部署到线上，仅用于项目管理
- 不引入 `node_modules`、`dist` 等构建产物目录

## 2. HTML 结构规则（SEO 核心）

```
<head>
  <title> 精确包含目标关键词
  <meta name="description"> 包含关键词 + 行动号召
  <meta name="viewport"> 移动端适配
  <link rel="stylesheet"> 单一 CSS 文件
</head>
<body>
  <header>
    <h1> 精确匹配 "Average and Standard Deviation Calculator"
    <p class="subtitle"> 补充说明，包含相关词（mean, data set）
  </header>
  <main>
    <section class="calculator">  ← 工具区（首屏）
      输入框 + 按钮 + 结果展示
    </section>
    <section class="info">  ← SEO 内容区（下方）
      <h2> How to Calculate...
      <h3> Average (Mean)
      <h3> Standard Deviation
      <h4> Sample Standard Deviation
      <h4> Population Standard Deviation
      <h3> When to Use Each
    </section>
  </main>
  <footer>
    简短描述，包含关键词变体
  </footer>
</body>
```

**规则**：
- H1 只出现一次，精确匹配目标关键词
- H2/H3/H4 层级清晰，包含长尾词变体
- 工具区在首屏，SEO 内容在下方（用户先看到工具，滚动看说明）
- 语义化标签（header/main/section/footer）

## 3. JavaScript 计算规则

**核心函数**：
- `parseNumbers(input)` → 解析输入，返回数字数组
- `computeStats(data)` → 计算所有统计量，返回结果对象
- `displayResults(results)` → 渲染结果卡片
- `displaySteps(data, results)` → 渲染逐步计算

**规则**：
- 所有计算纯前端，无网络请求
- 输入验证：过滤非数字字符，至少 2 个数字才计算标准差
- 结果精度：最多 6 位小数，整数不显示小数点
- 错误处理：输入为空 / 数字不足 → 显示错误提示，不抛异常

## 4. SEO 内容规则

**页面底部信息区**：
- 包含公式（用 Unicode 字符，不用图片）
- 解释样本 vs 总体标准差的区别
- 说明使用场景（研究 / 质量控制 / 教学）
- 字数目标：300-500 词（增加页面相关性信号）

**规则**：
- 公式用文本（x̄ = Σxᵢ / n），不用图片（图片不可爬取）
- 关键词自然出现，不堆砌
- 每个 H3/H4 下至少 2 句话说明

## 5. 性能规则

| 指标 | 目标 | 如何达到 |
|---|---|---|
| First Contentful Paint | < 1s | 纯静态，零 JS 框架 |
| Largest Contentful Paint | < 1.5s | 无大图，CSS < 5KB |
| Cumulative Layout Shift | < 0.1 | 固定布局，无动态插入 |
| Total Block Time | < 50ms | JS < 3KB，无长任务 |

**规则**：
- 不引入外部字体（系统字体栈）
- 不引入图标库（用 Unicode 或纯文本）
- CSS 和 JS 文件不内联到 HTML（便于缓存）
- 图片：本项目无图片（公式用文本）

## 6. 部署规则

**静态托管**：
- 推荐：GitHub Pages / Cloudflare Pages / Vercel
- 自动 HTTPS
- 全球 CDN
- 自定义域名支持

**域名规则**：
- 包含关键词（如 `avgstddevcalculator.com`）
- .com 优先
- 短、易记、无连字符（连字符对 SEO 影响中性，但影响品牌记忆）

## 7. 后续扩展规则

**内页扩展（长尾词矩阵）**：
- `/grouped-data.html` → "standard deviation calculator for grouped data"
- `/with-steps.html` → "standard deviation calculator with steps"
- `/variance.html` → "variance calculator"

**规则**：
- 每个内页瞄准一个长尾词
- 内页之间不互相链接（避免权重分散），统一链向首页
- 内页结构复用首页模板，只改内容和 H1
