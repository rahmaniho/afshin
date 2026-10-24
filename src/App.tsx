import { useEffect, useRef, useState } from 'react';
import {
  GrassParams,
  initialGrassParams,
  GrassScene,
  FieldControls,
  GalleryModal,
} from './GrassComponents';
import {
  HeaderNav,
  HeroSection,
  ServicesSection,
  ProcessSection,
  GalleryPreviewSection,
  TestimonialSection,
  JournalSection,
  QuoteSection,
  FooterSection,
} from './SiteSections';

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = target.dataset.delay ? parseFloat(target.dataset.delay) : 0;
            target.style.setProperty('--reveal-delay', `${delay * 0.12}s`);
            target.classList.add('is-visible');
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export function App() {
  useScrollReveal();
  const scrollProgress = useScrollProgress();
  const grassParamsRef = useRef<GrassParams>({ ...initialGrassParams });
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <main className="relative min-h-screen text-[#ecead8] font-body overflow-x-hidden bg-[#0d1410]">
      {/* 3D Interactive Three.js dynamic grass field background */}
      <GrassScene paramsRef={grassParamsRef} />

      {/* Persistent Navigation bar with reading progress */}
      <HeaderNav progress={scrollProgress} />

      {/* High-quality content sections matching 1:1 original site */}
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <GalleryPreviewSection onViewGallery={() => setGalleryOpen(true)} />
        <TestimonialSection />
        <JournalSection />
        <QuoteSection />
        <FooterSection />
      </div>

      {/* Floating interactive physics & weather controls */}
      <FieldControls paramsRef={grassParamsRef} />

      {/* Full project portfolio modal with multi-category filter and lightbox */}
      <GalleryModal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onQuote={() => {
          const el = document.getElementById('quote');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />
    </main>
  );
}

export default App;
