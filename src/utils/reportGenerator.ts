import { Vulnerability } from "../types/vulnerability";

export function generateReport(
  vulnerabilities: Vulnerability[],
  targetUrl: string
): string {
  let report = `Vulnerability Scan Report for ${targetUrl}\n`;
  report += `Date: ${new Date().toISOString()}\n\n`;
  report += `Total Vulnerabilities Found: ${vulnerabilities.length}\n\n`;

  if (vulnerabilities.length > 0) {
    report += "Vulnerabilities Details:\n";
    vulnerabilities.forEach((vuln, index) => {
      report += `${index + 1}. Type: ${vuln.type}\n`;
      report += `   Description: ${vuln.description}\n`;
      report += `   Severity: ${vuln.severity}\n\n`;
    });
  } else {
    report += "No vulnerabilities found.\n";
  }

  return report;
}
