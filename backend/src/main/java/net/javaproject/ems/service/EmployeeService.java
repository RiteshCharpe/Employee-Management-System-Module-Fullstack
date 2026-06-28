package net.javaproject.ems.service;

import net.javaproject.ems.dto.EmployeeDto;
import net.javaproject.ems.entity.Employee;

import java.util.List;
import java.util.Map;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto>getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

    EmployeeDto updateEmployeePartially(Long employeeId, Map<String, Object> updates);

    void deleteEmployee(Long employeeId);
}
