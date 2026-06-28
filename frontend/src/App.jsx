import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import { useEffect, useState } from "react";
import AuditLog from "./pages/AuditLog";
import { getAllEmployees } from "./services/EmployeeService";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">


        {/* Sidebar */}
        <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="px-5 py-4 border-b border-gray-200">
            <p className="font-semibold text-gray-800">EMS</p>
            <p className="text-xs text-gray-400">Employee Portal</p>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 py-3">
            <NavLink to="/" end className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm ${isActive ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500 font-medium" : "text-gray-500 hover:bg-gray-50"}`
            }>
              Dashboard
            </NavLink>
            <NavLink to="/employees" className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm ${isActive ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500 font-medium" : "text-gray-500 hover:bg-gray-50"}`
            }>
              Employees
            </NavLink>
            <NavLink to="/add-employee" className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm ${isActive ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500 font-medium" : "text-gray-500 hover:bg-gray-50"}`
            }>
              Add Employee
            </NavLink>
            <NavLink to="/audit-log" className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm ${isActive ? "bg-blue-50 text-blue-600 border-l-2 border-blue-500 font-medium" : "text-gray-500 hover:bg-gray-50"}`
            }>
              Audit History
            </NavLink>
          </nav>

          {/* User */}
          <div className="px-5 py-3 border-t border-gray-200 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">R</div>
            <div>
              <p className="text-xs font-medium text-gray-800">Ritesh</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Top Navbar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <p className="font-medium text-gray-800 text-sm">Employee Management System</p>
            <div className="flex items-center gap-3 text-gray-400 text-lg">

            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/edit-employee/:id" element={<EditEmployee />} />
              <Route path="/audit-log" element={<AuditLog />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    departments: 0,
  });

  useEffect(() => {
    getAllEmployees().then((res) => {
      const employees = res.data;

      // count total employees
      const total = employees.length;

      // count unique departments
      const uniqueDepts = new Set(employees.map((emp) => emp.department)).size;

      setStats({ totalEmployees: total, departments: uniqueDepts });
    });
  }, []);

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">Total Employees</p>
          <p className="text-2xl font-semibold text-gray-800">{stats.totalEmployees}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">Departments</p>
          <p className="text-2xl font-semibold text-gray-800">{stats.departments}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">New this month</p>
          <p className="text-2xl font-semibold text-gray-800">—</p>
        </div>
      </div>
      <p className="text-sm text-gray-400">Go to Employees tab to see all records.</p>
    </div>
  );
}

export default App;