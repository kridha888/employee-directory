import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api";
import type { Employee, EmployeeInput } from "./types";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editing, setEditing] = useState<Employee | null>(null);

  // Show an error message in a popup
  function showError(err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      alert(err.response.data.error);
    } else {
      alert("cannot reach is your appache working");
    }
  }

  // load the list
  useEffect(() => {
    getEmployees().then((data) => setEmployees(data));
  }, []);

  // Add or update
  async function handleSubmit(data: EmployeeInput) {
    try {
      if (editing) {
        await updateEmployee(editing.id, data);
        setEditing(null);
      } else {
        await createEmployee(data);
      }
      setEmployees(await getEmployees());
    } catch (err) {
      showError(err);
    }
  }

  // Delete
  async function handleDelete(id: number) {
    if (!window.confirm("Delete this employee?")) {
      return;
    }
    try {
      await deleteEmployee(id);
      setEditing(null);
      setEmployees(await getEmployees());
    } catch (err) {
      showError(err);
    }
  }

  return (
    <div className="container">
      <h1>Employee Directory</h1>

      <EmployeeForm
        key={editing ? editing.id : "new"}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <EmployeeTable
        employees={employees}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}