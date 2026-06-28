import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/employees';

export const getAllEmployees = () => axios.get(BASE_URL);
export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createEmployee = (data) => axios.post(BASE_URL, data);
export const updateEmployee = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);