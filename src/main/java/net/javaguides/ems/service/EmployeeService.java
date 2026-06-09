package net.javaguides.ems.service;

import java.util.List;

import net.javaguides.ems.dto.EmployeeDto;

public interface EmployeeService {

    EmployeeDto CreateEmployee(EmployeeDto emp);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto GetById(Integer id);

    EmployeeDto UpdateEmployeeByID(Integer id, EmployeeDto employeeDto);

    void DeleteEmployeeById(Integer id);
}
