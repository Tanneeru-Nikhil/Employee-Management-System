package net.javaguides.ems.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto CreateEmployee(EmployeeDto emp){
        // Map DTO to Entity
        Employee newEmp =  EmployeeMapper.maptoEmployee(emp);
        // Save Entity to Database
        Employee savedEmp = employeeRepository.save(newEmp);
         // Map saved Entity back to DTO
        return EmployeeMapper.maptoEmployeeDto(savedEmp);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map(e -> EmployeeMapper.maptoEmployeeDto(e)).collect(Collectors.toList());

    }

    @Override
    public EmployeeDto GetById(Integer id) {
        Employee emp = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Not Found " +id));
        return EmployeeMapper.maptoEmployeeDto(emp);
    }

    @Override
    public EmployeeDto UpdateEmployeeByID(Integer id, EmployeeDto employeeDto) {
        Employee emp = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found to Update the Data" +id));
        emp.setFirstName(employeeDto.getFirstName());
        emp.setLastName(employeeDto.getLastName());
        emp.setEmail(employeeDto.getEmail());

        Employee updatedEmp = employeeRepository.save(emp);
        return EmployeeMapper.maptoEmployeeDto(updatedEmp);
    }

    @Override
    public void DeleteEmployeeById(Integer id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found With the Id: " + id));

        employeeRepository.delete(emp);
    }

    
}
