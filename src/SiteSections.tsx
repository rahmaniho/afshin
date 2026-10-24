import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

export const navLinks = [
  { id: 'services', label: 'خدمات تخصصی' },
  { id: 'process', label: 'مسیر مشاوره' },
  { id: 'gallery', label: 'پایش میدانی' },
  { id: 'journal', label: 'مقالات' },
];

export function HeaderNav({ progress }: { progress: number }) {
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
        <div
          className="h-full bg-gradient-to-r from-[#88a06b] via-[#b8c79c] to-[#c8a96a] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav
        aria-label="ناوبری اصلی"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0d1410]/85 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="px-6 md:px-12 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group whitespace-nowrap text-right"
            aria-label="بازگشت به ابتدای صفحه"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-full border border-[#88a06b]/40 group-hover:border-[#88a06b] transition-colors shrink-0">
              <i className="ri-leaf-line text-[#88a06b] text-base" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.35rem] text-[#ecead8]">افشین رحمانی</span>
              <span className="text-[10px] text-[#b7b8a8] mt-1.5">کارشناس ارشد گیاهپزشکی</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="text-sm text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer whitespace-nowrap relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 right-0 w-0 h-px bg-[#88a06b] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <button
            onClick={() => goTo('quote')}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b8c79c] text-[#0d1410] font-medium text-sm hover:bg-[#ecead8] transition-all cursor-pointer whitespace-nowrap"
          >
            درخواست مشاوره
            <i className="ri-arrow-left-line" aria-hidden="true" />
          </button>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer text-[#ecead8]"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={menuOpen}
          >
            <i className={`text-2xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`} aria-hidden="true" />
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-[30rem] mt-4' : 'max-h-0'}`}>
          <div className="px-6 pb-6 flex flex-col gap-4 bg-[#0d1410]/95 backdrop-blur-md border-t border-white/5 pt-4">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="text-right font-display text-2xl text-[#ecead8] cursor-pointer whitespace-nowrap hover:text-[#b8c79c] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => goTo('quote')}
              className="mt-2 text-center py-3 rounded-full bg-[#b8c79c] text-[#0d1410] font-medium text-sm"
            >
              درخواست مشاوره تخصصی
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export function HeroSection() {
  return (
    <section id="hero" data-stage="0" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1410]/55" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 text-center pt-32 pb-16 md:pt-24">
        <div
          data-reveal
          data-delay="1"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ecead8]/25 backdrop-blur-sm bg-[#0d1410]/35 mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#88a06b] animate-pulse" />
          <span className="text-xs md:text-sm text-[#ecead8]/90">مهندس افشین رحمانی · کارشناس ارشد گیاهپزشکی</span>
        </div>

        <h1
          data-reveal
          data-delay="2"
          className="hero-title font-display text-[#ecead8] font-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
        >
          مزرعه‌ای سالم
          <br />
          از <em className="text-[#b8c79c] font-normal">تشخیص</em> درست.
        </h1>

        <p
          data-reveal
          data-delay="3"
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-[#ecead8]/95 font-light leading-8 md:leading-9"
        >
          آفات‌شناسی، بیماری‌شناسی و مشاورهٔ تخصصی انواع کود، سم و بذر؛ همراه مزرعه و باغ شما در قزوین، زنجان، البرز و تهران.
        </p>

        <div data-reveal data-delay="3" className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('quote')}
            className="px-7 py-3.5 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm font-medium hover:bg-[#ecead8] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2"
          >
            درخواست مشاوره تخصصی <i className="ri-arrow-left-line" aria-hidden="true" />
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="px-7 py-3.5 rounded-full border border-[#ecead8]/30 text-[#ecead8] text-sm hover:bg-[#ecead8] hover:text-[#0d1410] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 backdrop-blur-sm bg-[#0d1410]/25"
          >
            مشاهدهٔ خدمات
          </button>
        </div>

        <div data-reveal data-delay="4" className="mt-12 md:mt-14 flex flex-col items-center gap-3">
          <span className="text-[11px] text-[#ecead8]/75">کاوش در مزرعه</span>
          <div className="w-px h-14 bg-[#ecead8]/30 relative overflow-hidden" aria-hidden="true">
            <span className="absolute inset-0 bg-[#b8c79c] scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: 'آفات‌شناسی و بیماری‌شناسی',
    desc: 'بررسی علائم روی برگ، ساقه، ریشه و میوه برای تشخیص عامل آسیب و انتخاب راهکار کنترل متناسب با مزرعه یا باغ.',
  },
  {
    title: 'مشاورهٔ کود و سم',
    desc: 'برنامه‌ریزی تغذیه بر اساس نیاز محصول و نتایج آزمون، همراه با توصیهٔ مسئولانهٔ سم بر مبنای تشخیص و برچسب رسمی.',
  },
  {
    title: 'انتخاب بذر و پایش مزرعه',
    desc: 'انتخاب بذر مناسب اقلیم و محصول، ارزیابی استقرار گیاه و پایش مرحله‌به‌مرحله برای تصمیم‌گیری به‌موقع.',
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      data-stage="1"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-[#0d1410]/70 backdrop-blur-[2px]"
    >
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#88a06b]/5 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto">
        <span data-reveal className="inline-block text-xs text-[#88a06b] mb-10">· خدمات تخصصی گیاهپزشکی</span>
        <h2 data-reveal data-delay="1" className="persian-heading font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#ecead8]">
          سلامت محصول اتفاقی نیست؛ نتیجهٔ <em className="text-[#b8c79c]">تشخیص دقیق</em> و{' '}
          <em className="text-[#c8a96a]">مدیریت درست</em> است. از بررسی خاک و بذر تا پایش برگ و میوه، همراه مزرعهٔ شما هستم.
        </h2>
        <div data-reveal data-delay="2" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[#b7b8a8]">
          {services.map((service) => (
            <div key={service.title} className="border-t border-[rgba(236,234,216,0.12)] pt-6">
              <p className="font-display text-[#ecead8]/90 text-2xl mb-3">{service.title}</p>
              <p className="leading-7">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  {
    num: '۰۱',
    title: 'بازدید و نمونه‌برداری',
    desc: 'آغاز کار با بررسی مزرعه یا باغ و ثبت علائم؛ از وضعیت خاک و آبیاری تا الگوی پراکنش آسیب روی گیاه.',
    icon: 'ri-test-tube-line',
  },
  {
    num: '۰۲',
    title: 'تشخیص و تحلیل',
    desc: 'تفکیک آفت، بیماری، کمبود تغذیه‌ای یا تنش محیطی با تکیه بر مشاهدهٔ دقیق و در صورت نیاز، بررسی نمونه.',
    icon: 'ri-search-eye-line',
  },
  {
    num: '۰۳',
    title: 'توصیه و پیگیری',
    desc: 'ارائهٔ برنامهٔ قابل اجرا برای کود، سم، بذر یا اصلاح شرایط رشد و پیگیری نتیجه در مراحل بعدی.',
    icon: 'ri-seedling-line',
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      data-stage="2"
      className="relative py-32 md:py-48 px-6 md:px-12 bg-[#131c16]/80 backdrop-blur-[3px] border-y border-[rgba(236,234,216,0.12)]"
    >
      <div className="max-w-7xl mx-auto">
        <div data-reveal className="flex items-end justify-between flex-wrap gap-6 mb-20">
          <div>
            <span className="text-xs text-[#88a06b] mb-4 block">· مسیر مشاوره</span>
            <h2 className="persian-heading font-display text-4xl md:text-6xl font-light">
              سه گام تا یک <em className="text-[#b8c79c]">مزرعهٔ سالم</em>
            </h2>
          </div>
          <p className="max-w-sm text-[#b7b8a8] text-sm leading-7">
            هر مزرعه شرایط خودش را دارد؛ به همین دلیل توصیه‌ها پس از شناخت محصول، اقلیم و علائم واقعی ارائه می‌شوند، نه با یک نسخهٔ یکسان برای همه.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {processSteps.map((step, idx) => (
            <div
              key={step.num}
              data-reveal
              data-delay={idx + 1}
              className="group relative p-8 md:p-10 rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#0d1410]/40 hover:bg-[#0d1410]/70 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#88a06b]/0 group-hover:bg-[#88a06b]/10 transition-colors duration-700 blur-2xl" />
              <div className="flex items-center justify-between mb-12">
                <span className="font-display text-base text-[#b7b8a8]">{step.num}</span>
                <span className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(236,234,216,0.12)] text-[#88a06b] group-hover:border-[#88a06b] group-hover:rotate-45 transition-all duration-500">
                  <i className={`${step.icon} text-base`} aria-hidden="true" />
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-[#ecead8] mb-4 font-light">{step.title}</h3>
              <p className="text-[#b7b8a8] text-sm leading-7 mb-8">{step.desc}</p>
              <button
                onClick={() => scrollToSection('quote')}
                className="text-xs text-[#b8c79c] hover:text-[#c8a96a] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                درخواست این خدمت
                <i className="ri-arrow-left-line" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const statsData = [
  { num: '۰۴', unit: 'استان تحت پوشش', sub: 'قزوین، زنجان، البرز و تهران' },
  { num: '۰۳', unit: 'حوزهٔ تخصصی', sub: 'کود، سم و بذر' },
  { num: '۰۲', unit: 'نگاه تشخیصی', sub: 'آفات‌شناسی و بیماری‌شناسی' },
  { num: '۰۱', unit: 'برنامه برای هر مزرعه', sub: 'متناسب با محصول و شرایط شما' },
];

export function GalleryPreviewSection({ onViewGallery }: { onViewGallery: () => void }) {
  return (
    <section
      id="gallery"
      data-stage="3"
      className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-[#0d1410]/80 backdrop-blur-[3px]"
    >
      <div className="relative max-w-7xl mx-auto">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs text-[#88a06b] mb-4 block">· تمرکز خدمات</span>
            <h2 className="persian-heading font-display text-4xl md:text-6xl font-light">
              یک تخصص، <em className="text-[#c8a96a]">همراهِ مزرعه</em>
            </h2>
          </div>
          <p className="text-[#b7b8a8] text-sm max-w-xs leading-7">
            معیار من روشن است: تشخیص قابل اتکا، توصیهٔ متناسب با مزرعه و پیگیری نتیجه تا رسیدن به تصمیم درست.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(236,234,216,0.12)] rounded-2xl overflow-hidden border border-[rgba(236,234,216,0.12)]">
          {statsData.map((item, idx) => (
            <div
              key={item.unit}
              data-reveal
              data-delay={idx + 1}
              className="bg-[#0d1410]/80 px-6 py-10 md:py-14 hover:bg-[#131c16] transition-colors group"
            >
              <div className="font-display text-5xl md:text-6xl text-[#ecead8] font-light tabular-nums mb-3 group-hover:text-[#b8c79c] transition-colors">
                {item.num}
              </div>
              <div className="text-sm text-[#ecead8]/80 mb-2">{item.unit}</div>
              <div className="text-xs text-[#b7b8a8] font-light leading-6">{item.sub}</div>
            </div>
          ))}
        </div>

        <div
          data-reveal
          data-delay="5"
          className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-6 p-8 md:p-10 rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#131c16]/40"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#88a06b]/10 border border-[#88a06b]/30 shrink-0">
            <i className="ri-book-open-line text-[#88a06b] text-xl" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-display text-2xl text-[#ecead8] mb-2">پایش میدانی را از نزدیک ببینید</p>
            <p className="text-sm text-[#b7b8a8] leading-7">
              تصاویری از علائم روی برگ، بررسی مزرعه و اجرای کنترل؛ برای آشنایی بهتر با موضوع‌های تشخیص و مراقبت از محصول.
            </p>
          </div>
          <button
            onClick={onViewGallery}
            className="px-6 py-3 rounded-full border border-[#ecead8]/20 text-sm hover:bg-[#ecead8] hover:text-[#0d1410] transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 font-medium"
          >
            مشاهدهٔ گالری <i className="ri-arrow-left-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section data-stage="4" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden bg-[#0d1410]/65 backdrop-blur-[2px]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c8a96a]/[0.04] blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <div data-reveal className="mb-10">
          <i className="ri-double-quotes-r text-5xl text-[#c8a96a]/40" aria-hidden="true" />
        </div>
        <blockquote data-reveal data-delay="1" className="persian-heading font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#ecead8]">
          پیش از هر توصیه باید به زمین و گیاه گوش داد؛ <span className="text-[#b8c79c]">تشخیص درست</span>، نخستین قدم برای کنترل مؤثر و مصرف حساب‌شدهٔ کود و سم است.
        </blockquote>
        <div data-reveal data-delay="2" className="mt-14 flex items-center justify-center gap-4">
          <span className="w-12 h-12 rounded-full border border-[#88a06b]/40 bg-[#88a06b]/10 flex items-center justify-center shrink-0">
            <i className="ri-leaf-line text-[#b8c79c] text-xl" aria-hidden="true" />
          </span>
          <div className="text-right">
            <div className="text-sm text-[#ecead8] font-medium">مهندس افشین رحمانی</div>
            <div className="text-xs text-[#b7b8a8] mt-1">کارشناس ارشد گیاهپزشکی · مشاور مزرعه و باغ</div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ArticleBlock =
  | { type: 'heading' | 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

interface JournalArticle {
  date: string;
  cat: string;
  title: string;
  excerpt: string;
  img: string;
  readTime: string;
  content: ArticleBlock[];
}

const journalArticles: JournalArticle[] = [
  {
    date: '۱۸ مهر ۱۴۰۵',
    cat: 'بیماری‌شناسی',
    title: 'زردی برگ؛ کمبود غذایی است یا بیماری؟',
    excerpt: 'زردی برگ یک علامت است، نه یک تشخیص. الگوی پراکنش، سن برگ و شرایط ریشه می‌توانند مسیر بررسی را روشن کنند.',
    img: '/images/leaf-disease.webp',
    readTime: '۵ دقیقه',
    content: [
      { type: 'paragraph', text: 'زردی برگ یکی از رایج‌ترین علائمی است که در مزرعه و باغ دیده می‌شود؛ اما علت آن همیشه کمبود کود نیست. آفت، بیماری، آسیب ریشه، آب‌گرفتگی و حتی واکنش به برخی سموم نیز می‌توانند علائم مشابه ایجاد کنند.' },
      { type: 'heading', text: 'الگوی علائم را بخوانید' },
      { type: 'list', items: ['زردی یکنواخت برگ‌های مسن‌تر می‌تواند با کمبود برخی عناصر پرمصرف مرتبط باشد.', 'سبز ماندن رگبرگ و زردی فاصلهٔ رگبرگ‌ها در برگ‌های جوان، نیاز به بررسی وضعیت آهن و شرایط خاک را مطرح می‌کند.', 'لکهٔ مشخص، هالهٔ رنگی، رشد قارچی یا له شدگی بافت، باید بیشتر در جهت بیماری یا آسیب موضعی بررسی شود.'] },
      { type: 'heading', text: 'از علامت تا تشخیص' },
      { type: 'paragraph', text: 'پیش از هر اقدام، چند بوتهٔ سالم و چند بوتهٔ دارای علامت را از نظر سن برگ، رطوبت خاک، وضعیت ریشه و سابقهٔ کوددهی و سم‌پاشی مقایسه کنید. پراکنش علائم در کل مزرعه نیز اطلاعات مهمی می‌دهد؛ پراکنش نواری یا یکنواخت معمولاً منشأ متفاوتی با لکه‌های پراکنده دارد.' },
      { type: 'paragraph', text: 'نتیجهٔ آزمون خاک یا برگ و بررسی دقیق نمونه، مبنای مطمئن‌تری برای تصمیم است. کوددهی یا سم‌پاشی صرفاً بر اساس یک عکس ممکن است علت اصلی را پنهان کند.' },
    ],
  },
  {
    date: '۲۹ شهریور ۱۴۰۵',
    cat: 'آفات‌شناسی',
    title: 'پایش آفات؛ چرا شمارش مهم‌تر از حدس است؟',
    excerpt: 'کنترل اصولی از بازدید منظم و ثبت جمعیت آفت آغاز می‌شود؛ نه از دیدن چند حشره و تصمیم‌گیری عجولانه برای سم‌پاشی.',
    img: '/images/wheat-inspection.webp',
    readTime: '۶ دقیقه',
    content: [
      { type: 'paragraph', text: 'پایش یعنی دیدن، شمارش و ثبت تغییرات. حضور یک آفت به‌تنهایی دلیل کافی برای مداخلهٔ شیمیایی نیست؛ باید شدت جمعیت، مرحلهٔ رشد محصول، وجود دشمنان طبیعی و شرایط هوا را نیز در نظر گرفت.' },
      { type: 'heading', text: 'یک مسیر ثابت برای بازدید' },
      { type: 'list', items: ['از چند نقطهٔ مشخص و پراکنده در مزرعه نمونه بگیرید، نه فقط از حاشیه.', 'روی و زیر برگ، شاخه‌های جوان و در صورت نیاز ریشه را بررسی کنید.', 'تعداد آفت، درصد گیاهان آلوده و حضور شکارچیان و پارازیتوئیدها را با تاریخ ثبت کنید.', 'عکس‌ها را از زاویه و فاصلهٔ مشابه بگیرید تا مقایسهٔ هفتگی ممکن باشد.'] },
      { type: 'heading', text: 'تصمیم بر اساس آستانه' },
      { type: 'paragraph', text: 'آستانهٔ اقدام برای هر آفت و محصول متفاوت است و باید از منابع معتبر محلی و توصیهٔ متخصص به دست آید. مقایسهٔ اعداد ثبت‌شده در بازدیدهای متوالی نشان می‌دهد جمعیت در حال افزایش است یا شرایط طبیعی آن را کنترل می‌کند.' },
      { type: 'paragraph', text: 'این روش به کاهش مداخلات غیرضروری، حفظ دشمنان طبیعی و انتخاب زمان مؤثرتر برای کنترل کمک می‌کند.' },
    ],
  },
  {
    date: '۱۲ شهریور ۱۴۰۵',
    cat: 'بذر و اقلیم',
    title: 'انتخاب بذر مناسب در اقلیم قزوین و زنجان',
    excerpt: 'رقم مناسب فقط رقم پرمحصول نیست؛ طول دورهٔ رشد، سازگاری با سرما، کیفیت بذر و هدف کاشت نیز تعیین‌کننده‌اند.',
    img: '/images/wheat-seed.webp',
    readTime: '۵ دقیقه',
    content: [
      { type: 'paragraph', text: 'در مناطق سرد و نیمه‌سرد، انتخاب رقم باید با تاریخ کاشت، منابع آب، احتمال سرمای پایان زمستان و دورهٔ رسیدن هماهنگ باشد. عملکرد ثبت‌شدهٔ یک رقم در منطقه‌ای دیگر، تضمین نتیجهٔ مشابه در مزرعهٔ شما نیست.' },
      { type: 'heading', text: 'پیش از خرید بذر' },
      { type: 'list', items: ['به بذر گواهی‌شده، برچسب، شمارهٔ بچ و اطلاعات خلوص و جوانه‌زنی توجه کنید.', 'سابقهٔ بیماری‌های مزرعه و واکنش رقم به بیماری‌های مهم منطقه را بررسی کنید.', 'تاریخ کاشت و طول دورهٔ رشد را با شرایط آب و هوایی و برنامهٔ آبیاری تطبیق دهید.', 'منشأ بذر و شرایط نگهداری آن را از فروشندهٔ معتبر بپرسید.'] },
      { type: 'heading', text: 'از کاشت تا استقرار' },
      { type: 'paragraph', text: 'کیفیت بستر، عمق کاشت و رطوبت مناسب در استقرار اولیه نقش مهمی دارند. پس از سبز شدن، تراکم و یکنواختی بوته‌ها را در چند نقطه بررسی کنید؛ این اطلاعات برای ادامهٔ برنامهٔ تغذیه و پایش نیز مفید است.' },
    ],
  },
  {
    date: '۲۷ مرداد ۱۴۰۵',
    cat: 'پایش باغ',
    title: 'پایش باغ در چهار فصل؛ از خواب زمستانی تا برداشت',
    excerpt: 'یک تقویم منظم برای بازدید باغ، باعث می‌شود علائم آفات و بیماری‌ها پیش از گسترش دیده شوند و اقدام‌ها به‌موقع انجام شوند.',
    img: '/images/orchard-monitoring.webp',
    readTime: '۷ دقیقه',
    content: [
      { type: 'paragraph', text: 'پایش باغ فقط به فصل سبزی محدود نمی‌شود. در خواب زمستانی می‌توان وضعیت شاخه‌ها، زخم‌ها و محل‌های احتمالی استقرار آفات را بررسی کرد و در فصل رشد، تغییرات جمعیت و علائم را دنبال نمود.' },
      { type: 'heading', text: 'نکات هر مرحله' },
      { type: 'list', items: ['پیش از باز شدن جوانه: بررسی شاخه، تنه و سوابق آسیب سال قبل.', 'جوانه‌زنی و گل‌دهی: ثبت شرایط هوا و بازدید حساس از بافت‌های جوان.', 'رشد میوه: پایش آفات، تنش آبی و علائم تغذیه‌ای بدون مداخلهٔ عجولانه.', 'برداشت و پس از آن: ثبت کیفیت محصول، علائم انباری و آماده‌سازی برنامهٔ فصل بعد.'] },
      { type: 'paragraph', text: 'در باغ‌های البرز، تهران، قزوین و زنجان، نوع محصول و شرایط هر باغ تعیین‌کنندهٔ زمان دقیق بازدید است. ثبت تاریخ و مکان علائم، الگوی تغییرات را از سالی به سال دیگر روشن‌تر می‌کند.' },
    ],
  },
  {
    date: '۰۹ تیر ۱۴۰۵',
    cat: 'مدیریت کنترل',
    title: 'سم‌پاشی اصولی و مدیریت مقاومت آفات',
    excerpt: 'انتخاب درست هدف، رعایت برچسب، تجهیزات ایمن و چرخش گروه‌های شیمیایی از اصول مهم یک برنامهٔ مسئولانه است.',
    img: '/images/crop-spraying.webp',
    readTime: '۶ دقیقه',
    content: [
      { type: 'paragraph', text: 'سم ابزار کنترل است، نه جایگزین تشخیص. پیش از هر اقدام باید آفت یا عامل بیماری مشخص باشد و محصول ثبت‌شده برای همان محصول و هدف انتخاب شود. دوز، زمان، فاصلهٔ پیش از برداشت و تجهیزات حفاظت فردی باید دقیقاً از برچسب رسمی دنبال شوند.' },
      { type: 'heading', text: 'چرا مقاومت ایجاد می‌شود؟' },
      { type: 'paragraph', text: 'تکرار مداوم سموم با سازوکار اثر یکسان، جمعیت‌های مقاوم را غربال می‌کند. استفادهٔ غیرضروری و دوز نادرست نیز می‌تواند کنترل را دشوارتر و دشمنان طبیعی را آسیب‌پذیر کند.' },
      { type: 'heading', text: 'اصول کاهش خطر' },
      { type: 'list', items: ['از روش‌های زراعی، زیستی و فیزیکی در کنار کنترل شیمیایی استفاده کنید.', 'گروه سازوکار اثر را طبق برچسب و دستورالعمل‌های معتبر مدیریت کنید.', 'از اختلاط‌های خودسرانه و افزایش دوز برای گرفتن نتیجهٔ سریع‌تر پرهیز کنید.', 'شرایط باد، دما، کالیبراسیون دستگاه و ایمنی افراد را پیش از اجرا بررسی کنید.'] },
      { type: 'paragraph', text: 'این مطلب جای برچسب سم، مقررات ملی یا توصیهٔ حضوری متخصص را نمی‌گیرد.' },
    ],
  },
  {
    date: '۲۱ خرداد ۱۴۰۵',
    cat: 'بیماری‌شناسی',
    title: 'بیماری‌های زنگ را چگونه زودتر شناسایی کنیم؟',
    excerpt: 'پوسته‌های رنگی روی برگ و ساقه می‌توانند نشانهٔ بیماری زنگ باشند؛ تشخیص به‌موقع به انتخاب راهکار مناسب کمک می‌کند.',
    img: '/images/leaf-rust.webp',
    readTime: '۴ دقیقه',
    content: [
      { type: 'paragraph', text: 'عامل بیماری‌های زنگ قارچ است و علائم آن اغلب به شکل پوسته‌ها یا لکه‌های زرد، نارنجی، قهوه‌ای یا سیاه روی بافت گیاه ظاهر می‌شود. ظاهر علائم بسته به گیاه میزبان و مرحلهٔ بیماری تفاوت دارد.' },
      { type: 'heading', text: 'چه چیزهایی را ثبت کنیم؟' },
      { type: 'list', items: ['محل دقیق پوسته‌ها روی روی یا پشت برگ و ساقه.', 'رنگ علائم و تغییر آن در چند روز.', 'درصد برگ‌های آلوده و شیوع علائم در مزرعه.', 'رطوبت، شب‌نم و شرایط دمایی همراه با گسترش علائم.'] },
      { type: 'paragraph', text: 'نمونه‌برداری از بافت دارای علائم تازه و بررسی تخصصی می‌تواند تشخیص را دقیق‌تر کند. انتخاب رقم، زمان کاشت، وضعیت تراکم و مدیریت رطوبت نیز در برنامهٔ کلی کنترل اهمیت دارند.' },
    ],
  },
];

function ArticleModal({ article, onClose }: { article: JournalArticle; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-0 md:p-8" role="dialog" aria-modal="true" aria-labelledby="article-title">
      <div className="absolute inset-0 bg-[#0d1410]/95 backdrop-blur-lg" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[92vh] overflow-y-auto rounded-none md:rounded-3xl border border-[rgba(236,234,216,0.12)] bg-[#131c16] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-[#0d1410]/85 border border-[#ecead8]/20 text-[#ecead8] hover:bg-[#ecead8] hover:text-[#0d1410] transition-all cursor-pointer backdrop-blur-md"
          aria-label="بستن مقاله"
        >
          <i className="ri-close-line text-xl" aria-hidden="true" />
        </button>
        <div className="relative aspect-[16/9] md:aspect-[16/7] overflow-hidden bg-[#0d1410]">
          <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131c16] via-transparent to-transparent" />
        </div>
        <div className="px-6 md:px-14 lg:px-20 pb-12 md:pb-16 pt-8 md:pt-10">
          <div className="flex items-center flex-wrap gap-3 text-xs text-[#b7b8a8] mb-5">
            <span className="text-[#88a06b]">{article.cat}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" />
            <span>{article.date}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" />
            <span>{article.readTime} مطالعه</span>
          </div>
          <h2 id="article-title" className="persian-heading font-display text-4xl md:text-5xl text-[#ecead8] font-light mb-7">{article.title}</h2>
          <p className="text-[#b8c79c] text-base md:text-lg leading-8 pb-7 mb-7 border-b border-[rgba(236,234,216,0.12)]">{article.excerpt}</p>
          <div className="article-body">
            {article.content.map((block, index) => {
              if (block.type === 'list') {
                return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
              }
              if (block.type === 'heading') return <h3 key={index}>{block.text}</h3>;
              return <p key={index}>{block.text}</p>;
            })}
          </div>
          <div className="mt-10 p-5 md:p-6 rounded-2xl border border-[#88a06b]/25 bg-[#88a06b]/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-sm text-[#b7b8a8] leading-7">در مزرعه یا باغ شما علامت مشابهی دیده می‌شود؟ برای بررسی دقیق‌تر، جزئیات محصول و علائم را ثبت کنید.</p>
            <button
              onClick={() => { onClose(); window.setTimeout(() => scrollToSection('quote'), 100); }}
              className="px-5 py-3 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm font-medium hover:bg-[#ecead8] transition-colors whitespace-nowrap cursor-pointer"
            >
              درخواست بررسی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JournalSection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const visibleArticles = showAll ? journalArticles : journalArticles.slice(0, 3);

  return (
    <section id="journal" className="relative py-32 md:py-48 px-6 md:px-12 bg-[#131c16]/85 backdrop-blur-[3px] border-y border-[rgba(236,234,216,0.12)]">
      <div className="max-w-7xl mx-auto">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs text-[#88a06b] mb-4 block">· نشریهٔ میدانی گیاهپزشکی</span>
            <h2 className="persian-heading font-display text-4xl md:text-6xl font-light">یادداشت‌هایی از <em className="text-[#b8c79c]">دل مزرعه</em></h2>
          </div>
          <button
            onClick={() => setShowAll((value) => !value)}
            className="text-sm text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap self-start md:self-auto"
            aria-expanded={showAll}
          >
            {showAll ? 'نمایش مقالات منتخب' : 'همهٔ مقالات'}
            <i className={showAll ? 'ri-arrow-up-line' : 'ri-arrow-left-up-line'} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8">
          {visibleArticles.map((article, idx) => (
            <article key={article.title} data-reveal={idx < 3 ? '' : undefined} data-delay={idx < 3 ? idx + 1 : undefined} className="group">
              <button onClick={() => setSelectedArticle(article)} className="w-full text-right cursor-pointer" aria-label={`مطالعهٔ ${article.title}`}>
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[rgba(236,234,216,0.12)] mb-6 bg-[#0d1410]">
                  <img src={article.img} alt={article.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                </div>
                <div className="flex items-center flex-wrap gap-3 text-xs text-[#b7b8a8] mb-3">
                  <span className="text-[#88a06b]">{article.cat}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" />
                  <span>{article.date}</span><span className="w-1 h-1 rounded-full bg-[#b7b8a8]/40" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="persian-heading font-display text-2xl md:text-3xl text-[#ecead8] mb-3 group-hover:text-[#b8c79c] transition-colors">{article.title}</h3>
                <p className="text-sm text-[#b7b8a8] leading-7">{article.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs text-[#b8c79c]">ادامهٔ مطلب <i className="ri-arrow-left-line" aria-hidden="true" /></span>
              </button>
            </article>
          ))}
        </div>
      </div>
      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </section>
  );
}

interface QuoteForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  project: string;
  size: string;
  timeline: string;
  notes: string;
}

const emptyForm: QuoteForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  project: 'تشخیص آفت یا بیماری',
  size: 'کمتر از ۱ هکتار',
  timeline: 'در یک ماه آینده',
  notes: '',
};

const inputClass = 'w-full bg-[#131c16] border border-[rgba(236,234,216,0.12)] rounded-lg px-4 py-3 text-sm text-[#ecead8] placeholder:text-[#b7b8a8]/45 focus:outline-none focus:border-[#b8c79c] transition-colors';
const labelClass = 'block text-xs text-[#b7b8a8] mb-2';

export function QuoteSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [form, setForm] = useState<QuoteForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'email', string>>>({});

  const updateField = (key: keyof QuoteForm, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (key === 'name' || key === 'phone' || key === 'email') {
      setErrors((previous) => ({ ...previous, [key]: undefined }));
    }
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    const normalizedPhone = toEnglishDigits(form.phone)
      .replace(/[\s()\-]/g, '')
      .replace(/^\+98/, '0')
      .replace(/^98/, '0');

    if (form.name.trim().length < 3) nextErrors.name = 'نام و نام خانوادگی را کامل وارد کنید.';
    if (!/^0\d{10}$/.test(normalizedPhone)) nextErrors.phone = 'شمارهٔ تماس را با پیش‌شماره و به‌صورت ۱۱ رقم وارد کنید.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'قالب ایمیل صحیح نیست.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus('loading');
    await new Promise((resolve) => window.setTimeout(resolve, 550));

    try {
      const previousRequests = JSON.parse(localStorage.getItem('afshin-consultation-requests') || '[]') as unknown[];
      const request = { ...form, phone: normalizedPhone, id: `AR-${Date.now()}`, createdAt: new Date().toISOString() };
      localStorage.setItem('afshin-consultation-requests', JSON.stringify([...previousRequests, request]));
      setStatus('ok');
      setForm(emptyForm);
    } catch {
      setStatus('err');
    }
  };

  return (
    <section id="quote" data-stage="5" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1410]/30 via-[#0d1410]/15 to-[#0d1410]/60" />
      </div>
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span data-reveal className="inline-block text-xs text-[#88a06b] mb-5">· درخواست مشاوره و بازدید</span>
          <h2 data-reveal data-delay="1" className="persian-heading font-display text-5xl md:text-7xl lg:text-8xl font-light text-[#ecead8]">
            برای سلامت مزرعه‌تان
            <br />
            <em className="text-[#c8a96a]">گفت‌وگو را آغاز کنیم</em>
          </h2>
          <p data-reveal data-delay="2" className="mt-8 text-base md:text-lg text-[#ecead8]/85 max-w-xl mx-auto leading-8">
            محصول، منطقه و علائم را بنویسید. هرچه توضیح دقیق‌تر باشد، مسیر بررسی اولیه روشن‌تر خواهد بود.
          </p>
        </div>

        <form
          data-reveal
          data-delay="3"
          id="quote-form-afshin"
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-10 rounded-3xl border border-[rgba(236,234,216,0.12)] bg-[#0d1410]/75 backdrop-blur-xl"
        >
          <div>
            <label htmlFor="quote-name" className={labelClass}>نام و نام خانوادگی *</label>
            <input id="quote-name" required type="text" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} className={inputClass} placeholder="نام شما" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
            {errors.name && <p id="name-error" className="mt-2 text-xs text-[#e4aa96]">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="quote-phone" className={labelClass}>شمارهٔ تماس *</label>
            <input id="quote-phone" required type="tel" name="phone" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className={`${inputClass} ltr-input`} placeholder="0912 123 4567" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
            {errors.phone && <p id="phone-error" className="mt-2 text-xs text-[#e4aa96]">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="quote-email" className={labelClass}>ایمیل (اختیاری)</label>
            <input id="quote-email" type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className={`${inputClass} ltr-input`} placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <p id="email-error" className="mt-2 text-xs text-[#e4aa96]">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="quote-address" className={labelClass}>استان و شهر</label>
            <input id="quote-address" type="text" name="address" autoComplete="address-level1" value={form.address} onChange={(event) => updateField('address', event.target.value)} className={inputClass} placeholder="مثلاً قزوین، آبیک" />
          </div>
          <div>
            <label htmlFor="quote-project" className={labelClass}>نوع درخواست</label>
            <div className="relative">
              <select id="quote-project" name="project" value={form.project} onChange={(event) => updateField('project', event.target.value)} className={`${inputClass} appearance-none pl-10 cursor-pointer`}>
                <option>تشخیص آفت یا بیماری</option><option>برنامهٔ کود و تغذیه</option><option>مشاورهٔ سم و کنترل</option><option>انتخاب بذر</option><option>بازدید و پایش مزرعه یا باغ</option>
              </select>
              <i className="ri-arrow-down-s-line absolute left-3 top-1/2 -translate-y-1/2 text-[#b7b8a8] pointer-events-none" aria-hidden="true" />
            </div>
          </div>
          <div>
            <label htmlFor="quote-size" className={labelClass}>وسعت تقریبی</label>
            <div className="relative">
              <select id="quote-size" name="size" value={form.size} onChange={(event) => updateField('size', event.target.value)} className={`${inputClass} appearance-none pl-10 cursor-pointer`}>
                <option>کمتر از ۱ هکتار</option><option>۱ تا ۵ هکتار</option><option>۵ تا ۲۰ هکتار</option><option>بیشتر از ۲۰ هکتار</option><option>باغ یا گلخانهٔ کوچک</option>
              </select>
              <i className="ri-arrow-down-s-line absolute left-3 top-1/2 -translate-y-1/2 text-[#b7b8a8] pointer-events-none" aria-hidden="true" />
            </div>
          </div>
          <div className="md:col-span-2">
            <span className={labelClass}>زمان مناسب برای شروع</span>
            <div className="flex flex-wrap gap-2">
              {['هرچه زودتر', 'در یک ماه آینده', 'در فصل جاری', 'فعلاً برنامه‌ریزی می‌کنم'].map((item) => (
                <button type="button" key={item} onClick={() => updateField('timeline', item)} aria-pressed={form.timeline === item} className={`px-4 py-2 rounded-full border text-xs transition-all cursor-pointer whitespace-nowrap ${form.timeline === item ? 'bg-[#b8c79c] text-[#0d1410] border-[#b8c79c] font-medium' : 'border-[rgba(236,234,216,0.12)] text-[#b7b8a8] hover:border-[#b8c79c] hover:text-[#ecead8]'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="quote-notes" className={labelClass}>محصول و علائم را شرح دهید</label>
            <textarea id="quote-notes" name="notes" value={form.notes} onChange={(event) => updateField('notes', event.target.value.slice(0, 500))} maxLength={500} rows={4} className={`${inputClass} resize-none leading-7`} placeholder="نام محصول، سن گیاه، محل علائم و زمان شروع آن‌ها…" />
            <div className="mt-1 text-left text-[10px] text-[#b7b8a8] tabular-nums">{toPersianDigits(form.notes.length)}/۵۰۰</div>
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <p className="text-xs text-[#b7b8a8]/85 flex items-start gap-2 leading-6">
              <i className="ri-shield-check-line text-[#88a06b] mt-1" aria-hidden="true" />
              <span>اطلاعات شما محرمانه است.<br />در این نسخه، درخواست فقط در مرورگر شما ذخیره می‌شود.</span>
            </p>
            <button type="submit" disabled={status === 'loading'} className="px-7 py-3.5 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm font-medium hover:bg-[#ecead8] transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {status === 'loading' ? <><i className="ri-loader-4-line animate-spin" /> در حال ثبت…</> : status === 'ok' ? <><i className="ri-check-line" /> درخواست ثبت شد</> : status === 'err' ? <><i className="ri-error-warning-line" /> تلاش دوباره</> : <>ثبت درخواست مشاوره <i className="ri-arrow-left-line" /></>}
            </button>
          </div>
          <div className="md:col-span-2 min-h-5" aria-live="polite">
            {status === 'ok' && <p className="text-sm text-[#b8c79c]">درخواست شما با موفقیت در این مرورگر ذخیره شد.</p>}
            {status === 'err' && <p className="text-sm text-[#e4aa96]">ذخیره‌سازی در مرورگر ممکن نبود؛ لطفاً دسترسی ذخیره‌سازی را بررسی و دوباره تلاش کنید.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

export function FooterSection() {
  const serviceItems = ['آفات و بیماری‌شناسی', 'مشاورهٔ کود و سم', 'انتخاب بذر', 'پایش مزرعه و باغ'];
  const resources = [
    { label: 'گالری پایش میدانی', id: 'gallery' },
    { label: 'مسیر مشاوره', id: 'process' },
    { label: 'مقالات تخصصی', id: 'journal' },
    { label: 'درخواست بازدید', id: 'quote' },
  ];

  return (
    <footer className="relative bg-[#1a2418] border-t border-[rgba(236,234,216,0.12)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 flex items-center justify-center rounded-full border border-[#88a06b]/40"><i className="ri-leaf-line text-[#88a06b]" /></span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-3xl text-[#ecead8]">افشین رحمانی</span>
                <span className="text-[10px] text-[#b7b8a8] mt-2">کارشناس ارشد گیاهپزشکی</span>
              </div>
            </div>
            <p className="text-[#b7b8a8] text-sm leading-7 max-w-sm mb-8">
              مشاورهٔ تخصصی آفات‌شناسی، بیماری‌شناسی و انتخاب کود، سم و بذر؛ با تمرکز بر تشخیص دقیق و راهکار متناسب با شرایط هر مزرعه و باغ.
            </p>
            <div className="flex items-center flex-wrap gap-2">
              {['قزوین', 'زنجان', 'البرز', 'تهران'].map((region) => (
                <button key={region} onClick={() => scrollToSection('quote')} className="px-3 py-1.5 rounded-full border border-[rgba(236,234,216,0.12)] text-xs text-[#b7b8a8] hover:border-[#88a06b] hover:text-[#b8c79c] transition-colors cursor-pointer">
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs text-[#88a06b] mb-5">خدمات</div>
            <ul className="space-y-3 text-sm">
              {serviceItems.map((item) => <li key={item}><button onClick={() => scrollToSection('services')} className="text-right text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer leading-6">{item}</button></li>)}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-[#88a06b] mb-5">دسترسی سریع</div>
            <ul className="space-y-3 text-sm">
              {resources.map((item) => <li key={item.id}><button onClick={() => scrollToSection(item.id)} className="text-[#b7b8a8] hover:text-[#ecead8] transition-colors cursor-pointer whitespace-nowrap">{item.label}</button></li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs text-[#88a06b] mb-5">حوزهٔ فعالیت</div>
            <ul className="space-y-4 text-sm">
              <li className="text-[#b7b8a8] flex items-start gap-2 leading-7"><i className="ri-map-pin-line text-[#88a06b] mt-1" /><span>قزوین، زنجان، البرز و تهران<br />بازدید با هماهنگی قبلی</span></li>
              <li className="text-[#b7b8a8] flex items-center gap-2"><i className="ri-graduation-cap-line text-[#88a06b]" /> کارشناسی ارشد گیاهپزشکی</li>
              <li className="text-[#b7b8a8] flex items-center gap-2"><i className="ri-microscope-line text-[#88a06b]" /> آفات‌شناسی و بیماری‌شناسی</li>
              <li className="text-[#b7b8a8] flex items-center gap-2"><i className="ri-seedling-line text-[#88a06b]" /> مشاورهٔ انواع کود، سم و بذر</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[rgba(236,234,216,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs text-[#b7b8a8]">© ۱۴۰۵ مهندس افشین رحمانی · تمامی حقوق محفوظ است.</span>
          <span className="text-xs text-[#b7b8a8]">تشخیص علمی · توصیهٔ مسئولانه · پیگیری میدانی</span>
        </div>
      </div>
    </footer>
  );
}
