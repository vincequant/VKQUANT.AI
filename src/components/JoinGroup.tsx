'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const communityHighlights = [
  {
    emoji: '🤖',
    title: '飞书量化策略机器人已上线',
    iconBg: 'bg-emerald-100',
  },
  {
    emoji: '⚡',
    title: '纯手工 + AI 混合执行',
    iconBg: 'bg-sky-100',
  },
  {
    emoji: '👥',
    title: '小而精 VIP 策略闭门群',
    iconBg: 'bg-amber-100',
  },
];

const QR_CANDIDATES = [
  '/wechat-qr.png',
  '/wechat-qr.jpg',
  '/wechat-qr.jpeg',
  '/wechat-qr.JPG',
  '/wechat-qr.JPEG',
  '/wechat-qr.webp',
  '/wechat-qr.WEBP',
];

const JoinGroup = () => {
  const [qrSrc, setQrSrc] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const resolveQrSrc = async () => {
      for (const candidate of QR_CANDIDATES) {
        try {
          const response = await fetch(candidate, { method: 'HEAD' });

          if (mounted && response.ok) {
            setQrSrc(candidate);
            return;
          }
        } catch {
          // Ignore missing candidates and keep searching.
        }
      }

      if (mounted) {
        setQrSrc(null);
      }
    };

    void resolveQrSrc();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="glass-panel mb-6 rounded-[28px] border border-slate-200/80 px-5 py-4 sm:px-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-start gap-4">
            <div className="inline-flex rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-700">
              <Shield className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                纯个人实验室声明
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-[15px]">
                VKQuant 所有内容均为本人单人账户真实记录。
                <span className="font-semibold text-slate-900">
                  {' '}
                  不接受任何形式私募、不管理外部资金、不提供跟单或复制交易服务。
                </span>{' '}
                仅分享执行力与体系，欢迎真诚交流与建议。
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-panel relative overflow-hidden rounded-[36px] p-8 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="fintech-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(135deg,black,transparent_82%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_34%)]" />

          <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.36em] text-sky-600">
                  Community Access
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  加入策略社群
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  面向真正重视执行质量与信号密度的交易者，展示实时推送、人工执行和闭门研究协同的真实价值。
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {communityHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex min-h-[172px] flex-col rounded-[24px] border border-slate-200/80 bg-white/80 p-5 backdrop-blur sm:min-h-[220px] sm:p-6"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} text-2xl`}
                    >
                      <span aria-hidden="true">{item.emoji}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold leading-8 text-slate-950 sm:mt-8 sm:text-xl">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="flex items-center justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="glass-panel relative mt-2 w-full max-w-[360px] rounded-[32px] p-6 md:mt-0 md:max-w-[320px] md:p-5">
                <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0)_22%)]" />
                <div className="relative rounded-[24px] border border-slate-200/80 bg-white/70 p-5 sm:p-6">
                  {qrSrc ? (
                    <Image
                      src={qrSrc}
                      alt="加入策略社群"
                      width={256}
                      height={256}
                      className="mx-auto h-72 w-full max-w-[288px] rounded-[18px] object-contain sm:h-64 sm:max-w-none"
                    />
                  ) : (
                    <div className="flex h-72 flex-col items-center justify-center rounded-[18px] border border-dashed border-slate-300 bg-slate-50 text-center sm:h-64">
                      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">
                        WeChat Access
                      </p>
                      <p className="mt-4 max-w-[180px] text-sm leading-7 text-slate-600">
                        微信社群二维码待上传
                      </p>
                    </div>
                  )}
                </div>
                <p className="mt-5 text-center text-sm text-slate-500 md:mt-4">
                  扫一扫 · 进入 VKQuant.ai 策略社群
                </p>
                <p className="mt-2 text-center text-xs text-slate-400 md:mt-3">
                  （群满后会稍后更换新群二维码，请稍后刷新页面尝试）
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinGroup;
