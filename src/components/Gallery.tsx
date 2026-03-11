'use client';

import { motion } from 'framer-motion';

const performanceCards = [
  {
    title: '风险调整回报',
    value: '1.11',
    label: 'Sharpe Ratio（3年3个月长期）',
    tone: 'text-sky-600',
    description: (
      <>
        早期峰值达 <span className="font-medium text-emerald-600">2.52</span>（2025全年），长期稳定在
        1.11。
      </>
    ),
  },
  {
    title: '当前账户规模',
    value: 'A8级',
    label: '千万级规模',
    tone: 'text-emerald-600',
  },
  {
    title: '单日极致表现',
    value: '+29%',
    label: '2026/03/07 单日示例',
    tone: 'text-red-600',
    emphasis: true,
  },
];

const volumeStats = [
  { label: '最近 90 天', value: '7,974 笔' },
  { label: '2025 Q3 单季', value: '6,628 笔' },
  { label: '每月平均', value: '2,000-3,000 笔', accent: true },
];

const Gallery = () => {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-semibold text-red-700">
            LIVE · 纯手工高频 · 真实执行力
          </div>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
            VKQuant手工超频交易实验室
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-xl">
            2022.12 至今 · 单人账户 · 每天 80-100 笔纯手工决策
          </p>
        </motion.div>

        <motion.div
          className="mb-12 overflow-hidden rounded-[36px] border border-red-100 bg-[linear-gradient(135deg,rgba(254,242,242,0.96),rgba(255,255,255,0.98))] p-10 text-center shadow-[0_24px_60px_rgba(239,68,68,0.08)] sm:p-12"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-500">
            Cumulative Return
          </p>
          <div className="mt-4 text-6xl font-semibold tracking-[-0.07em] text-red-600 sm:text-7xl">
            514.96%
          </div>
          <p className="mt-3 text-2xl font-medium text-slate-800 sm:text-3xl">
            累计回报（3 年 3 个月）
          </p>
          <p className="mt-2 text-base text-red-500">
            A6级 → A8级
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {performanceCards.map((card, index) => (
            <motion.article
              key={card.title}
              className={`glass-panel rounded-[32px] p-8 ${
                card.emphasis
                  ? 'border-red-200 bg-[linear-gradient(135deg,rgba(254,242,242,0.9),rgba(255,255,255,0.96))]'
                  : ''
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <p className={`text-sm font-semibold ${card.tone}`}>{card.title}</p>
              <div className={`mt-4 text-5xl font-semibold tracking-[-0.05em] ${card.emphasis ? 'text-red-600' : 'text-slate-950'}`}>
                {card.value}
              </div>
              <p className={`mt-2 text-sm ${card.emphasis ? 'text-red-500' : 'text-slate-500'}`}>
                {card.label}
              </p>
              {card.description ? (
                <p className="mt-6 text-sm leading-8 text-slate-600">{card.description}</p>
              ) : null}
            </motion.article>
          ))}

          <motion.article
            className="glass-panel rounded-[32px] p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            whileHover={{ y: -6 }}
          >
            <p className="text-sm font-semibold text-amber-600">交易量维度</p>
            <div className="mt-6 space-y-4">
              {volumeStats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3"
                >
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  <span
                    className={`text-sm font-semibold ${
                      item.accent ? 'text-red-600' : 'text-slate-900'
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-7 text-slate-500">
              普通散户月均交易次数通常极低，这里展示的是高强度 discretionary 执行频率。
            </p>
          </motion.article>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
