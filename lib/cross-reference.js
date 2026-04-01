import { ai, sleep, DRY_RUN } from './gemini.js'

// ─── NORMALISE STRING FOR COMPARISON ───
// Removes extra spaces, lowercases, trims
// "Ram  Sharma " and "ram sharma" become equal
function normalise (str) {
  if (!str) return ''
  return str.toLowerCase().trim().replace(/\s+/g, ' ')
}

// ─── LOOSE MATCH ───
// Returns true if two strings match after normalisation
function looselyMatches (a, b) {
  if (!a || !b) return false
  return normalise(a) === normalise(b)
}

// ─── CHECK 1: RULE-BASED FLAGS ───
function runRuleBasedChecks (extractions) {
  const flags = []

  // ── Survey number consistency ──
  const surveyNumbers = extractions
    .map(e => e.property?.survey_number)
    .filter(s => s !== null && s !== undefined)

  const uniqueSurveys = [...new Set(surveyNumbers.map(s => normalise(s)))]
  if (uniqueSurveys.length > 1) {
    flags.push({
      severity: 'critical',
      field: 'property.survey_number',
      values: surveyNumbers,
      description: `Survey numbers do not match across documents: ${surveyNumbers.join(
        ' vs '
      )}`,
      recommendation:
        'Verify which survey number is correct with the Sub-Registrar office. Do not proceed until resolved.'
    })
  }

  // ── District consistency ──
  const districts = extractions
    .map(e => e.property?.district)
    .filter(d => d !== null && d !== undefined)

  const uniqueDistricts = [...new Set(districts.map(d => normalise(d)))]
  if (uniqueDistricts.length > 1) {
    flags.push({
      severity: 'warning',
      field: 'property.district',
      values: districts,
      description: `District names differ across documents: ${districts.join(
        ' vs '
      )}`,
      recommendation:
        'Confirm the correct district. Could be a clerical error or a genuine mismatch.'
    })
  }

  // ── Title chain continuity ──
  // Sort deeds only, then check buyer[i] === seller[i+1]
  const deedsOnly = extractions.filter(
    e =>
      e.doc_type?.toLowerCase().includes('sale deed') ||
      e.doc_type?.toLowerCase().includes('deed')
  )

  if (deedsOnly.length > 1) {
    for (let i = 0; i < deedsOnly.length - 1; i++) {
      const currentBuyer = deedsOnly[i].parties?.buyer?.name
      const nextSeller = deedsOnly[i + 1].parties?.seller?.name

      if (!looselyMatches(currentBuyer, nextSeller)) {
        flags.push({
          severity: 'critical',
          field: 'title_chain',
          values: [currentBuyer, nextSeller],
          description: `Title chain is broken. Buyer in document ${
            i + 1
          } ("${currentBuyer}") does not match seller in document ${
            i + 2
          } ("${nextSeller}")`,
          recommendation:
            'Missing link in ownership chain. Obtain the intermediate sale deed or gift deed that transferred ownership.'
        })
      }
    }
  }

  // ── Suspicious consideration amount ──
  extractions.forEach((e, i) => {
    const amount = e.transaction?.consideration_amount
    if (amount) {
      const numeric = parseFloat(String(amount).replace(/[^0-9.]/g, ''))
      if (!isNaN(numeric) && numeric < 1000) {
        flags.push({
          severity: 'warning',
          field: 'transaction.consideration_amount',
          values: [amount],
          description: `Document ${
            i + 1
          } has unusually low consideration amount: ₹${amount}. Possible undervaluation or benami transaction.`,
          recommendation:
            'Verify market value with local Sub-Registrar. Stamp duty must be paid on market value, not declared value.'
        })
      }
    }
  })

  return flags
}

// ─── CHECK 2: GEMINI-BASED FLAGS ───
async function runGeminiChecks (extractions) {
  if (DRY_RUN) {
    console.log('DRY RUN — returning mock Gemini cross-reference flags')
    return [
      {
        severity: 'warning',
        field: 'parties.seller.name',
        values: ['KUDIKALA SUDHAKAR RAO', 'KUDIKALA SUDHAKAR RAU'],
        description:
          "Possible name spelling variation across documents. 'RAO' vs 'RAU' — could be the same person or a different individual.",
        recommendation:
          'Request original government-issued ID proof from the seller to confirm identity.'
      }
    ]
  }

  // Real Gemini call for nuanced cross-reference
  const prompt = `
    You are a senior Indian property lawyer and title verification expert.

    Below is extracted data from ${extractions.length} property documents
    that should all relate to the same property and ownership chain.

    Extracted data:
    ${JSON.stringify(extractions, null, 2)}

    Your job is to find EVERY inconsistency, ambiguity, or red flag.
    Be paranoid. Be thorough. A missed issue could cost someone crores.

    Look specifically for:
    - Name spelling variations that could indicate different people
    - Address inconsistencies between documents
    - Suspicious consideration amounts vs property location
    - Missing or unusual witnesses
    - Dates that seem chronologically wrong
    - Any field that seems unusual for a ${
      extractions[0]?.state
    } property document

    Return ONLY a valid JSON array of flags.
    No explanation outside the JSON.
    If no issues found return an empty array [].

    Each flag must follow this exact structure:
    {
      "severity": "critical or warning or info",
      "field": "which field has the issue",
      "values": ["value from doc 1", "value from doc 2"],
      "description": "plain English explanation a non-lawyer can understand",
      "recommendation": "exactly what the lawyer should do about this"
    }
  `

  await sleep(4000)

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ]
  })

  const rawText = response.text
  const cleanText = rawText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()

  try {
    return JSON.parse(cleanText)
  } catch (e) {
    console.error('Gemini cross-reference parse failed:', rawText)
    return []
  }
}

// ─── CALCULATE OVERALL RISK ───
function calculateRisk (flags) {
  if (flags.some(f => f.severity === 'critical')) return 'critical'
  if (flags.some(f => f.severity === 'warning')) return 'high'
  if (flags.length > 0) return 'medium'
  return 'low'
}

// ─── PLAIN ENGLISH SUMMARY ───
function generateSummary (flags, risk, docCount) {
  if (flags.length === 0) {
    return `All ${docCount} documents are consistent. No issues found. Title appears clear.`
  }

  const criticals = flags.filter(f => f.severity === 'critical').length
  const warnings = flags.filter(f => f.severity === 'warning').length

  let summary = `Verification of ${docCount} documents found ${flags.length} issue(s): `
  if (criticals > 0)
    summary += `${criticals} critical issue(s) requiring immediate attention. `
  if (warnings > 0) summary += `${warnings} warning(s) to review. `
  summary += `Overall risk level: ${risk.toUpperCase()}.`

  return summary
}

// ─── MAIN EXPORT ───
export async function crossReferenceDocuments (extractions) {
  console.log(`\nCross-referencing ${extractions.length} document(s)...`)

  const ruleFlags = runRuleBasedChecks(extractions)
  console.log(`Rule-based checks found ${ruleFlags.length} flag(s)`)

  const geminiFlags = await runGeminiChecks(extractions)
  console.log(`Gemini checks found ${geminiFlags.length} flag(s)`)

  const allFlags = [...ruleFlags, ...geminiFlags]
  const overallRisk = calculateRisk(allFlags)

  // Build title chain from deeds only
  const deedsOnly = extractions.filter(e =>
    e.doc_type?.toLowerCase().includes('deed')
  )

  const titleChain = deedsOnly.map(d => ({
    owner: d.parties?.buyer?.name || 'Unknown',
    date: d.transaction?.registration_date || 'Unknown date',
    doc: d.doc_type
  }))

  return {
    total_documents: extractions.length,
    flags: allFlags,
    flag_count: allFlags.length,
    critical_count: allFlags.filter(f => f.severity === 'critical').length,
    warning_count: allFlags.filter(f => f.severity === 'warning').length,
    overall_risk: overallRisk,
    title_chain: titleChain,
    is_title_chain_continuous: !allFlags.some(f => f.field === 'title_chain'),
    summary: generateSummary(allFlags, overallRisk, extractions.length)
  }
}
