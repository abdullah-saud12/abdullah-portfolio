import Link from "next/link";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/abdullah-saud12" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/imabd" },
  { label: "Twitter", href: "https://www.google.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 pt-8 pb-24 sm:py-8 sm:flex-row sm:px-6">

        <p className="text-sm text-[var(--foreground-muted)]">
          © {new Date().getFullYear()} Abdullah Saud. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </footer>
  );
}
