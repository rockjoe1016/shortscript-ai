# ScriptSpark Vercel 部署指南

本地 git repo 已初始化，代码已提交，构建已通过。接下来需要手动操作。

## 第一步：创建 GitHub 仓库

1. 打开 https://github.com/new
2. Repository name 填 `shortscript-ai`
3. 选 Public（公开，Vercel 需要）
4. 不要勾 "Add a README"（我们已经有代码了）
5. 点击 Create repository

## 第二步：推送代码到 GitHub

创建完仓库后，GitHub 会给你一个推送命令。在终端里执行：

```bash
cd C:\Users\Administrator\WorkBuddy\Claw\shortscript-ai

# 把下面的 YOUR_USERNAME 换成你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/shortscript-ai.git
git push -u origin main
```

如果提示登录，输入你的 GitHub 用户名和密码（或 token）。

## 第三步：在 Vercel 上部署

1. 打开 https://vercel.com/new
2. 用 GitHub 账号登录 Vercel
3. 找到刚推送的 `shortscript-ai` 仓库，点击 Import
4. 在配置页面：
   - Framework Preset：Next.js（自动检测）
   - Root Directory：保持默认（不用改）
5. **重要！添加环境变量：**
   - 点击 "Environment Variables"
   - 添加 `DEEPSEEK_API_KEY`，值填 `sk-ddab99f9e10e4eebaa71616e3186a5fe`
   - 添加 `NEXT_PUBLIC_APP_URL`，值填部署后 Vercel 给你的域名（先留空，部署完再改）
6. 点击 Deploy

部署完成后 Vercel 会给你一个域名，类似 `shortscript-ai.vercel.app`。

## 第四步：更新 NEXT_PUBLIC_APP_URL

1. 部署成功后，在 Vercel 项目设置 → Environment Variables
2. 把 `NEXT_PUBLIC_APP_URL` 的值改成你的实际域名（如 `https://shortscript-ai.vercel.app`）
3. 重新部署一次（Settings → Deployments → 最新的部署 → Redeploy）

## 搞完！

你的 ScriptSpark 就上线了，全球都能访问。
