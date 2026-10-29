"use client";

import { useEffect, useState } from "react";

interface PageIntroProps {
  name?: string;
  handle?: string;
}

/**
 * Màn hình mở màn Terminal Boot kết hợp thanh chạy tiến trình (chạy trong 1.5 giây).
 * Giữ nguyên giao diện terminal chào mừng đầy đủ ("cái cũ") và bổ sung thanh chạy neon
 * cùng vệt sáng đỉnh trang, số % thời gian thực và tự động mở màn êm dịu khi hoàn tất.
 */
export function PageIntro({ name = "Trần Tuấn Anh", handle = "tuananh" }: PageIntroProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"init" | "compiling" | "ready">("init");
  const [isDone, setIsDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 1500; // Chạy trong đúng 1.5 giây (khoảng 1-2s)
    const startTime = performance.now();

    let animationFrameId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / duration);
      // Gia tốc mượt mà
      const eased = 1 - Math.pow(1 - ratio, 3);
      const currentProgress = Math.round(eased * 100);

      setProgress(currentProgress);

      if (currentProgress < 40) {
        setPhase("init");
      } else if (currentProgress < 88) {
        setPhase("compiling");
      } else {
        setPhase("ready");
      }

      if (ratio < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setProgress(100);
        setPhase("ready");
        setIsDone(true);
        setTimeout(() => {
          setVisible(false);
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    // Bấm phím Esc để bỏ qua nhanh
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelAnimationFrame(animationFrameId);
        setIsDone(true);
        setTimeout(() => setVisible(false), 200);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    setIsDone(true);
    setTimeout(() => setVisible(false), 200);
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-bg/90 backdrop-blur-md transition-all duration-400 ease-out select-none ${
        isDone ? "pointer-events-none -translate-y-6 scale-[1.02] opacity-0" : "opacity-100"
      }`}
      aria-label="Màn hình mở màn"
    >
      {/* 1. Thanh chạy neon đỉnh màn hình chạy từ trái qua phải */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-surface-2/60">
        <div
          className="h-full bg-gradient-to-r from-accent via-accent-2 to-accent transition-all duration-75 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 14px var(--accent), 0 0 24px var(--accent-2)",
          }}
        />
      </div>

      {/* Quầng sáng mờ ảo phía sau */}
      <div className="pointer-events-none absolute h-80 w-80 rounded-full ambient-glow opacity-30 blur-3xl sm:h-96 sm:w-96" />

      {/* 2. Cửa sổ Terminal Boot nguyên bản kết hợp thanh chạy */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface/95 p-6 shadow-2xl shadow-black/70 backdrop-blur-md"
      >
        {/* Header cửa sổ với 3 chấm macOS */}
        <div className="flex items-center justify-between border-b border-line/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-muted">~/{handle}</span>
          </div>
          <span className="font-mono text-xs font-semibold text-accent tabular-nums">
            {progress}%
          </span>
        </div>

        {/* Nội dung dòng lệnh hiển thị theo tiến trình */}
        <div className="my-5 min-h-[76px] space-y-1.5 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-text/90">
            <span className="text-accent">❯</span>
            <span>init <span className="text-accent-2 font-semibold">~/portfolio</span></span>
          </div>

          {phase !== "init" && (
            <div className="flex items-center gap-2 text-muted">
              <span className="text-accent">❯</span>
              <span>loading modules <span className="text-text/75">[Next.js 16 · React 19]</span></span>
            </div>
          )}

          {phase === "ready" && (
            <div className="flex items-center gap-2 text-accent font-medium">
              <span>❯</span>
              <span>ready: welcome to <span className="text-text font-bold">{name}</span></span>
            </div>
          )}
        </div>

        {/* 3. Thanh chạy tiến trình chính (Progress Bar) */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-2 p-[1px]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent transition-all duration-75 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 12px var(--accent)",
            }}
          />
        </div>

        {/* Footer info & nút bỏ qua */}
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-muted">
          <span>{handle}@portfolio: ~</span>
          <button
            type="button"
            onClick={handleSkip}
            className="cursor-pointer transition-colors hover:text-accent"
          >
            [Esc] Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
}
