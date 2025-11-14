package com.yash.employee.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yash.employee.entity.EmployeeEntry;
import com.yash.employee.repository.EmployeeEntryRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;






@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "https://employee-management-system-yash.netlify.app/") 
// @CrossOrigin(origins = "http://localhost:3000")
public class EmployeeEntryController {

    @Autowired
    private EmployeeEntryRepository employeeEntryRepository;

    @PostMapping
    public EmployeeEntry addNewEmp(@RequestBody EmployeeEntry emp) {
        return employeeEntryRepository.save(emp);
        
    }  
    
    @DeleteMapping("/{id}")
    public boolean deleteEmp(@PathVariable int id){
        employeeEntryRepository.deleteById(id);
        return true;
    }

    @GetMapping("/{id}")
    public Optional<EmployeeEntry> getMethodName(@PathVariable int id) {
        return employeeEntryRepository.findById(id);
    }
    
    @PutMapping("/{id}")
    public EmployeeEntry UpdateById(@PathVariable int id, @RequestBody EmployeeEntry newEmp) {
        EmployeeEntry oldEmp = employeeEntryRepository.findById(id).orElse(null);
        if(oldEmp != null){
            oldEmp.setName(newEmp.getName() != null && !newEmp.getName().equals("") ? newEmp.getName() : oldEmp.getName() );
            oldEmp.setDepartment(newEmp.getDepartment() != null && !newEmp.getDepartment().equals("") ? newEmp.getDepartment() : oldEmp.getDepartment() );
            oldEmp.setSalary(newEmp.getSalary() != null && newEmp.getSalary() != 0 ? newEmp.getSalary() : oldEmp.getSalary() );
            employeeEntryRepository.save(oldEmp);
            
        }

        return oldEmp;
    }

    @GetMapping("salary-desc")
    public List<EmployeeEntry> getSalaryInDesc() {
        return employeeEntryRepository.findAllBySalaryDesc();
    }

    @GetMapping("/count-of-employees")
    public Long getCountOfEmployee() {
        return employeeEntryRepository.count();
    }
    
    
    @GetMapping("/search")
    public List<EmployeeEntry> searchEmployeesPaginated(
        @RequestParam(required = false) String name,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size) {

        int offset = page * size;
        return employeeEntryRepository.searchEmployeesPaginated(name, size, offset);
    }

     // @GetMapping("page")
    // public List<EmployeeEntry> getAllEmployeesPaginated(
    //  @RequestParam(defaultValue = "0") int page,
    //  @RequestParam(defaultValue = "5") int size){

    //     int offset = page * size;
    //     return employeeEntryRepository.findAllEmployeesPaginated(size, offset);
    //  }
    
    
    // @GetMapping("/search")
    // public List<EmployeeEntry> searchEmployees(@RequestParam String name) {
    //     return employeeEntryRepository.searchByName(name);
    // }
    
    
    
    // @GetMapping("/page")
    // public Page<EmployeeEntry> getAllEmployeesPaged(
    //         @RequestParam(defaultValue = "0") int page,
    //         @RequestParam(defaultValue = "5") int size,
    //         @RequestParam(defaultValue = "id") String sortBy,
    //         @RequestParam(defaultValue = "desc") String order) 
    // {
        
    //     Sort sort = order.equalsIgnoreCase("desc") ?
    //                 Sort.by(sortBy).descending() :
    //                 Sort.by(sortBy).ascending();

    //     Pageable pageable = PageRequest.of(page, size, sort);
    //     return employeeEntryRepository.findAll(pageable);
        
    // }

    
    // @GetMapping
    // public List<EmployeeEntry> getAllEmployee() {
    //     return employeeEntryRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    // }
    
    
}
