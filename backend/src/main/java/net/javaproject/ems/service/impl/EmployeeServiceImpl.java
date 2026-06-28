package net.javaproject.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaproject.ems.dto.EmployeeDto;
import net.javaproject.ems.entity.Employee;
import net.javaproject.ems.exception.ResourceNotFoundException;
import net.javaproject.ems.mapper.EmployeeMapper;
import net.javaproject.ems.repository.EmployeeRepository;
import net.javaproject.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee is not exist with given id : "+ employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees =  employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exist with given id : "+ employeeId)
        );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public EmployeeDto updateEmployeePartially(Long employeeId, Map<String, Object> updates) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        updates.forEach((key, value) -> {
            switch (key) {
                case "first_name":
                    employee.setFirstName((String) value);
                    break;
                case "last_name":
                    employee.setLastName((String) value);
                    break;
                case "department":
                    employee.setDepartment((String) value);
                case "role":
                    employee.setRole((String) value);
                    break;
                case "salary":
                    employee.setSalary(Integer.valueOf(value.toString()));
                    break;
            }
        });

        Employee updated = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updated);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        employeeRepository.deleteById(employeeId);
    }

}
