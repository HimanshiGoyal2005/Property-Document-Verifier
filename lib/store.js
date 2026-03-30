
import * as fs from "node:fs";
import * as path from "node:path";

const STORE_FILE = "./reports.json";

// ─── LOAD STORE FROM DISK ON STARTUP ───
function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      console.log(`Store loaded from disk. Reports found: ${Object.keys(parsed).length}`);
      return new Map(Object.entries(parsed));
    }
  } catch (err) {
    console.error("Failed to load store from disk. Starting fresh:", err.message);
  }
  return new Map();
}

// ─── SAVE STORE TO DISK ───
function saveStore(map) {
  try {
    const obj = Object.fromEntries(map);
    fs.writeFileSync(STORE_FILE, JSON.stringify(obj, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save store to disk:", err.message);
  }
}

// ─── INITIALISE ───
const store = loadStore();

// ─── PUBLIC API ───

export function saveReport(id, report) {
  store.set(id, report);
  saveStore(store);
  console.log(`Report saved: ${id}`);
}

export function getReport(id) {
  return store.get(id) || null;
}

export function reportExists(id) {
  return store.has(id);
}

export function getAllReports() {
  return Array.from(store.values());
}

export function deleteReport(id) {
  store.delete(id);
  saveStore(store);
  console.log(`Report deleted: ${id}`);
}