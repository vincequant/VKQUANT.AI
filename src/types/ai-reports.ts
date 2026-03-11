export type AIReportType = 'image' | 'pdf';

export type AIReport = {
  id: string;
  filename: string;
  src: string;
  title: string;
  subtitle?: string;
  caption: string;
  summary: string;
  badge: string;
  type: AIReportType;
};
