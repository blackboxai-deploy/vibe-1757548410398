// VAT Information for SKV Global Business Services LLC
export const VAT_INFO = {
  TRN: "100044161600003",
  RATE: "5%",
  COMPANY_NAME: "SKV Global Business Services LLC",
  REGISTRATION_DATE: "2024-01-01",
  COMPLIANCE_STATUS: "Active and Compliant"
};

export function getVATInfoText(): string {
  return `
📋 **VAT Information:**
• **TRN Number**: ${VAT_INFO.TRN}
• **VAT Rate**: ${VAT_INFO.RATE} (Standard UAE rate)
• **Company**: ${VAT_INFO.COMPANY_NAME}
• **Status**: ${VAT_INFO.COMPLIANCE_STATUS}
• **All invoices are VAT compliant** as per UAE FTA guidelines
`;
}

export function addVATToResponse(response: string, includeVAT: boolean = false): string {
  if (includeVAT) {
    return response + getVATInfoText();
  }
  return response;
}