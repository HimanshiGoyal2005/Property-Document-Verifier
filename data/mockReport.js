export const MOCK_REPORT = {
  id: 'demo-critical-001',
  state: 'Telangana',
  created_at: new Date().toISOString(),
  overall_risk: 'critical',
  summary:
    'Verification of 3 documents revealed critical discrepancies in survey numbers and a broken title chain. Transaction must not proceed without resolution.',
  flag_count: 5,
  critical_count: 3,
  warning_count: 2,
  all_flags: [
    {
      severity: 'critical',
      field: 'property.survey_number',
      values: ['381', '381/A'],
      description:
        'Survey numbers do not match across documents: Sale Deed states 381 while EC records 381/A.',
      recommendation:
        'Verify correct survey number with Sub-Registrar office. All documents must reflect the same survey number before proceeding.'
    },
    {
      severity: 'critical',
      field: 'title_chain',
      values: ['R. Krishnamurthy → GAP → K. Sudhakar Rao'],
      description:
        'Title chain is broken. No documentation exists for transfer from Krishnamurthy to Sudhakar Rao.',
      recommendation:
        'Obtain certified copies of all intermediate sale deeds from Sub-Registrar office to establish continuous ownership.'
    },
    {
      severity: 'critical',
      field: 'missing_document',
      values: ['Pahani / Adangal'],
      description:
        'Pahani (land records) is mandatory in Telangana but was not uploaded.',
      recommendation:
        'Obtain Pahani from MeeSeva portal or tahsildar office. Verify agricultural/non-agricultural status of land.'
    },
    {
      severity: 'warning',
      field: 'consideration_amount',
      values: ['₹45,00,000', '₹68,00,000 (expected range)'],
      description:
        'Declared sale consideration appears significantly below market rate for this locality.',
      recommendation:
        'Verify actual transaction value. Underdeclared value can lead to stamp duty penalties under the Registration Act.'
    },
    {
      severity: 'warning',
      field: 'parties.seller.name',
      values: ['KUDIKALA SUDHAKAR RAO', 'K. SUDHAKAR RAO'],
      description: 'Seller name is inconsistently spelled across documents.',
      recommendation:
        'Obtain an affidavit confirming both names refer to the same individual. Verify with Aadhaar.'
    }
  ],
  compliance: {
    state: 'Telangana',
    compliant: false,
    missing_documents: ['Pahani / Adangal', 'Link Documents'],
    mandatory_required: [
      'Sale Deed',
      'Encumbrance Certificate',
      'Pahani / Adangal',
      'Link Documents'
    ],
    uploaded_documents: ['sale_deed', 'ec'],
    stamp_duty_rate: '5%',
    registration_fee_rate: '0.5%',
    notes: [
      'EC must cover minimum 13 years',
      'Pahani confirms agricultural/non-agricultural status',
      'Link documents required to prove chain of title'
    ]
  },
  cross_reference: {
    title_chain: [
      { owner: 'RAVI KRISHNAMURTHY', date: '15 March 2019', doc: 'Sale Deed' },
      {
        owner: 'KUDIKALA SUDHAKAR RAO',
        date: '10 April 2023',
        doc: 'Sale Deed'
      }
    ],
    is_title_chain_continuous: false
  },
  documents: [
    {
      id: 'doc1',
      name: 'Sale_Deed_2023.pdf',
      type: 'Sale Deed',
      confidence: 'high',
      fields: {
        Seller: 'KUDIKALA SUDHAKAR RAO',
        Buyer: 'RAMESH VENKATARAMAN',
        'Survey Number': '381',
        'Property Area': '240 Sq. Yards',
        'Sale Amount': '₹45,00,000',
        'Registration Date': '10 April 2023',
        SRO: 'Rajendranagar, Hyderabad'
      }
    },
    {
      id: 'doc2',
      name: 'Encumbrance_Cert.pdf',
      type: 'Encumbrance Certificate',
      confidence: 'medium',
      fields: {
        'Property Ref': 'Survey No. 381/A',
        'Period Covered': '2010–2023',
        'Encumbrances Found': 'Nil',
        'Issued By': 'SRO Rajendranagar',
        'Issue Date': '22 June 2023'
      }
    }
  ]
}
