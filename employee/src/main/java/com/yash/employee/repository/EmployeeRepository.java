package com.yash.employee.repository;
import java.util.List;

import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yash.employee.entity.Employee;

import jakarta.transaction.Transactional;


public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

    @Query(value = "SELECT * FROM rada_employee ORDER BY id DESC LIMIT ?1 OFFSET ?2", nativeQuery = true)
    List<Employee> findAllEmployeesPaginated(int size, int offset);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO rada_employee (employee_name, manager_name, department_name, salary) VALUES (:employee_name, :manager_name, :department_name, :salary)", nativeQuery = true)
    void addEmployee(
            @Param("employee_name") String employee_name,
            @Param("manager_name") String manager_name,
            @Param("department_name") String department_name,
            @Param("salary") int salary
    );

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM rada_employee WHERE id = :id", nativeQuery = true)
    void deleteEmployee(
        @Param("id") int id
    );

    @Modifying
    @Transactional
    @Query(value = "UPDATE rada_employee SET employee_name = :employee_name, manager_name = :manager_name, department_name = :department_name, salary = :salary WHERE id = :id", nativeQuery = true)
    void updateEmployee(
        @Param("id") int id,
        @Param("employee_name") String employee_name,
        @Param("manager_name") String manager_name,
        @Param("department_name") String department_name, 
        @Param("salary") Integer salary              
    );

}


