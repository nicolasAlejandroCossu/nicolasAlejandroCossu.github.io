import HeroSection from '@/components/hero/HeroSection';
import ProcessSection from '@/components/process/ProcessSection';

export default function Home() {
  return (
    <main>
      <div id="hero-scroll-wrap" style={{ height: '300vh' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <HeroSection />
        </div>
      </div>
      <ProcessSection />
    </main>
  );
}
