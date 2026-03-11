import HomePageClient from '@/components/HomePageClient';
import { getAIReports } from '@/lib/ai-reports';

export default function Home() {
  const reports = getAIReports();

  return <HomePageClient reports={reports} />;
}
