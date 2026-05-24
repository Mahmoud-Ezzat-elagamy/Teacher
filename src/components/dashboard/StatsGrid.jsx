function StatCard({ label, value }) {
  return (
    <article className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.15em] text-ink-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-ink-900">{value}</p>
    </article>
  );
}

function StatsGrid({
  totalCourses,
  totalSections,
  totalLessons,
  avgCoursePrice,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Courses" value={totalCourses} />
      <StatCard label="Total Sections" value={totalSections} />
      <StatCard label="Total Lessons" value={totalLessons} />
      <StatCard label="Average Price" value={`$${avgCoursePrice}`} />
    </div>
  );
}

export default StatsGrid;
