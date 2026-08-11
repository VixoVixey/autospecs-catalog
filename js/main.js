document.addEventListener('DOMContentLoaded', () => {
    // Esto se ejecuta cuando la página ya cargó todo el HTML.
    console.log('JS cargado y listo para interactuar.');

    // 1. MODO OSCURO / CLARO
    const btnThemeToggle = document.getElementById('btn-theme-toggle');

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
            // Cuando le doy clic, alterno la clase dark-mode en el body.
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');

            // Cambio el texto del botón para que diga si se puede volver al modo claro.
            btnThemeToggle.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
        });
    } else {
        // Si no existe ese botón, saco un aviso en la consola para saber qué pasó.
        console.warn('No se encontró el botón con ID: btn-theme-toggle');
    }

    // 2. BUSCADOR Y FILTROS EN TIEMPO REAL
    const searchInput = document.getElementById('input-search');
    const categorySelect = document.getElementById('select-category');
    const catalogItems = document.querySelectorAll('.catalog-item');

    function filterCatalog() {
        // Tomo el texto que escribió el usuario y la categoría que eligió.
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedCategory = categorySelect ? categorySelect.value : 'todos';

        catalogItems.forEach(item => {
            const titleEl = item.querySelector('.card-title');
            const textEl = item.querySelector('.card-text');

            const title = titleEl ? titleEl.textContent.toLowerCase() : '';
            const text = textEl ? textEl.textContent.toLowerCase() : '';
            const category = item.getAttribute('data-category');

            // Compruebo si el texto de búsqueda aparece en el título o en la descripción.
            const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);
            // Compruebo si el item está en la categoría seleccionada o si eligió "todos".
            const matchesCategory = selectedCategory === 'todos' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                item.classList.remove('d-none');
            } else {
                item.classList.add('d-none');
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterCatalog);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', filterCatalog);
    }

    // 3. DATOS DINÁMICOS PARA EL MODAL DE BOOTSTRAP
    const detailModal = document.getElementById('detailModal');
    if (detailModal) {
        detailModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            if (!button) return;

            // Leo los datos que vienen del botón que abrió el modal.
            const title = button.getAttribute('data-title') || 'Especificación Técnica';
            const desc = button.getAttribute('data-desc') || 'Sin información disponible.';

            const modalTitle = detailModal.querySelector('.modal-title');
            const modalBody = detailModal.querySelector('#modal-body-text');

            if (modalTitle) modalTitle.textContent = title;
            if (modalBody) modalBody.textContent = desc;
        });
    }
});