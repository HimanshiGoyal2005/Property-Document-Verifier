module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/Desktop/Property-Document-Verifier/lib/store.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteReport",
    ()=>deleteReport,
    "getAllReports",
    ()=>getAllReports,
    "getReport",
    ()=>getReport,
    "reportExists",
    ()=>reportExists,
    "saveReport",
    ()=>saveReport
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const STORE_FILE = "./reports.json";
// ─── LOAD STORE FROM DISK ON STARTUP ───
function loadStore() {
    try {
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["existsSync"](STORE_FILE)) {
            const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["readFileSync"](STORE_FILE, "utf-8");
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
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["writeFileSync"](STORE_FILE, JSON.stringify(obj, null, 2), "utf-8");
    } catch (err) {
        console.error("Failed to save store to disk:", err.message);
    }
}
// ─── INITIALISE ───
const store = loadStore();
function saveReport(id, report) {
    store.set(id, report);
    saveStore(store);
    console.log(`Report saved: ${id}`);
}
function getReport(id) {
    return store.get(id) || null;
}
function reportExists(id) {
    return store.has(id);
}
function getAllReports() {
    return Array.from(store.values());
}
function deleteReport(id) {
    store.delete(id);
    saveStore(store);
    console.log(`Report deleted: ${id}`);
}
}),
"[project]/Desktop/Property-Document-Verifier/app/api/report/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
// Returns a saved report by ID
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Property-Document-Verifier/lib/store.js [app-route] (ecmascript)");
;
async function GET(request, { params }) {
    const { id } = await params;
    if (!id) {
        return Response.json({
            error: "Report ID required"
        }, {
            status: 400
        });
    }
    const report = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getReport"])(id);
    if (!report) {
        return Response.json({
            error: "Report not found"
        }, {
            status: 404
        });
    }
    return Response.json(report);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0hdd4hy._.js.map