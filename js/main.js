// 1. IMPORTACIONES (Siempre al inicio del archivo)
import { initThemeToggle } from './storage.js';
import { fetchProductos } from './api.js';

/**
 * Crea una tarjeta individual del catálogo de forma segura contra XSS.
 * @param {Object} item - Objeto de producto retornado por la API.
 */
function crearCardProducto(item) {
  const col = document.createElement('article');
  col.className = 'col-12 col-md-6 col-lg-4 catalog-item';
  col.setAttribute('data-category', item.category || 'motor');

  const card = document.createElement('div');
  card.className = 'card h-100 shadow-sm overflow-hidden border-0 bg-body-tertiary';

  // Contenedor con relación de aspecto fija (16:9) para que todas las cards midan lo mismo
  const imgContainer = document.createElement('div');
  imgContainer.className = 'ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center p-2';

  const img = document.createElement('img');
  img.src = item.thumbnail;
  img.alt = item.title;
  img.loading = 'lazy';
  // object-fit: contain asegura que la imagen NUNCA se recorte
  img.style.objectFit = 'contain';
  img.style.maxHeight = '100%';
  img.style.maxWidth = '100%';

  imgContainer.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column';

  // Fila superior: Badge de Categoría + Precio
  const metaRow = document.createElement('div');
  metaRow.className = 'd-flex justify-content-between align-items-center mb-2';

  // Badge dinámico según la categoría
  const badge = document.createElement('span');
  
  if (item.category === 'autos') {
    badge.className = 'badge bg-success';
    badge.textContent = 'Vehículo';
  } else if (item.category === 'transmision') {
    badge.className = 'badge bg-primary';
    badge.textContent = 'Transmisión';
  } else if (item.category === 'electronica') {
    badge.className = 'badge bg-warning text-dark';
    badge.textContent = 'Electrónica';
  } else {
    badge.className = 'badge bg-danger';
    badge.textContent = 'Motorización';
  }

  const precio = document.createElement('span');
  precio.className = 'badge bg-secondary-subtle text-secondary-emphasis border';
  precio.textContent = `$${item.price} USD`;

  metaRow.appendChild(badge);
  metaRow.appendChild(precio);

  const titulo = document.createElement('h2');
  titulo.className = 'h5 card-title fw-bold mt-1 text-truncate';
  titulo.title = item.title; // Muestra el título completo al pasar el cursor
  titulo.textContent = item.title;

  const descripcion = document.createElement('p');
  descripcion.className = 'card-text small text-secondary flex-grow-1';
  descripcion.textContent = item.description;

  const footerBtn = document.createElement('div');
  footerBtn.className = 'mt-auto pt-3';

  const btnModal = document.createElement('button');
  btnModal.className = 'btn btn-outline-primary w-100 btn-detail';
  btnModal.setAttribute('data-bs-toggle', 'modal');
  btnModal.setAttribute('data-bs-target', '#detailModal');
  btnModal.setAttribute('data-title', item.title);
  btnModal.setAttribute('data-desc', item.description);
  btnModal.textContent = 'Ver Ficha Completa';

  footerBtn.appendChild(btnModal);

  cardBody.appendChild(metaRow);
  cardBody.appendChild(titulo);
  cardBody.appendChild(descripcion);
  cardBody.appendChild(footerBtn);

  card.appendChild(imgContainer);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

/**
 * Renderiza la lista dinámica con estados de Loading, Error y Éxito.
 */
async function renderCatalogo() {
  const container = document.getElementById('catalog-container');
  if (!container) return;

  // Estado: Cargando...
  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2 text-muted">Cargando catálogo desde API...</p>
    </div>
  `;

  const productos = await fetchProductos();

  // Limpiar estado de carga
  container.innerHTML = '';

  // Estado: Error o vacío
  if (productos.length === 0) {
    const errorMsg = document.createElement('p');
    errorMsg.className = 'col-12 text-center text-danger';
    errorMsg.textContent = 'No se pudieron cargar los datos de la API.';
    container.appendChild(errorMsg);
    return;
  }

  // Estado: Éxito (Inyectar cards de forma segura)
  productos.forEach(prod => {
    container.appendChild(crearCardProducto(prod));
  });
}

// 2. INICIALIZACIÓN DE LA APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
  console.log('AutoSpecs App Inicializada.');

  // E4: Modo oscuro persistente
  initThemeToggle('btn-theme-toggle');

  // E2: Cargar y renderizar catálogo desde la API
  renderCatalogo();

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

  // 4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
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