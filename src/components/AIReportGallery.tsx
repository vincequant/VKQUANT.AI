'use client';

import Image from 'next/image';
import { Download, Expand, FileText, Minus, Plus, RotateCcw, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';

import type { AIReport } from '@/types/ai-reports';

type AIReportGalleryProps = {
  reports: AIReport[];
};

type ReportCardProps = {
  report: AIReport;
  onOpen: (report: AIReport) => void;
};

const ReportCard = ({ report, onOpen }: ReportCardProps) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const supportingText = report.subtitle ?? report.summary;

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const rotateY = ((offsetX - bounds.width / 2) / bounds.width) * 16;
    const rotateX = ((bounds.height / 2 - offsetY) / bounds.height) * 14;

    card.style.transform = `perspective(1600px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-10px) scale(1.015)`;
    card.style.setProperty('--glare-x', `${(offsetX / bounds.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(offsetY / bounds.height) * 100}%`);
  };

  const resetTransform = () => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    card.style.transform = 'perspective(1600px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    card.style.setProperty('--glare-x', '50%');
    card.style.setProperty('--glare-y', '50%');
  };

  return (
    <div className="snap-start [perspective:1800px]">
      <button
        ref={cardRef}
        type="button"
        onClick={() => onOpen(report)}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTransform}
        className="group relative h-[500px] w-[340px] min-w-[340px] overflow-hidden rounded-[32px] border border-slate-200/80 bg-white text-left shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-0 transition-[transform,box-shadow,border-color,background-color,ring] duration-300 ease-out hover:border-violet-400/90 hover:bg-violet-50/20 hover:shadow-[0_28px_72px_rgba(139,92,246,0.24)] hover:ring-2 hover:ring-violet-400/70 sm:h-[520px] sm:w-[390px] sm:min-w-[390px]"
        style={
          {
            '--glare-x': '50%',
            '--glare-y': '50%',
          } as CSSProperties
        }
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.72), transparent 34%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-sky-100/80 to-transparent" />

        <div className="relative flex h-full flex-col p-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/85 px-3 py-1 text-xs font-medium text-sky-700 backdrop-blur transition-colors duration-300 group-hover:border-violet-200 group-hover:text-violet-700">
              <Sparkles className="size-3.5" />
              {report.badge}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs text-slate-500 backdrop-blur transition-colors duration-300 group-hover:border-violet-200 group-hover:text-violet-700">
              <Expand className="size-3.5" />
              点击放大
            </span>
          </div>

          <div className="relative mt-4 flex-1 overflow-hidden rounded-[24px] border border-slate-200/80 bg-slate-50 transition-colors duration-300 group-hover:border-violet-200/80 group-hover:bg-violet-50/30">
            {report.type === 'image' ? (
              <Image
                src={report.src}
                alt={report.title}
                fill
                sizes="(max-width: 768px) 86vw, 390px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
              />
            ) : (
              <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#edf4ff_52%,#ffffff_100%)] p-8">
                <div className="absolute -right-10 top-6 h-32 w-32 rounded-full bg-sky-200/40 blur-3xl" />
                <div className="absolute -left-10 bottom-8 h-28 w-28 rounded-full bg-emerald-200/40 blur-3xl" />
                <div>
                  <div className="inline-flex rounded-2xl border border-sky-200 bg-white/80 p-4 text-sky-600 transition-colors duration-300 group-hover:border-violet-200 group-hover:text-violet-700">
                    <FileText className="size-7" />
                  </div>
                  <p className="mt-6 text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
                    AI Research PDF
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                    {report.title}
                  </h3>
                </div>
                <div className="rounded-[20px] border border-white/70 bg-white/70 p-4 backdrop-blur">
                  <p className="text-sm text-slate-600">
                    长篇投资报告、纪要或 PDF 研究文档会在弹窗中全屏展示。
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-sky-700/80">
              {report.caption}
            </p>
            <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-8 tracking-tight text-slate-900 sm:line-clamp-none sm:text-2xl">
              {report.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600 sm:line-clamp-none">
              {supportingText}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

const AIReportGallery = ({ reports }: AIReportGalleryProps) => {
  const [activeReport, setActiveReport] = useState<AIReport | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(1280);

  const openReport = (report: AIReport) => {
    setImageZoom(1);
    setActiveReport(report);
  };

  const closeReport = () => {
    setImageZoom(1);
    setActiveReport(null);
  };

  useEffect(() => {
    const syncViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    syncViewportWidth();
    window.addEventListener('resize', syncViewportWidth);

    return () => {
      window.removeEventListener('resize', syncViewportWidth);
    };
  }, []);

  useEffect(() => {
    if (!activeReport) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeReport();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeReport]);

  const baseViewerWidth = Math.max(320, Math.min(viewportWidth - 120, 1120));
  const currentImageWidth = Math.round(baseViewerWidth * imageZoom);

  return (
    <>
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-violet-600">
              GROK SYSTEM ANALYSIS
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              <span className="text-violet-600">Grok</span> 对 VK 投资体系的深度解剖
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              实时记录 <span className="font-semibold text-violet-600">Grok 4.2 (4 Agent)</span> 对投资体系与研究方法的深度评价。
              <br className="hidden sm:block" />
              横向翻阅、3D 倾斜预览、点击全屏放大阅读。
            </p>
          </div>

          {reports.length > 0 ? (
            <>
              <div className="relative mt-12 sm:mt-14">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f8fafc] to-transparent sm:w-14" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f8fafc] to-transparent sm:w-14" />

                <div className="scrollbar-hide -mx-2 flex gap-6 overflow-x-auto px-2 pb-8 pt-2 snap-x snap-mandatory sm:gap-8 sm:pb-10">
                  {reports.map((report) => (
                    <ReportCard
                      key={report.id}
                      report={report}
                      onOpen={openReport}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-slate-500">
                拖动左右即可翻阅，点击任意卡片可进入全屏阅读模式。
              </p>
            </>
          ) : (
            <div className="glass-panel mx-auto mt-14 max-w-3xl rounded-[32px] p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600">
                Ready For Upload
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                等待 AI 报告素材
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                将截图或 PDF 放到
                <span className="mx-1 rounded-full bg-slate-100 px-2 py-1 font-mono text-sm text-slate-700">
                  public/images/ai-reports
                </span>
                后，首页会自动展示并支持弹窗阅读。
              </p>
            </div>
          )}
        </div>
      </section>

          {activeReport ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
          onClick={closeReport}
          role="dialog"
          aria-modal="true"
          aria-label={activeReport.title}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_30px_120px_rgba(15,23,42,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600">
                  {activeReport.caption}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950 sm:text-2xl">
                  {activeReport.title}
                </h3>
                {activeReport.subtitle ? (
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                    {activeReport.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                {activeReport.type === 'image' ? (
                  <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 sm:flex">
                    <button
                      type="button"
                      onClick={() => setImageZoom((current) => Math.max(0.8, current - 0.2))}
                      className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-sky-700"
                      aria-label="缩小图片"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-14 text-center text-sm font-medium text-slate-600">
                      {Math.round(imageZoom * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setImageZoom((current) => Math.min(2.6, current + 0.2))}
                      className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-sky-700"
                      aria-label="放大图片"
                    >
                      <Plus className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageZoom(1)}
                      className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-sky-700"
                      aria-label="重置缩放"
                    >
                      <RotateCcw className="size-4" />
                    </button>
                  </div>
                ) : null}
                <a
                  href={activeReport.src}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-sky-200 hover:text-sky-700"
                >
                  <Download className="size-4" />
                  新标签打开
                </a>
                    <button
                      type="button"
                      onClick={closeReport}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-sky-200 hover:text-sky-700"
                      aria-label="关闭报告阅读器"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[calc(92vh-96px)] overflow-auto bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_100%)] p-4 sm:p-6">
              {activeReport.type === 'pdf' ? (
                <iframe
                  src={activeReport.src}
                  title={activeReport.title}
                  className="h-[78vh] w-full rounded-[24px] border border-slate-200 bg-white"
                />
              ) : (
                <div className="rounded-[24px] border border-slate-200 bg-white p-3">
                  <div className="mb-3 flex items-center justify-between gap-3 rounded-[18px] bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    <span>已切换为大图阅读模式，长图可直接滚动查看。</span>
                    <span className="hidden sm:inline">双击图片可在 100% / 180% 之间切换。</span>
                  </div>

                  <div className="max-h-[74vh] overflow-auto rounded-[18px] border border-slate-200 bg-slate-50 p-3">
                    <div
                      className="mx-auto transition-[width] duration-200 ease-out"
                      style={{ width: `${currentImageWidth}px` }}
                    >
                      <Image
                        src={activeReport.src}
                        alt={activeReport.title}
                        width={1600}
                        height={2200}
                        onDoubleClick={() =>
                          setImageZoom((current) => (current <= 1.05 ? 1.8 : 1))
                        }
                        className="h-auto w-full rounded-[18px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AIReportGallery;
