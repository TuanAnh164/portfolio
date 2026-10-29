import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/section";
import { getDictionary } from "@/content/ui";
import { getAllPostParams, getPost } from "@/lib/blog";
import { hasLocale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = await getPost(slug, lang);
  return post ? { title: post.meta.title, description: post.meta.summary } : {};
}

export default async function BlogPost({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = await getPost(slug, lang);
  if (!post) notFound();
  const t = getDictionary(lang);

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Link href={"/blog"} className="font-mono text-sm text-muted hover:text-accent">
        {t.blog.back}
      </Link>
      <p className="mt-8 font-mono text-xs text-muted">
        {post.meta.date} · {post.meta.minutes} {t.blog.readingTime}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.meta.title}</h1>
      {post.meta.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.meta.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </div>
      )}
      {/* Posts are authored in this repo, so the rendered markdown is trusted. */}
      <div className="prose-post mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
