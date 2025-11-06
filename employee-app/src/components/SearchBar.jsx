function SearchBar({ setIsAddModalOpen }) {
  return (
    <div className="w-4/5 mx-auto py-6 bg-white mt-6 rounded-xl px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-[40%]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#B6A1D5" }}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button
          className="w-full md:w-auto bg-gradient-to-tr from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Employee
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
