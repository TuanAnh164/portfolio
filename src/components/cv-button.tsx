"use client";

import { DownloadIcon } from "./icons";
import { fireCelebration } from "@/lib/confetti";

export function CvButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      onClick={() => {
        fireCelebration();
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:border-accent/50 hover:bg-surface-2 active:scale-95"
    >
      <DownloadIcon width={16} height={16} /> {label}
    </a>
  );
}

