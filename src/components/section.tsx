"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "./scroll-reveal";

export function Section({
  id,
  index,
  title,
  note,
  children,
}: {
  id: string;
  index: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <ScrollReveal className="mb-10">
        <p className="font-mono text-sm text-accent">
          <span className="text-muted">{"//"}</span> {index}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {note && <p className="mt-3 max-w-2xl text-muted">{note}</p>}
      </ScrollReveal>
      <ScrollReveal delayMs={100}>{children}</ScrollReveal>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent">
      {children}
    </span>
  );
}
