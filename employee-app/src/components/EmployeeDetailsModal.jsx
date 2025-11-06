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
        <div className="text-center mb-6">
          <h2 className="header-title text-2xl font-bold text-gray-800 mb-4">
            Employee Details
          </h2>
          <span className="detail-id">ID: {employee.id}</span>
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
            <span className="text-gray-900 font-medium">
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

        <style jsx>{`
          .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            margin-bottom: 0.5rem;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }

          .detail-id {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 1rem;
          }

          .header-title {
            display: block;
            font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
            unicode-bidi: isolate;
            text-align: left;
          }

          .submit-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
            text-decoration: none;
            display: inline-block;
          }

          .submit-btn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          }

          .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-height: 80vh;
            overflow-y: auto;
          }

          @media (max-width: 768px) {
            .modal-content {
              width: 95%;
              padding: 1.5rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default EmployeeDetailsModal;
