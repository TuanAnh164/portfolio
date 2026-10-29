"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { experience, learning, profile, projects, skillLevel, skills } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { fireCelebration, fireConfetti } from "@/lib/confetti";

type Line = { id: number; node: ReactNode };

const COMMANDS = [
  "help", "whoami", "about", "skills", "projects", "experience",
  "contact", "github", "learning", "cv", "blog", "lang", "date", "echo", "clear",
] as const;

const copy = {
  vi: {
    welcome: "Chào mừng đến terminal của Tuấn Anh. Gõ 'help' để bắt đầu.",
    notFound: (c: string) => `lệnh không tồn tại: ${c}. Gõ 'help' để xem danh sách.`,
    help: {
      whoami: "mình là ai",
      about: "giới thiệu ngắn",
      skills: "kỹ năng theo nhóm",
      projects: "các dự án",
      experience: "kinh nghiệm làm việc",
      contact: "thông tin liên hệ",
      github: "mở trang GitHub",
      learning: "đang học gì",
      cv: "tải CV (PDF)",
      blog: "đến trang blog",
      lang: "đổi ngôn ngữ: lang en | lang vi",
      date: "ngày giờ hiện tại",
      echo: "in lại nội dung",
      clear: "xoá màn hình",
    },
    opening: "đang mở…",
    downloading: "đang tải CV…",
    sudo: "Bạn không có quyền sudo ở đây 😄",
    hint: "Mẹo: ↑/↓ để xem lại lệnh, Tab để tự hoàn thành.",
  },
  en: {
    welcome: "Welcome to Tuan Anh's terminal. Type 'help' to get started.",
    notFound: (c: string) => `command not found: ${c}. Type 'help' for the list.`,
    help: {
      whoami: "who I am",
      about: "short introduction",
      skills: "skills by group",
      projects: "projects",
      experience: "work experience",
      contact: "contact info",
      github: "open GitHub profile",
      learning: "what I'm learning",
      cv: "download CV (PDF)",
      blog: "go to the blog",
      lang: "switch language: lang en | lang vi",
      date: "current date and time",
      echo: "print text back",
      clear: "clear the screen",
    },
    opening: "opening…",
    downloading: "downloading CV…",
    sudo: "Nice try. No sudo for you 😄",
    hint: "Tip: ↑/↓ for history, Tab to autocomplete.",
  },
};

const A = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;
const B = ({ children }: { children: ReactNode }) => <span className="text-accent-2">{children}</span>;
const M = ({ children }: { children: ReactNode }) => <span className="text-muted">{children}</span>;

export function Terminal({ lang }: { lang: Locale }) {
  const router = useRouter();
  const c = copy[lang];
  const idRef = useRef(0);
  const [lines, setLines] = useState<Line[]>(() => [
    { id: -2, node: <M>{c.welcome}</M> },
    { id: -1, node: <M>{c.hint}</M> },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = (...nodes: ReactNode[]) =>
    setLines((prev) => [...prev, ...nodes.map((node) => ({ id: idRef.current++, node }))]);

  function run(raw: string) {
    const [cmd = "", ...args] = raw.trim().split(/\s+/);
    const name = cmd.toLowerCase();
    push(
      <span>
        <A>❯</A> <B>~</B> {raw}
      </span>,
    );
    if (!name) return;

    switch (name) {
      case "help":
        push(
          ...Object.entries(c.help).map(([k, v]) => (
            <span key={k}>
              <A>{k.padEnd(12, " ")}</A>
              <M>{v}</M>
            </span>
          )),
        );
        break;
      case "whoami":
        push(
          <span>
            <A>{profile.name}</A> — {profile.role[lang]}
          </span>,
          <M>{profile.stackLine} · {profile.location[lang]}</M>,
        );
        break;
      case "about":
        push(...profile.about.map((p) => <span key={p.en}>{p[lang]}</span>));
        break;
      case "skills":
        push(
          ...skills.map((g) => (
            <span key={g.title.en}>
              <A>{g.title[lang].padEnd(14, " ")}</A>
              <M>[{skillLevel[lang]}]</M> {g.items.join(", ")}
            </span>
          )),
        );
        break;
      case "projects":
        push(
          ...projects.flatMap((p) => [
            <span key="t">
              <B>■ {p.name}</B> <M>({p.period}) — {p.role[lang]}</M>
            </span>,
            <span key="s" className="pl-4">{p.summary[lang]}</span>,
            <span key="k" className="pl-4">
              <M>{p.stack.join(" · ")}</M>
            </span>,
          ]),
        );
        break;
      case "experience":
        push(
          ...experience.flatMap((e) => [
            <span key="o">
              <B>■ {e.org}</B> <M>({typeof e.period === "string" ? e.period : e.period[lang]})</M>
            </span>,
            <span key="r" className="pl-4">{e.title[lang]}</span>,
          ]),
        );
        break;
      case "learning":
        push(
          ...learning.map((l) => (
            <span key={l.name}>
              <A>{l.name}</A> <M>— {l.note[lang]}</M>
            </span>
          )),
        );
        break;
      case "contact":
        fireConfetti({ particleCount: 40, spread: 55 });
        push(
          <span>
            <A>email   </A> {profile.contact.email}
          </span>,
          <span>
            <A>phone   </A> {profile.contact.phoneDisplay}
          </span>,
          <span>
            <A>github  </A> {profile.contact.github}
          </span>,
          <span>
            <A>facebook</A> {profile.contact.facebook}
          </span>,
        );
        break;
      case "github":
        push(<M>{c.opening}</M>);
        window.open(profile.contact.github, "_blank", "noopener");
        break;
      case "cv": {
        fireCelebration();
        push(<M>{c.downloading}</M>);
        const a = document.createElement("a");
        a.href = profile.cv;
        a.download = "";
        a.click();
        break;
      }
      case "blog":
        push(<M>{c.opening}</M>);
        router.push(`/${lang}/blog`);
        break;
      case "lang": {
        const target = args[0] === "en" || args[0] === "vi" ? args[0] : lang === "vi" ? "en" : "vi";
        router.push(`/${target}#terminal`);
        break;
      }
      case "date":
        push(<span>{new Date().toLocaleString(lang === "vi" ? "vi-VN" : "en-US")}</span>);
        break;
      case "echo":
        push(<span>{args.join(" ")}</span>);
        break;
      case "clear":
        setLines([]);
        break;
      case "sudo":
        fireConfetti({ colors: ["#fbbf24", "#f87171"] });
        push(<span className="text-warn">{c.sudo}</span>);
        break;
      default:
        push(<span className="text-[#f87171]">{c.notFound(name)}</span>);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setInput("");
      setCursor(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((cmd) => cmd.startsWith(input.trim().toLowerCase()));
      if (input.trim() && match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-[#0a0d12] shadow-xl shadow-slate-900/10 dark:shadow-2xl dark:shadow-black/40"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">
          {profile.handle}@portfolio: ~
        </span>
      </div>
      <div
        ref={scrollRef}
        className="h-[380px] overflow-y-auto p-4 font-mono text-[13px] leading-6 sm:text-sm"
        aria-live="polite"
      >
        {lines.map((l) => (
          <div key={l.id} className="whitespace-pre-wrap break-words">
            {l.node}
          </div>
        ))}
        <label className="flex items-center gap-2">
          <span aria-hidden>
            <A>❯</A> <B>~</B>
          </span>
          <span className="sr-only">Terminal command</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="flex-1 bg-transparent text-text caret-accent outline-none"
            placeholder="help"
          />
          {!input && (
            <span
              className="inline-block h-4 w-2 rounded-xs bg-accent animate-cursor-blink select-none"
              aria-hidden="true"
            />
          )}
        </label>
      </div>
    </div>
  );
}
