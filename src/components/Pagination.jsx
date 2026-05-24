import { useState } from "react";

function Pagination({
  setSearchParam,
  totalCount,
  totalPages,
  resultFrom,
  resultTo,
}) {
  const totalStudents = totalCount;
  const pageSizes = [5, 10, 15];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowStart, setWindowStart] = useState(1);

  const visiblePageCount = 5;

  const getWindowStart = (page, pageCount) => {
    if (pageCount <= visiblePageCount) return 1;

    return Math.min(
      Math.max(page - (visiblePageCount - 1), 1),
      pageCount - visiblePageCount + 1,
    );
  };

  const syncPage = (nextPage) => {
    setCurrentPage(nextPage);
    setWindowStart(getWindowStart(nextPage, totalPages));
  };

  const syncPageParam = (nextPage) => {
    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", nextPage);
      return params;
    });
  };

  const handlePreviousClick = () => {
    const nextPage = Math.max(currentPage - 1, 1);
    syncPageParam(nextPage);
    syncPage(nextPage);
  };

  const handlePageClick = (page) => {
    syncPageParam(page);
    syncPage(page);
  };

  const handleNextClick = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    syncPageParam(nextPage);
    syncPage(nextPage);
  };

  const handleRowsPerPageChange = (event) => {
    const nextRowsPerPage = Number(event.target.value);
    const nextTotalPages = Math.max(
      1,
      Math.ceil(totalStudents / nextRowsPerPage),
    );
    const nextPage = Math.min(currentPage, nextTotalPages);

    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.set("size", nextRowsPerPage);
      params.set("page", nextPage);
      return params;
    });

    setRowsPerPage(nextRowsPerPage);
    setCurrentPage(nextPage);
    setWindowStart(getWindowStart(nextPage, nextTotalPages));
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
          {resultFrom}-{resultTo}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{totalStudents}</span>{" "}
        students
      </p>

      <div className="flex flex-1 items-center justify-center gap-2 overflow-x-auto">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-white"
          onClick={handlePreviousClick}
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
              onClick={() => handlePageClick(page)}
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
          onClick={handleNextClick}
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
          onChange={handleRowsPerPageChange}
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
