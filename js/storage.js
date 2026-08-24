const THEME_KEY = 'autospecs_theme'

/**
 *  Inicializa el tema guardado en localStorage y configura el boton conmutador.
 *  @param {string} buttonId - ID del boton de cambio de tema. 
 */

export function initThemeToggle(buttonId = 'btn-theme-toggle') {
    const btnThemeToggle = document.getElementById(buttonId);

    // 1. Leer el estado persistente guardado en localStorage.
    const savedTheme = localStorage.getItem(THEME_KEY);

    // 2. Aplicar el estado siexistia una preferencia previa
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 3. Actualizar la etiqueta del boton
    updateButtonText(btnThemeToggle);

    // 4. Escuchar el evento click si el boton esta presente en el DOM
    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            // Guardar la nueva preferencia en localStorage
            localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');

            updateButtonText(btnThemeToggle);
        });
    }
}

/**
 *  Actualiza el texto e icono del boton segun el estado actual del body,
 */
function updateButtonText(button) {
    if (!button) return;
    const isDark = document.body.classList.contains('dark-mode');
    button.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
}