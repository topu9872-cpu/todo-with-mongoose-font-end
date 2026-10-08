import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-base-content">
        Page not found
      </h1>
      <p className="max-w-md text-base text-base-content/70">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to home
      </Link>
    </main>
  );
}
