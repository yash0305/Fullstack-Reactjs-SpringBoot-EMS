import React from "react";

function EmployeeDetailsModal({ isOpen, onClose, employee }) {
  if (!isOpen || !employee) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mb-6">
          <h2 className="header-title text-2xl font-bold text-gray-800">
            Employee Details
          </h2>
          <div className="detail-id">ID: {employee.id}</div>
        </div>
        {/* Details */}
        <div className="space-y-3">
          {/* Name */}
          <div className="detail-row">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-900 font-medium">{employee.name}</span>
          </div>

          {/* Department */}
          <div className="detail-row">
            <span className="font-semibold text-gray-700">Department:</span>
            <span className="text-gray-900 font-medium">
              {employee.department}
            </span>
          </div>

          {/* Salary */}
          <div className="detail-row">
            <span className="font-semibold text-gray-700">Salary:</span>
            <span className="text-gray-900 font-medium text-[#27AE60]">
              ₹{employee.salary?.toLocaleString("en-IN") || employee.salary}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="submit-btn"
            style={{
              background: "#5A6268",
              color: "white",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetailsModal;
