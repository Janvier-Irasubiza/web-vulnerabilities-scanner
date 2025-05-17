import { XSSScanner } from "./scanners/xssScanner";
import { SQLInjectionScanner } from "./scanners/sqlInjectionScanner";
import { CSRFScanner } from "./scanners/csrfScanner";
import { SSLScanner } from "./scanners/sslScanner";
import { HeaderScanner } from "./scanners/headerScanner";
import { generateReport } from "./utils/reportGenerator";
import { ScannerConfig } from "./types/scannerConfig";

async function main() {
  const targetUrl = "your-target-url-domain-or-ip"; // Replace with the target URL or IP address

  const config: ScannerConfig = {
    timeout: 5000,
    targetUrl: targetUrl,
    maxPages: 10,
    scanDepth: 2,
    enableXSS: true,
    enableSQLInjection: true,
    enableCSRF: true,
    enableSSL: true,
    enableHeaders: true,
  };

  const scanners = [
    new XSSScanner(targetUrl),
    new SQLInjectionScanner(targetUrl),
    new CSRFScanner(targetUrl, config),
    new SSLScanner(targetUrl),
    new HeaderScanner(targetUrl, config),
  ];

  const vulnerabilities = [];

  for (const scanner of scanners) {
    const results = await scanner.scan();
    vulnerabilities.push(...results);
  }

  const report = generateReport(vulnerabilities, targetUrl);
  console.log(report);
}

main().catch(console.error);
