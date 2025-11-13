package com.yash.employee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yash.employee.entity.EmployeeEntry;

public interface EmployeeEntryRepository extends JpaRepository<EmployeeEntry, Integer> {

    @Query(value = "SELECT * FROM employee ORDER BY salary DESC", nativeQuery = true)
    List<EmployeeEntry> findAllBySalaryDesc();

    @Query(value = "SELECT * FROM employee ORDER BY id DESC LIMIT :size OFFSET :offset", nativeQuery = true)
    List<EmployeeEntry> findAllEmployeesPaginated(@Param("size") int size, @Param("offset") int offset);

    @Query(value = """
    SELECT * FROM employee
    WHERE (:name IS NULL OR :name = '' OR LOWER(name) LIKE LOWER(CONCAT('%', :name, '%')))
    ORDER BY id DESC
    LIMIT :size OFFSET :offset
    """, nativeQuery = true)
    List<EmployeeEntry> searchEmployeesPaginated(@Param("name") String name,
                                             @Param("size") int size,
                                             @Param("offset") int offset);

    // @Query(value = "SELECT * FROM employee WHERE name LIKE %:name%", nativeQuery = true)
    // List<EmployeeEntry> searchByName(@Param("name") String name);

}
