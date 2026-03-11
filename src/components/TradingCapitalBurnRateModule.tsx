'use client';

import { motion } from 'framer-motion';

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

const burnVariants = {
  rest: { scale: 1, x: 0 },
  hover: {
    scale: 1.02,
    x: [0, -1.6, 1.6, -1, 0],
    transition: { duration: 0.32, ease: EASE_IN_OUT },
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
        className="mx-auto mt-10 w-full max-w-[1080px] md:w-[85%]"
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
          <motion.div
            className="relative h-full rounded-l-[999px]"
            variants={burnVariants}
            style={{
              width: `${BURN_RATE}%`,
              transformOrigin: 'left center',
              background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)',
              boxShadow: '0 0 4px rgba(139,92,246,0.3)',
            }}
          >
            <motion.div
              className="absolute left-1/2 top-[-46px] z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.3)]"
              variants={tooltipVariants}
            >
              50.26%
            </motion.div>
          </motion.div>

          <div
            className="absolute right-0 top-0 h-full rounded-r-[999px]"
            style={{
              width: `${REMAINING_RATE}%`,
              background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
            }}
          />

          <div
            className="absolute top-0 h-full w-px bg-white/95"
            style={{ left: `${BURN_RATE}%` }}
          />
        </motion.div>
      </motion.div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-slate-500 sm:text-base">
        尽管交易摩擦成本吃掉一半执行本金，仍实现 542.36% 累计回报
      </p>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs leading-6 text-slate-400 sm:text-sm">
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
