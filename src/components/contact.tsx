import { profile } from "@/content/profile";
import { getDictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CopyButton } from "./copy-button";
import { DownloadIcon, FacebookIcon, GithubIcon, MailIcon, PhoneIcon } from "./icons";
import { Section } from "./section";

export function Contact({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const { contact } = profile;
  const rows = [
    { icon: MailIcon, label: "Email", value: contact.email, href: `mailto:${contact.email}`, copy: contact.email },
    { icon: PhoneIcon, label: "Phone", value: contact.phoneDisplay, href: `tel:${contact.phone}`, copy: contact.phone },
    { icon: GithubIcon, label: "GitHub", value: `@${profile.githubUser}`, href: contact.github },
    { icon: FacebookIcon, label: "Facebook", value: "tran.tuananh.615673", href: contact.facebook },
  ];

  return (
    <Section id="contact" index="07" title={t.sections.contact} note={t.sections.contactNote}>
      <div className="grid gap-4 sm:grid-cols-2">
        {rows.map(({ icon: Icon, label, value, href, copy }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-muted">{label}</p>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block truncate font-medium hover:text-accent"
              >
                {value}
              </a>
            </div>
            {copy && <CopyButton value={copy} label={t.common.copy} done={t.common.copied} />}
          </div>
        ))}
      </div>
      <a
        href={profile.cv}
        download
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
      >
        <DownloadIcon width={16} height={16} /> {t.hero.downloadCv}
      </a>
    </Section>
  );
}
