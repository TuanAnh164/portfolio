"use client";

import { useState } from "react";

export function CopyButton({ value, label, done }: { value: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard blocked: nothing to do, the value is visible anyway
        }
      }}
      className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      {copied ? done : label}
    </button>
  );
}
