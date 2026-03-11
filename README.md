# 🔥 vkquant.ai - 九紫离火，智算乾坤

> 赛博道宗量化平台 - AI驱动的智能投资组合展示

![Version](https://img.shields.io/badge/version-1.0.0-red)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ 特性

- 🎨 **赛博朋克设计** - 九紫离火配色 + 高达机甲元素
- ⚡ **动态八卦阵列** - 旋转的量化大阵动画效果
- 🤖 **AI展示画廊** - 优雅的网格布局展示组合评价
- 📱 **智能二维码** - 微信群扫码组件，自动刷新
- 🌐 **完全响应式** - 完美适配桌面和移动设备
- 🚀 **一键启动** - 简单的 `./start.sh` 即可运行

## 🚀 快速开始

### 1. 启动网站
```bash
./start.sh
```

### 2. 访问地址
- **本地:** http://localhost:3000
- **网络:** http://YOUR_IP:3000

### 3. 自定义内容
- 将微信群二维码命名为 `wechat-qr.png` 放入 `public/` 目录
- 将AI截图放入 `public/images/ai-shots/` 目录

## 📁 项目结构

```
vkquant.ai/
├── public/
│   ├── images/
│   │   ├── ai-shots/       # AI组合评价截图
│   │   └── hero-bg.jpg     # 网站背景大图
│   └── wechat-qr.png       # 微信群二维码 ⭐
├── src/
│   ├── components/
│   │   ├── BaguaArray.tsx       # 八卦量化大阵
│   │   ├── Gallery.tsx          # AI展示画廊
│   │   ├── JoinGroup.tsx        # 微信扫码组件
│   │   └── HeroBackground.tsx   # 赛博朋克背景
│   └── app/
│       ├── layout.tsx           # 全局布局
│       └── page.tsx             # 主页面
├── start.sh                    # 启动脚本 ⭐
└── USAGE.md                    # 详细使用说明
```

## 🎨 设计理念

### 赛博道宗风格
- **配色方案:** 深黑背景 (#050505) + 九紫红 (#E11D48) + 科技紫 (#7C3AED)
- **视觉元素:** 高达机甲纹理 + 八卦阵列 + AI量化数据流
- **动画效果:** 流光溢彩的渐变 + 平滑的Framer Motion动画

### 核心组件
- **Hero Section:** 动态旋转的八卦量化大阵
- **AI Gallery:** 网格布局的组合评价展示
- **Join Group:** 精美的微信群扫码卡片

## 🔧 技术栈

- **框架:** Next.js 16 (App Router)
- **样式:** Tailwind CSS 4
- **动画:** Framer Motion
- **图标:** Lucide React
- **字体:** Inter + JetBrains Mono

## 📱 部署

### Vercel (推荐)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t vkquant-ai .
docker run -p 3000:3000 vkquant-ai
```

## 📖 详细说明

查看 [USAGE.md](./USAGE.md) 获取详细的使用指南和自定义说明。

## 🐛 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

🔥 **九紫离火 · 智算乾坤** 🔥 
*赛博道宗 - 量化投资新纪元*