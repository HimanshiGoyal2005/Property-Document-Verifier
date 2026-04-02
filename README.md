# PropCheck AI — Property Document Verification

**Track 2 — Agentic AI | ProteX Hackathon 2026 | IGDTUW, Delhi**

[Live Demo](https://property-document-verifier-o9eg.vercel.app/) · [Repository](https://github.com/kanaksharma9/Hackathon-project)

---

## The Problem

Every property transaction in India involves manually cross-checking 15+ documents across 28 state formats — sale deeds, encumbrance certificates, 7/12 extracts, Index II records. One missed inconsistency can invalidate an entire transaction. PropCheck AI does this in under 60 seconds.

| Stat | Reality |
|---|---|
| 1.4 crore | Property registrations in India every year |
| 3–4 hours | Time one lawyer spends on manual document verification |
| 28 | Different document standards across Indian states |

---

## What It Does

PropCheck AI is an autonomous multi-step AI agent that verifies Indian property documents end-to-end.
```
Upload documents + select state
        ↓
Gemini Vision reads every document
(PDFs, scanned images, handwritten records, regional languages)
        ↓
Extracts 20+ structured fields per document
(names, survey numbers, areas, amounts, dates, boundaries)
        ↓
Cross-reference engine compares fields across all documents
(survey mismatches, title chain gaps, name variations)
        ↓
State compliance engine checks mandatory document requirements
(Maharashtra, Karnataka, Telangana, Uttar Pradesh)
        ↓
Due Diligence Report generated with risk rating + recommendations
```

---

## Live Demo

**→ [property-document-verifier-o9eg.vercel.app](https://property-document-verifier-o9eg.vercel.app/)**

Sample documents are in `/public/demo-documents/`. The demo runs on realistic mock data based on actual Maharashtra property documents — the full agent pipeline executes and streams live, but without hitting the Gemini API.

| Document | What it is | Issue planted |
|---|---|---|
| `1_sale_deed_maharashtra.pdf` | Sale Deed — Kishore Karande → Yash Daga | None (clean baseline) |
| `2_index_ii_maharashtra.pdf` | Index II — Maharashtra mandatory document | None |
| `3_seven_twelve_extract.pdf` | 7/12 Extract — Revenue land record | Buyer name: **YASH DAGGA** vs YASH DAGA |
| `4_encumbrance_certificate.pdf` | Encumbrance Certificate | Gat No. **10/3** vs 10/2 |

Upload all 4, select Maharashtra → PropCheck flags 2 critical issues and 2 warnings in real time.

---

## Features

### Agentic AI Pipeline
Five autonomous reasoning steps with no human in the loop. Each step depends on the previous — genuine multi-step agent reasoning, not a single API call with a long prompt.

### Multimodal Document Reading
Gemini 2.0 Flash reads PDFs, scanned images, handwritten documents, and regional language text. Extracts 20+ structured fields per document with confidence scoring.

### Cross-Reference Engine
- Survey number consistency across all documents
- Title chain continuity (buyer of deed N must match seller of deed N+1)
- Name spelling variation detection
- Suspicious consideration amount flagging
- District and locality consistency checks

### State-Specific Compliance Engine

| State | Mandatory Documents |
|---|---|
| **Maharashtra** | Sale Deed, Index II, 7/12 Extract, Encumbrance Certificate |
| **Karnataka** | Sale Deed, Encumbrance Certificate, Khata Certificate, RTC |
| **Telangana** | Sale Deed, Encumbrance Certificate, Pahani/Adangal, Link Documents |
| **Uttar Pradesh** | Sale Deed, Khatauni, Encumbrance Certificate, Jamabandi |

### Risk-Rated Reports
- Overall risk rating: LOW / MEDIUM / HIGH / CRITICAL
- Specific flags with severity, field identification, and plain English explanation
- Title chain visualisation with gap detection
- Compliance checklist per mandatory document
- Actionable recommendations for each issue

### Real-Time Streaming
Server-Sent Events stream live progress as each pipeline step completes.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 + React + Tailwind CSS |
| Backend | Next.js API Routes |
| AI Model | Gemini 2.0 Flash (multimodal vision) |
| Document Upload | Gemini File API |
| Streaming | Server-Sent Events (SSE) |
| Deployment | Vercel |

---

## Architecture
```
app/
├── page.jsx                    ← Upload UI + state selector
├── api/
│   ├── analyse/route.js        ← POST endpoint, SSE stream
│   └── report/[id]/route.js   ← GET report by ID
lib/
├── gemini.js                   ← Gemini client, upload, extraction
├── pipeline.js                 ← Main orchestration
├── cross-reference.js          ← Rule-based + Gemini cross-reference engine
├── rules.js                    ← State compliance rules engine
└── store.js                    ← In-memory report storage
public/
└── demo-documents/             ← 4 sample Maharashtra property documents
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Google AI Studio API key (free at [aistudio.google.com](https://aistudio.google.com))

### Setup
```bash
git clone https://github.com/kanaksharma9/Hackathon-project
cd Hackathon-project/devscroll-backend
npm install
echo "GEMINI_API_KEY=your_key_here" > .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Sample Output
```json
{
  "id": "e479fab9-3a8b-43be-906a-8bb9bb0b8a49",
  "state": "Maharashtra",
  "overall_risk": "critical",
  "flag_count": 4,
  "critical_count": 2,
  "warning_count": 2,
  "summary": "2 critical issues require immediate attention. 2 warnings should be reviewed.",
  "all_flags": [
    {
      "severity": "critical",
      "field": "property.survey_number",
      "values": ["10/2", "10/3"],
      "description": "Survey numbers do not match across documents.",
      "recommendation": "Verify correct Gat number with Sub-Registrar, Dapoli."
    },
    {
      "severity": "warning",
      "field": "parties.buyer.name",
      "values": ["YASH DAGA", "YASH DAGGA"],
      "description": "Buyer name spelling differs between Sale Deed and 7/12 Extract.",
      "recommendation": "Request original ID proof to confirm identity."
    }
  ],
  "compliance": {
    "compliant": false,
    "missing_documents": ["Index II"],
    "stamp_duty_rate": "5%"
  }
}
```

---

## Challenges

**Document chaos.** Indian property documents come in 28 state formats, written in regional languages, some 40 years old, scanned at 72dpi. Prompt engineering Gemini to extract valid JSON from this reliably required significant iteration — including explicit null-handling rules and a hard constraint that responses start with `{` and end with `}`.

**No official rules source.** There is no API or database for Indian state-specific property requirements. The rules engine was built from legal documentation and Sub-Registrar office guidelines.

**Rate limits.** A 5-document upload = 5 extraction calls + 1 cross-reference call. Built a sequential processing queue with delays to stay within free-tier limits.

---

## Future Scope

| Feature | Description |
|---|---|
| All 28 states | Extend the rules engine to every Indian state |
| IGRS Integration | Direct connection to state registration portals |
| Historical chain | Automated title chain reconstruction from Sub-Registrar archives |
| WhatsApp bot | Send documents via WhatsApp, receive report |
| Lawyer dashboard | Multi-case management, client sharing |
| Regional UI | Interface in Hindi, Marathi, Kannada, Telugu |

---

## License

MIT

---

*PropCheck AI — Because one missed document should never cost a family everything.*