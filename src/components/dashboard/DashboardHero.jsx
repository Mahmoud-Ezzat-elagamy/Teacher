function DashboardHero() {
  return (
    <header className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-700 p-6 text-white shadow-lg md:p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-white/80">
        Teacher Workspace
      </p>
      <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
        Dashboard Overview
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">
        Track your course library, monitor lesson structure, and jump quickly
        into course management.
      </p>
    </header>
  );
}

export default DashboardHero;
