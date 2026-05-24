import Spinner from "../components/Spinner";
import useGetCourses from "../features/adminCourses/useGetCourses";
import sampleCourses from "../data/CoursesData.json";
import DashboardHero from "../components/dashboard/DashboardHero";
import StatsGrid from "../components/dashboard/StatsGrid";
import QuickActionsPanel from "../components/dashboard/QuickActionsPanel";
import RecentCoursesPanel from "../components/dashboard/RecentCoursesPanel";

function Dashboard() {
  const { courses, isLoading } = useGetCourses();

  const effectiveCourses =
    Array.isArray(courses) && courses.length > 0 ? courses : sampleCourses;

  if (isLoading && !effectiveCourses?.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const totalCourses = effectiveCourses.length;
  const totalSections = effectiveCourses.reduce(
    (sum, course) => sum + (course.sections?.length || 0),
    0,
  );
  const totalLessons = effectiveCourses.reduce(
    (sum, course) =>
      sum +
      (course.sections?.reduce(
        (sectionSum, section) => sectionSum + (section.lessons?.length || 0),
        0,
      ) || 0),
    0,
  );
  const avgCoursePrice =
    totalCourses > 0
      ? Math.round(
          effectiveCourses.reduce(
            (sum, course) => sum + (course.price || 0),
            0,
          ) / totalCourses,
        )
      : 0;

  const newestCourses = [...effectiveCourses].slice(0, 4);

  return (
    <section className="space-y-6 pb-8">
      <DashboardHero />

      <StatsGrid
        totalCourses={totalCourses}
        totalSections={totalSections}
        totalLessons={totalLessons}
        avgCoursePrice={avgCoursePrice}
      />

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <QuickActionsPanel />
        <RecentCoursesPanel newestCourses={newestCourses} />
      </div>
    </section>
  );
}

export default Dashboard;
