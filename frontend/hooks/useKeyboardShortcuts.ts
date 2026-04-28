import { useCallback, useEffect, useState } from "react";

export const SHORTCUTS_MODAL_OPEN_EVENT = "iln:open-shortcuts-modal";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

export function triggerShortcutsModalOpen() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SHORTCUTS_MODAL_OPEN_EVENT));
}

export function useKeyboardShortcuts() {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const openShortcuts = useCallback(() => {
    setIsShortcutsOpen(true);
  }, []);

  const closeShortcuts = useCallback(() => {
    setIsShortcutsOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isQuestionMark = event.key === "?" || (event.key === "/" && event.shiftKey);
      if (!isQuestionMark) return;
      if (isTypingTarget(event.target)) return;

      event.preventDefault();
      setIsShortcutsOpen(true);
    };

    const onOpenEvent = () => {
      setIsShortcutsOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(SHORTCUTS_MODAL_OPEN_EVENT, onOpenEvent);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(SHORTCUTS_MODAL_OPEN_EVENT, onOpenEvent);
    };
  }, []);

  return {
    isShortcutsOpen,
    openShortcuts,
    closeShortcuts,
  };
}
