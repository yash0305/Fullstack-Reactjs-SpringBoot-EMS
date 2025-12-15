import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EmployeeTable from "./components/EmployeeTable";
import Pagination from "./components/Pagination";
import AddEmployeeModal from "./components/AddEmployeeModal";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal";
import {
  SkeletonHeader,
  SkeletonSearchBar,
  SkeletonTable,
  SkeletonPagination,
} from "./components/SkeletonLoaders";
import axios from "axios";

function App() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");

  const API_BASE = "https://employee-app-production-d6c4.up.railway.app";
  // const API_BASE = "http://localhost:8080";

  const handleSearchChange = (value) => {
    setSearchText(value); // updates search text
    setPage(0); // optional: reset to first page when user searches
  };

  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (id, employee) => {
    console.log("Editing employee:", employee);
    setEmployeeToEdit(employee);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => setEmployeeToEdit(null), 200);
  };

  const handleDetailsClick = (id, employee) => {
    console.log("Viewing details for employee:", employee);
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setTimeout(() => setSelectedEmployee(null), 200);
  };

  const fetchCountOfEmployee = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/employees/count-of-employees`
      );
      setTotalEmployees(response.data);
    } catch (error) {
      console.error("Error fetching total employees:", error);
    }
  };

  const fetchAllEmployee = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE}/employees/search?name=${searchText}&page=${page}&size=${size}`
      );
      setEmployees(response.data.content || response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleSaveEmployee = async (idOrData, employeeData) => {
    try {
      if (employeeData === undefined) {
        employeeData = idOrData;
        const response = await axios.post(
          `${API_BASE}/employees`,
          employeeData
        );
        console.log("Employee added:", response.data);
      } else {
        const id = idOrData;
        const response = await axios.put(
          `${API_BASE}/employees/${id}`,
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/employees/${id}`);
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

  useEffect(() => {
    fetchCountOfEmployee();
    if (!searchText || searchText.trim() === "") {
      // Run immediately if search is empty
      fetchAllEmployee();
      return;
    }

    // Run with debounce when search has value
    const delay = setTimeout(() => {
      fetchAllEmployee();
    }, 500);

    return () => clearTimeout(delay);
  }, [page, size, refresh, searchText]);

  // Show skeleton UI during initial load
  if (initialLoading) {
    return (
      <>
        <SkeletonHeader />
        <SkeletonSearchBar />
        <SkeletonTable />
        <SkeletonPagination />
      </>
    );
  }

  return (
    <>
      <Header totalEmployees={totalEmployees} />

      <SearchBar
        handleOpenAddModal={handleOpenAddModal}
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />

      <EmployeeTable
        employees={employees}
        handleEdit={handleEditClick}
        handleDetails={handleDetailsClick}
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

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
      />

      <EmployeeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        employee={selectedEmployee}
      />
    </>
  );
}

export default App;
