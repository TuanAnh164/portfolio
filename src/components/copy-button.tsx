"use client";

import { useState } from "react";
import { fireConfetti } from "@/lib/confetti";

export function CopyButton({
  value,
  label,
  done,
  withConfetti = true,
}: {
  value: string;
  label: string;
  done: string;
  withConfetti?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          if (withConfetti) {
            fireConfetti({
              particleCount: 40,
              spread: 55,
              origin: { y: 0.8 },
            });
          }
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // clipboard blocked: nothing to do, the value is visible anyway
        }
      }}
      className="cursor-pointer rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted transition-all duration-200 hover:border-accent/50 hover:text-accent active:scale-95"
    >
      {copied ? done : label}
    </button>
  );
}
