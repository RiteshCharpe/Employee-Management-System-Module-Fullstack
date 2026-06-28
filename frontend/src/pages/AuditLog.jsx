import { getAuditLogs, clearAuditLogs } from "../utils/auditLog";
import { useState } from "react";

function AuditLog() {
  const [logs, setLogs] = useState(getAuditLogs());

  const handleClear = () => {
    if (window.confirm("Clear all audit history?")) {
      clearAuditLogs();
      setLogs([]);
    }
  };

  const getIcon = (action) => {
    if (action === "Added") return "➕";
    if (action === "Updated") return "✏️";
    if (action === "Deleted") return "🗑️";
    return "•";
  };

  const getColor = (action) => {
    if (action === "Added") return "text-green-600 bg-green-50";
    if (action === "Updated") return "text-blue-600 bg-blue-50";
    if (action === "Deleted") return "text-red-500 bg-red-50";
    return "";
  };

  const timeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Audit History</h2>
        <button
          onClick={handleClear}
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-red-400 hover:bg-red-50">
          Clear History
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {logs.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No activity yet.</p>
        ) : (
          <ul>
            {logs.map((log) => (
              <li key={log.id} className="flex items-center justify-between px-5 py-3 border-t border-gray-100 first:border-t-0">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${getColor(log.action)}`}>
                    {getIcon(log.action)} {log.action}
                  </span>
                  <span className="text-sm text-gray-700">{log.employeeName}</span>
                </div>
                <span className="text-xs text-gray-400">{timeAgo(log.timestamp)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AuditLog;