import { defineConfig } from "@playwright/test";

export default defineConfig({
  projects: [
    // Proyecto 1: Configuración inicial (autenticación)
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    // Proyecto 2: Pruebas principales de "Notas de venta"
    {
      name: "Notas de venta",
      use: {
        headless: true,
        viewport: { width: 1280, height: 800 },
        baseURL: "https://demo.relbase.cl",
        ignoreHTTPSErrors: true,
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"], // Ejecuta el proyecto 'setup' antes de este
    },
  ],
  testDir: "./tests",
  timeout: 30000,
});
