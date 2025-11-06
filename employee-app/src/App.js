import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EmployeeTable from "./components/EmployeeTable";
import Pagination from "./components/Pagination";
import AddEmployeeModal from "./components/AddEmployeeModal";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal"; // ✅ Import Details Modal
import axios from "axios";

function App() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // ✅ Details modal state
  const [selectedEmployee, setSelectedEmployee] = useState(null); // ✅ Selected employee for details

  // ✅ Open modal for adding new employee
  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsAddModalOpen(true);
  };

  // ✅ Open modal for editing employee
  const handleEditClick = (employee) => {
    console.log("Editing employee:", employee);
    setEmployeeToEdit(employee);
    setIsAddModalOpen(true);
  };

  // ✅ Close add/edit modal
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => setEmployeeToEdit(null), 200);
  };

  // ✅ Open details modal
  const handleDetailsClick = (employee) => {
    console.log("Viewing details for employee:", employee);
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  // ✅ Close details modal
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setTimeout(() => setSelectedEmployee(null), 200);
  };

  // ✅ Fetch total count
  const fetchCountOfEmployee = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/employees/count-of-employees"
      );
      setTotalEmployees(response.data);
    } catch (error) {
      console.error("Error fetching total employees:", error);
    }
  };

  // ✅ Fetch all employees (paginated)
  const fetchAllEmployee = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/employees/page?page=${page}&size=${size}`
      );
      setEmployees(response.data.content || response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save employee (handles both add and edit)
  const handleSaveEmployee = async (idOrData, employeeData) => {
    try {
      // If only one argument, it's ADD mode
      if (employeeData === undefined) {
        employeeData = idOrData;
        const response = await axios.post(
          "http://localhost:8080/employees",
          employeeData
        );
        console.log("Employee added:", response.data);
      }
      // If two arguments, it's EDIT mode
      else {
        const id = idOrData;
        const response = await axios.put(
          `http://localhost:8080/employees/${id}`,
          employeeData
        );
        console.log("Employee updated:", response.data);
      }

      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error saving employee:", error);
      throw error;
    }
  };

  // ✅ Delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employees/${id}`);
      console.log("Employee deleted:", id);

      const remainingEmployees = totalEmployees - 1;
      const maxPage = Math.ceil(remainingEmployees / size) - 1;

      if (page > maxPage && page > 0) {
        setPage(page - 1);
      }

      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // ✅ Fetch data when component mounts or when dependencies change
  useEffect(() => {
    fetchCountOfEmployee();
    fetchAllEmployee();
  }, [page, size, refresh]);

  return (
    <>
      <Header totalEmployees={totalEmployees} />
      <SearchBar onAddClick={handleOpenAddModal} />
      <EmployeeTable
        employees={employees}
        handleEdit={handleEditClick}
        handleDetails={handleDetailsClick} // ✅ Pass details handler
        handleDelete={handleDelete}
        loading={loading}
      />
      <Pagination
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
        totalEmployees={totalEmployees}
      />

      {/* ✅ Add/Edit Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
      />

      {/* ✅ Employee Details Modal */}
      <EmployeeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        employee={selectedEmployee}
      />
    </>
  );
}

export default App;
