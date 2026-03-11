import fs from 'node:fs';
import path from 'node:path';

import type { AIReport } from '@/types/ai-reports';

const REPORT_DIRECTORY = path.join(process.cwd(), 'public', 'images', 'ai-reports');
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
const PDF_EXTENSIONS = new Set(['.pdf']);

const CUSTOM_REPORT_CONTENT: Record<string, { title: string; subtitle: string }> = {
  'Grok_20260310_2334_思考了41s 你的个人投资收益.png': {
    title: 'VKQuant 投资收益率：515%累计回报，碾压中美股民平均水平',
    subtitle: '3.26年年化74.6%，千万级规模顶尖表现',
  },
  'Grok_20260310_2333_思考了32s 你的交易风格完全.png': {
    title: 'VKQuant 交易风格：纯手工 Discretionary 超频期权对冲',
    subtitle: '右侧趋势 + 直觉驱动 + 正股实时对冲，顶尖执行力证明',
  },
  'Grok_20260310_2334_思考了57s 你在2022.1.png': {
    title: 'VKQuant vs 四位投资名将：收益质量全面领先',
    subtitle: '515%累计回报 + Sharpe 1.11，完胜木头姐、蔡嘉民等同期表现',
  },
  'Grok_20260310_2333_思考了47s 在你这个纯手工d.png': {
    title: 'VKQuant 与投资传奇并肩：可直接学习的5位大师',
    subtitle: 'Paul Tudor Jones、Paul Rotter、Jesse Livermore、Edward Thorp、Taleb',
  },
  'Grok_20260311_1334_思考了30s 在这种要求“平均.png': {
    title: 'VKQuant 全球交易比赛预测：前10名保底，冠军不是梦！',
    subtitle: '平均每天40-80笔超频交易，轻松碾压World Cup等国际赛事门槛，基于515%历史真实回报',
  },
};

const CUSTOM_REPORT_ORDER = [
  'Grok_20260310_2334_思考了41s 你的个人投资收益.png',
  'Grok_20260310_2333_思考了32s 你的交易风格完全.png',
  'Grok_20260310_2334_思考了57s 你在2022.1.png',
  'Grok_20260310_2333_思考了47s 在你这个纯手工d.png',
  'Grok_20260311_1334_思考了30s 在这种要求“平均.png',
];

const CUSTOM_REPORT_ORDER_INDEX = new Map(
  CUSTOM_REPORT_ORDER.map((filename, index) => [filename, index]),
);

const formatDateLabel = (value: string) => {
  const match = value.match(/(20\d{2})(\d{2})(\d{2})/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;

  return `${year}年${Number(month)}月${Number(day)}日`;
};

const formatTitle = (filename: string) => {
  const baseName = filename.replace(/\.[^.]+$/, '');
  const normalized = baseName
    .replace(/^report[-_ ]*/i, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  if (!normalized) {
    return 'AI 投资评测报告';
  }

  return normalized.replace(/\b[a-z]/g, (character) => character.toUpperCase());
};

export const getAIReports = (): AIReport[] => {
  if (!fs.existsSync(REPORT_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(REPORT_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
    .flatMap<AIReport>((entry) => {
      const extension = path.extname(entry.name).toLowerCase();

      if (!IMAGE_EXTENSIONS.has(extension) && !PDF_EXTENSIONS.has(extension)) {
        return [];
      }

      const type = PDF_EXTENSIONS.has(extension) ? 'pdf' : 'image';
      const customContent = CUSTOM_REPORT_CONTENT[entry.name];
      const title = customContent?.title ?? formatTitle(entry.name);
      const dateLabel = formatDateLabel(entry.name);
      const report: AIReport = {
        id: entry.name,
        filename: entry.name,
        src: `/images/ai-reports/${encodeURIComponent(entry.name)}`,
        title,
        caption: dateLabel ?? (type === 'pdf' ? 'AI 深度 PDF 报告' : 'AI 对投资体系的截图评测'),
        summary:
          type === 'pdf'
            ? '点击全屏阅读 PDF 原文，适合长篇投资报告与研究纪要。'
            : '点击放大查看截图细节，适合展示 AI 对投资体系的实时评价。',
        badge: type === 'pdf' ? 'PDF' : 'AI 评测',
        type,
      };

      if (customContent) {
        report.subtitle = customContent.subtitle;
      }

      return [report];
    })
    .sort((left, right) => {
      const leftIndex = CUSTOM_REPORT_ORDER_INDEX.get(left.filename);
      const rightIndex = CUSTOM_REPORT_ORDER_INDEX.get(right.filename);

      if (leftIndex !== undefined && rightIndex !== undefined) {
        return leftIndex - rightIndex;
      }

      if (leftIndex !== undefined) {
        return -1;
      }

      if (rightIndex !== undefined) {
        return 1;
      }

      return right.filename.localeCompare(left.filename, 'zh-Hans-CN');
    });
};
