import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/lib/i18n";

/**
 * Posts live in content/blog/<slug>/<locale>.md with frontmatter:
 *   title, date (YYYY-MM-DD), summary, tags (list), draft (optional)
 * A post shows up in a language only if that language's file exists.
 * Folders starting with "_" are ignored (see content/blog/_template).
 */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  minutes: number;
};

function readPost(slug: string, lang: Locale) {
  const file = path.join(BLOG_DIR, slug, `${lang}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft) return null;
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    minutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
  };
  return { meta, content };
}

function slugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .map((d) => d.name);
}

export function getPosts(lang: Locale): PostMeta[] {
  return slugs()
    .map((slug) => readPost(slug, lang)?.meta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string, lang: Locale) {
  const post = readPost(slug, lang);
  if (!post) return null;
  return { meta: post.meta, html: await marked.parse(post.content) };
}

export function getAllPostParams() {
  return slugs().flatMap((slug) =>
    (["vi", "en"] as const)
      .filter((lang) => readPost(slug, lang))
      .map((lang) => ({ lang, slug })),
  );
}
