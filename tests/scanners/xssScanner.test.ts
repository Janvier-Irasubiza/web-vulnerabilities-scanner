import { XSSScanner } from '../../src/scanners/xssScanner';

describe('XSSScanner', () => {
  let scanner: XSSScanner;

  beforeEach(() => {
    scanner = new XSSScanner('http://example.com');
  });

  test('should identify XSS vulnerability in a page with reflected input', async () => {
    const testUrl = 'http://example.com/test?input=<script>alert(1)</script>';
    const response = await scanner.scan();
    expect(response).toContainEqual(expect.objectContaining({
      type: 'XSS Vulnerability',
      description: expect.stringContaining('Reflected input detected'),
    }));
  });

  test('should not identify XSS vulnerability in a safe page', async () => {
    const testUrl = 'http://example.com/safe';
    const response = await scanner.scan();
    expect(response).not.toContainEqual(expect.objectContaining({
      type: 'XSS Vulnerability',
    }));
  });

  test('should analyze response correctly', async () => {
    const payload = '<script>alert(1)</script>';
    const analysis = await scanner.testAnalyzeResponse(payload);
    expect(analysis).toEqual(expect.objectContaining({
        type: 'XSS',
        description: expect.stringContaining('Reflected XSS vulnerability detected.'),
        severity: 'high',
    }));
  });
});