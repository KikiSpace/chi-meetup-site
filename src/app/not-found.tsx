import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-secondary mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/home"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-background font-medium hover:bg-accent-hover transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
