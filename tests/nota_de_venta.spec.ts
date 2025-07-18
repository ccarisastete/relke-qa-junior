import { test, expect } from "@playwright/test";

/**
 * Función utilitaria para obtener y validar el total de una nota de venta
 * @param totalElement - Localizador del elemento que contiene el total
 * @returns El valor numérico del total
 */
async function obtenerTotal(
  totalElement: import("@playwright/test").Locator
): Promise<number> {
  let totalValue = 0;
  await expect(async () => {
    const totalText = await totalElement.textContent();
    totalValue = parseFloat(
      (totalText || "¨$0").replace("$", "").replace(",", "")
    );
    expect(totalValue).toBeGreaterThan(0);
  }).toPass({ timeout: 5000 });
  return totalValue;
}

/**
 * Test para verificar la navegación inicial a la sección de Notas de Venta
 * Pasos:
 * 1. Navegar a la página principal
 * 2. Acceder al módulo de Ventas
 * 3. Acceder a Notas de venta
 * 4. Verificar que la página se cargó correctamente
 */
test("Login y navegación inicial a Nota de Venta", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Ventas " }).click();
  await page.getByRole("link", { name: "Notas de venta" }).click();
  await page.waitForSelector("#btn-new-invoice", { timeout: 3000 });

  await expect(page.getByText("Mostrar:")).toBeVisible();
});

/**
 * Test para crear una nueva nota de venta con productos
 * Pasos:
 * 1. Navegación inicial
 * 2. Crear nueva nota
 * 3. Seleccionar tipo de documento y datos del cliente
 * 4. Agregar productos
 * 5. Validar total y enviar documento
 * 6. Verificar redirección exitosa
 */
test("Crear nueva nota de venta", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Ventas " }).click();
  await page.getByRole("link", { name: "Notas de venta" }).click();
  await page.waitForSelector("#btn-new-invoice", { timeout: 3000 });

  await page.waitForSelector("#btn-new-invoice", {
    state: "visible",
    timeout: 5000,
  });
  await page.waitForLoadState("networkidle");

  // Crear nueva nota de venta
  const nuevoButton = page.getByRole("link", { name: " Nuevo" });
  await nuevoButton.waitFor({ state: "visible" });
  await nuevoButton.click();

  const notaVentaLink = page.getByRole("link", {
    name: "Nota de venta",
    exact: true,
  });
  await notaVentaLink.waitFor({ state: "visible" });
  await notaVentaLink.click();
  await page.waitForLoadState("networkidle");

  // Formulario
  await page.getByTitle("Casa matriz").click();
  await page.getByRole("treeitem", { name: "Casa matriz" }).click();
  await page.locator("#select2-sales_note_type_document_sii-container").click();
  await page.getByRole("treeitem", { name: "FACTURA ELECTRÓNICA" }).click();
  await page.locator("#select2-sales_note_ware_house_id-container").click();
  await page.getByRole("treeitem", { name: "Bodega principal" }).click();
  await page.locator("#select2-sales_note_customer_id-container").click();
  await page.locator('input[type="search"]').fill("[a");
  await page
    .getByRole("treeitem", { name: /[d+-d+]/ })
    .first()
    .click();
  await page
    .locator(
      "#select2-sales_note_e_document_products_attributes_0_product_id-container"
    )
    .click();
  await page.locator('input[type="search"]').fill("[a");
  const treeitem = await page
    .getByRole("treeitem", { name: /\[\d+[-\d]*\]/ })
    .first();
  await treeitem.click();

  await page
    .locator("#sales_note_e_document_products_attributes_0_quantity")
    .click();
  await page
    .locator("#sales_note_e_document_products_attributes_0_quantity")
    .fill("2");
  const totalElement = page.locator("#total");
  const totalValue = obtenerTotal(totalElement);
  await expect(await totalValue).toBeGreaterThan(0); // validar que sea mayor a 0
  const urlAntes = page.url();
  page.on("dialog", async (dialog) => {
    const msg = dialog.message();

    if (msg.includes("¿Está seguro de generar documento electrónico?")) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });

  await page.getByRole("button", { name: " Enviar" }).click();

  await page.waitForFunction(
    (oldUrl) => window.location.href !== oldUrl,
    urlAntes
  );
  await expect(page).toHaveURL(/\/notas-venta/);
});

/**
 * Test para validar el comportamiento al intentar crear una nota de venta sin productos
 * Pasos:
 * 1. Navegación inicial
 * 2. Crear nueva nota
 * 3. Llenar datos básicos sin agregar productos
 * 4. Verificar que el total sea 0
 * 5. Intentar enviar y validar que no se procesa
 */
test("Validar nota de venta sin productos", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Ventas " }).click();
  await page.getByRole("link", { name: "Notas de venta" }).click();
  await page.waitForSelector("#btn-new-invoice", { timeout: 3000 });

  await page.waitForSelector("#btn-new-invoice", {
    state: "visible",
    timeout: 5000,
  });
  await page.waitForLoadState("networkidle");

  // Crear nueva nota de venta
  const nuevoButton = page.getByRole("link", { name: " Nuevo" });
  await nuevoButton.waitFor({ state: "visible" });
  await nuevoButton.click();

  const notaVentaLink = page.getByRole("link", {
    name: "Nota de venta",
    exact: true,
  });
  await notaVentaLink.waitFor({ state: "visible" });
  await notaVentaLink.click();
  await page.waitForLoadState("networkidle");

  await page.getByTitle("Casa matriz").click();
  await page.getByRole("treeitem", { name: "Casa matriz" }).click();
  await page.locator("#select2-sales_note_type_document_sii-container").click();
  await page.getByRole("treeitem", { name: "FACTURA ELECTRÓNICA" }).click();
  await page.locator("#select2-sales_note_ware_house_id-container").click();
  await page.getByRole("treeitem", { name: "Bodega principal" }).click();
  await page.locator("#select2-sales_note_customer_id-container").click();
  await page.locator('input[type="search"]').fill("Test");
  await page
    .getByRole("treeitem", { name: /\[\d+-\d+\]/g })
    .first()
    .click();

  const totalElement = page.locator("#total");
  const totalText = await totalElement.textContent();
  const totalValue = parseFloat(
    (totalText || "$0").replace("$", "").replace(",", "")
  );
  await expect(totalValue).toBe(0);
  const urlAntes = page.url();

  await page.getByRole("button", { name: "Enviar" }).click();
  await page.waitForLoadState("networkidle");

  const urlDespues = page.url();

  await expect(urlDespues).toBe(urlAntes);
});

/**
 * Test para verificar el comportamiento cuando la sesión expira
 * Pasos:
 * 1. Verificar acceso inicial
 * 2. Simular expiración de sesión limpiando cookies
 * 3. Intentar acceder a una ruta protegida
 * 4. Verificar redirección al login
 */
test("Verificar expiración de sesión", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("link", { name: "Ventas " })).toBeVisible();
  await page.context().clearCookies();

  await page.goto("/ventas");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/.*\/ingresar/);
  await expect(
    page.getByRole("heading", { name: "Iniciar sesión" })
  ).toBeVisible();
});
