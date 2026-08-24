// 1. MODO OSCURO / CLARO
import { initThemeToggle } from "./storage.js";
document.addEventListener('DOMContentLoaded', () => {
  console.log('AutoSpecs App Inicializada.');

  // E4: Inicializar tema persistente con localStorage
  initThemeToggle('btn-theme-toggle');

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

      const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);
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

      const title = button.getAttribute('data-title') || 'Especificación Técnica';
      const desc = button.getAttribute('data-desc') || 'Sin información disponible.';

      const modalTitle = detailModal.querySelector('.modal-title');
      const modalBody = detailModal.querySelector('#modal-body-text');

      if (modalTitle) modalTitle.textContent = title;
      if (modalBody) modalBody.textContent = desc;
    });
  }

  // 4. Validacion e interaccion del formulario contacto
  const contactForm = document.getElementById('contact-form');
  const alertSuccess = document.getElementById('alert-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add('was-validated');
      } else {
        contactForm.classList.remove('was-validated');

        if (alertSuccess) {
          alertSuccess.classList.remove('d-none');
        }
        contactForm.reset();
      }
    });
  }
});
