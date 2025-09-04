import { Log } from "./logger.js";

(async () => {
  await Log("backend", "info", "route", "User login successful");
  await Log("backend", "error", "db", "Database connection failed");
  await Log("frontend", "warn", "api", "Button is unresponsive");
})();
