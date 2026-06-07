export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-section">
      <div className="h-1 w-20 overflow-hidden rounded-full bg-primary/10">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-secondary to-accent" />
      </div>
    </div>
  );
}
