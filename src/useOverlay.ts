import { useEffect } from 'react';
import type { RefObject } from 'react';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

let scrollLockCount = 0;
let previousBodyOverflow = '';

/** Locks page scrolling without discarding a pre-existing inline overflow value. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (scrollLockCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
    }
    scrollLockCount += 1;
    document.body.style.overflow = 'hidden';

    return () => {
      scrollLockCount = Math.max(0, scrollLockCount - 1);
      if (scrollLockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
      }
    };
  }, [active]);
}

/**
 * Moves focus into a dialog, keeps Tab navigation inside it, and restores the
 * opener's focus on close. Nested dialogs stop Tab events from reaching their
 * parent dialog, which keeps the gallery lightbox keyboard-safe as well.
 */
export function useDialogFocus<T extends HTMLElement>(active: boolean, dialogRef: RefObject<T | null>) {
  useEffect(() => {
    if (!active) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 && !element.closest('[inert]'));

    const initialTarget = dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]') ?? getFocusable()[0] ?? dialog;
    initialTarget.focus({ preventScroll: true });

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      event.stopPropagation();
      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !dialog.contains(current))) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && (current === last || !dialog.contains(current))) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    dialog.addEventListener('keydown', handleTab);
    return () => {
      dialog.removeEventListener('keydown', handleTab);
      const current = document.activeElement;
      if (previouslyFocused?.isConnected && (!current || current === document.body || dialog.contains(current))) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [active, dialogRef]);
}
