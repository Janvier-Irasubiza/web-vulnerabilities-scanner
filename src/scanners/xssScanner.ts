import { Vulnerability } from "../types/vulnerability";
import { sendRequest } from "../utils/networkUtils";
import xssPayloads from "../payloads/xssPayloads";

export class XSSScanner {
  private targetUrl: string;

  constructor(targetUrl: string) {
    this.targetUrl = targetUrl;
  }

  public async scan(): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    for (const payload of xssPayloads) {
      const response = await this.analyzeResponse(payload);
      if (response) {
        vulnerabilities.push(response);
      }
    }

    return vulnerabilities;
  }

  private async analyzeResponse(
    payload: string
  ): Promise<Vulnerability | null> {
    const testUrl = `${this.targetUrl}?input=${encodeURIComponent(payload)}`;
    const response = await sendRequest(testUrl);

    if (
      response &&
      typeof response.data === "string" &&
      response.data.includes(payload)
    ) {
      return {
        type: "XSS",
        description: "Reflected XSS vulnerability detected.",
        severity: "high",
      };
    }

    return null;
  }
}
