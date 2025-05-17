import { Vulnerability } from "../types/vulnerability";
import { ScannerConfig } from "../types/scannerConfig";
import { sendRequest, handleResponse } from "../utils/networkUtils";

export class HeaderScanner {
  private targetUrl: string;
  private config: ScannerConfig;

  constructor(targetUrl: string, config: ScannerConfig) {
    this.targetUrl = targetUrl;
    this.config = config;
  }

  async scan(): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];
    const response = await sendRequest(
      this.targetUrl,
      this.config.method || "GET",
      this.config.data,
      this.config.headers
    );

    this.analyzeResponse(response, vulnerabilities);
    return vulnerabilities;
  }

  private analyzeResponse(
    response: import("axios").AxiosResponse,
    vulnerabilities: Vulnerability[]
  ): void {
    const securityHeaders = [
      "Content-Security-Policy",
      "X-XSS-Protection",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Strict-Transport-Security",
      "Referrer-Policy",
      "Feature-Policy",
    ];

    securityHeaders.forEach((header) => {
      if (!response.headers || !response.headers[header.toLowerCase()]) {
        vulnerabilities.push({
          type: "Missing Security Header",
          description: `${header} header is missing.`,
          severity: "high",
        });
      }
    });
  }
}
