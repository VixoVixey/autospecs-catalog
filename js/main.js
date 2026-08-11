document.addEventListener('DOMContentLoaded', () => {
    console.log('JS cargado y listo para interactuar.');

  // 1. MODO OSCURO / CLARO
    const btnThemeToggle = document.getElementById('btn-theme-toggle');

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        btnThemeToggle.textContent = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
        });
    } else {
        console.warn('No se encontró el botón con ID: btn-theme-toggle');
    }

  // 2. BUSCADOR Y FILTROS EN TIEMPO REAL
    const searchInput = document.getElementById('input-search');
    const categorySelect = document.getElementById('select-category');
    const catalogItems = document.querySelectorAll('.catalog-item');

    function filterCatalog() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categorySelect ? categorySelect.value : 'todos';

    catalogItems.forEach(item => {
        const titleEl = item.querySelector('.card-title');
        const textEl = item.querySelector('.card-text');

        const title = titleEl ? titleEl.textContent.toLowerCase() : '';
        const text = textEl ? textEl.textContent.toLowerCase() : '';
        const category = item.getAttribute('data-category');

      // Coincidencia por término de búsqueda (título o texto)
        const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);
        
      // Coincidencia estricta por selector de categoría
        const matchesCategory = selectedCategory === 'todos' || category === selectedCategory;

      // Si cumple ambas condiciones, se muestra; si no, se oculta con .d-none
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

        const title = button.getAttribute('data-title') || 'Especificación Técnica';
        const desc = button.getAttribute('data-desc') || 'Sin información disponible.';

        const modalTitle = detailModal.querySelector('.modal-title');
        const modalBody = detailModal.querySelector('#modal-body-text');

        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.textContent = desc;
        });
    }

    //4. Validacion e interaccion del formulario contacto
    const contactForm = document.getElementById('contact-form');
    const alertSuccess = document.getElementById('alert-success');

    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        //Validacion con boostrap 5
        if (!contactForm.checkValidity()) {
          event.stopPropagation();
          contactForm.classList.add('was-validated');
        } else {
          contactForm.classList.remove('was-validated');

          // Muestra la alerta de exito en el DOM y resetea los campos
          if (alertSuccess) {
            alertSuccess.classList.remove('d-none');
          }
          contactForm.reset();
        }
      })
    }
});