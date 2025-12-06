// components/layout/Footer.tsx
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>© {year} Lavigate.</span>

        <span className="max-w-xl">
          Calculators are simplified and for guidance only – always
          double-check results and current rules with official sources before
          making financial decisions.
        </span>

        <nav className="flex flex-wrap gap-3">
          <Link
            href="/about"
            className="hover:text-slate-700 hover:underline underline-offset-2"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-slate-700 hover:underline underline-offset-2"
          >
            Contact
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-slate-700 hover:underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="hover:text-slate-700 hover:underline underline-offset-2"
          >
            Cookies
          </Link>
          <Link
            href="/terms"
            className="hover:text-slate-700 hover:underline underline-offset-2"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
