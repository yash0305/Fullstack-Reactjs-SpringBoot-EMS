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
import com.yash.employee.entity.RadaEmployee;
import com.yash.employee.repository.EmployeeRepository;
import com.yash.employee.repository.RadaEmployeeRepository;
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

    @Autowired
    private RadaEmployeeRepository radaEmployeeRepository;
    


    @GetMapping("/page")
    public List<Employee> getAllEmployeesPaginated(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size) {

    int offset = page * size;
    return employeeRepository.findAllEmployeesPaginated(size, offset);
    }



    @PostMapping()
    public String AddEmp(
       @RequestBody RadaEmployee request
) {

    radaEmployeeRepository.addEmployee(
        request.getName(),
        request.getManagerId(),
        request.getDepartmentId(),
        request.getSalary()
    );

    return "Employee Added Successfully";
}

    @DeleteMapping("/{id}")
    public Boolean deleteEmp(@PathVariable int id){
        radaEmployeeRepository.deleteEmployeeById(id);
        return true;
    }

    
    // @PutMapping("/{id}")
    // public ResponseEntity<String> updateEmployee(
    //         @PathVariable int id, 
    //         @RequestBody Employee request) {
        
    //     radaEmployeeRepository.updateEmployeeById(
    //         id,
    //         request.getName,

    //     );
        
    //     return ResponseEntity.ok("Employee updated successfully");
    // }


}
