// UAE Business Services Knowledge Base for SKV Global Business Services LLC

export interface BusinessService {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: {
    min: number;
    max: number;
    currency: "AED";
    note?: string;
  };
  requirements: string[];
  timeline: string;
  department: string;
  processes: string[];
  benefits?: string[];
}

export const businessServices: BusinessService[] = [
  {
    id: "mainland-business-setup",
    name: "Mainland Business Setup",
    category: "Business Setup",
    description: "Complete mainland company registration in Dubai with trade license and local partner arrangement.",
    pricing: { min: 8000, max: 15000, currency: "AED", note: "Depends on business activity and license type" },
    requirements: [
      "Passport copy with UAE visa",
      "Emirates ID",
      "NOC from sponsor (if employed)",
      "Business plan and activity description",
      "Office lease agreement",
      "Local partner agreement (51% UAE national)"
    ],
    timeline: "10-15 working days",
    department: "Legal & License Department",
    processes: [
      "Initial approval from Department of Economic Development (DED)",
      "Trade name reservation",
      "Memorandum of Association (MOA) drafting",
      "License approval and issuance",
      "Chamber of Commerce registration",
      "Municipality license (if required)"
    ],
    benefits: [
      "Can operate anywhere in UAE",
      "No restrictions on business activities",
      "Can bid for government contracts",
      "Full ownership of profits (after local partner fees)"
    ]
  },
  {
    id: "freezone-business-setup",
    name: "Freezone Business Setup",
    category: "Business Setup",
    description: "100% foreign ownership company setup in UAE freezones with tax benefits and full repatriation.",
    pricing: { min: 12000, max: 25000, currency: "AED", note: "Varies by freezone and license type" },
    requirements: [
      "Passport copy",
      "Emirates ID or residence visa",
      "Educational certificates (attested)",
      "Business plan",
      "Bank reference letter",
      "Office lease in chosen freezone"
    ],
    timeline: "7-14 working days",
    department: "Global Business Setup Department",
    processes: [
      "Freezone authority application",
      "License type selection",
      "Company name registration",
      "Initial approval certificate",
      "License issuance",
      "Immigration card processing"
    ],
    benefits: [
      "100% foreign ownership",
      "Tax exemptions for 15-50 years",
      "Full repatriation of capital and profits",
      "No personal income tax",
      "Streamlined setup process"
    ]
  },
  {
    id: "vat-registration",
    name: "VAT Registration & Compliance",
    category: "Tax Services",
    description: "Complete VAT registration, TRN application, and ongoing VAT compliance services.",
    pricing: { min: 1500, max: 3000, currency: "AED", note: "Registration fee + monthly filing charges" },
    requirements: [
      "Trade license copy",
      "Emirates ID of authorized signatory",
      "Bank statements (3 months)",
      "Lease agreement",
      "Financial statements",
      "List of business activities"
    ],
    timeline: "3-7 working days",
    department: "Tax Department",
    processes: [
      "VAT registration application",
      "Tax Registration Number (TRN) issuance",
      "VAT compliance setup",
      "Monthly/quarterly returns filing",
      "VAT refund processing",
      "Compliance monitoring"
    ],
    benefits: [
      "Legal compliance with UAE VAT law",
      "Professional VAT return filing",
      "Tax optimization strategies",
      "Penalty avoidance",
      "Expert tax consultation"
    ]
  },
  {
    id: "employment-visa",
    name: "Employment Visa Processing",
    category: "Visa Services", 
    description: "Complete employment visa processing including work permit, entry permit, and residency visa.",
    pricing: { min: 3000, max: 5000, currency: "AED", note: "Per visa, includes all government fees" },
    requirements: [
      "Attested educational certificates",
      "Attested experience certificates",
      "Passport with 6 months validity",
      "Passport size photographs",
      "Medical fitness test",
      "Salary certificate or employment contract"
    ],
    timeline: "14-21 working days",
    department: "Visa & Tourism Department",
    processes: [
      "Work permit application",
      "Entry permit issuance",
      "Visa stamping",
      "Medical fitness test",
      "Emirates ID application",
      "Labor card processing"
    ],
    benefits: [
      "Legal work authorization in UAE",
      "Family sponsorship eligibility",
      "Access to banking and services",
      "Healthcare coverage eligibility",
      "Long-term residency pathway"
    ]
  },
  {
    id: "family-visa",
    name: "Family Visa Sponsorship",
    category: "Visa Services",
    description: "Sponsor family members (spouse, children, parents) for UAE residence visa.",
    pricing: { min: 4000, max: 8000, currency: "AED", note: "Per family member, includes processing" },
    requirements: [
      "Sponsor's Emirates ID and passport",
      "Salary certificate (minimum AED 4,000 or AED 3,000 + accommodation)",
      "Marriage certificate (attested for spouse)",
      "Birth certificates (attested for children)",
      "Educational certificates",
      "Medical fitness certificates",
      "Tenancy contract (Ejari)"
    ],
    timeline: "10-21 working days",
    department: "Visa & Tourism Department",
    processes: [
      "Eligibility verification",
      "Entry permit application",
      "Visa stamping",
      "Medical tests",
      "Emirates ID processing",
      "Residence visa issuance"
    ],
    benefits: [
      "Family reunification in UAE",
      "Access to education and healthcare",
      "Legal residence status",
      "Banking and service access",
      "Pathway to long-term residency"
    ]
  },
  {
    id: "golden-visa",
    name: "Golden Visa (10-Year Residency)",
    category: "Visa Services",
    description: "Long-term residency visa for investors, entrepreneurs, and skilled professionals.",
    pricing: { min: 15000, max: 50000, currency: "AED", note: "Based on category and investment amount" },
    requirements: [
      "Investment proof (property/business minimum AED 2 million)",
      "Bank statements and financial proof",
      "Professional qualifications/specialized skills",
      "Health insurance coverage",
      "Clean criminal record certificate",
      "Passport with minimum 6 months validity"
    ],
    timeline: "30-60 working days",
    department: "Visa & Tourism Department",
    processes: [
      "Category assessment and eligibility check",
      "Investment verification",
      "Application submission",
      "Approval from relevant authorities",
      "Medical tests and biometrics",
      "Golden visa issuance"
    ],
    benefits: [
      "10-year multiple entry visa",
      "Family sponsorship included",
      "No sponsor required",
      "Freedom to enter/exit UAE",
      "Access to all UAE services"
    ]
  },
  {
    id: "ejari-registration",
    name: "Ejari Registration & Municipality Services",
    category: "Municipality Services",
    description: "Official tenancy registration with RERA and municipality approvals for residential/commercial properties.",
    pricing: { min: 800, max: 1500, currency: "AED", note: "Includes registration and municipality fees" },
    requirements: [
      "Tenancy contract (original)",
      "Emirates ID of tenant",
      "Passport copy",
      "Title deed copy",
      "No objection certificate (if applicable)",
      "Previous Ejari (for renewal)"
    ],
    timeline: "1-3 working days",
    department: "Legal & License Department",
    processes: [
      "Document verification",
      "RERA system registration",
      "Municipality approval",
      "Ejari certificate issuance",
      "DEWA connection assistance",
      "Internet and utilities setup"
    ],
    benefits: [
      "Legal tenancy registration",
      "Required for visa applications",
      "Utility connection eligibility",
      "Legal protection for tenants",
      "Government service access"
    ]
  },
  {
    id: "labor-card",
    name: "Labor Card Processing",
    category: "Employment Services",
    description: "Official work permit card issued by Ministry of Human Resources and Emiratisation.",
    pricing: { min: 1200, max: 2000, currency: "AED", note: "Includes government fees and processing" },
    requirements: [
      "Employment contract",
      "Educational certificates (attested)",
      "Experience certificates (attested)",
      "Medical fitness certificate",
      "Emirates ID",
      "Passport with entry stamp"
    ],
    timeline: "7-14 working days",
    department: "Visa & Tourism Department",
    processes: [
      "Labor quota verification",
      "Application submission to MOHRE",
      "Document attestation verification",
      "Biometric enrollment",
      "Card printing and issuance",
      "Digital record activation"
    ],
    benefits: [
      "Legal work authorization",
      "Protection under UAE labor law",
      "Access to labor complaint system",
      "Required for salary transfers",
      "Pathway to permanent residency"
    ]
  },
  {
    id: "bank-account-opening",
    name: "Corporate Bank Account Opening",
    category: "Banking Services",
    description: "Assistance with opening corporate bank accounts in major UAE banks.",
    pricing: { min: 2000, max: 5000, currency: "AED", note: "Service fee, bank charges separate" },
    requirements: [
      "Trade license (original)",
      "Memorandum of Association",
      "Emirates ID of authorized signatories",
      "Passport copies of directors/partners",
      "Initial deposit (varies by bank)",
      "Business plan and financial projections"
    ],
    timeline: "5-15 working days",
    department: "Legal & License Department",
    processes: [
      "Bank selection and application",
      "Document preparation and submission",
      "Bank interview coordination",
      "Account activation",
      "Online banking setup",
      "Debit card and checkbook issuance"
    ],
    benefits: [
      "Multi-currency account options",
      "Online banking facilities",
      "International transfer capabilities",
      "Business credit facilities",
      "Professional banking relationship"
    ]
  },
  {
    id: "document-attestation",
    name: "Document Attestation & Legalization",
    category: "Documentation Services",
    description: "Complete attestation of personal and commercial documents for UAE use.",
    pricing: { min: 500, max: 1500, currency: "AED", note: "Per document, varies by country of origin" },
    requirements: [
      "Original documents",
      "Passport copy",
      "Authorization letter (if applying on behalf)",
      "Previous attestations (if any)",
      "Document translations (if required)"
    ],
    timeline: "7-21 working days",
    department: "Legal & License Department",
    processes: [
      "Document verification",
      "Country of origin attestation",
      "UAE embassy/consulate attestation",
      "Ministry of Foreign Affairs attestation",
      "Translation (if required)",
      "Final verification and delivery"
    ],
    benefits: [
      "Legal recognition in UAE",
      "Required for visa applications",
      "Employment eligibility",
      "Educational credential recognition",
      "Business license prerequisites"
    ]
  }
];

// Department contact information
export const departmentContacts = {
  "Tax Department": {
    email: "mohit@skvbusiness.com",
    services: ["VAT Registration", "Tax Compliance", "Corporate Tax", "Accounting Services"],
    description: "Specialized in UAE tax regulations, VAT compliance, and corporate taxation matters."
  },
  "Legal & License Department": {
    email: "sunil@skvbusiness.com",
    services: ["Business Setup", "Trade Licenses", "Legal Documentation", "Ejari Registration"],
    description: "Expert legal services for business formation, licensing, and regulatory compliance."
  },
  "Global Business Setup Department": {
    email: "nikita@skvbusiness.com",
    services: ["Freezone Setup", "Offshore Companies", "International Expansion", "Europe/London Setup"],
    description: "Specialized in global business expansion, freezone incorporation, and international structures."
  },
  "Visa & Tourism Department": {
    email: "rahul@skvbusiness.com", 
    services: ["Employment Visa", "Family Visa", "Golden Visa", "Tourist Services", "Tickets & Tours"],
    description: "Complete visa processing services, residency solutions, and tourism assistance."
  }
};

// Pricing tiers
export const pricingTiers = {
  basic: {
    name: "Basic Package",
    priceRange: "AED 3,000 - 8,000",
    services: ["Basic business setup", "Simple visa processing", "Document attestation"],
    suitable: "Small businesses and individuals"
  },
  premium: {
    name: "Premium Package", 
    priceRange: "AED 8,000 - 20,000",
    services: ["Complete business setup", "Multiple visa processing", "Banking assistance", "Tax registration"],
    suitable: "Medium businesses and entrepreneurs"
  },
  enterprise: {
    name: "Enterprise Package",
    priceRange: "AED 20,000 - 50,000+",
    services: ["Complex business structures", "Golden visa processing", "Complete compliance", "Ongoing support"],
    suitable: "Large businesses and high-net-worth individuals"
  }
};

// Common FAQ data
export const businessFAQs = [
  {
    question: "What is the minimum capital required for a UAE company?",
    answer: "Minimum capital varies by business type: Mainland LLC requires AED 300,000 (can be in cash or kind), while Freezone companies may have lower requirements starting from AED 50,000 depending on the zone."
  },
  {
    question: "How long does it take to set up a business in Dubai?",
    answer: "Typically 7-15 working days for freezone companies and 10-20 working days for mainland companies, depending on business activity and documentation completeness."
  },
  {
    question: "Can I get 100% ownership of my business in UAE?",
    answer: "Yes, through freezone incorporation or under the new UAE Commercial Companies Law, certain business activities allow 100% foreign ownership even for mainland companies."
  },
  {
    question: "What documents need attestation for UAE use?",
    answer: "Educational certificates, marriage certificates, birth certificates, police clearance certificates, and commercial documents typically require attestation from country of origin and UAE embassy."
  },
  {
    question: "What is the minimum salary requirement for family visa sponsorship?",
    answer: "Minimum AED 4,000 per month salary, or AED 3,000 with company-provided accommodation, plus suitable accommodation as per Dubai Municipality standards."
  }
];

export default businessServices;