import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/section";
import { getDictionary } from "@/content/ui";
import { getPosts } from "@/lib/blog";
import { hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.blog.title, description: t.blog.intro };
}

export default async function BlogIndex({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const posts = getPosts(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="font-mono text-sm text-accent">
        <span className="text-muted">{"//"}</span> blog
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{t.blog.title}</h1>
      <p className="mt-3 text-muted">{t.blog.intro}</p>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-line bg-surface p-10 text-center">
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">$</span> ls posts/ <span className="text-muted">→ 0</span>
          </p>
          <p className="mt-3 text-muted">{t.blog.empty}</p>
        </div>
      ) : (
        <ul className="mt-12 space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <p className="font-mono text-xs text-muted">
                  {post.date} · {post.minutes} {t.blog.readingTime}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
                {post.summary && <p className="mt-2 text-muted">{post.summary}</p>}
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
