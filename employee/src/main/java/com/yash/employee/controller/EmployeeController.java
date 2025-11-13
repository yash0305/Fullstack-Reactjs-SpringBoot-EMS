package com.yash.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yash.employee.entity.Employee;
import com.yash.employee.entity.EmployeeEntry;
import com.yash.employee.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/emp")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;


    @GetMapping("/page")
    public List<Employee> getAllEmployeesPaginated(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size) {

    int offset = page * size;
    return employeeRepository.findAllEmployeesPaginated(size, offset);
    }



    @PostMapping()
    public String AddEmp(
       @RequestBody Employee request
) {

    employeeRepository.addEmployee(
        request.getEmployee_name(),
        request.getManager_name(),
        request.getDepartment_name(),
        request.getSalary()
    );

    return "Employee Added Successfully";
}

    @DeleteMapping()
    public Boolean deleteEmp(
        @RequestParam("id") int id
    ){
        employeeRepository.deleteEmployee(id);
        return true;
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateEmployee(
            @PathVariable int id,
            @RequestBody Employee request) {
        
        employeeRepository.updateEmployee(
            id,
            request.getEmployee_name(),
            request.getManager_name(),
            request.getDepartment_name(),
            request.getSalary()
        );
        
        return ResponseEntity.ok("Employee updated successfully");
    }


}
