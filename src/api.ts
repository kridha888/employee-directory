import axios from "axios";
import type { Employee, EmployeeInput } from "./types";

const api = axios.create({
  baseURL: "http://localhost/employee-api",
  headers: { "Content-Type": "application/json" },
});

export const getEmployees = () =>
  api.get<Employee[]>("/index.php").then((r) => r.data);

export const createEmployee = (data: EmployeeInput) =>
  api.post<Employee>("/index.php", data).then((r) => r.data);

export const updateEmployee = (id: number, data: EmployeeInput) =>
  api.put<Employee>(`/index.php?id=${id}`, data).then((r) => r.data);

export const deleteEmployee = (id: number) =>
  api.delete(`/index.php?id=${id}`).then((r) => r.data);