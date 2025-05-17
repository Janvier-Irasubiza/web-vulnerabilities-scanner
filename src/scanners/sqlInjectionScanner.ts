import { sendRequest, handleResponse } from '../utils/networkUtils';
import { Vulnerability } from '../types/vulnerability';

export class SQLInjectionScanner {
  constructor(private targetUrl: string) {}

  async scan(): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];
    const payloads = this.getPayloads();

    for (const payload of payloads) {
      const testUrl = `${this.targetUrl}?id=${encodeURIComponent(payload)}`;
      const response = await sendRequest(testUrl);
      const analysis = this.analyzeResponse(response, payload);

      if (analysis) {
        vulnerabilities.push(analysis);
      }
    }

    return vulnerabilities;
  }

  private analyzeResponse(response: any, payload: string): Vulnerability | null {
    const content = response.data;

    if (content.includes('SQL syntax') || content.includes('You have an error in your SQL syntax')) {
      return {
        type: 'SQL Injection',
        description: `Potential SQL injection vulnerability detected with payload: ${payload}`,
        severity: 'high',
      };
    }

    return null;
  }

  private getPayloads(): string[] {
    return [
      "' OR '1'='1",
      "' OR '1'='1' --",
      "' OR '1'='1' /*",
      "' UNION SELECT NULL, username, password FROM users --",
      "'; DROP TABLE users; --",
    ];
  }
}