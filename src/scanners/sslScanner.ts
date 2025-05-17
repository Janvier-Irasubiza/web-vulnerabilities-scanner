import { exec } from "child_process";
import { promisify } from "util";
import { Vulnerability } from "../types/vulnerability";

const execPromise = promisify(exec);

export class SSLScanner {
  private targetUrl: string;

  constructor(targetUrl: string) {
    this.targetUrl = targetUrl;
  }

  public async scan(): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];
    const sslCheckCommand = `echo | openssl s_client -connect ${this.targetUrl}:443 -servername ${this.targetUrl} 2>/dev/null | openssl x509 -text`;

    try {
      const { stdout } = await execPromise(sslCheckCommand);
      this.analyzeResponse(stdout, vulnerabilities);
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = String((error as any).message);
      } else {
        errorMessage = String(error);
      }
      vulnerabilities.push({
        type: "SSL/TLS Error",
        description: `Failed to connect to ${this.targetUrl} for SSL/TLS check: ${errorMessage}`,
        severity: "high",
      });
    }

    return vulnerabilities;
  }

  private analyzeResponse(
    response: string,
    vulnerabilities: Vulnerability[]
  ): void {
    if (response.includes("unable to verify the first certificate")) {
      vulnerabilities.push({
        type: "SSL Certificate Issue",
        description: "The SSL certificate could not be verified.",
        severity: "high",
      });
    }

    if (response.includes("expired")) {
      vulnerabilities.push({
        type: "Expired SSL Certificate",
        description: "The SSL certificate has expired.",
        severity: "critical",
      });
    }

    if (response.includes("not trusted")) {
      vulnerabilities.push({
        type: "Untrusted SSL Certificate",
        description: "The SSL certificate is not trusted by the client.",
        severity: "high",
      });
    }

    // Additional checks can be added here
  }
}
