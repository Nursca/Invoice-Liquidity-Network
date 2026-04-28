"use client";

import CommandPalette from "./CommandPalette";
import ShortcutsModal from "./ShortcutsModal";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export default function GlobalKeyboardOverlays() {
  const { isShortcutsOpen, closeShortcuts } = useKeyboardShortcuts();

  return (
    <>
      <CommandPalette />
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={closeShortcuts} />
    </>
  );
}
