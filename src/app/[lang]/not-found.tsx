import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-32 sm:px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Không tìm thấy trang · Page not found</h1>
      <Link href="/" className="mt-8 font-mono text-sm text-muted hover:text-accent">
        ← Trang chủ · Home
      </Link>
    </div>
  );
}
