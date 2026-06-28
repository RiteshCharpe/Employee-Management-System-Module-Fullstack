const AUDIT_KEY = "ems_audit_log";

export const addAuditLog = (action, employeeName) => {
  const logs = getAuditLogs();
  const newLog = {
    id: Date.now(),
    action,        // "Added", "Updated", "Deleted"
    employeeName,
    timestamp: new Date().toISOString(),
  };
  logs.unshift(newLog); // add to beginning
  localStorage.setItem(AUDIT_KEY, JSON.stringify(logs.slice(0, 50))); // keep last 50
};

export const getAuditLogs = () => {
  const data = localStorage.getItem(AUDIT_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearAuditLogs = () => {
  localStorage.removeItem(AUDIT_KEY);
};