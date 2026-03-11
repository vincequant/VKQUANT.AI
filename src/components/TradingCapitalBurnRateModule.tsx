'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const BURN_RATE = 50.26;
const REMAINING_RATE = 49.74;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

const containerVariants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.22, ease: EASE_OUT },
  },
};

const tooltipVariants = {
  rest: { opacity: 0, y: 8, scale: 0.96 },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: EASE_OUT },
  },
};

const flameVariants = {
  rest: {
    x: [0, 0.8, -0.6, 0.5, 0, 1.4, 0],
    y: [0, -1.6, 0.9, -1.1, 0],
    rotate: [-6, 4, -2, 5, -6],
    scale: [0.96, 1.03, 0.98, 1.04, 0.96],
    transition: {
      duration: 3.6,
      ease: EASE_IN_OUT,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
  hover: {
    x: [0, 1.6, -1.2, 1, 0, 2, 0],
    y: [0, -2.2, 1.2, -1.5, 0],
    rotate: [-10, 6, -4, 8, -10],
    scale: [0.98, 1.07, 1, 1.08, 0.98],
    transition: {
      duration: 2.2,
      ease: EASE_IN_OUT,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
};

const TradingCapitalBurnRateModule = () => {
  return (
    <motion.article
      className="glass-panel rounded-[32px] p-8 sm:p-10 md:col-span-2"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="text-center">
        <p className="text-3xl font-semibold tracking-[-0.04em] text-[#8B5CF6] sm:text-4xl">
          交易本金燃烧率
        </p>
        <p className="mt-3 text-5xl font-semibold tracking-[-0.06em] text-[#8B5CF6] sm:text-6xl">
          50.26%
        </p>
      </div>

      <motion.div
        className="trading-burn-track mx-auto mt-10 w-full max-w-[1080px] md:w-[85%]"
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <div className="mb-4 flex flex-col gap-2 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>燃烧区（交易摩擦成本）</span>
          <span className="sm:text-right">剩余执行本金</span>
        </div>

        <motion.div
          className="relative h-7 overflow-visible rounded-[999px] border border-white/80 bg-white/70 shadow-[0_18px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur"
          variants={containerVariants}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-l-[999px]"
            style={{
              width: `${BURN_RATE}%`,
              background: 'linear-gradient(90deg, #6B21A8 0%, #8B5CF6 100%)',
            }}
          >
          </div>

          <div
            className="absolute right-0 top-0 h-full rounded-r-[999px]"
            style={{
              width: `${REMAINING_RATE}%`,
              background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
            }}
          />

          <div
            className="absolute top-1/2 z-10 h-10 w-px -translate-y-1/2 bg-white/95"
            style={{ left: `${BURN_RATE}%` }}
          />

          <div
            className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${BURN_RATE}%` }}
          >
            <motion.div
              className="trading-burn-flame relative"
              initial={{ opacity: 0, scale: 0.86 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              variants={flameVariants}
            >
              <div className="trading-burn-flame-glow absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
              <Flame className="relative z-10 size-[18px] fill-current text-[#F97316] sm:size-[20px]" />
            </motion.div>
          </div>

          <div
            className="absolute top-[-46px] z-20 -translate-x-1/2"
            style={{ left: `${BURN_RATE}%` }}
          >
            <motion.div
              className="whitespace-nowrap rounded-full bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.3)]"
              variants={tooltipVariants}
            >
              50.26%
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-slate-400 sm:text-sm">
        <span className="font-medium text-[#8B5CF6]">
          交易本金燃烧率 = 总交易摩擦成本 ÷（起始NAV + 净流入资金）
        </span>
      </p>
      <p className="mt-3 text-center text-xs leading-6 text-slate-400">
        真实单人账户 · Broker PortfolioAnalyst（2022.12.05–2026.03.10）可查
      </p>
    </motion.article>
  );
};

export default TradingCapitalBurnRateModule;
