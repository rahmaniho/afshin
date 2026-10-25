import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { languageOptions, useLanguage } from './i18n';
import type { JournalArticle, Language } from './i18n/types';
import { useBodyScrollLock, useDialogFocus } from './useOverlay';

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

const navIds = ['services', 'process', 'gallery', 'journal'] as const;

export function HeaderNav({ progress }: { progress: number }) {
  const { copy, language, setLanguage, arrowIcon } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-[#88a06b] via-[#b8c79c] to-[#c8a96a] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <nav aria-label={copy.nav.navigationLabel} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0d1410]/85 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="site-brand flex items-center gap-2 sm:gap-3 cursor-pointer group text-start shrink-0" aria-label={copy.nav.home}>
            <span className="site-brand-mark w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border border-[#88a06b]/50 bg-[#ecead8] group-hover:border-[#b8c79c] transition-colors shrink-0">
              <img src="./images/afshin-logo-mark.webp" alt="" className="w-full h-full object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="site-brand-name font-display text-base sm:text-[1.35rem] text-[#ecead8] whitespace-nowrap">{copy.brand.name}</span>
              <span className="hidden sm:block text-[10px] text-[#b7b8a8] mt-1.5 whitespace-nowrap">{copy.brand.degree}</span>
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-8 2xl:gap-10">
            {navIds.map((id) => (
              <button key={id} onClick={() => goTo(id)} className="text-sm text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer whitespace-nowrap relative group">
                {copy.nav.items[id]}
                <span className="absolute -bottom-1 start-0 w-0 h-px bg-[#88a06b] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="relative flex items-center">
              <i className="language-globe ri-global-line absolute start-2.5 text-[#b8c79c] pointer-events-none" aria-hidden="true" />
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                aria-label={copy.language.switchLabel}
                className="language-select w-[6rem] sm:w-[6.2rem] xl:w-[6.6rem] appearance-none rounded-full border border-[#ecead8]/20 bg-[#0d1410]/55 py-2 ps-7 pe-5 text-xs text-[#ecead8] hover:border-[#88a06b] focus:outline-none focus:border-[#b8c79c] cursor-pointer backdrop-blur-sm"
              >
                {languageOptions.map((option) => <option key={option.code} value={option.code}>{option.native}</option>)}
              </select>
              <i className="language-chevron ri-arrow-down-s-line absolute end-1.5 text-[#b7b8a8] pointer-events-none" aria-hidden="true" />
            </div>
            <button onClick={() => goTo('quote')} className="hidden xl:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b8c79c] text-[#0d1410] font-medium text-sm hover:bg-[#ecead8] transition-all cursor-pointer whitespace-nowrap">
              {copy.nav.request}<i className={arrowIcon} aria-hidden="true" />
            </button>
            <button className="mobile-menu-toggle xl:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer text-[#ecead8]" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? copy.nav.closeMenu : copy.nav.openMenu} aria-expanded={menuOpen}>
              <i className={`text-2xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={`xl:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-[30rem] mt-4' : 'max-h-0'}`}>
          <div className="px-6 pb-6 flex flex-col gap-4 bg-[#0d1410]/95 backdrop-blur-md border-t border-white/5 pt-4">
            {navIds.map((id) => (
              <button key={id} onClick={() => goTo(id)} className="text-start font-display text-2xl text-[#ecead8] cursor-pointer whitespace-nowrap hover:text-[#b8c79c] transition-colors">{copy.nav.items[id]}</button>
            ))}
            <button onClick={() => goTo('quote')} className="mt-2 text-center py-3 rounded-full bg-[#b8c79c] text-[#0d1410] font-medium text-sm">{copy.nav.mobileRequest}</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export function HeroSection() {
  const { copy, arrowIcon } = useLanguage();
  return (
    <section id="hero" data-stage="0" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1410]/55" /></div>
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 text-center pt-32 pb-16 md:pt-24">
        <div data-reveal data-delay="1" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ecead8]/25 backdrop-blur-sm bg-[#0d1410]/35 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#88a06b] animate-pulse" />
          <span className="text-xs md:text-sm text-[#ecead8]/90">{copy.hero.badge}</span>
        </div>
        <h1 data-reveal data-delay="2" className="hero-title font-display text-[#ecead8] font-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
          {copy.hero.titleLine1}<br />{copy.hero.titlePrefix} <em className="text-[#b8c79c] font-normal">{copy.hero.titleEmphasis}</em>{copy.hero.titleSuffix && ` ${copy.hero.titleSuffix}`}
        </h1>
        <p data-reveal data-delay="3" className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-[#ecead8]/95 font-light leading-8 md:leading-9">{copy.hero.description}</p>
        <div data-reveal data-delay="3" className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollToSection('quote')} className="px-7 py-3.5 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm font-medium hover:bg-[#ecead8] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2">{copy.hero.primary}<i className={arrowIcon} aria-hidden="true" /></button>
          <button onClick={() => scrollToSection('services')} className="px-7 py-3.5 rounded-full border border-[#ecead8]/30 text-[#ecead8] text-sm hover:bg-[#ecead8] hover:text-[#0d1410] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 backdrop-blur-sm bg-[#0d1410]/25">{copy.hero.secondary}</button>
        </div>
        <div data-reveal data-delay="4" className="mt-12 md:mt-14 flex flex-col items-center gap-3">
          <span className="text-[11px] text-[#ecead8]/75">{copy.hero.scroll}</span>
          <div className="w-px h-14 bg-[#ecead8]/30 relative overflow-hidden" aria-hidden="true"><span className="absolute inset-0 bg-[#b8c79c] scroll-line" /></div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const { copy } = useLanguage();
  return (
    <section id="services" data-stage="1" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-[#0d1410]/70 backdrop-blur-[2px]">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#88a06b]/5 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto">
        <span data-reveal className="inline-block text-xs text-[#88a06b] mb-10">{copy.services.eyebrow}</span>
        <h2 data-reveal data-delay="1" className="persian-heading font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#ecead8]">
          {copy.services.titleA} <em className="text-[#b8c79c]">{copy.services.highlightA}</em> {copy.services.titleB} <em className="text-[#c8a96a]">{copy.services.highlightB}</em> {copy.services.titleC}
        </h2>
        <div data-reveal data-delay="2" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[#b7b8a8]">
          {copy.services.items.map((service) => <div key={service.title} className="border-t border-[rgba(236,234,216,0.12)] pt-6"><p className="font-display text-[#ecead8]/90 text-2xl mb-3">{service.title}</p><p className="leading-7">{service.desc}</p></div>)}
        </div>
      </div>
    </section>
  );
}

const processIcons = ['ri-test-tube-line', 'ri-search-eye-line', 'ri-seedling-line'];

export function ProcessSection() {
  const { copy, arrowIcon } = useLanguage();
  return (
    <section id="process" data-stage="2" className="relative py-32 md:py-48 px-6 md:px-12 bg-[#131c16]/80 backdrop-blur-[3px] border-y border-[rgba(236,234,216,0.12)]">
      <div className="max-w-7xl mx-auto">
        <div data-reveal className="flex items-end justify-between flex-wrap gap-6 mb-20">
          <div><span className="text-xs text-[#88a06b] mb-4 block">{copy.process.eyebrow}</span><h2 className="persian-heading font-display text-4xl md:text-6xl font-light">{copy.process.titleA} <em className="text-[#b8c79c]">{copy.process.highlight}</em></h2></div>
          <p className="max-w-sm text-[#b7b8a8] text-sm leading-7">{copy.process.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {copy.process.steps.map((step, idx) => (
            <div key={step.num} data-reveal data-delay={idx + 1} className="group relative p-8 md:p-10 rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#0d1410]/40 hover:bg-[#0d1410]/70 transition-all duration-500 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#88a06b]/0 group-hover:bg-[#88a06b]/10 transition-colors duration-700 blur-2xl" />
              <div className="flex items-center justify-between mb-12"><span className="font-display text-base text-[#b7b8a8]">{step.num}</span><span className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(236,234,216,0.12)] text-[#88a06b] group-hover:border-[#88a06b] group-hover:rotate-45 transition-all duration-500"><i className={`${processIcons[idx]} text-base`} aria-hidden="true" /></span></div>
              <h3 className="font-display text-3xl md:text-4xl text-[#ecead8] mb-4 font-light">{step.title}</h3><p className="text-[#b7b8a8] text-sm leading-7 mb-8">{step.desc}</p>
              <button onClick={() => scrollToSection('quote')} className="text-xs text-[#b8c79c] hover:text-[#c8a96a] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap">{copy.process.cta}<i className={arrowIcon} aria-hidden="true" /></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryPreviewSection({ onViewGallery }: { onViewGallery: () => void }) {
  const { copy, arrowIcon } = useLanguage();
  return (
    <section id="gallery" data-stage="3" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-[#0d1410]/80 backdrop-blur-[3px]">
      <div className="relative max-w-7xl mx-auto">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div><span className="text-xs text-[#88a06b] mb-4 block">{copy.stats.eyebrow}</span><h2 className="persian-heading font-display text-4xl md:text-6xl font-light">{copy.stats.titleA} <em className="text-[#c8a96a]">{copy.stats.highlight}</em></h2></div>
          <p className="text-[#b7b8a8] text-sm max-w-xs leading-7">{copy.stats.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(236,234,216,0.12)] rounded-2xl overflow-hidden border border-[rgba(236,234,216,0.12)]">
          {copy.stats.items.map((item, idx) => <div key={item.unit} data-reveal data-delay={idx + 1} className="bg-[#0d1410]/80 px-6 py-10 md:py-14 hover:bg-[#131c16] transition-colors group"><div className="font-display text-5xl md:text-6xl text-[#ecead8] font-light tabular-nums mb-3 group-hover:text-[#b8c79c] transition-colors">{item.num}</div><div className="text-sm text-[#ecead8]/80 mb-2">{item.unit}</div><div className="text-xs text-[#b7b8a8] font-light leading-6">{item.sub}</div></div>)}
        </div>
        <div data-reveal data-delay="5" className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-6 p-8 md:p-10 rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#131c16]/40">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#88a06b]/10 border border-[#88a06b]/30 shrink-0"><i className="ri-book-open-line text-[#88a06b] text-xl" aria-hidden="true" /></div>
          <div className="flex-1"><p className="font-display text-2xl text-[#ecead8] mb-2">{copy.stats.galleryTitle}</p><p className="text-sm text-[#b7b8a8] leading-7">{copy.stats.galleryDescription}</p></div>
          <button onClick={onViewGallery} className="px-6 py-3 rounded-full border border-[#ecead8]/20 text-sm hover:bg-[#ecead8] hover:text-[#0d1410] transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 font-medium">{copy.stats.galleryButton}<i className={arrowIcon} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  const { copy } = useLanguage();
  return (
    <section id="about" data-stage="4" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-[#0d1410]/65 backdrop-blur-[2px]">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c8a96a]/[0.04] blur-3xl" /></div>
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-14 items-center">
        <div data-reveal className="lg:col-span-5 relative w-full max-w-[30rem] mx-auto lg:mx-0 pb-14 pe-10 sm:pe-16">
          <figure className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#ecead8]/15 bg-[#131c16] shadow-2xl">
            <img src="./images/afshin-rahmani-orchard.webp" alt={copy.testimonial.mainAlt} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1410]/35 via-transparent to-transparent pointer-events-none" />
          </figure>
          <div className="absolute bottom-0 end-0 w-[54%] grid grid-cols-2 gap-2 sm:gap-3">
            <figure className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[#0d1410] bg-[#131c16] shadow-xl">
              <img src="./images/afshin-rahmani-nature.webp" alt={copy.testimonial.natureAlt} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
            </figure>
            <figure className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[#0d1410] bg-[#131c16] shadow-xl">
              <img src="./images/afshin-rahmani-portrait.webp" alt={copy.testimonial.portraitAlt} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
            </figure>
          </div>
        </div>

        <div className="lg:col-span-7 text-center lg:text-start">
          <span data-reveal className="inline-block text-xs text-[#88a06b] mb-6">{copy.testimonial.eyebrow}</span>
          <div data-reveal data-delay="1" className="mb-7"><i className="ri-double-quotes-r text-5xl text-[#c8a96a]/40" aria-hidden="true" /></div>
          <blockquote data-reveal data-delay="1" className="persian-heading font-display text-3xl md:text-4xl font-light text-[#ecead8]">{copy.testimonial.quoteA} <span className="text-[#b8c79c]">{copy.testimonial.highlight}</span>{copy.testimonial.quoteB}</blockquote>
          <div data-reveal data-delay="2" className="mt-10 flex items-center justify-center lg:justify-start gap-4">
            <span className="w-12 h-12 rounded-full overflow-hidden border border-[#88a06b]/40 bg-[#ecead8] flex items-center justify-center shrink-0"><img src="./images/afshin-logo-mark.webp" alt="" loading="lazy" className="w-full h-full object-cover" /></span>
            <div className="text-start"><div className="text-sm text-[#ecead8] font-medium">{copy.testimonial.name}</div><div className="text-xs text-[#b7b8a8] mt-1 leading-5">{copy.testimonial.role}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleModal({ article, onClose }: { article: JournalArticle; onClose: () => void }) {
  const { copy } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(true);
  useDialogFocus(true, dialogRef);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-[85] flex items-center justify-center p-0 md:p-8" role="dialog" aria-modal="true" aria-labelledby="article-title">
      <div className="absolute inset-0 bg-[#0d1410]/95 backdrop-blur-lg" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[92vh] overflow-y-auto rounded-none md:rounded-3xl border border-[rgba(236,234,216,0.12)] bg-[#131c16] shadow-2xl">
        <button data-dialog-initial-focus onClick={onClose} className="absolute top-4 end-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-[#0d1410]/85 border border-[#ecead8]/20 text-[#ecead8] hover:bg-[#ecead8] hover:text-[#0d1410] transition-all cursor-pointer backdrop-blur-md" aria-label={copy.journal.close}><i className="ri-close-line text-xl" aria-hidden="true" /></button>
        <div className="relative aspect-[16/9] md:aspect-[16/7] overflow-hidden bg-[#0d1410]"><img src={article.img} alt={article.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#131c16] via-transparent to-transparent" /></div>
        <div className="px-6 md:px-14 lg:px-20 pb-12 md:pb-16 pt-8 md:pt-10">
          <div className="flex items-center flex-wrap gap-3 text-xs text-[#b7b8a8] mb-5"><span className="text-[#88a06b]">{article.cat}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" /><span>{article.date}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" /><span>{article.readTime}</span></div>
          <h2 id="article-title" className="persian-heading font-display text-4xl md:text-5xl text-[#ecead8] font-light mb-7">{article.title}</h2>
          <p className="text-[#b8c79c] text-base md:text-lg leading-8 pb-7 mb-7 border-b border-[rgba(236,234,216,0.12)]">{article.excerpt}</p>
          <div className="article-body">{article.content.map((block, index) => { if (block.type === 'list') return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>; if (block.type === 'heading') return <h3 key={index}>{block.text}</h3>; return <p key={index}>{block.text}</p>; })}</div>
          <div className="mt-10 p-5 md:p-6 rounded-2xl border border-[#88a06b]/25 bg-[#88a06b]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4"><p className="flex-1 text-sm text-[#b7b8a8] leading-7">{copy.journal.reviewText}</p><button onClick={() => { onClose(); window.setTimeout(() => scrollToSection('quote'), 100); }} className="px-5 py-3 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm font-medium hover:bg-[#ecead8] transition-colors whitespace-nowrap cursor-pointer">{copy.journal.reviewButton}</button></div>
        </div>
      </div>
    </div>
  );
}

export function JournalSection() {
  const { copy, arrowIcon } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const visibleArticles = showAll ? copy.journal.articles : copy.journal.articles.slice(0, 3);
  const selectedArticle = copy.journal.articles.find((article) => article.id === selectedArticleId) ?? null;

  return (
    <section id="journal" className="relative py-32 md:py-48 px-6 md:px-12 bg-[#131c16]/85 backdrop-blur-[3px] border-y border-[rgba(236,234,216,0.12)]">
      <div className="max-w-7xl mx-auto">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div><span className="text-xs text-[#88a06b] mb-4 block">{copy.journal.eyebrow}</span><h2 className="persian-heading font-display text-4xl md:text-6xl font-light">{copy.journal.titleA} <em className="text-[#b8c79c]">{copy.journal.highlight}</em></h2></div>
          <button onClick={() => setShowAll((value) => !value)} className="text-sm text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto" aria-expanded={showAll}>{showAll ? copy.journal.showLess : copy.journal.showAll}<i className={showAll ? 'ri-arrow-up-line' : 'ri-arrow-left-up-line'} aria-hidden="true" /></button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8">
          {visibleArticles.map((article, idx) => (
            <article key={article.id} data-reveal={idx < 3 ? '' : undefined} data-delay={idx < 3 ? idx + 1 : undefined} className="group">
              <button onClick={() => setSelectedArticleId(article.id)} className="w-full text-start cursor-pointer" aria-label={`${copy.journal.readMore}: ${article.title}`}>
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[rgba(236,234,216,0.12)] mb-6 bg-[#0d1410]"><img src={article.img} alt={article.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" /></div>
                <div className="flex items-center flex-wrap gap-3 text-xs text-[#b7b8a8] mb-3"><span className="text-[#88a06b]">{article.cat}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" /><span>{article.date}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" /><span>{article.readTime}</span></div>
                <h3 className="persian-heading font-display text-2xl md:text-3xl text-[#ecead8] mb-3 group-hover:text-[#b8c79c] transition-colors">{article.title}</h3><p className="text-sm text-[#b7b8a8] leading-7">{article.excerpt}</p><span className="mt-4 inline-flex items-center gap-2 text-xs text-[#b8c79c]">{copy.journal.readMore}<i className={arrowIcon} aria-hidden="true" /></span>
              </button>
            </article>
          ))}
        </div>
      </div>
      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticleId(null)} />}
    </section>
  );
}

interface QuoteForm { name: string; email: string; phone: string; address: string; project: string; size: string; timeline: string; notes: string; }
const emptyForm: QuoteForm = { name: '', email: '', phone: '', address: '', project: 'diagnosis', size: 'under1', timeline: 'month', notes: '' };
const contactNumbers = [
  { display: '0910 842 1567', telephone: '+989108421567', whatsapp: '989108421567' },
  { display: '0919 986 5275', telephone: '+989199865275', whatsapp: '989199865275' },
  { display: '0936 533 7209', telephone: '+989365337209', whatsapp: '989365337209' },
] as const;
const primaryWhatsApp = contactNumbers[0];
const createWhatsAppUrl = (message: string) => `https://wa.me/${primaryWhatsApp.whatsapp}?text=${encodeURIComponent(message)}`;
const messageLabel = (label: string) => label.replace(/\s*\*$/, '').replace(/[?:：]$/, '');
const inputClass = 'w-full bg-[#131c16] border border-[rgba(236,234,216,0.12)] rounded-lg px-4 py-3 text-sm text-[#ecead8] placeholder:text-[#b7b8a8]/45 focus:outline-none focus:border-[#b8c79c] transition-colors';
const labelClass = 'block text-xs text-[#b7b8a8] mb-2';

export function QuoteSection() {
  const { copy, language, formatNumber } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'ok' | 'blocked'>('idle');
  const [form, setForm] = useState<QuoteForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'email', string>>>({});
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => { setErrors({}); setStatus('idle'); setWhatsappUrl(''); }, [language]);

  const updateField = (key: keyof QuoteForm, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (key === 'name' || key === 'phone' || key === 'email') setErrors((previous) => ({ ...previous, [key]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    const normalizedPhone = toEnglishDigits(form.phone).replace(/[\s()\-]/g, '').replace(/^\+98/, '0').replace(/^98/, '0');
    if (form.name.trim().length < 3) nextErrors.name = 'name';
    if (!/^0\d{10}$/.test(normalizedPhone)) nextErrors.phone = 'phone';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'email';
    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return; }

    const projectLabel = copy.quote.projectOptions.find((item) => item.value === form.project)?.label ?? form.project;
    const sizeLabel = copy.quote.sizeOptions.find((item) => item.value === form.size)?.label ?? form.size;
    const timelineLabel = copy.quote.timelineOptions.find((item) => item.value === form.timeline)?.label ?? form.timeline;
    const messageLines = [
      copy.quote.whatsappIntro,
      '',
      `${messageLabel(copy.quote.name)}: ${form.name.trim()}`,
      `${messageLabel(copy.quote.phone)}: ${normalizedPhone}`,
    ];
    if (form.email.trim()) messageLines.push(`${messageLabel(copy.quote.email)}: ${form.email.trim()}`);
    if (form.address.trim()) messageLines.push(`${messageLabel(copy.quote.address)}: ${form.address.trim()}`);
    messageLines.push(
      `${messageLabel(copy.quote.project)}: ${projectLabel}`,
      `${messageLabel(copy.quote.size)}: ${sizeLabel}`,
      `${messageLabel(copy.quote.timeline)}: ${timelineLabel}`,
    );
    if (form.notes.trim()) messageLines.push(`${messageLabel(copy.quote.notes)}: ${form.notes.trim()}`);

    const url = createWhatsAppUrl(messageLines.join('\n'));
    setWhatsappUrl(url);
    try {
      // Open synchronously from the submit gesture to avoid popup blockers.
      const whatsappWindow = window.open(url, '_blank');
      if (!whatsappWindow) {
        setStatus('blocked');
        return;
      }
      whatsappWindow.opener = null;
      setStatus('ok');
    } catch {
      setStatus('blocked');
    }
  };

  return (
    <section id="quote" data-stage="5" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 bg-gradient-to-b from-[#0d1410]/30 via-[#0d1410]/15 to-[#0d1410]/60" /></div>
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-14"><span data-reveal className="inline-block text-xs text-[#88a06b] mb-5">{copy.quote.eyebrow}</span><h2 data-reveal data-delay="1" className="persian-heading font-display text-5xl md:text-7xl lg:text-8xl font-light text-[#ecead8]">{copy.quote.titleLine1}<br /><em className="text-[#c8a96a]">{copy.quote.titleEmphasis}</em></h2><p data-reveal data-delay="2" className="mt-8 text-base md:text-lg text-[#ecead8]/85 max-w-xl mx-auto leading-8">{copy.quote.description}</p></div>
        <div data-reveal data-delay="3" className="mb-6 p-5 sm:p-6 rounded-3xl border border-[rgba(236,234,216,0.12)] bg-[#0d1410]/70 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-10 rounded-full bg-[#88a06b]/15 border border-[#88a06b]/30 text-[#b8c79c] flex items-center justify-center shrink-0"><i className="ri-phone-line" aria-hidden="true" /></span>
            <h3 className="font-display text-xl text-[#ecead8]">{copy.quote.directContact}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {contactNumbers.map((contact) => (
              <a key={contact.telephone} href={`tel:${contact.telephone}`} dir="ltr" className="flex items-center justify-center gap-2 rounded-xl border border-[#ecead8]/15 px-3 py-3 text-sm text-[#ecead8] tabular-nums hover:border-[#88a06b] hover:text-[#b8c79c] transition-colors">
                <i className="ri-phone-line text-[#88a06b]" aria-hidden="true" />{contact.display}
              </a>
            ))}
          </div>
          <a href={createWhatsAppUrl(copy.quote.whatsappIntro)} target="_blank" rel="noopener noreferrer" className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[#b8c79c] px-4 py-3 text-sm font-medium text-[#0d1410] text-center leading-6 hover:bg-[#ecead8] transition-colors">
            <i className="ri-whatsapp-line text-lg" aria-hidden="true" /><span>{copy.quote.whatsappDirect}</span><span dir="ltr" className="tabular-nums">{primaryWhatsApp.display}</span>
          </a>
        </div>
        <form data-reveal data-delay="3" id="quote-form-afshin" onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-10 rounded-3xl border border-[rgba(236,234,216,0.12)] bg-[#0d1410]/75 backdrop-blur-xl">
          <div><label htmlFor="quote-name" className={labelClass}>{copy.quote.name}</label><input id="quote-name" required type="text" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} className={inputClass} placeholder={copy.quote.namePlaceholder} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <p id="name-error" className="mt-2 text-xs text-[#e4aa96]">{copy.quote.errors.name}</p>}</div>
          <div><label htmlFor="quote-phone" className={labelClass}>{copy.quote.phone}</label><input id="quote-phone" required type="tel" name="phone" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className={`${inputClass} ltr-input`} placeholder={copy.quote.phonePlaceholder} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone && <p id="phone-error" className="mt-2 text-xs text-[#e4aa96]">{copy.quote.errors.phone}</p>}</div>
          <div><label htmlFor="quote-email" className={labelClass}>{copy.quote.email}</label><input id="quote-email" type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className={`${inputClass} ltr-input`} placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <p id="email-error" className="mt-2 text-xs text-[#e4aa96]">{copy.quote.errors.email}</p>}</div>
          <div><label htmlFor="quote-address" className={labelClass}>{copy.quote.address}</label><input id="quote-address" type="text" name="address" autoComplete="address-level1" value={form.address} onChange={(event) => updateField('address', event.target.value)} className={inputClass} placeholder={copy.quote.addressPlaceholder} /></div>
          <div><label htmlFor="quote-project" className={labelClass}>{copy.quote.project}</label><div className="relative"><select id="quote-project" name="project" value={form.project} onChange={(event) => updateField('project', event.target.value)} className={`${inputClass} appearance-none pe-10 cursor-pointer`}>{copy.quote.projectOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><i className="ri-arrow-down-s-line absolute end-3 top-1/2 -translate-y-1/2 text-[#b7b8a8] pointer-events-none" aria-hidden="true" /></div></div>
          <div><label htmlFor="quote-size" className={labelClass}>{copy.quote.size}</label><div className="relative"><select id="quote-size" name="size" value={form.size} onChange={(event) => updateField('size', event.target.value)} className={`${inputClass} appearance-none pe-10 cursor-pointer`}>{copy.quote.sizeOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><i className="ri-arrow-down-s-line absolute end-3 top-1/2 -translate-y-1/2 text-[#b7b8a8] pointer-events-none" aria-hidden="true" /></div></div>
          <div className="md:col-span-2"><span className={labelClass}>{copy.quote.timeline}</span><div className="flex flex-wrap gap-2">{copy.quote.timelineOptions.map((item) => <button type="button" key={item.value} onClick={() => updateField('timeline', item.value)} aria-pressed={form.timeline === item.value} className={`px-4 py-2 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap ${form.timeline === item.value ? 'bg-[#b8c79c] text-[#0d1410] border-[#b8c79c] font-medium' : 'border-[rgba(236,234,216,0.12)] text-[#b7b8a8] hover:border-[#b8c79c] hover:text-[#ecead8]'}`}>{item.label}</button>)}</div></div>
          <div className="md:col-span-2"><label htmlFor="quote-notes" className={labelClass}>{copy.quote.notes}</label><textarea id="quote-notes" name="notes" value={form.notes} onChange={(event) => updateField('notes', event.target.value.slice(0, 500))} maxLength={500} rows={4} className={`${inputClass} resize-none leading-7`} placeholder={copy.quote.notesPlaceholder} /><div className="mt-1 text-end text-[10px] text-[#b7b8a8] tabular-nums">{formatNumber(form.notes.length)}/{formatNumber(500)}</div></div>
          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2"><p className="text-xs text-[#b7b8a8]/85 flex items-start gap-2 leading-6"><i className="ri-shield-check-line text-[#88a06b] mt-1" aria-hidden="true" /><span>{copy.quote.privacyLine1}<br />{copy.quote.privacyLine2}</span></p><button type="submit" className="quote-submit px-7 py-3.5 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm font-medium hover:bg-[#ecead8] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2">{status === 'ok' ? <><i className="ri-check-line" />{copy.quote.successButton}</> : <>{copy.quote.submit}<i className="ri-whatsapp-line text-lg" aria-hidden="true" /></>}</button></div>
          <div className="md:col-span-2 min-h-5" aria-live="polite">
            {status === 'ok' && <p className="text-sm text-[#b8c79c] leading-7">{copy.quote.whatsappOpened}</p>}
            {status === 'blocked' && <p className="text-sm text-[#e4aa96] leading-7">{copy.quote.popupBlocked} <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#b8c79c] underline underline-offset-4 whitespace-nowrap">{copy.quote.openWhatsApp}</a></p>}
          </div>
        </form>
      </div>
    </section>
  );
}

export function FooterSection() {
  const { copy } = useLanguage();
  return (
    <footer className="relative bg-[#1a2418] border-t border-[rgba(236,234,216,0.12)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5"><div className="flex items-center gap-4 mb-6"><img src="./images/afshin-rahmani-logo.webp" alt={copy.brand.name} loading="lazy" className="w-20 h-20 rounded-2xl bg-white object-contain shrink-0" /><div className="flex flex-col leading-none"><span className="font-display text-3xl text-[#ecead8]">{copy.brand.name}</span><span className="text-[10px] text-[#b7b8a8] mt-2 leading-5">{copy.brand.degree}</span></div></div><p className="text-[#b7b8a8] text-sm leading-7 max-w-sm mb-8">{copy.footer.description}</p><div className="flex items-center flex-wrap gap-2">{copy.footer.regions.map((region) => <button key={region} onClick={() => scrollToSection('quote')} className="px-3 py-1.5 rounded-full border border-[rgba(236,234,216,0.12)] text-xs text-[#b7b8a8] hover:border-[#88a06b] hover:text-[#b8c79c] transition-colors cursor-pointer">{region}</button>)}</div></div>
          <div className="md:col-span-2"><div className="text-xs text-[#88a06b] mb-5">{copy.footer.servicesTitle}</div><ul className="space-y-3 text-sm">{copy.footer.services.map((item) => <li key={item}><button onClick={() => scrollToSection('services')} className="text-start text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer leading-6">{item}</button></li>)}</ul></div>
          <div className="md:col-span-2"><div className="text-xs text-[#88a06b] mb-5">{copy.footer.resourcesTitle}</div><ul className="space-y-3 text-sm">{copy.footer.resources.map((item) => <li key={item.id}><button onClick={() => scrollToSection(item.id)} className="text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer whitespace-nowrap">{item.label}</button></li>)}</ul></div>
          <div className="md:col-span-3"><div className="text-xs text-[#88a06b] mb-5">{copy.footer.activityTitle}</div><ul className="space-y-4 text-sm"><li className="text-[#b7b8a8] flex items-start gap-2 leading-7"><i className="ri-map-pin-line text-[#88a06b] mt-1" /><span>{copy.footer.activity.regions}<br />{copy.footer.activity.visits}</span></li><li className="text-[#b7b8a8] flex items-center gap-2"><i className="ri-graduation-cap-line text-[#88a06b]" />{copy.footer.activity.degree}</li><li className="text-[#b7b8a8] flex items-center gap-2"><i className="ri-microscope-line text-[#88a06b]" />{copy.footer.activity.diagnostics}</li><li className="text-[#b7b8a8] flex items-center gap-2"><i className="ri-seedling-line text-[#88a06b]" />{copy.footer.activity.inputs}</li></ul></div>
        </div>
        <div className="mt-16 pt-8 border-t border-[rgba(236,234,216,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><span className="text-xs text-[#b7b8a8]">{copy.footer.copyright}</span><span className="text-xs text-[#b7b8a8]">{copy.footer.principles}</span></div>
      </div>
    </footer>
  );
}
