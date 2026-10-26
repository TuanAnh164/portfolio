import type { ReactNode } from "react";

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
      <div className="mb-10">
        <p className="font-mono text-sm text-accent">
          <span className="text-muted">{"//"}</span> {index}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {note && <p className="mt-3 max-w-2xl text-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
