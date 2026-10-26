import "server-only";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GithubStats = {
  publicRepos: number | null;
  total: number;
  activeDays: number;
  longestStreak: number;
  /** 0 = Sunday; used to align the first heatmap column. */
  firstWeekday: number;
  days: ContributionDay[];
};

const REVALIDATE = 60 * 60 * 6; // refresh every 6 hours

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "application/json", "User-Agent": "tuananh-portfolio" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubStats(user: string): Promise<GithubStats | null> {
  const [profile, calendar] = await Promise.all([
    getJson<{ public_repos: number }>(`https://api.github.com/users/${user}`),
    getJson<{ total: { lastYear: number }; contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
    ),
  ]);
  if (!calendar) return null;

  const days = calendar.contributions;
  let longestStreak = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
  }

  return {
    publicRepos: profile?.public_repos ?? null,
    total: calendar.total.lastYear,
    activeDays: days.filter((d) => d.count > 0).length,
    longestStreak,
    firstWeekday: days[0] ? new Date(days[0].date).getUTCDay() : 0,
    days,
  };
}
