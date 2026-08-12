# AutoSpecs - Catálogo Técnico Automotriz

> Proyecto del Módulo 1 — HTML + CSS + JS · Diplomado Fullstack IPSS

## Integrantes

- Vicente Quezada (Trabajo realizado de forma individual)

## Descripción

Plataforma y catálogo web de especificaciones técnicas automotrices: permite consultar fichas detalladas, configuraciones mecánicas y componentes de alto rendimiento (como motores 1.8T, transmisiones manuales y sistemas de inyección programable Standalone), ofreciendo búsqueda interactiva, filtrado por categorías y tematización en modo oscuro.

## Vista del proyecto 
Aqui se Muestra el home de la pagina con el Catalogo.
![Vista del Home](./img/Home.png)

Aqui se muestra la pagina de contacto.
![Vista del Contacto](./img/Contacto.png)

## Páginas

### Home (index.html)
"Fichas Técnicas & Especificaciones Automotrices"
Explica y presenta la grilla dinámica de componentes disponibles, con buscador en tiempo real por nombre/descripción y selector de categorías.

### Catálogo / Muestra de Productos
Grilla responsive basada en tarjetas de Bootstrap 5 con:
- Categorías: Motorización, Transmisión y Electrónica.
- Buscador dinámico por texto en tiempo real.
- Ventana modal interactiva para ver la ficha técnica detallada de cada componente.

### Contacto (contacto.html)
Formulario de soporte técnico y consultas de compatibilidad con validación nativa de HTML5/Bootstrap y feedback dinámico con JavaScript.

## Cómo correr localmente

El proyecto no requiere dependencias complejas y funciona directamente en cualquier navegador moderno.
Pasos a seguir:
1. `git clone https://github.com/VixoVixey/autospecs-catalog.git`
2. `cd autospecs-catalog`
3. Abre el archivo `index.html` en tu navegador o levanta un servidor local:
   - **VS Code**: instala la extensión **Live Server** o **Five Server**, haz clic derecho sobre `index.html` → "Open with Live Server".

## 📁 Estructura del proyecto

*** css ***
En esta carpeta se definen las variables CSS y estilos personalizados:
- `custom.css`: Contiene las variables `:root` para modo claro/oscuro, clases de sobreescritura para Bootstrap (`.dark-mode`) y ajustes de maquetado.

*** js ***
Archivos de lógica en JavaScript nativo (Vanilla ES6):
- `main.js`: Lógica principal del proyecto que gestiona:
  1. Conmutador de Modo Oscuro / Claro en el DOM.
  2. Filtro de catálogo por búsqueda y categoría en tiempo real.
  3. Carga dinámica de datos (`data-title`, `data-desc`) dentro del Modal de Bootstrap.
  4. Validación y feedback del formulario de contacto.

*** raíz del proyecto ***
- `index.html`: Vista principal con el hero section, barra de búsqueda y grilla del catálogo.
- `contacto.html`: Vista con el formulario de consultas técnicas y soporte.
- `.gitignore`: Configuración para omitir archivos temporales y de entorno.

## Librerías y Tecnologías utilizadas

- **HTML5 Semántico:** Uso de etiquetas estructurales (`<header>`, `<main>`, `<section>`, `<article>`, `<form>`, `<footer>`).
- **Bootstrap 5 (v5.3.3):** Utilizado para el sistema de grillas responsive, Navbar, tarjetas (`cards`), modales y estilos base del formulario.
- **Google Fonts:** Tipografía personalizada (*Roboto*).
- **Vanilla JavaScript:** Control total del DOM y manejo de eventos sin frameworks externos.