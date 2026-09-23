# 部署指南

## 推荐方案：GitHub Pages（免费，最快）

### 步骤

1. **创建 GitHub 仓库**
   ```bash
   cd E:/FiveTierProjectSystem/01-Inbox/gf/avg-stddev-calculator
   git remote add origin https://github.com/你的用户名/avg-stddev-calculator.git
   git branch -M main
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main` / `root`
   - 保存

3. **访问你的网站**
   - URL: `https://你的用户名.github.io/avg-stddev-calculator/`
   - 等待 1-2 分钟生效

4. **（可选）绑定自定义域名**
   - 注册域名（如 `avgstddevcalculator.com`）
   - 在仓库 Settings → Pages → Custom domain 填入域名
   - 在域名注册商处添加 CNAME 记录指向 `你的用户名.github.io`
   - 勾选 "Enforce HTTPS"

## 备选方案：Cloudflare Pages

1. 登录 Cloudflare Dashboard
2. Workers & Pages → Create application → Pages
3. 连接 GitHub 仓库
4. Build settings:
   - Build output: `.`（根目录）
   - 其他留空
5. Deploy

## 备选方案：Vercel

1. 安装 Vercel CLI: `npm i -g vercel`
2. 在项目目录运行: `vercel`
3. 按提示操作（全部默认即可）

## 部署后验证清单

- [ ] 网站可通过 URL 访问
- [ ] HTTPS 已启用
- [ ] 在谷歌搜索 `site:你的域名` 验证收录（等待 1-7 天）
- [ ] 提交 sitemap 到 Google Search Console（可选）
- [ ] 运行 Lighthouse 检查性能分数

## SEO 上线后动作

1. **提交到 Google Search Console**
   - 验证域名所有权
   - 提交 URL 请求索引
   - 监控覆盖率和性能

2. **提交到 Bing Webmaster Tools**（可选）

3. **监控排名**
   - 搜索 `average and standard deviation calculator` 观察排名变化
   - 用 Google Search Console 查看实际展示位置和点击率

## 域名建议

| 域名 | 状态 | 备注 |
|---|---|---|
| `avgstddevcalculator.com` | 待注册 | 完整关键词，好记 |
| `averag stddev.com` | 待查 | 更短，但少了 stddev |
| `stddevcalculator.com` | 待查 | 更短，但少了 average |

> 建议优先注册 `avgstddevcalculator.com`，完整匹配目标关键词。
