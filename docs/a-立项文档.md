# 立项文档：Average and Standard Deviation Calculator

## 1. 立项说明

**项目是什么**：一个在线计算器工具网页，用户输入一组数字，立即得到平均值（mean）和标准差（standard deviation）的计算结果，包含样本/总体两种模式，并展示完整的逐步计算过程。

**面向谁**：
- 学生（统计学作业、考试复习）
- 教师（备课、出题验证）
- 数据分析初学者（理解标准差概念）
- 质量控制人员（快速验证数据波动）

**解决什么问题**：
- 现有计算器要么只算平均值、要么只算标准差，用户需要开两个工具
- 教科书/网站只有公式，没有即时验证工具
- ChatGPT 等 AI 工具需要写 prompt，对于"粘贴数字→出结果"这个需求太重

**SEO 定位**：
- 目标关键词：`average and standard deviation calculator`
- 月搜索量：1,600（美国）
- KD：19（低竞争）
- CPC：$1.57
- KGR：≈ 0（极度蓝海，无页面标题精确匹配此短语）

## 2. 功能边界

### 第一版做什么（MVP）

| 功能 | 描述 |
|---|---|
| 数据输入 | 支持逗号、空格、换行分隔的数字输入 |
| 即时计算 | 点击按钮计算平均值、标准差、方差 |
| 双模式输出 | 同时显示样本标准差（s）和总体标准差（σ） |
| 逐步计算展示 | 可展开的 5 步计算过程（求和→求均值→平方差→方差→标准差） |
| 公式说明 | 页面底部包含公式解释和使用场景说明（SEO 内容） |
| 响应式设计 | 移动端可用 |

### 第一版不做什么

- ❌ 不做用户系统 / 登录
- ❌ 不做数据保存 / 历史记录
- ❌ 不做后端（纯前端静态页面）
- ❌ 不做多语言（先做英文版，面向美国市场）
- ❌ 不做分组数据计算（grouped data）—— 后续内页做
- ❌ 不做图表可视化（histogram）—— 后续迭代

## 3. 用户路径

```
用户谷歌搜索 "average and standard deviation calculator"
        ↓
点击搜索结果进入页面
        ↓
看到 H1 标题 + 输入框（零干扰，直达工具）
        ↓
粘贴/输入数字（逗号或换行分隔）
        ↓
点击 "Calculate" 按钮
        ↓
看到结果卡片：Count / Sum / Mean / Sample Std Dev / Population Std Dev / Variance
        ↓
（可选）展开 "Show Step-by-Step Calculation" 看详细步骤
        ↓
（可选）滚动到底部看公式说明（SEO 内容，增加页面停留时间）
```

## 4. 业务对象清单

| 对象 | 说明 |
|---|---|
| DataSet | 用户输入的数字集合（纯前端，不持久化） |
| StatsResult | 计算结果：n, sum, mean, sampleStdDev, popStdDev, sampleVariance, popVariance |
| StepDetail | 逐步计算的中间数据（每步的公式和数值） |

> 无数据库，所有对象纯前端内存处理。

## 5. 技术路线初步判断

- **纯静态 HTML + CSS + JavaScript**
- 无框架、无构建工具、无后端
- 目标：首屏加载 < 1 秒，Lighthouse 评分 > 95

**为什么这样选（SEO 视角）**：
- 谷歌排名因素中，页面速度（Core Web Vitals）权重越来越高
- 纯静态 = 零 JS 框架开销 = 最快加载速度
- 无 SSR/SSG 复杂度，HTML 直接可被爬虫解析
- 单一 HTML 文件 = 单一索引目标，SEO 信号集中

## 6. 爆点差异

**vs 现有竞品（calculator.net / calculatorsoup.com）**：
- 竞品标题是 "Standard Deviation Calculator" 或 "Average Calculator"，**没有人在标题里同时瞄准 "average AND standard deviation"**
- 我们精确命中 `average and standard deviation calculator` 这个长尾词
- 同时展示样本和总体两种标准差（竞品通常只展示一种）
- 逐步计算过程可展开（教育价值，增加停留时间）

**vs ChatGPT / AI 工具**：
- 零 prompt 成本：粘贴数字 → 点按钮 → 出结果
- 无需登录、无需等待生成
- 结果格式固定、可预测、可复制

## 7. 里程碑

| 阶段 | 内容 | 完成标准 |
|---|---|---|
| M1 | MVP 上线 | 页面部署到线上 URL，核心功能可用 |
| M2 | 谷歌收录验证 | 搜 `site:域名` 能看到页面 |
| M3 | 长尾词扩展 | 增加 2-3 个内页（grouped data / with steps / for dummies） |

## 8. 验收规则

| 验收项 | 可检查标准 |
|---|---|
| 功能正确性 | 输入 `10, 12, 23, 23, 16, 23, 21, 15` → Mean = 17.875, s = 5.303301, σ = 4.960784 |
| 页面速度 | Lighthouse Performance ≥ 95 |
| SEO 基础 | title 含目标关键词、H1 精确匹配、meta description 存在 |
| 移动端 | 375px 宽度下功能可用、无横向滚动 |
| 可访问性 | 输入框有 label、按钮可键盘触发 |
