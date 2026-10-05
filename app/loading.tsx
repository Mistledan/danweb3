export default function Loading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-paper"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-clay" />
    </main>
  );
}
