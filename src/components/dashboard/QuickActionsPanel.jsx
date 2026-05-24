import { Link } from "react-router-dom";

function QuickActionsPanel() {
  return (
    <article className="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink-900">Quick Actions</h2>
        <Link
          to="/dashboard/courses"
          className="text-sm font-medium text-primary hover:text-primary-700"
        >
          Open Course Manager
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/dashboard/courses"
          className="rounded-xl border border-primary-200 bg-primary-50 p-4 transition hover:bg-primary-100"
        >
          <p className="text-sm font-semibold text-primary-800">
            Add or Edit Course
          </p>
          <p className="mt-1 text-xs text-primary-700">
            Update titles, pricing, and cover images.
          </p>
        </Link>

        <Link
          to="/dashboard/courses"
          className="rounded-xl border border-secondary-200 bg-secondary-50 p-4 transition hover:bg-secondary-100"
        >
          <p className="text-sm font-semibold text-secondary-800">
            Manage Sections & Lessons
          </p>
          <p className="mt-1 text-xs text-secondary-700">
            Organize content flow and lesson order.
          </p>
        </Link>

        <Link
          to="/courses"
          className="rounded-xl border border-surface-300 bg-surface-50 p-4 transition hover:bg-surface-100"
        >
          <p className="text-sm font-semibold text-ink-800">
            Preview Public Courses
          </p>
          <p className="mt-1 text-xs text-ink-600">
            View your catalog as students will see it.
          </p>
        </Link>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">
            Student Analytics
          </p>
          <p className="mt-1 text-xs text-amber-700">
            Coming next: enrollments, completion, and watch-time trends.
          </p>
        </div>
      </div>
    </article>
  );
}

export default QuickActionsPanel;
