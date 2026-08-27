// js/filtro.js

/**
 * Filtra los elementos del catálogo según el término de búsqueda y la categoría.
 * Controla además el mensaje de "Sin resultados".
 */
export function filterCatalog() {
    const searchInput = document.getElementById('input-search');
    const categorySelect = document.getElementById('select-category');
    const container = document.getElementById('catalog-container');
    const catalogItems = document.querySelectorAll('.catalog-item');

    if (!container) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categorySelect ? categorySelect.value : 'todos';

    let visibleCount = 0;

    catalogItems.forEach(item => {
        const titleEl = item.querySelector('.card-title');
        const textEl = item.querySelector('.card-text');

        const title = titleEl ? titleEl.textContent.toLowerCase() : '';
        const text = textEl ? textEl.textContent.toLowerCase() : '';
        const category = item.getAttribute('data-category') || 'motor';

        const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);
        const matchesCategory = selectedCategory === 'todos' || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            item.classList.remove('d-none');
            visibleCount++;
            } else {
                item.classList.add('d-none');
            }
    });

// Manejo del estado "Sin resultados encontrados"
let noResultsMsg = document.getElementById('no-results-msg');
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'no-results-msg';
            noResultsMsg.className = 'col-12 text-center py-5 mt-3';

            // Usamos la misma estructura de 'card' para que herede el tema actual
            const alertBox = document.createElement('div');
            alertBox.className = 'card border-0 shadow-sm p-4 d-inline-block';
            alertBox.style.maxWidth = '500px';

            const icon = document.createElement('i');
            icon.className = 'bi bi-search fs-2 text-secondary mb-2 d-block opacity-75';

            const title = document.createElement('h3');
            title.className = 'h5 card-title fw-bold mb-2';
            title.textContent = 'Sin coincidencias';

            const text = document.createElement('p');
            text.className = 'card-text small text-secondary mb-0';
            text.textContent = 'No se encontraron componentes o vehículos que coincidan con tu búsqueda.';

            alertBox.appendChild(icon);
            alertBox.appendChild(title);
            alertBox.appendChild(text);
            noResultsMsg.appendChild(alertBox);
            container.appendChild(noResultsMsg);
            }
            noResultsMsg.classList.remove('d-none');
                } else if (noResultsMsg) {
                    noResultsMsg.classList.add('d-none');
        }
}

/**
 * Registra los escuchadores de eventos para la barra de búsqueda y el selector de categoría.
 */
export function initFilters() {
    const searchInput = document.getElementById('input-search');
    const categorySelect = document.getElementById('select-category');

    if (searchInput) {
        searchInput.addEventListener('input', filterCatalog);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', filterCatalog);
    }
}