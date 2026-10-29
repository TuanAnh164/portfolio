"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === "class") {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  return () => observer.disconnect();
}

function getSnapshot() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerSnapshot() {
  return "dark" as const;
}

/**
 * Nút chuyển đổi Dark mode / Light mode với hiệu ứng chuyển cảnh mượt mà (View Transitions API).
 * Không bị FOIT, tự động đồng bộ class và lưu trạng thái vào localStorage.
 */
export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    if (typeof document === "undefined") return;

    const doc = document;
    const nextTheme = theme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      if (nextTheme === "light") {
        doc.documentElement.classList.remove("dark");
        doc.documentElement.classList.add("light");
        try {
          localStorage.setItem("portfolio-theme", "light");
        } catch {}
      } else {
        doc.documentElement.classList.remove("light");
        doc.documentElement.classList.add("dark");
        try {
          localStorage.setItem("portfolio-theme", "dark");
        } catch {}
      }
    };

    const vtDoc = doc as unknown as { startViewTransition?: (cb: () => void) => void };

    // Sử dụng View Transitions API nếu trình duyệt hỗ trợ (Chrome, Edge, Safari 18+)
    if (typeof vtDoc.startViewTransition === "function") {
      vtDoc.startViewTransition(applyTheme);
    } else {
      // Fallback: kích hoạt CSS transition mượt mà
      doc.documentElement.classList.add("theme-transitioning");
      applyTheme();
      setTimeout(() => {
        doc.documentElement.classList.remove("theme-transitioning");
      }, 350);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
      title={theme === "dark" ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
      className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-muted transition-all duration-300 hover:border-accent/50 hover:bg-surface-2 hover:text-accent active:scale-90"
    >
      {theme === "dark" ? (
        <SunIcon
          width={16}
          height={16}
          className="text-amber-400 transition-transform duration-500 hover:rotate-90"
        />
      ) : (
        <MoonIcon
          width={16}
          height={16}
          className="text-accent-2 transition-transform duration-500 hover:-rotate-45"
        />
      )}
    </button>
  );
}
