# Prueba Técnica QA Junior - Relke

Este proyecto es una prueba técnica para el cargo de QA Junior en Relke, desarrollada utilizando [Playwright](https://playwright.dev/) como herramienta de automatización de pruebas de extremo a extremo (E2E).

## 📁 Estructura

El proyecto contiene:

- `nota_de_venta.spec.ts`: Caso de prueba automatizado para la funcionalidad de "Nota de Venta".
- `auth.setup.ts`: Script de autenticación preconfigurada.
- `playwright.config.ts`: Configuración general del entorno de pruebas.

## ⚙️ Requisitos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- npx (incluido con npm)

## 🚀 Instalación

```bash
git clone <repositorio>
cd <carpeta-del-proyecto>
npm install
# Instala Playwright con sus browsers
npx playwright install
```

## 🧪 Ejecutar pruebas

Para correr todas las pruebas:

```bash
npm run test
```

O directamente con Playwright:

```bash
npx playwright test
```

> Nota: el proyecto ya incluye credenciales **hardcodeadas** en los scripts, por lo que no se requiere login manual previo. Sin embargo, en un entorno real, se recomienda externalizar las credenciales mediante variables de entorno o archivos `.env`.

## 🧪 Descripción de los Tests

El proyecto contiene los siguientes tests automatizados:

- **`auth.setup.ts`**: Script que realiza la autenticación inicial y guarda el estado para reutilizarlo en otros tests.
- **`nota_de_venta.spec.ts`**: Contiene varios casos de prueba para la funcionalidad de "Nota de Venta", incluyendo:
  - Navegación inicial y acceso a la sección de notas de venta.
  - Creación de una nueva nota de venta con productos.
  - Validación de comportamiento cuando no se agregan productos a la nota.
  - Verificación de expiración de sesión y redirección al login.

Estos tests están diseñados para validar la funcionalidad crítica del sistema de ventas y asegurar la correcta gestión de sesiones.

## 📷 Reportes y evidencias

Los resultados de las pruebas se pueden ver con:

```bash
npx playwright show-report
```

## 👤 Autor

César Antonio Caris Astete

## 📝 Licencia

Este proyecto es solo para fines demostrativos y no tiene fines comerciales
