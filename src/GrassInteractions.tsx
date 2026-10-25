import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useLanguage } from './i18n';
import type { GrassParams } from './GrassComponents';
import { useBodyScrollLock, useDialogFocus } from './useOverlay';

type ControlKey = 'windStrength' | 'windSpeed' | 'mouseRadius' | 'fogDensity';

const controlFields: { key: ControlKey; min: number; max: number; step: number }[] = [
  { key: 'windStrength', min: 0, max: 1.5, step: 0.01 },
  { key: 'windSpeed', min: 0, max: 3, step: 0.01 },
  { key: 'mouseRadius', min: 0, max: 6, step: 0.05 },
  { key: 'fogDensity', min: 0, max: 0.06, step: 0.001 },
];

export function FieldControls({ paramsRef }: { paramsRef: RefObject<GrassParams> }) {
  const { copy, formatNumber } = useLanguage();
  const [open, setOpen] = useState(false);
  const [, setTick] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => setTick((value) => value + 1), 250);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const updateParam = (key: ControlKey, value: number) => {
    paramsRef.current[key] = value;
    setTick((tick) => tick + 1);
  };

  const stageLabel = copy.controls.stage
    .replace('{current}', formatNumber(paramsRef.current.stage + 1))
    .replace('{total}', formatNumber(7));

  return (
    <>
      <button
        ref={toggleRef}
        onClick={() => setOpen((previous) => !previous)}
        aria-label={copy.controls.settings}
        aria-expanded={open}
        aria-controls="field-controls-panel"
        className="fixed bottom-6 right-6 z-[70] w-12 h-12 flex items-center justify-center rounded-full bg-[#0d1410]/80 backdrop-blur-md border border-[rgba(236,234,216,0.12)] text-[#ecead8] hover:text-[#b8c79c] hover:border-[#b8c79c] transition-colors cursor-pointer"
      >
        <i className={`text-lg ${open ? 'ri-close-line' : 'ri-settings-3-line'}`} aria-hidden="true" />
      </button>

      <div id="field-controls-panel" role="region" aria-label={copy.controls.title} inert={!open} className={`fixed bottom-24 right-6 z-[70] w-80 max-w-[calc(100vw-3rem)] max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#0d1410]/90 backdrop-blur-xl p-6 transition-all duration-300 origin-bottom-right ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`} aria-hidden={!open}>
        <div className="flex items-center justify-between mb-5">
          <div><div className="font-display text-lg text-[#ecead8]">{copy.controls.title}</div><div className="text-[10px] text-[#b7b8a8] mt-1">{stageLabel}</div></div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full border border-[#88a06b]/40 text-[#88a06b]"><i className="ri-leaf-line text-sm" aria-hidden="true" /></span>
        </div>
        <div className="space-y-5">
          {controlFields.map((field) => {
            const value = paramsRef.current[field.key];
            const digits = field.step < 0.01 ? 3 : 2;
            return (
              <div key={field.key}>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={`field-${field.key}`} className="text-xs text-[#b7b8a8]">{copy.controls[field.key]}</label>
                  <span className="text-xs text-[#b8c79c] tabular-nums">{formatNumber(value, { minimumFractionDigits: digits, maximumFractionDigits: digits })}</span>
                </div>
                <input id={`field-${field.key}`} type="range" min={field.min} max={field.max} step={field.step} value={value} onChange={(event) => updateParam(field.key, parseFloat(event.target.value))} className="w-full h-1 rounded-full bg-[rgba(236,234,216,0.12)] accent-[#b8c79c] cursor-pointer" />
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-5 border-t border-[rgba(236,234,216,0.12)] text-[11px] text-[#b7b8a8] leading-6"><i className="ri-information-line text-[#88a06b] me-1" aria-hidden="true" />{copy.controls.hint}</div>
      </div>
    </>
  );
}

export function GalleryModal({ open, onClose, onQuote }: { open: boolean; onClose: () => void; onQuote: () => void }) {
  const { copy, formatNumber, arrowIcon } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const galleryProjects = copy.gallery.items;
  const filtered = filter === 'all' ? galleryProjects : galleryProjects.filter((project) => project.category === filter);
  const activeProject = galleryProjects.find((project) => project.id === activeId) ?? null;
  const activeIndex = activeProject ? galleryProjects.findIndex((project) => project.id === activeProject.id) : -1;
  const categoryMap = new Map<string, string>();
  galleryProjects.forEach((project) => { if (!categoryMap.has(project.category)) categoryMap.set(project.category, project.type); });
  const galleryCategories = [{ id: 'all', label: copy.gallery.all }, ...Array.from(categoryMap, ([id, label]) => ({ id, label }))];

  const handleClose = useCallback(() => { setActiveId(null); onClose(); }, [onClose]);
  const handleNext = useCallback(() => {
    if (activeIndex >= 0) setActiveId(galleryProjects[(activeIndex + 1) % galleryProjects.length].id);
  }, [activeIndex, galleryProjects]);
  const handlePrev = useCallback(() => {
    if (activeIndex >= 0) setActiveId(galleryProjects[(activeIndex - 1 + galleryProjects.length) % galleryProjects.length].id);
  }, [activeIndex, galleryProjects]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { if (activeId) setActiveId(null); else handleClose(); }
      if (event.key === 'ArrowRight' && activeId) handleNext();
      if (event.key === 'ArrowLeft' && activeId) handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, activeId, handleNext, handlePrev, handleClose]);

  useBodyScrollLock(open);
  useDialogFocus(open, dialogRef);
  useDialogFocus(open && Boolean(activeProject), lightboxRef);

  if (!open) return null;

  return (
    <div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-[80] flex items-stretch justify-center" role="dialog" aria-modal="true" aria-label={copy.gallery.dialogLabel}>
      <div className="absolute inset-0 bg-[#0d1410]/90 backdrop-blur-md" onClick={handleClose} />
      <div inert={Boolean(activeProject)} className="relative w-full h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <span className="text-xs text-[#88a06b] mb-3 block">{copy.gallery.eyebrow}</span>
              <h2 className="persian-heading font-display text-4xl md:text-6xl font-light text-[#ecead8]">{copy.gallery.titleA} <em className="text-[#c8a96a]">{copy.gallery.highlight}</em></h2>
              <p className="text-[#b7b8a8] text-sm md:text-base max-w-xl mt-4 leading-8">{copy.gallery.description}</p>
            </div>
            <button data-dialog-initial-focus onClick={handleClose} className="self-start md:self-end w-11 h-11 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer" aria-label={copy.gallery.close}><i className="ri-close-line text-xl" aria-hidden="true" /></button>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {galleryCategories.map((category) => (
              <button key={category.id} onClick={() => setFilter(category.id)} aria-pressed={category.id === filter} className={`px-4 py-2 rounded-full text-xs whitespace-nowrap cursor-pointer transition-all border ${category.id === filter ? 'bg-[#ecead8] text-[#0d1410] border-[#ecead8]' : 'border-[#ecead8]/15 text-[#b7b8a8] hover:text-[#ecead8] hover:border-[#ecead8]/40'}`}>{category.label}</button>
            ))}
          </div>

          {filtered.length === 0 ? <div className="py-24 text-center text-[#b7b8a8] text-sm">{copy.gallery.empty}</div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((item) => (
                <button key={item.id} onClick={() => setActiveId(item.id)} className="group text-start rounded-2xl overflow-hidden border border-[rgba(236,234,216,0.12)] bg-[#131c16]/60 hover:border-[#88a06b]/40 transition-all cursor-pointer">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0d1410]">
                    <img src={item.image} alt={`${item.title} — ${item.type}`} title={item.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                    <div className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-[#0d1410]/80 backdrop-blur-sm text-[10px] text-[#ecead8]/90 border border-white/10">{item.season}</div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] text-[#88a06b] mb-2">{item.type}</div>
                    <h4 className="persian-heading font-display text-2xl text-[#ecead8] mb-1">{item.title}</h4>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#b7b8a8] mt-3"><span className="inline-flex items-center gap-1.5"><i className="ri-map-pin-line" aria-hidden="true" />{item.location}</span><span className="tabular-nums text-end">{item.sqft}</span></div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-14 md:mt-20 flex flex-col md:flex-row items-start md:items-center gap-5 p-6 md:p-8 rounded-2xl border border-[rgba(236,234,216,0.12)] bg-[#131c16]/60">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#88a06b]/15 border border-[#88a06b]/30 shrink-0"><i className="ri-seedling-line text-[#88a06b] text-lg" aria-hidden="true" /></div>
            <div className="flex-1"><p className="font-display text-lg md:text-xl text-[#ecead8] leading-7">{copy.gallery.ctaTitle}</p><p className="text-sm text-[#b7b8a8] mt-1 leading-7">{copy.gallery.ctaText}</p></div>
            <button onClick={() => { handleClose(); onQuote(); }} className="px-6 py-3 rounded-full bg-[#b8c79c] text-[#0d1410] text-sm hover:bg-[#ecead8] transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2 font-medium">{copy.gallery.ctaButton}<i className={arrowIcon} aria-hidden="true" /></button>
          </div>
        </div>
      </div>

      {activeProject && (
        <div ref={lightboxRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`${activeProject.title} — ${copy.gallery.fullView}`} className="absolute inset-0 z-[90] bg-[#0d1410]/95 backdrop-blur-md flex items-start justify-center px-4 md:px-12 py-10 overflow-y-auto overscroll-contain" onClick={() => setActiveId(null)}>
          <button data-dialog-initial-focus onClick={(event) => { event.stopPropagation(); setActiveId(null); }} className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer z-10" aria-label={copy.gallery.closeImage}><i className="ri-close-line text-xl" aria-hidden="true" /></button>
          <button onClick={(event) => { event.stopPropagation(); handlePrev(); }} className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer z-10" aria-label={copy.gallery.previous}><i className="ri-arrow-left-line text-xl" aria-hidden="true" /></button>
          <button onClick={(event) => { event.stopPropagation(); handleNext(); }} className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-[#ecead8]/20 hover:bg-[#ecead8] hover:text-[#0d1410] text-[#ecead8] transition-all cursor-pointer z-10" aria-label={copy.gallery.next}><i className="ri-arrow-right-line text-xl" aria-hidden="true" /></button>
          <div className="relative w-full max-w-6xl flex flex-col gap-5 my-auto shrink-0" onClick={(event) => event.stopPropagation()}>
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#131c16] border border-[rgba(236,234,216,0.12)]"><img src={activeProject.image} alt={`${activeProject.title} — ${copy.gallery.fullView}`} title={activeProject.title} className="w-full h-full object-cover object-top" /></div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div><div className="text-[10px] text-[#88a06b] mb-2">{activeProject.type} · {activeProject.season}</div><h3 className="persian-heading font-display text-2xl md:text-3xl text-[#ecead8]">{activeProject.title}</h3><p className="text-[#b7b8a8] text-sm max-w-2xl mt-2 leading-7">{activeProject.blurb}</p></div>
              <div className="flex items-center flex-wrap gap-5 text-xs text-[#b7b8a8] shrink-0"><span className="inline-flex items-center gap-1.5"><i className="ri-map-pin-line" aria-hidden="true" />{activeProject.location}</span><span className="tabular-nums">{activeProject.sqft}</span><span className="tabular-nums">{formatNumber(activeIndex + 1)} / {formatNumber(galleryProjects.length)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
