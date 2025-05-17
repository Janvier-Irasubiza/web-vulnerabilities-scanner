export interface ScannerConfig {
  timeout: number;
  targetUrl: string;
  maxPages: number;
  scanDepth: number;
  enableXSS: boolean;
  enableSQLInjection: boolean;
  enableCSRF: boolean;
  enableSSL: boolean;
  enableHeaders: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  data?: any;
  headers?: Record<string, string>;
}