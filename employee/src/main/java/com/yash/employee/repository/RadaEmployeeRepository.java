package com.yash.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yash.employee.entity.RadaEmployee;

import jakarta.transaction.Transactional;

public interface RadaEmployeeRepository extends JpaRepository<RadaEmployee, Integer>{

      // INSERT INTO rada_employee (name, manager_id, department_id, salary) VALUES ("shrinivas", 1, 2, 400000);
        @Modifying
        @Transactional
        @Query(value = "INSERT INTO rada_employee (name, manager_id, department_id, salary) " +
                    "VALUES (:name, :managerId, :departmentId, :salary)",
                nativeQuery = true)
        void addEmployee(
            @Param("name") String name,
            @Param("managerId") Integer managerId,
            @Param("departmentId") Integer departmentId,
            @Param("salary") Integer salary
        );

        // DELETE FROM rada_employee WHERE id = 19;

        @Modifying
        @Transactional
        @Query(value = "DELETE FROM rada_employee WHERE id = :id", nativeQuery = true)
        void deleteEmployeeById(
            @Param("id") Integer id
        );

        // UPDATE rada_employee SET name = "rahul", manager_id = 2, department_id = 2, salary = 50000 WHERE id = 17;

        @Modifying
        @Transactional
        @Query(value = "UPDATE rada_employee SET name = :name , manager_id = :mangerId, department_id = :departmentId, salary = :salary WHERE id = :id", nativeQuery = true)
        void updateEmployeeById(
            @Param("id") Integer id,
            @Param("name") String name,
            @Param("managerId") Integer managerId,
            @Param("departmentId") Integer departmentId,
            @Param("salary") Integer salary

        ); 

    }
