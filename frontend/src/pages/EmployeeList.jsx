import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { getAllEmployees, deleteEmployee } from "../services/EmployeeService";
import { addAuditLog } from "../utils/auditLog";

 function EmployeeList() {
   const [employees, setEmployees] = useState([]);
   const [search, setSearch] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
     getAllEmployees()
       .then((res) => setEmployees(res.data))
       .catch((err) => console.error(err));
   }, []);

   const handleDelete = (id) => {
     if (window.confirm("Are you sure you want to delete this employee?")) {
       const emp = employees.find(e => e.id === id);
       deleteEmployee(id)
         .then(() => {
           addAuditLog("Deleted", `${emp.firstName} ${emp.lastName}`);
           setEmployees(employees.filter(emp => emp.id !== id));
         })
         .catch((err) => console.error(err));
     }
   };

   const filtered = employees.filter((emp) =>
     `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.department} ${emp.role}`
       .toLowerCase()
       .includes(search.toLowerCase())
   );

   return (
     <div>
       <div className="flex items-center justify-between mb-4">
         <h2 className="text-lg font-medium text-gray-800">All Employees</h2>
         <div className="flex items-center gap-3">
           <input
             type="text"
             placeholder="Search employees..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 w-56"
           />
           <button
             onClick={() => navigate("/add-employee")}
             className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
             + Add Employee
           </button>
         </div>
       </div>

       <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
         <table className="w-full text-sm">
           <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
             <tr>
               <th className="px-5 py-3 text-left">ID</th>
               <th className="px-5 py-3 text-left">Name</th>
               <th className="px-5 py-3 text-left">Email</th>
               <th className="px-5 py-3 text-left">Department</th>
               <th className="px-5 py-3 text-left">Role</th>
               <th className="px-5 py-3 text-left">Salary</th>
               <th className="px-5 py-3 text-left">Actions</th>
             </tr>
           </thead>
           <tbody>
             {filtered.map((emp) => (
               <tr key={emp.id} className="border-t border-gray-100 hover:bg-gray-50">
                 <td className="px-5 py-3 text-gray-400">{emp.id}</td>
                 <td className="px-5 py-3 font-medium text-gray-800">{emp.firstName} {emp.lastName}</td>
                 <td className="px-5 py-3 text-gray-500">{emp.email}</td>
                 <td className="px-5 py-3 text-gray-500">{emp.department}</td>
                 <td className="px-5 py-3 text-gray-500">{emp.role}</td>
                 <td className="px-5 py-3 text-gray-500">₹{emp.salary?.toLocaleString()}</td>
                 <td className="px-5 py-3 flex gap-2">
                   <button
                     onClick={() => navigate(`/edit-employee/${emp.id}`)}
                     className="text-blue-500 hover:underline text-xs">
                     Edit
                   </button>
                   <button
                     onClick={() => handleDelete(emp.id)}
                     className="text-red-400 hover:underline text-xs">
                     Delete
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   );
 }

 export default EmployeeList;