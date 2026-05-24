function RecentCoursesPanel({ newestCourses }) {
  return (
    <article className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-lg font-semibold text-ink-900">Recent Courses</h2>
      <ul className="mt-4 space-y-3">
        {newestCourses.map((course) => {
          const sectionsCount = course.sections?.length || 0;
          const lessonsCount =
            course.sections?.reduce(
              (sum, section) => sum + (section.lessons?.length || 0),
              0,
            ) || 0;

          return (
            <li
              key={course.courseId}
              className="rounded-xl border border-surface-200 p-3"
            >
              <p className="text-sm font-semibold text-ink-900">
                {course.title}
              </p>
              <p className="mt-1 text-xs text-ink-600">
                {sectionsCount} sections • {lessonsCount} lessons
              </p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default RecentCoursesPanel;
