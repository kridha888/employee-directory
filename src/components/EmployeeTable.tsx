import type { Employee } from "../types";

interface Props {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: number) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  if (employees.length === 0) {
    return <p className="empty">no employees yet, add above</p>;
  }

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
                {new Date(emp.created_at.replace(" ", "T")).toLocaleDateString()}
              </td>
              <td className="actions">
                <button className="btn" onClick={() => onEdit(emp)}>
                  Edit
                </button>
                <button className="btn danger" onClick={() => onDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}