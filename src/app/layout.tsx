import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VKQuant.AI | Elite Discretionary Trading Lab",
  description:
    "VKQuant.AI 展示单账户纯手工 discretionary 交易执行力，并用 AI 持续拆解验证投资体系。",
  keywords: [
    "VKQuant.ai",
    "Discretionary Trading",
    "手工交易",
    "高频执行",
    "AI 评测",
    "PortfolioAnalyst",
    "Elite Discretionary Trading Lab",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
