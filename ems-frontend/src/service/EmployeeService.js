import axios from 'axios'

const REST_API_URL = 'http://localhost:8080/api/employees'

export const listEmployees = () => axios.get(REST_API_URL);

export const CreateEmpolyee = (employee) => axios.post(REST_API_URL, employee)

export const getEmployee = (id) => axios.get(REST_API_URL+`/${id}`)

export const updateEmployee = (id, emp) => axios.put(REST_API_URL+`/${id}`, emp)

export const deleteEmployee = (id) => axios.delete(REST_API_URL+`/${id}`)


