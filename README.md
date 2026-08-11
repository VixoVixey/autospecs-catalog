# ⚙️ AutoSpecs - Catálogo Técnico Automotriz

**AutoSpecs** es una aplicación web interactiva desarrollada como proyecto práctico para el Módulo 1. El sitio permite consultar fichas técnicas, configuraciones mecánicas y componentes de alto rendimiento (como motores, transmisiones y sistemas de inyección programable) con filtrado en tiempo real, interfaz adaptable a modo oscuro y un formulario de soporte técnico validado.

---

## 🚀 Características Principales

- **Diseño Responsive & Mobile-First:** Maquetación semántica estructurada con Bootstrap 5 y CSS Grid/Flexbox, adaptable a dispositivos móviles, tablets y monitores de escritorio.
- **Modo Oscuro / Claro Dinámico:** Gestión de temas mediante variables CSS nativas (`:root` y `body.dark-mode`) manipuladas dinámicamente con JavaScript.
- **Buscador y Filtros en Tiempo Real:** Filtrado interactivo por término de búsqueda y por categorías mecánicas (*Motorización, Transmisión, Electrónica*) sin recargar la página.
- **Fichas Técnicas en Modales:** Renderizado dinámico de detalles técnicos aprovechando los atributos `data-*` de HTML5 y los eventos nativos de los modales de Bootstrap.
- **Formulario de Soporte Ténico:** Página de contacto accesible con asociación explícita entre `<label>` e `<input>`, validada dinámicamente mediante la API de validación de HTML5/Bootstrap.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructuración semántica (`<header>`, `<main>`, `<section>`, `<article>`, `<form>`, `<footer>`).
- **CSS3 & Bootstrap 5.3:** Variables CSS para tematización, sistema de grillas responsive y componentes visuales.
- **JavaScript (ES6 Vanilla):** Manipulación directa del DOM, escucha de eventos nativos (`click`, `input`, `change`, `submit`, `show.bs.modal`).
- **Git & GitHub:** Control de versiones basado en ramas de características (`feature/*`) y resolución de integración mediante *Pull Requests* y *Conventional Commits*.

---

## 📂 Estructura del Proyecto

```text
autospecs-catalog/
├── css/
│   └── custom.css        # Estilos personalizados, variables CSS y modo oscuro
├── js/
│   └── main.js           # Lógica JavaScript (filtros, modo oscuro, modal y validación)
├── .gitignore            # Archivos excluidos del control de versiones
├── contacto.html         # Página de soporte técnico y formulario de consultas
├── index.html            # Catálogo principal con buscador y grilla de productos
└── README.md             # Documentación del proyecto