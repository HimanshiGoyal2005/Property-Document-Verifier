module.exports = [
"[project]/Desktop/Property-Document-Verifier/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PropCheckAI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Property-Document-Verifier/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Property-Document-Verifier/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const STATES = [
    "Maharashtra",
    "Karnataka",
    "Telangana",
    "Uttar Pradesh"
];
const RISK_CONFIG = {
    low: {
        label: "LOW RISK",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-800",
        dot: "bg-emerald-500",
        text: "text-emerald-700"
    },
    medium: {
        label: "MEDIUM RISK",
        bg: "bg-amber-50",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-800",
        dot: "bg-amber-500",
        text: "text-amber-700"
    },
    high: {
        label: "HIGH RISK",
        bg: "bg-orange-50",
        border: "border-orange-200",
        badge: "bg-orange-100 text-orange-800",
        dot: "bg-orange-500",
        text: "text-orange-700"
    },
    critical: {
        label: "CRITICAL RISK",
        bg: "bg-red-50",
        border: "border-red-200",
        badge: "bg-red-100 text-red-800",
        dot: "bg-red-500",
        text: "text-red-700"
    }
};
const SEV_CONFIG = {
    critical: {
        bar: "bg-red-500",
        badge: "bg-red-100 text-red-700 border-red-200",
        icon: "●",
        label: "CRITICAL"
    },
    warning: {
        bar: "bg-amber-400",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        icon: "▲",
        label: "WARNING"
    },
    info: {
        bar: "bg-blue-400",
        badge: "bg-blue-100 text-blue-700 border-blue-200",
        icon: "ℹ",
        label: "INFO"
    }
};
const STEPS = [
    {
        id: "step_1",
        label: "Reading documents",
        sub: "Gemini Vision extracts all fields"
    },
    {
        id: "step_2",
        label: "Cross-referencing",
        sub: "Comparing fields across documents"
    },
    {
        id: "step_3",
        label: "State compliance check",
        sub: "Verifying mandatory documents"
    },
    {
        id: "step_4",
        label: "Generating report",
        sub: "Calculating risk and recommendations"
    }
];
// ── GLOBAL STYLES ──────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --cream: #F5F0E8;
    --ink: #0D1117;
    --navy: #0F2744;
    --gold: #B8965A;
    --muted: #6B7280;
    --border: #E5E0D5;
    --surface: #FEFCF8;
  }
 
  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: var(--cream);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
  }
 
  .serif { font-family: 'Instrument Serif', Georgia, serif; }
 
  .drop-zone {
    border: 1.5px dashed var(--border);
    border-radius: 14px;
    background: var(--surface);
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .drop-zone::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(15,39,68,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .drop-zone:hover, .drop-zone.active {
    border-color: var(--navy);
    background: #F0F4FF;
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(15,39,68,0.08);
  }
 
  .btn-primary {
    background: var(--navy);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 0.01em;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.06), transparent);
    pointer-events: none;
  }
  .btn-primary:hover:not(:disabled) {
    background: #0a1e35;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(15,39,68,0.28);
  }
  .btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
 
  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    padding: 8px 16px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn-ghost:hover { background: white; border-color: #9CA3AF; color: var(--ink); }
 
  .state-select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--ink);
    appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .state-select:focus {
    border-color: var(--navy);
    box-shadow: 0 0 0 3px rgba(15,39,68,0.08);
  }
 
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.7; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
 
  .anim-up   { animation: fadeUp 0.5s ease both; }
  .anim-in   { animation: fadeIn 0.4s ease both; }
  .spinner   { animation: spin 0.75s linear infinite; }
  .pulse-dot { animation: pulse-dot 1.4s ease-in-out infinite; }
 
  .shimmer-bg {
    background: linear-gradient(90deg, #ede8df 25%, #e3ddd3 50%, #ede8df 75%);
    background-size: 800px 100%;
    animation: shimmer 1.6s infinite linear;
    border-radius: 6px;
  }
 
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.04);
  }
 
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D1C9BA; border-radius: 10px; }
 
  details > summary { cursor: pointer; list-style: none; user-select: none; }
  details > summary::-webkit-details-marker { display: none; }
`;
// ── COMPONENTS ─────────────────────────────────────────────────────────────────
function Logo({ compact }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: compact ? 34 : 42,
                    height: compact ? 34 : 42,
                    borderRadius: 10,
                    background: "var(--navy)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(15,39,68,0.25)",
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: compact ? 17 : 21,
                    height: compact ? 17 : 21,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "white",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "serif",
                        style: {
                            fontSize: compact ? 18 : 22,
                            color: "var(--navy)",
                            lineHeight: 1,
                            fontWeight: 400
                        },
                        children: [
                            "PropCheck ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--gold)"
                                },
                                children: "AI"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 201,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: "var(--muted)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginTop: 2
                        },
                        children: "Property verification in 60 seconds"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
function UploadZone({ files, setFiles }) {
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFiles = (incoming)=>{
        const valid = Array.from(incoming).filter((f)=>[
                "application/pdf",
                "image/jpeg",
                "image/png",
                "image/webp"
            ].includes(f.type));
        setFiles((prev)=>{
            const existing = new Set(prev.map((f)=>f.name));
            return [
                ...prev,
                ...valid.filter((f)=>!existing.has(f.name))
            ].slice(0, 10);
        });
    };
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
    }, []);
    const onDragOver = (e)=>{
        e.preventDefault();
        setDragging(true);
    };
    const onDragLeave = ()=>setDragging(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `drop-zone ${dragging ? "active" : ""}`,
                style: {
                    padding: "32px 24px",
                    textAlign: "center"
                },
                onClick: ()=>inputRef.current?.click(),
                onDrop: onDrop,
                onDragOver: onDragOver,
                onDragLeave: onDragLeave,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "file",
                        multiple: true,
                        accept: ".pdf,.jpg,.jpeg,.png,.webp",
                        style: {
                            display: "none"
                        },
                        onChange: (e)=>handleFiles(e.target.files)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: "rgba(15,39,68,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 14px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "22",
                            height: "22",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "var(--navy)",
                            strokeWidth: "1.75",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                    points: "17 8 12 3 7 8"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "12",
                                    y1: "3",
                                    x2: "12",
                                    y2: "15"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 252,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--ink)",
                            marginBottom: 4
                        },
                        children: dragging ? "Drop documents here" : "Upload property documents"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 12,
                            color: "var(--muted)"
                        },
                        children: "PDF, JPG, PNG, WEBP · Up to 10 files"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6
                },
                children: files.map((file, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "9px 14px",
                            background: "white",
                            borderRadius: 10,
                            border: "1px solid var(--border)",
                            fontSize: 13
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 28,
                                            height: 28,
                                            borderRadius: 6,
                                            background: "rgba(15,39,68,0.06)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "13",
                                            height: "13",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "var(--navy)",
                                            strokeWidth: "2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                    lineNumber: 282,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                    points: "14 2 14 8 20 8"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                    lineNumber: 283,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 281,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--ink)",
                                            fontWeight: 500,
                                            maxWidth: 220,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        },
                                        children: file.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 286,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 275,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    setFiles((f)=>f.filter((_, j)=>j !== i));
                                },
                                style: {
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "var(--muted)",
                                    padding: "2px 4px",
                                    fontSize: 16,
                                    lineHeight: 1
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 290,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 270,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 268,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
function AgentProgress({ stepStatuses }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        style: {
            padding: "28px 28px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--muted)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: 4
                        },
                        children: "Analysis Running"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "serif",
                        style: {
                            fontSize: 22,
                            color: "var(--navy)"
                        },
                        children: "Verifying your documents..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 0
                },
                children: STEPS.map((step, i)=>{
                    const status = stepStatuses[step.id] || "pending";
                    const isDone = status === "done";
                    const isRunning = status === "running";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            padding: "14px 0",
                            borderBottom: i < STEPS.length - 1 ? "1px solid var(--border)" : "none",
                            opacity: status === "pending" ? 0.4 : 1,
                            transition: "opacity 0.3s ease"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 34,
                                    height: 34,
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: isDone ? "var(--navy)" : isRunning ? "rgba(15,39,68,0.08)" : "rgba(0,0,0,0.04)",
                                    border: isRunning ? "1.5px solid var(--navy)" : "1.5px solid transparent",
                                    transition: "all 0.3s ease"
                                },
                                children: isDone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "white",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "20 6 9 17 4 12"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 337,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 336,
                                    columnNumber: 19
                                }, this) : isRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "spinner",
                                    style: {
                                        width: 14,
                                        height: 14,
                                        border: "2px solid rgba(15,39,68,0.2)",
                                        borderTop: "2px solid var(--navy)",
                                        borderRadius: "50%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 340,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        background: "#CBD5E1"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 345,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 328,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "var(--ink)",
                                            lineHeight: 1.3
                                        },
                                        children: step.label
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 12,
                                            color: "var(--muted)",
                                            marginTop: 2
                                        },
                                        children: step.sub
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 353,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 349,
                                columnNumber: 15
                            }, this),
                            isDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#059669",
                                    letterSpacing: "0.04em"
                                },
                                children: "DONE"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 359,
                                columnNumber: 17
                            }, this),
                            isRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pulse-dot",
                                style: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "var(--navy)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 364,
                                columnNumber: 17
                            }, this)
                        ]
                    }, step.id, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 321,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
function RiskBanner({ report }) {
    const cfg = RISK_CONFIG[report.overall_risk] || RISK_CONFIG.low;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 24,
            background: report.overall_risk === "critical" ? "#FFF1F2" : report.overall_risk === "high" ? "#FFF7ED" : "#F0FDF4",
            border: `1.5px solid ${report.overall_risk === "critical" ? "#FECDD3" : report.overall_risk === "high" ? "#FED7AA" : "#BBF7D0"}`
        },
        className: "anim-up",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1,
                        minWidth: 260
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "5px 12px",
                                        borderRadius: 999,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        background: report.overall_risk === "critical" ? "#DC2626" : report.overall_risk === "high" ? "#EA580C" : "#16A34A",
                                        color: "white"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: 6,
                                                height: 6,
                                                borderRadius: "50%",
                                                background: "rgba(255,255,255,0.7)",
                                                display: "inline-block"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 396,
                                            columnNumber: 15
                                        }, this),
                                        cfg.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        color: "var(--muted)"
                                    },
                                    children: [
                                        report.state,
                                        " · ",
                                        new Date(report.created_at).toLocaleDateString("en-IN", {
                                            dateStyle: "medium"
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 399,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 15,
                                color: "var(--ink)",
                                lineHeight: 1.7,
                                maxWidth: 540
                            },
                            children: report.summary
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                    lineNumber: 387,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 24,
                        flexShrink: 0
                    },
                    children: [
                        {
                            val: report.critical_count,
                            label: "Critical",
                            color: "#DC2626"
                        },
                        {
                            val: report.warning_count,
                            label: "Warnings",
                            color: "#D97706"
                        },
                        {
                            val: report.flag_count,
                            label: "Total",
                            color: "var(--ink)"
                        }
                    ].map(({ val, label, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 32,
                                        fontWeight: 700,
                                        color,
                                        lineHeight: 1
                                    },
                                    children: val
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 415,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: "var(--muted)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        marginTop: 4
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 416,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 414,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                    lineNumber: 408,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
            lineNumber: 386,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 380,
        columnNumber: 5
    }, this);
}
function FlagCard({ flag }) {
    const cfg = SEV_CONFIG[flag.severity] || SEV_CONFIG.info;
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderRadius: 12,
            background: "white",
            border: "1px solid var(--border)",
            overflow: "hidden",
            transition: "box-shadow 0.2s"
        },
        onMouseEnter: (e)=>e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)",
        onMouseLeave: (e)=>e.currentTarget.style.boxShadow = "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 3,
                    background: flag.severity === "critical" ? "#DC2626" : flag.severity === "warning" ? "#F59E0B" : "#3B82F6"
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 439,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            marginBottom: 6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "2px 9px",
                                                    borderRadius: 999,
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    letterSpacing: "0.06em",
                                                    border: "1px solid"
                                                },
                                                className: cfg.badge,
                                                children: cfg.label
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 445,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 12,
                                                    color: "var(--muted)",
                                                    fontFamily: "monospace"
                                                },
                                                children: flag.field
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 451,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 444,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 14,
                                            color: "var(--ink)",
                                            lineHeight: 1.6
                                        },
                                        children: flag.description
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 455,
                                        columnNumber: 13
                                    }, this),
                                    flag.values && flag.values.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            marginTop: 10,
                                            flexWrap: "wrap"
                                        },
                                        children: flag.values.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "3px 10px",
                                                    borderRadius: 6,
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    background: i === 0 ? "rgba(15,39,68,0.06)" : "rgba(220,38,38,0.08)",
                                                    color: i === 0 ? "var(--navy)" : "#DC2626",
                                                    fontFamily: "monospace"
                                                },
                                                children: v
                                            }, i, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 462,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 460,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 443,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen(!open),
                                style: {
                                    flexShrink: 0,
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: 18,
                                    color: "var(--muted)",
                                    padding: "2px 6px",
                                    transform: open ? "rotate(180deg)" : "none",
                                    transition: "transform 0.2s"
                                },
                                children: "↓"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 475,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this),
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 14,
                            paddingTop: 14,
                            borderTop: "1px solid var(--border)"
                        },
                        className: "anim-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: "var(--muted)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    marginBottom: 6
                                },
                                children: "Recommendation"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 488,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: "var(--ink)",
                                    lineHeight: 1.7
                                },
                                children: flag.recommendation
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 491,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 485,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 441,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 432,
        columnNumber: 5
    }, this);
}
function TitleChain({ chain, continuous }) {
    if (!chain || chain.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            style: {
                fontSize: 13,
                color: "var(--muted)",
                fontStyle: "italic"
            },
            children: "No deed chain found"
        }, void 0, false, {
            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
            lineNumber: 503,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8
        },
        children: chain.map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "12px 16px",
                            borderRadius: 12,
                            background: "rgba(15,39,68,0.05)",
                            border: "1px solid var(--border)",
                            textAlign: "center",
                            minWidth: 140
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "var(--navy)"
                                },
                                children: link.owner
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 515,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: "var(--muted)",
                                    marginTop: 3
                                },
                                children: link.date
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 516,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    color: "var(--gold)",
                                    marginTop: 2,
                                    fontWeight: 500
                                },
                                children: link.doc
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 517,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 510,
                        columnNumber: 11
                    }, this),
                    i < chain.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center"
                        },
                        children: continuous ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "16",
                            viewBox: "0 0 24 12",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0 6h20M15 1l5 5-5 5",
                                stroke: "#059669",
                                strokeWidth: "2",
                                strokeLinecap: "round"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 524,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 523,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "16",
                                    viewBox: "0 0 24 12",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M0 6h20M15 1l5 5-5 5",
                                        stroke: "#DC2626",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeDasharray: "4 2"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 529,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 528,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 9,
                                        color: "#DC2626",
                                        fontWeight: 700,
                                        letterSpacing: "0.05em"
                                    },
                                    children: "GAP"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 531,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 527,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 521,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 509,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 507,
        columnNumber: 5
    }, this);
}
function ComplianceChecklist({ compliance }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 0
                },
                children: compliance.mandatory_required?.map((doc, i)=>{
                    const uploaded = !compliance.missing_documents?.includes(doc);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "11px 0",
                            borderBottom: i < compliance.mandatory_required.length - 1 ? "1px solid var(--border)" : "none"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: uploaded ? "rgba(5,150,105,0.1)" : "rgba(220,38,38,0.1)"
                                },
                                children: uploaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "11",
                                    height: "11",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "#059669",
                                    strokeWidth: "3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                        points: "20 6 9 17 4 12"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 561,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 560,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "11",
                                    height: "11",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "#DC2626",
                                    strokeWidth: "3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "18",
                                            y1: "6",
                                            x2: "6",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 565,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "6",
                                            y1: "6",
                                            x2: "18",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 565,
                                            columnNumber: 58
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 564,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 554,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 14,
                                    color: uploaded ? "var(--ink)" : "#DC2626",
                                    fontWeight: uploaded ? 400 : 500
                                },
                                children: doc
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 569,
                                columnNumber: 15
                            }, this),
                            !uploaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    marginLeft: "auto",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "#DC2626",
                                    letterSpacing: "0.05em"
                                },
                                children: "MISSING"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 573,
                                columnNumber: 17
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 549,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 545,
                columnNumber: 7
            }, this),
            compliance.notes?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 16,
                    padding: "14px 16px",
                    background: "rgba(15,39,68,0.03)",
                    borderRadius: 10,
                    borderLeft: "3px solid var(--navy)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            color: "var(--navy)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: 8
                        },
                        children: [
                            "State Notes — ",
                            compliance.state
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 584,
                        columnNumber: 11
                    }, this),
                    compliance.notes.map((note, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 12,
                                color: "var(--muted)",
                                lineHeight: 1.6,
                                marginBottom: 4
                            },
                            children: [
                                "· ",
                                note
                            ]
                        }, i, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 588,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 583,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 544,
        columnNumber: 5
    }, this);
}
function DocumentCard({ doc }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const confColor = {
        high: "#059669",
        medium: "#D97706",
        low: "#DC2626"
    }[doc.confidence] || "#6B7280";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            border: "1px solid var(--border)",
            borderRadius: 12,
            background: "white",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                style: {
                    width: "100%",
                    padding: "14px 18px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    textAlign: "left"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: 8,
                                    background: "rgba(15,39,68,0.06)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "15",
                                    height: "15",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "var(--navy)",
                                    strokeWidth: "2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 617,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                            points: "14 2 14 8 20 8"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 618,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 616,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 612,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "var(--ink)"
                                        },
                                        children: doc.doc_type
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 622,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 11,
                                            color: "var(--muted)",
                                            marginTop: 2
                                        },
                                        children: [
                                            "Confidence: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: confColor,
                                                    fontWeight: 600
                                                },
                                                children: doc.confidence?.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 624,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 623,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 621,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 611,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 16,
                            color: "var(--muted)",
                            transform: open ? "rotate(180deg)" : "none",
                            transition: "transform 0.2s"
                        },
                        children: "↓"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 606,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "0 18px 18px",
                    borderTop: "1px solid var(--border)"
                },
                className: "anim-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingTop: 14,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px 24px"
                    },
                    children: [
                        [
                            "Seller",
                            doc.parties?.seller?.name
                        ],
                        [
                            "Buyer",
                            doc.parties?.buyer?.name
                        ],
                        [
                            "Gat / Survey",
                            doc.property?.survey_number
                        ],
                        [
                            "Area",
                            doc.property?.area_sqft
                        ],
                        [
                            "District",
                            doc.property?.district
                        ],
                        [
                            "Locality",
                            doc.property?.locality
                        ],
                        [
                            "Amount",
                            doc.transaction?.consideration_amount
                        ],
                        [
                            "Date",
                            doc.transaction?.registration_date
                        ],
                        [
                            "Reg. No.",
                            doc.transaction?.registration_number
                        ]
                    ].filter(([, v])=>v).map(([label, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: "var(--muted)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.07em",
                                        marginBottom: 2
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 646,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: "var(--ink)",
                                        fontWeight: 500
                                    },
                                    children: value
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 649,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 645,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                    lineNumber: 633,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 632,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 603,
        columnNumber: 5
    }, this);
}
function SectionTitle({ children, count, countColor }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em"
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 662,
                columnNumber: 7
            }, this),
            count !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 12,
                    fontWeight: 700,
                    color: countColor || "var(--muted)"
                },
                children: count
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 666,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 661,
        columnNumber: 5
    }, this);
}
// ── UPLOAD PAGE ────────────────────────────────────────────────────────────────
function UploadPage({ onAnalyse }) {
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stepStatuses, setStepStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const canAnalyse = files.length > 0 && selectedState;
    const handleAnalyse = async ()=>{
        setLoading(true);
        setError(null);
        setStepStatuses({});
        try {
            // Build multipart form data
            const formData = new FormData();
            files.forEach((f)=>formData.append("documents", f));
            formData.append("state", selectedState);
            // Call the real SSE endpoint — do NOT set Content-Type header
            const response = await fetch("/api/analyse", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            // Read the SSE stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                const text = decoder.decode(value);
                const lines = text.split("\n").filter((l)=>l.startsWith("data:"));
                for (const line of lines){
                    let data;
                    try {
                        data = JSON.parse(line.replace("data: ", "").trim());
                    } catch  {
                        continue; // skip malformed lines
                    }
                    if (data.error) {
                        throw new Error(data.message || "Pipeline failed");
                    }
                    if (data.done && data.reportId) {
                        // Pipeline finished — fetch the full report
                        const reportRes = await fetch(`/api/report/${data.reportId}`);
                        if (!reportRes.ok) throw new Error("Failed to fetch report");
                        const report = await reportRes.json();
                        onAnalyse(report);
                        return;
                    }
                    // Update step progress
                    if (data.step) {
                        setStepStatuses((prev)=>({
                                ...prev,
                                [data.step]: data.status
                            }));
                    }
                }
            }
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
            setLoading(false);
            setStepStatuses({});
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                background: "var(--cream)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: 520
                },
                className: "anim-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 32
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 754,
                            columnNumber: 45
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 754,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AgentProgress, {
                        stepStatuses: stepStatuses
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 755,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 16,
                            padding: "14px 18px",
                            background: "#FFF1F2",
                            border: "1px solid #FECDD3",
                            borderRadius: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: "#DC2626",
                                    fontWeight: 500
                                },
                                children: [
                                    "⚠ ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 761,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setLoading(false);
                                    setError(null);
                                    setStepStatuses({});
                                },
                                style: {
                                    marginTop: 10,
                                    fontSize: 12,
                                    color: "#DC2626",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                },
                                children: "Go back and try again"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 762,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 757,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 753,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
            lineNumber: 752,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "var(--cream)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderBottom: "1px solid var(--border)",
                    background: "var(--surface)",
                    padding: "16px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 782,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",
                                    background: "#10B981"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 784,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 12,
                                    color: "var(--muted)",
                                    fontWeight: 500
                                },
                                children: "AI Pipeline Ready"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 785,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 783,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 778,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "64px 24px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 64,
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "anim-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "6px 14px",
                                    borderRadius: 999,
                                    background: "rgba(15,39,68,0.06)",
                                    border: "1px solid var(--border)",
                                    marginBottom: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 7,
                                            height: 7,
                                            borderRadius: "50%",
                                            background: "var(--navy)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 794,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "var(--navy)",
                                            letterSpacing: "0.06em",
                                            textTransform: "uppercase"
                                        },
                                        children: "Track 2 — Agentic AI"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 795,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 793,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "serif",
                                style: {
                                    fontSize: 46,
                                    color: "var(--navy)",
                                    lineHeight: 1.1,
                                    marginBottom: 20,
                                    fontWeight: 400
                                },
                                children: [
                                    "Property verification",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 801,
                                        columnNumber: 34
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        style: {
                                            color: "var(--gold)"
                                        },
                                        children: "in 60 seconds."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 802,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 800,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 16,
                                    color: "var(--muted)",
                                    lineHeight: 1.8,
                                    marginBottom: 36,
                                    maxWidth: 400
                                },
                                children: "Upload your sale deed, encumbrance certificate, and supporting documents. Our AI agent cross-references every field, checks state compliance, and flags every inconsistency."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 805,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 14
                                },
                                children: [
                                    {
                                        icon: "📄",
                                        text: "Reads scanned, handwritten, and regional language documents"
                                    },
                                    {
                                        icon: "🔍",
                                        text: "Detects survey number mismatches, broken title chains, name variations"
                                    },
                                    {
                                        icon: "📋",
                                        text: "Checks state-specific mandatory document requirements"
                                    }
                                ].map(({ icon, text })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 16,
                                                    flexShrink: 0
                                                },
                                                children: icon
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 816,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 14,
                                                    color: "var(--muted)",
                                                    lineHeight: 1.6
                                                },
                                                children: text
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 817,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, text, true, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 815,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 809,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 792,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "anim-up",
                        style: {
                            animationDelay: "0.1s"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            style: {
                                padding: "32px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "serif",
                                    style: {
                                        fontSize: 22,
                                        color: "var(--navy)",
                                        marginBottom: 6,
                                        fontWeight: 400
                                    },
                                    children: "Verify Documents"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 826,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: "var(--muted)",
                                        marginBottom: 28,
                                        lineHeight: 1.6
                                    },
                                    children: "Upload documents and select your state to begin the AI verification pipeline."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 829,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 22
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: "block",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: "var(--ink)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em",
                                                marginBottom: 10
                                            },
                                            children: "Property Documents"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 834,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadZone, {
                                            files: files,
                                            setFiles: setFiles
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 837,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 833,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 28
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: "block",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: "var(--ink)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em",
                                                marginBottom: 10
                                            },
                                            children: "Property State"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 841,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: "relative"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "state-select",
                                                    value: selectedState,
                                                    onChange: (e)=>setSelectedState(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select state..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                            lineNumber: 846,
                                                            columnNumber: 19
                                                        }, this),
                                                        STATES.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                children: s
                                                            }, s, false, {
                                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                                lineNumber: 847,
                                                                columnNumber: 36
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                    lineNumber: 845,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    style: {
                                                        position: "absolute",
                                                        right: 14,
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                        pointerEvents: "none"
                                                    },
                                                    width: "14",
                                                    height: "14",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "var(--muted)",
                                                    strokeWidth: "2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                        points: "6 9 12 15 18 9"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                        lineNumber: 851,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                    lineNumber: 849,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 844,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 840,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn-primary",
                                    disabled: !canAnalyse,
                                    onClick: handleAnalyse,
                                    style: {
                                        width: "100%",
                                        padding: "14px 24px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "white",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 859,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 858,
                                            columnNumber: 15
                                        }, this),
                                        "Run PropCheck Analysis"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 856,
                                    columnNumber: 13
                                }, this),
                                !canAnalyse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        textAlign: "center",
                                        fontSize: 12,
                                        color: "var(--muted)",
                                        marginTop: 10
                                    },
                                    children: files.length === 0 ? "Upload at least one document to continue" : "Select a state to continue"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 865,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 14,
                                        padding: "12px 16px",
                                        background: "#FFF1F2",
                                        border: "1px solid #FECDD3",
                                        borderRadius: 8
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 12,
                                            color: "#DC2626"
                                        },
                                        children: [
                                            "⚠ ",
                                            error
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 872,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 871,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 825,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 824,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 789,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 776,
        columnNumber: 5
    }, this);
}
// ── RESULTS PAGE ───────────────────────────────────────────────────────────────
function ResultsPage({ report, onBack }) {
    const handleDownload = ()=>{
        const lines = [];
        lines.push("PROPCHECK AI — VERIFICATION REPORT");
        lines.push("=".repeat(50));
        lines.push(`Report ID : ${report.id}`);
        lines.push(`State     : ${report.state}`);
        lines.push(`Date      : ${new Date(report.created_at).toLocaleString("en-IN")}`);
        lines.push(`Risk Level: ${report.overall_risk.toUpperCase()}`);
        lines.push("");
        lines.push("SUMMARY");
        lines.push("-".repeat(50));
        lines.push(report.summary);
        lines.push("");
        lines.push(`FLAGS (${report.flag_count} total · ${report.critical_count} critical · ${report.warning_count} warnings)`);
        lines.push("-".repeat(50));
        report.all_flags.forEach((f, i)=>{
            lines.push(`${i + 1}. [${f.severity.toUpperCase()}] ${f.field}`);
            lines.push(`   ${f.description}`);
            if (f.values?.length) lines.push(`   Values: ${f.values.join(" vs ")}`);
            if (f.recommendation) lines.push(`   → ${f.recommendation}`);
            lines.push("");
        });
        lines.push("COMPLIANCE");
        lines.push("-".repeat(50));
        lines.push(`Status: ${report.compliance.compliant ? "Compliant" : "Non-Compliant"}`);
        if (report.compliance.missing_documents?.length) {
            lines.push(`Missing: ${report.compliance.missing_documents.join(", ")}`);
        }
        lines.push("");
        lines.push("DOCUMENTS ANALYSED");
        lines.push("-".repeat(50));
        report.documents.forEach((doc, i)=>{
            lines.push(`${i + 1}. ${doc.doc_type} (confidence: ${doc.confidence})`);
            if (doc.parties?.seller?.name) lines.push(`   Seller : ${doc.parties.seller.name}`);
            if (doc.parties?.buyer?.name) lines.push(`   Buyer  : ${doc.parties.buyer.name}`);
            if (doc.property?.survey_number) lines.push(`   Survey : ${doc.property.survey_number}`);
            if (doc.transaction?.registration_date) lines.push(`   Date   : ${doc.transaction.registration_date}`);
            lines.push("");
        });
        lines.push("PropCheck AI — For informational purposes only. Obtain independent legal advice before transacting.");
        const blob = new Blob([
            lines.join("\n")
        ], {
            type: "text/plain"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `propcheck-report-${report.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            background: "var(--cream)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderBottom: "1px solid var(--border)",
                    background: "var(--surface)",
                    padding: "14px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "sticky",
                    top: 0,
                    zIndex: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {
                        compact: true
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 942,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-ghost",
                                onClick: handleDownload,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "13",
                                        height: "13",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 946,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: "7 10 12 15 17 10"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 947,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "12",
                                                y1: "15",
                                                x2: "12",
                                                y2: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                                lineNumber: 948,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 945,
                                        columnNumber: 13
                                    }, this),
                                    "Download Report"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 944,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn-ghost",
                                onClick: onBack,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "13",
                                        height: "13",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                            lineNumber: 954,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 953,
                                        columnNumber: 13
                                    }, this),
                                    "New Analysis"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 952,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 943,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 937,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 820,
                    margin: "0 auto",
                    padding: "40px 24px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RiskBanner, {
                        report: report
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 963,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card anim-up",
                        style: {
                            padding: "24px 28px",
                            marginBottom: 20
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                count: `${report.flag_count} found`,
                                countColor: "#DC2626",
                                children: "Issues Found"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 967,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10
                                },
                                children: report.all_flags.map((flag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagCard, {
                                        flag: flag
                                    }, i, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 971,
                                        columnNumber: 48
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 970,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 966,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card anim-up",
                        style: {
                            padding: "24px 28px",
                            marginBottom: 20,
                            animationDelay: "0.05s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                count: report.cross_reference.is_title_chain_continuous ? "✓ Continuous" : "✗ Broken",
                                countColor: report.cross_reference.is_title_chain_continuous ? "#059669" : "#DC2626",
                                children: "Title Chain"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 977,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleChain, {
                                chain: report.cross_reference.title_chain,
                                continuous: report.cross_reference.is_title_chain_continuous
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 983,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 976,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card anim-up",
                        style: {
                            padding: "24px 28px",
                            marginBottom: 20,
                            animationDelay: "0.1s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                count: report.compliance.compliant ? "✓ Compliant" : "✗ Non-Compliant",
                                countColor: report.compliance.compliant ? "#059669" : "#DC2626",
                                children: [
                                    report.compliance.state,
                                    " State Compliance"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 991,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ComplianceChecklist, {
                                compliance: report.compliance
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 997,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 990,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card anim-up",
                        style: {
                            padding: "24px 28px",
                            marginBottom: 20,
                            animationDelay: "0.15s"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                                count: report.documents.length,
                                children: "Uploaded Documents"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 1002,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8
                                },
                                children: report.documents.map((doc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DocumentCard, {
                                        doc: doc
                                    }, doc.id, false, {
                                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                        lineNumber: 1006,
                                        columnNumber: 44
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                lineNumber: 1005,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 1001,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            padding: "16px 0 32px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 11,
                                color: "var(--muted)",
                                lineHeight: 1.8
                            },
                            children: [
                                "Report ID: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    style: {
                                        background: "white",
                                        padding: "2px 7px",
                                        borderRadius: 4,
                                        border: "1px solid var(--border)",
                                        fontFamily: "monospace"
                                    },
                                    children: report.id
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 1013,
                                    columnNumber: 24
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                                    lineNumber: 1016,
                                    columnNumber: 13
                                }, this),
                                "PropCheck AI · This report is for informational purposes only. Always obtain independent legal opinion before transacting."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                            lineNumber: 1012,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                        lineNumber: 1011,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 961,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
        lineNumber: 935,
        columnNumber: 5
    }, this);
}
function PropCheckAI() {
    const [report, setReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: GLOBAL_CSS
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 1031,
                columnNumber: 7
            }, this),
            !report ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadPage, {
                onAnalyse: setReport
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 1033,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Property$2d$Document$2d$Verifier$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultsPage, {
                report: report,
                onBack: ()=>setReport(null)
            }, void 0, false, {
                fileName: "[project]/Desktop/Property-Document-Verifier/app/page.js",
                lineNumber: 1034,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=Desktop_Property-Document-Verifier_app_page_02twt~_.js.map