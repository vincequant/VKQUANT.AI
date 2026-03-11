# 🚀 vkquant.ai 使用指南

## 快速启动

### 方式一：使用启动脚本（推荐）
```bash
./start.sh
```

### 方式二：手动启动
```bash
# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm run dev

# 或者构建生产版本
npm run build
npm start
```

## 📁 项目结构

```
vkquant.ai/
├── public/
│   ├── images/
│   │   ├── ai-shots/       # AI组合评价截图
│   │   └── hero-bg.jpg     # 网站背景大图（可选）
│   └── wechat-qr.png       # 微信群二维码（核心！）
├── src/
│   ├── components/
│   │   ├── BaguaArray.tsx      # 八卦量化大阵动画
│   │   ├── Gallery.tsx         # AI截图展示
│   │   ├── JoinGroup.tsx       # 微信扫码卡片
│   │   └── HeroBackground.tsx  # 赛博朋克背景
│   └── app/
│       ├── layout.tsx          # 全局布局
│       └── page.tsx            # 主页面
├── start.sh                    # 启动脚本 ⭐
└── package.json
```

## 🎨 自定义内容

### 1. 更新微信群二维码
- **重要！** 将你的微信群二维码命名为 `wechat-qr.png`
- 放置在 `public/` 目录下
- 前端会自动刷新显示新二维码

### 2. 添加AI组合截图
- 将截图放入 `public/images/ai-shots/` 目录
- 支持格式：PNG, JPG
- 建议尺寸：1200x800px

### 3. 自定义背景图（可选）
- 创建 `public/images/hero-bg.jpg`
- 建议尺寸：1920x1080px (16:9)
- 或者使用现有的CSS生成背景

## 🌐 访问地址

启动成功后，访问：
- **本地:** http://localhost:3000
- **网络:** http://YOUR_IP:3000

## 🔧 技术栈

- **框架:** Next.js 16 (App Router)
- **样式:** Tailwind CSS 4
- **动画:** Framer Motion
- **图标:** Lucide React
- **字体:** Inter + JetBrains Mono

## 🎯 核心特性

✅ **自动二维码更新** - 无需修改代码，替换图片即可
✅ **响应式设计** - 完美适配桌面和移动端
✅ **赛博朋克风格** - 九紫离火配色 + 高达元素
✅ **八卦阵列动画** - 旋转的量化大阵效果
✅ **AI展示画廊** - 优雅的网格布局

## 📱 部署

### Vercel (推荐)
```bash
npm run build
vercel deploy
```

### 其他平台
```bash
npm run build
# 生成的 .next 目录可直接部署
```

## 🐛 常见问题

**Q: 端口被占用？**
A: 编辑 `package.json` 修改端口，或使用 `PORT=3001 npm run dev`

**Q: 样式不生效？**
A: 确保已正确安装依赖：`npm install`

**Q: 二维码不显示？**
A: 检查文件是否正确放置在 `public/wechat-qr.png`

---

🔥 **九紫离火 · 智算乾坤** 🔥
*赛博道宗量化平台*