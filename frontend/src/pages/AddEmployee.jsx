import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAuditLog } from "../utils/auditLog";
import { createEmployee } from "../services/EmployeeService";

function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEmployee(formData)
      .then(() => {
        addAuditLog("Added", `${formData.firstName} ${formData.lastName}`);
        alert("Employee added successfully!");
        navigate("/employees");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add Employee</h2>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                placeholder="John" required />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                placeholder="Doe" required />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              placeholder="john@example.com" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Department</label>
              <input name="department" value={formData.department} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                placeholder="Engineering" required />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Role</label>
              <input name="role" value={formData.role} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                placeholder="Developer" required />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Salary</label>
            <input name="salary" type="number" value={formData.salary} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              placeholder="50000" required />
          </div>
          <div className="flex gap-3 mt-2">
            <button type="submit"
              className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700">
              Save Employee
            </button>
            <button type="button" onClick={() => navigate("/employees")}
              className="text-sm px-5 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;