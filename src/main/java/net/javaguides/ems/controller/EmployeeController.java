package net.javaguides.ems.controller;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.EmployeeService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class EmployeeController {
    
    private EmployeeService employeeService;
    
    @PostMapping("/api/employees")
    public ResponseEntity<EmployeeDto> CreateEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto emp = employeeService.CreateEmployee(employeeDto);
        
        return new ResponseEntity<>(emp, HttpStatus.CREATED);
    }

    @GetMapping("/api/employees")
    public ResponseEntity<List<EmployeeDto>> GetAllEmployee() {
        List<EmployeeDto> employeeDto = employeeService.getAllEmployees();
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    @GetMapping("/api/employees/{id}")
    public ResponseEntity<EmployeeDto> FindById(@PathVariable("id") Integer id){
        EmployeeDto empDto = employeeService.GetById(id);
        return ResponseEntity.ok(empDto);
    }
    
    @PutMapping("/api/employees/{id}")
    public ResponseEntity<String> UpdateEmployee(@PathVariable("id") Integer id, @RequestBody EmployeeDto employeeDto) {
        employeeService.UpdateEmployeeByID(id, employeeDto);
        return ResponseEntity.ok("Successfuly Updated");
    }

    @DeleteMapping("/api/employees/{id}")
    public ResponseEntity<String> DeleteEmployee(@PathVariable("id") Integer id){
        employeeService.DeleteEmployeeById(id);
        return ResponseEntity.ok("Delete SuccessFully");
    }

    
}
