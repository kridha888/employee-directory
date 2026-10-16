export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export type EmployeeInput = Omit<Employee, "id" | "created_at">;