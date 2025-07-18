import { test } from "@playwright/test";

/**
 * Test de configuración para autenticación
 * Este test se ejecuta antes de las pruebas principales para establecer el estado de autenticación
 * 
 * Pasos:
 * 1. Navegar a la página de inicio de sesión
 * 2. Ingresar credenciales válidas
 * 3. Verificar inicio de sesión exitoso
 * 4. Guardar el estado de autenticación para su uso en otras pruebas
 */
test("authenticate", async ({ page }) => {
  // Navegar a la página de inicio de sesión
  await page.goto("https://demo.relbase.cl");

  // Ingresar credenciales
  await page.getByPlaceholder("Correo Electrónico").fill("qa_junior@relke.cl");
  await page.getByPlaceholder("Contraseña").fill("Demo123456!");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  // Verificar navegación exitosa a la página principal
  await page.click(".navbar-brand");
  await page.waitForLoadState("networkidle");

  // Guardar el estado de autenticación para reutilizarlo en otras pruebas
  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
