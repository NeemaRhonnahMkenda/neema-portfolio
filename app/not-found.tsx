import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-32 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl tracking-tight">This page doesn&apos;t exist (yet).</h1>
      <Link href="/" className="mt-8 text-accent hover:underline">
        ← Back to the portfolio
      </Link>
    </main>
  );
}
