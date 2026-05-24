import { useState } from "react";

function Pagination() {
  const totalStudents = 100;
  const pageSizes = [5, 10, 15];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowStart, setWindowStart] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalStudents / rowsPerPage));
  const visiblePageCount = 5;

  const updatePage = (nextPage) => {
    const nextWindowStart =
      totalPages <= visiblePageCount
        ? 1
        : Math.min(
            Math.max(nextPage - (visiblePageCount - 1), 1),
            totalPages - visiblePageCount + 1,
          );

    setCurrentPage(nextPage);
    setWindowStart(nextWindowStart);
  };

  const visiblePages = Array.from(
    { length: Math.min(visiblePageCount, totalPages) },
    (_, index) => windowStart + index,
  );

  const firstItem = (currentPage - 1) * rowsPerPage + 1;
  const lastItem = Math.min(currentPage * rowsPerPage, totalStudents);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-50 px-4 py-3 lg:flex-row lg:items-center">
      <p className="text-sm text-gray-600 lg:w-54">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {firstItem}-{lastItem}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{totalStudents}</span>{" "}
        students
      </p>

      <div className="flex flex-1 items-center justify-center gap-2 overflow-x-auto">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-white"
          onClick={() => updatePage(Math.max(currentPage - 1, 1))}
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {windowStart > 1 ? (
            <span className="px-2 text-sm text-gray-400">…</span>
          ) : null}

          {visiblePages.map((page) => (
            <button
              key={page}
              type="button"
              className={`min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === currentPage
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
              onClick={() => updatePage(page)}
            >
              {page}
            </button>
          ))}

          {windowStart + visiblePages.length - 1 < totalPages ? (
            <span className="px-2 text-sm text-gray-400">…</span>
          ) : null}
        </div>

        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-white"
          onClick={() => updatePage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-2 lg:justify-end lg:w-48">
        <label
          htmlFor="rows-per-page"
          className="text-sm font-medium text-gray-600"
        >
          Rows per page
        </label>

        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={(event) => {
            const nextRowsPerPage = Number(event.target.value);
            setRowsPerPage(nextRowsPerPage);

            const nextTotalPages = Math.max(
              1,
              Math.ceil(totalStudents / nextRowsPerPage),
            );
            const nextPage = Math.min(currentPage, nextTotalPages);
            const nextWindowStart =
              nextTotalPages <= visiblePageCount
                ? 1
                : Math.min(
                    Math.max(nextPage - (visiblePageCount - 1), 1),
                    nextTotalPages - visiblePageCount + 1,
                  );

            setCurrentPage(nextPage);
            setWindowStart(nextWindowStart);
          }}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-primary-500"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Pagination;
