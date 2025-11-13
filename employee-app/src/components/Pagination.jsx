import React from "react";

function Pagination({ page, setPage, size, setSize, totalEmployees }) {
  const totalPages = Math.ceil(totalEmployees / size);
  const startIndex = page * size + 1;
  const endIndex = Math.min((page + 1) * size, totalEmployees);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setSize(Number(e.target.value));
    setPage(0); // Reset to first page when changing size
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        for (let i = 0; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
      } else if (page >= totalPages - 3) {
        pages.push(0);
        pages.push("...");
        for (let i = totalPages - 4; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
      }
    }

    return pages;
  };

  // Handle edge cases
  if (totalEmployees === 0) {
    return (
      <div className="w-full lg:w-4/5 mx-auto py-6 bg-white rounded-b-xl px-6">
        <div className="flex justify-center items-center text-gray-500 text-sm">
          No employees to display
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-4/5 mx-auto py-6 bg-white rounded-b-xl px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side - Showing Info */}
        <div className="text-gray-700 text-sm md:text-base">
          Showing <span className="font-semibold">{startIndex}</span> to{" "}
          <span className="font-semibold">{endIndex}</span> of{" "}
          <span className="font-semibold">{totalEmployees}</span> employees
        </div>

        {/* Right Side - Page Size & Page Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Page Size Dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="pageSize"
              className="text-gray-700 text-sm whitespace-nowrap"
            >
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={size}
              onChange={handlePageSizeChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Page Selector */}
          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="px-3 py-2 rounded-lg text-gray-700 font-medium text-sm transition-all duration-300 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-purple-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === "..." ? (
                  <span className="px-3 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      page === pageNum
                        ? "bg-gradient-to-tr from-indigo-400 to-purple-500 text-white"
                        : "text-gray-700 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-purple-500 hover:text-white"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                )}
              </React.Fragment>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="px-3 py-2 rounded-lg text-gray-700 font-medium text-sm transition-all duration-300 hover:bg-gradient-to-tr hover:from-indigo-400 hover:to-purple-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
