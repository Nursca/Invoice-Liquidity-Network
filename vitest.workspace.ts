import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  // SDK unit tests (node environment)
  "sdk/vitest.config.ts",

  // Frontend unit tests (React + jsdom) — run from frontend dir
  "frontend/vitest.config.ts",

  // Notifications service tests (node environment)
  "notifications/vitest.config.ts",
]);
