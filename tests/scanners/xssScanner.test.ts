import { XSSScanner } from '../../src/scanners/xssScanner';

describe('XSSScanner', () => {
  let scanner: XSSScanner;

  beforeEach(() => {
    scanner = new XSSScanner();
  });

  test('should identify XSS vulnerability in a page with reflected input', async () => {
    const testUrl = 'http://example.com/test?input=<script>alert(1)</script>';
    const response = await scanner.scan(testUrl);
    expect(response).toContainEqual(expect.objectContaining({
      type: 'XSS Vulnerability',
      description: expect.stringContaining('Reflected input detected'),
    }));
  });

  test('should not identify XSS vulnerability in a safe page', async () => {
    const testUrl = 'http://example.com/safe';
    const response = await scanner.scan(testUrl);
    expect(response).not.toContainEqual(expect.objectContaining({
      type: 'XSS Vulnerability',
    }));
  });

  test('should analyze response correctly', async () => {
    const response = {
      url: 'http://example.com/test',
      body: '<html><body><script>alert(1)</script></body></html>',
    };
    const analysis = await scanner.analyzeResponse(response);
    expect(analysis).toContainEqual(expect.objectContaining({
      type: 'XSS Vulnerability',
      description: expect.stringContaining('Inline script detected'),
    }));
  });
});