
const STATE_RULES = {

  "Telangana": {
    state: "Telangana",
    required_documents: [
      { name: "Sale Deed",               code: "sale_deed",     mandatory: true  },
      { name: "Encumbrance Certificate", code: "ec",            mandatory: true  },
      { name: "Pahani / Adangal",        code: "pahani",        mandatory: true  },
      { name: "Link Documents",          code: "link_docs",     mandatory: true  },
      { name: "Layout Approval",         code: "layout",        mandatory: false },
      { name: "NOC from Bank",           code: "noc_bank",      mandatory: false }
    ],
    stamp_duty_rate: 0.05,
    registration_fee_rate: 0.005,
    important_notes: [
      "Encumbrance Certificate must cover minimum 13 years",
      "Pahani confirms agricultural or non-agricultural status",
      "Check GHMC approval if property is in Hyderabad limits"
    ]
  },

  "Maharashtra": {
    state: "Maharashtra",
    required_documents: [
      { name: "Sale Deed",               code: "sale_deed",     mandatory: true  },
      { name: "Index II",                code: "index_2",       mandatory: true  },
      { name: "7/12 Extract",            code: "seven_twelve",  mandatory: true  },
      { name: "Encumbrance Certificate", code: "ec",            mandatory: true  },
      { name: "Property Card",           code: "property_card", mandatory: false },
      { name: "NA Order",                code: "na_order",      mandatory: false }
    ],
    stamp_duty_rate: 0.05,
    registration_fee_rate: 0.01,
    important_notes: [
      "Index II is mandatory for all registered documents in Maharashtra",
      "7/12 Extract confirms land records from Revenue Department",
      "NA Order required if agricultural land converted to non-agricultural"
    ]
  },

  "Karnataka": {
    state: "Karnataka",
    required_documents: [
      { name: "Sale Deed",               code: "sale_deed",     mandatory: true  },
      { name: "Encumbrance Certificate", code: "ec",            mandatory: true  },
      { name: "Khata Certificate",       code: "khata",         mandatory: true  },
      { name: "RTC (Pahani)",            code: "rtc",           mandatory: true  },
      { name: "Conversion Certificate",  code: "conversion",    mandatory: false },
      { name: "NOC from BDA/BBMP",       code: "noc_bda",       mandatory: false }
    ],
    stamp_duty_rate: 0.056,
    registration_fee_rate: 0.01,
    important_notes: [
      "Khata transfer must be completed before registration",
      "RTC confirms who holds land as per revenue records",
      "Check if property falls under BDA or BBMP limits"
    ]
  },

  "Uttar Pradesh": {
    state: "Uttar Pradesh",
    required_documents: [
      { name: "Sale Deed",               code: "sale_deed",     mandatory: true  },
      { name: "Khatauni",                code: "khatauni",      mandatory: true  },
      { name: "Encumbrance Certificate", code: "ec",            mandatory: true  },
      { name: "Jamabandi",               code: "jamabandi",     mandatory: true  },
      { name: "NOC from Authority",      code: "noc",           mandatory: false }
    ],
    stamp_duty_rate: 0.07,
    registration_fee_rate: 0.01,
    important_notes: [
      "Khatauni is the land record maintained by Lekhpal",
      "Jamabandi confirms ownership and cultivation details",
      "Stamp duty in UP is among the highest in India at 7%"
    ]
  }
};

// ─── DETECT DOC TYPE FROM FILENAME OR CONTENT ───
export function detectDocumentType(filename) {
  const name = filename.toLowerCase();
  if (name.includes("sale") || name.includes("deed"))       return "sale_deed";
  if (name.includes("encumbrance") || name.includes("ec"))  return "ec";
  if (name.includes("pahani") || name.includes("adangal"))  return "pahani";
  if (name.includes("khata"))                                return "khata";
  if (name.includes("index"))                                return "index_2";
  if (name.includes("712") || name.includes("seven"))       return "seven_twelve";
  if (name.includes("rtc"))                                  return "rtc";
  if (name.includes("mutation"))                             return "mutation";
  return "unknown";
}

// ─── MAIN COMPLIANCE CHECK FUNCTION ───
export function checkStateCompliance(state, uploadedDocTypes) {

  // Find rules for this state
  const rules = STATE_RULES[state];

  // If state not in our database, return a warning
  if (!rules) {
    return {
      state: state,
      supported: false,
      compliant: false,
      missing_documents: [],
      uploaded_documents: uploadedDocTypes,
      flags: [{
        severity: "info",
        field: "state_rules",
        description: `State "${state}" is not yet in our rules database. Manual verification required.`,
        recommendation: "Consult a local property lawyer familiar with state-specific requirements."
      }],
      notes: []
    };
  }

  // Find which mandatory documents are missing
  const mandatoryDocs = rules.required_documents.filter(d => d.mandatory);
  const missingDocs = mandatoryDocs.filter(
    required => !uploadedDocTypes.includes(required.code)
  );

  // Build flags for missing documents
  const flags = missingDocs.map(doc => ({
    severity: "critical",
    field: "missing_document",
    description: `Required document missing for ${state}: "${doc.name}"`,
    recommendation: `Obtain "${doc.name}" before proceeding with this transaction.`
  }));

  // Check stamp duty if we have sale deed data
  // (this will be enhanced later when we connect to extraction data)

  return {
    state: state,
    supported: true,
    compliant: missingDocs.length === 0,
    missing_documents: missingDocs.map(d => d.name),
    uploaded_documents: uploadedDocTypes,
    mandatory_required: mandatoryDocs.map(d => d.name),
    flags: flags,
    stamp_duty_rate: `${rules.stamp_duty_rate * 100}%`,
    registration_fee_rate: `${rules.registration_fee_rate * 100}%`,
    notes: rules.important_notes
  };
}

// ─── GET SUPPORTED STATES ───
export function getSupportedStates() {
  return Object.keys(STATE_RULES);
}

// ─── TEST ───
const testState = "Telangana";

// Simulate: lawyer uploaded sale deed and EC but forgot Pahani
const uploadedDocTypes = ["sale_deed", "ec"];

const result = checkStateCompliance(testState, uploadedDocTypes);

console.log("=== STATE COMPLIANCE CHECK ===");
console.log(JSON.stringify(result, null, 2));

console.log("\n=== QUICK SUMMARY ===");
console.log("State:     ", result.state);
console.log("Compliant: ", result.compliant);
console.log("Missing:   ", result.missing_documents.join(", ") || "None");
console.log("Notes:");
result.notes.forEach(note => console.log("  •", note));

if (result.flags.length > 0) {
  console.log("\nFlags:");
  result.flags.forEach(flag => {
    console.log(`  [${flag.severity.toUpperCase()}] ${flag.description}`);
    console.log(`  → ${flag.recommendation}`);
  });
}