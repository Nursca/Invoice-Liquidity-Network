"use client";

import React, { useEffect } from "react";

type Shortcut = {
  keys: string[];
  description: string;
};

type ShortcutGroup = {
  title: string;
  shortcuts: Shortcut[];
};

const shortcutGroups: ShortcutGroup[] = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["Cmd", "K"], description: "Command palette" },
      { keys: ["G", "D"], description: "Go to Dashboard" },
      { keys: ["G", "L"], description: "Go to LP" },
      { keys: ["G", "A"], description: "Go to Analytics" },
    ],
  },
  {
    title: "Tables",
    shortcuts: [
      { keys: ["↑↓"], description: "Navigate rows" },
      { keys: ["Enter"], description: "Open detail" },
      { keys: ["F"], description: "Fund invoice" },
      { keys: ["C"], description: "Cancel invoice" },
    ],
  },
  {
    title: "General",
    shortcuts: [
      { keys: ["?"], description: "Show shortcuts" },
      { keys: ["Esc"], description: "Close modal/drawer" },
      { keys: ["D"], description: "Toggle dark mode" },
    ],
  },
  {
    title: "Invoice detail",
    shortcuts: [
      { keys: ["E"], description: "Edit invoice (Pending only)" },
      { keys: ["P"], description: "Print/export PDF" },
      { keys: ["Q"], description: "Show QR code" },
    ],
  },
];

function KeyBadge({ label }: { label: string }) {
  return (
    <kbd className="min-w-[28px] rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-center text-xs font-semibold text-gray-800 shadow-[0_1px_0_0_rgba(0,0,0,0.2)] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
      {label}
    </kbd>
  );
}

export default function ShortcutsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Keyboard shortcuts</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Close keyboard shortcuts"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {shortcutGroups.map((group) => (
            <section key={group.title} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.shortcuts.map((shortcut) => (
                  <li key={`${group.title}-${shortcut.description}`} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      {shortcut.keys.map((keyLabel) => (
                        <KeyBadge key={`${shortcut.description}-${keyLabel}`} label={keyLabel} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{shortcut.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-5 text-sm text-gray-600 dark:text-gray-300">
          These shortcuts work everywhere except inside text inputs.
        </p>
      </div>
    </div>
  );
}
