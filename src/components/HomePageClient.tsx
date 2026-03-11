'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import type { AIReport } from '@/types/ai-reports';
import AIReportGallery from '@/components/AIReportGallery';
import Gallery from '@/components/Gallery';
import HeroBackground from '@/components/HeroBackground';
import JoinGroup from '@/components/JoinGroup';
import NeuralParticles from '@/components/NeuralParticles';

type HomePageClientProps = {
  reports: AIReport[];
};

const heroHighlights = ['每天 80-100 笔纯手工执行', 'AI 实时拆解验证', '极致风控'];
const heroStats = [
  { label: 'Single-Day Edge', value: '+29%' },
  { label: '90D Trades', value: '7,974' },
  { label: 'Current Scale', value: 'A8级' },
];
const networkStats = [
  { label: '执行模式', value: '纯手工' },
  { label: '月均交易', value: '2,000-3,000 笔' },
  { label: 'Q3 峰值', value: '6,628 笔' },
];

const HomePageClient = ({ reports }: HomePageClientProps) => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <HeroBackground />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col">
          <div className="flex items-center justify-between gap-6 py-6">
            <div className="glass-panel inline-flex items-center gap-3 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-700">
              <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
              Elite Discretionary Lab
            </div>

            <motion.div
              className="flex w-full max-w-[420px] items-center justify-end"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/images/logo/vkquant-ai-main.svg?v=clean-5"
                alt="VKQuant.AI"
                width={420}
                height={48}
                priority
                unoptimized
                className="h-12 w-auto bg-transparent object-contain transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </div>

          <div className="grid flex-1 items-center gap-16 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl text-center"
            >
              <h1 className="mt-8 font-display text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-[5.4rem] lg:leading-[0.94]">
                <span className="text-[#6B46C1]">Elite</span> Discretionary Trading Lab
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                每天 80-100 笔纯手工执行 · AI 实时拆解验证 · 把机构级执行力焊死在个人账户上的终极演示
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {heroHighlights.map((item) => (
                  <span
                    key={item}
                    className="data-chip rounded-full px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label} className="glass-panel rounded-[24px] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-slate-950">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="glass-panel relative overflow-hidden rounded-[36px] p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_36%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_28%)]" />

                <div className="relative">
                  <NeuralParticles />

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {networkStats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[20px] border border-slate-200/70 bg-white/70 p-4 text-center backdrop-blur"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-3 text-lg font-semibold text-slate-950">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Gallery />
      <AIReportGallery reports={reports} />
      <JoinGroup />

      <footer className="border-t border-slate-200/80 px-4 py-8 text-center text-sm text-slate-500">
        <p>© 2026 VKQuant.AI · Elite Discretionary Trading Lab · 纯手工 Discretionary</p>
      </footer>
    </main>
  );
};

export default HomePageClient;
