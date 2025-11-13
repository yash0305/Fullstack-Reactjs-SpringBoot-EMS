import React from "react";

function EmployeeTable({
  employees,
  handleEdit,
  handleDetails,
  handleDelete,
  loading = false,
}) {
  // Delete confirmation
  const confirmDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      handleDelete(id);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-4/5 mx-auto py-6 bg-white mt-6 rounded-t-xl px-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!employees || employees.length === 0) {
    return (
      <div className="w-4/5 mx-auto py-6 bg-white mt-6 rounded-t-xl px-6">
        <div className="flex flex-col justify-center items-center h-64 text-gray-500">
          <svg
            className="w-16 h-16 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-lg font-medium">No employees found</p>
          <p className="text-sm">Add some employees to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-4/5 mx-auto py-6 bg-white mt-6 rounded-t-xl px-6">
      {/* Desktop and Tablet Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-tr from-indigo-400 to-purple-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Employee ID</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Department</th>
              <th className="px-4 py-3 text-left font-semibold">Salary(₹)</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-gray-800">{employee.id}</td>
                <td className="px-4 py-4 text-gray-800">{employee.name}</td>
                <td className="px-4 py-4 text-gray-800">
                  {employee.department}
                </td>
                <td className="px-4 py-4 text-gray-800">
                  {employee.salary?.toLocaleString("en-IN") || employee.salary}
                </td>
                <td className="px-4 py-4">
                  <div className="flex lg:flex-row flex-col gap-2">
                    <button
                      onClick={() => handleDetails(employee.id, employee)}
                      className="px-3 py-1 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:opacity-80 hover:shadow-md"
                      style={{ backgroundColor: "#1698AC" }}
                      aria-label={`View details for ${employee.name}`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleEdit(employee.id, employee)}
                      className="px-3 py-1 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:opacity-80 hover:shadow-md"
                      style={{ backgroundColor: "#F36FA5" }}
                      aria-label={`Edit ${employee.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(employee.id, employee.name)}
                      className="px-3 py-1 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:opacity-80 hover:shadow-md"
                      style={{ backgroundColor: "#FF435B" }}
                      aria-label={`Delete ${employee.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-gray-600 font-medium text-sm">
                  Employee ID:
                </span>
                <span className="text-gray-800 font-semibold">
                  {employee.id}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 font-medium text-sm">Name:</span>
                <span className="text-gray-800 font-semibold">
                  {employee.name}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 font-medium text-sm">
                  Department:
                </span>
                <span className="text-gray-800 font-semibold">
                  {employee.department}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 font-medium text-sm">
                  Salary(₹):
                </span>
                <span className="text-gray-800 font-semibold">
                  {employee.salary?.toLocaleString("en-IN") || employee.salary}
                </span>
              </div>
              <div className="flex justify-between items-start pt-2 border-t border-gray-200">
                <span className="text-gray-600 font-medium text-sm">
                  Actions:
                </span>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDetails(employee.id, employee)}
                    className="px-3 py-1 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:opacity-80"
                    style={{ backgroundColor: "#1698AC" }}
                    aria-label={`View details for ${employee.name}`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleEdit(employee.id, employee)}
                    className="px-3 py-1 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:opacity-80"
                    style={{ backgroundColor: "#F36FA5" }}
                    aria-label={`Edit ${employee.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(employee.id, employee.name)}
                    className="px-3 py-1 rounded-lg text-white font-medium text-sm transition-all duration-300 hover:opacity-80"
                    style={{ backgroundColor: "#FF435B" }}
                    aria-label={`Delete ${employee.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeTable;
