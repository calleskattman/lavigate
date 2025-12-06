// components/layout/Header.tsx
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/branding/lavigate-logo.svg"
            alt="Lavigate logo"
            width={150}
            height={32}
            priority
          />
          <span className="sr-only">Lavigate</span>
        </Link>

        <nav className="flex gap-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link href="/tools" className="hover:text-slate-900">
            Tools
          </Link>
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
