
// In-memory store for reports
// Resets when server restarts — fine for demo
const reportStore = new Map();

export function saveReport(id, report) {
  reportStore.set(id, report);
  console.log(`Report saved: ${id}`);
}

export function getReport(id) {
  return reportStore.get(id) || null;
}

export function getAllReports() {
  return Array.from(reportStore.values());
}

export function reportExists(id) {
  return reportStore.has(id);
}