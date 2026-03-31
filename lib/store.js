import * as fs from "node:fs";
import * as path from "node:path";

// On Vercel, the filesystem is read-only except for /tmp
const IS_VERCEL = process.env.VERCEL === "1";
const STORE_FILE = IS_VERCEL 
  ? path.join("/tmp", "reports.json") 
  : path.resolve(process.cwd(), "reports.json");

// ─── LOAD STORE FROM DISK ON STARTUP ───
function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      console.log(`Store loaded from ${STORE_FILE}. Reports found: ${Object.keys(parsed).length}`);
      return new Map(Object.entries(parsed));
    }
  } catch (err) {
    console.error(`Failed to load store from ${STORE_FILE}:`, err.message);
  }
  return new Map();
}

// ─── SAVE STORE TO DISK ───
function saveStore(map) {
  try {
    const obj = Object.fromEntries(map);
    fs.writeFileSync(STORE_FILE, JSON.stringify(obj, null, 2), "utf-8");
    console.log(`Store saved to ${STORE_FILE}`);
  } catch (err) {
    // On Vercel, this might still fail if /tmp is full or other issues,
    // but at least it won't crash the startup.
    console.warn(`Could not persist store to ${STORE_FILE}:`, err.message);
  }
}

// ─── INITIALISE ───
const store = loadStore();

// ─── PUBLIC API ───

export function saveReport(id, report) {
  store.set(id, report);
  saveStore(store);
  console.log(`Report added to memory: ${id}`);
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