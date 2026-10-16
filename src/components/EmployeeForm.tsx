import { useState } from "react";
import type { Employee, EmployeeInput } from "../types";

interface Props {
  editing: Employee | null;
  onSubmit: (data: EmployeeInput) => Promise<void>;
  onCancel: () => void;
}

export default function EmployeeForm(props: Props) {
  const [name, setName] = useState(props.editing ? props.editing.name : "");
  const [email, setEmail] = useState(props.editing ? props.editing.email : "");
  const [role, setRole] = useState(props.editing ? props.editing.role : "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await props.onSubmit({ name: name, email: email, role: role });

    if (!props.editing) {
      setName("");
      setEmail("");
      setRole("");
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{props.editing ? "Edit Employee" : "Add Employee"}</h2>

      <input
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Job role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <div className="actions">
        <button type="submit" className="btn primary">
          {props.editing ? "Update" : "Add"}
        </button>

        {props.editing && (
          <button type="button" className="btn" onClick={props.onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}