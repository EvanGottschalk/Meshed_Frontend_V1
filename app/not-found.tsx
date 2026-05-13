import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-secondary">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          That page isn&apos;t on the network.
        </h1>
        <p className="mt-4 text-fg-secondary">
          The link you followed leads nowhere we recognize. Head back home and
          try again.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-fg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
