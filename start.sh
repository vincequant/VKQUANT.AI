#!/bin/bash

# vkquant.ai 启动脚本
# Clean Light Fintech

echo "VKQuant.ai | Clean Light Fintech"
echo "正在启动 vkquant.ai 开发服务器..."
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 首次启动，正在安装依赖..."
    npm install
    echo ""
fi

# 显示启动信息
echo "✅ 依赖检查完成"
echo "🌐 启动开发服务器..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  VKQuant.ai - Clean Light Fintech"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  📱 本地访问: http://localhost:3000"
echo "  🌐 网络访问: http://$(hostname -I 2>/dev/null | awk '{print $1}'):3000"
echo ""
echo "  按 Ctrl+C 停止服务器"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 启动开发服务器
npm run dev
