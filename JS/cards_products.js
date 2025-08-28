// Variables
const detalleUrl = (tour) => `tours.html?id=${tour.id}`;
let allTours = [];

function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Agregar card
function addItem(tour) {
    const container = document.getElementById('tours-container');
    const card = document.createElement('div');

    card.classList.add("col-md-4");
    card.dataset.place = tour.estado;
    card.dataset.category = tour.category.toLowerCase();

    card.innerHTML = `
    <div class="card h-100 shadow-sm d-flex flex-column">
        <img src="${tour.img}" class="card-img-top" alt="${tour.name}">
        <div class="card-body d-flex flex-column">
            <h3 class="card-title clamp-2">${tour.name}</h3>
            <p class="card-category">${tour.category}</p>
            <p class="card-estado">${tour.estado}</p>
            <p class="card-text mt-2 clamp-5 flex-grow-1">${tour.description}.</p>
            <div class="card-footer bg-transparent border-0 mt-auto">
                <a href="${detalleUrl(tour)}" class="btn-custom">Más información</a>
            </div>
        </div>
    </div>
    `;
    container.appendChild(card);
}

// Función para filtrar tours
function filterTours() {
    const activePlaceButton = document.querySelector('.placeFilter.active');
    const activeCategoryButton = document.querySelector('.category-btn.active');

    let selectedPlaces = [];
    if (activePlaceButton) {
        selectedPlaces = activePlaceButton.dataset.place.split(',');
    }

    let selectedCategories = Array.from(document.querySelectorAll('.category-option input:checked')).map(checkbox => checkbox.dataset.category.toLowerCase());

    if (activeCategoryButton && activeCategoryButton.dataset.category === 'all') {
        selectedCategories = ['all'];
    } else if (selectedCategories.length === 0) {
        selectedCategories = [];
    }

    let filteredTours = allTours;

    // Filtrar por lugar si hay un lugar activo
    if (selectedPlaces.length > 0) {
        filteredTours = filteredTours.filter(tour => selectedPlaces.includes(tour.estado));
    }

    // Filtrar por categorías si hay categorías seleccionadas y no es el filtro 'all'
    if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
        filteredTours = filteredTours.filter(tour => {
            const tourCategories = tour.category.split(' y ').map(c => c.trim().toLowerCase());
            return tourCategories.some(tc => selectedCategories.includes(tc));
        });
    }

    return filteredTours;
}

// Función para renderizar un array de tours
function renderTours() {
    const container = document.getElementById('tours-container');
    container.innerHTML = '';

    const toursToRender = filterTours();

    if (!Array.isArray(toursToRender) || toursToRender.length === 0) {
        container.innerHTML = '<p class="text-center w-100">No se encontraron tours con los filtros seleccionados.</p>';
        return;
    }

    toursToRender.forEach(tour => addItem(tour));
}

function loadTour(tour) {
    const title = document.getElementById('tour-title');
    if (!title) return;

    document.getElementById('tour-title').textContent = tour.name;
    document.getElementById('tour-price').textContent = `$${tour.precio} MXN por persona`;
    document.getElementById('tour-image').src = tour.img;
    document.getElementById('tour-image').alt = tour.name;

    if (tour.img_portada) {
        document.getElementById('tour-header').style.backgroundImage = `url("${tour.img_portada}")`;
    }

    const includesList = document.getElementById('tour-includes');
    includesList.innerHTML = "";

    // Convertir incluye en un array si es string
    const includes = typeof tour.incluye === 'string' ? tour.incluye.split('\n').filter(item => item.trim() !== '') : tour.incluye || [];

    // Tabla
    const ul = document.createElement('ul');
    ul.classList.add('list-includes');

    includes.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    includesList.appendChild(ul);

    const infoHTML = `
        <p><i class="bi bi-alarm" style="margin-right: 0.5rem;"></i>Salida: ${tour.informacionTour?.salida || "-"}<br>Regreso aproximado: ${tour.informacionTour?.regresoAprox || "-"}</p>
        <p><i class="bi bi-calendar-event" style="margin-right: 0.5rem;"></i>${tour.informacionTour?.frecuencia || "-"}</p>
        <p><i class="bi bi-people" style="margin-right: 0.5rem;"></i>${tour.informacionTour?.grupos || "-"}</p>
    `;
    document.getElementById("tour-info").innerHTML = infoHTML;

    // Para carrito
    const btnReserva = document.getElementById('btn-reserva');
    if (btnReserva) {
        btnReserva.onclick = function () {
            addToCart({
                id: tour.id,
                name: tour.name,
                price: parseFloat(tour.precio)
            });
            alert(`¡${tour.name} agregado al carrito!`);
        };
    } // if (btnReserva)
}


// Promesa para cargar productos
function loadProducts() {
    return new Promise((resolve, reject) => {
        const stored = localStorage.getItem("products");
        if (stored) {
            resolve(JSON.parse(stored));
        } else {
            fetch("products.json")
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        }
    });
}

// Cargar productos y gestionar eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    loadProducts()
        .then(tours => {
            allTours = tours;
            const idParam = getParam("id");

            // Si hay un ID en la URL, estamos en la página de detalle
            if (idParam) {
                const tour = tours.find(t => t.id == idParam);
                if (tour) {
                    loadTour(tour);
                } else {
                    document.body.innerHTML = "<h2>Tour no encontrado</h2>";
                }
            }
            // Si no hay ID, estamos en la página de listado
            else {
                renderTours();

                // Event Listeners para filtros de lugar
                document.querySelectorAll('.placeFilter').forEach(button => {
                    button.addEventListener('click', () => {
                        document.querySelectorAll('.placeFilter').forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        renderTours();
                    });
                });

                // Event Listeners para filtros de categoría
                document.querySelectorAll('.category-option input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        const allButton = document.querySelector('.category-btn[data-category="all"]');
                        if (checkbox.checked) {
                            allButton?.classList.remove('active');
                        } else {
                            const anyChecked = document.querySelectorAll('.category-option input:checked').length > 0;
                            if (!anyChecked) {
                                allButton?.classList.add('active');
                            }
                        }
                        renderTours();
                    });
                });
            }
        })
        .catch(err => {
            console.error("Error al cargar producto ", err);
            const container = document.getElementById('tours-container');
            if (container) {
                container.innerHTML = '<p class="text-center w-100">Error al cargar los tours. Por favor, inténtalo de nuevo más tarde.</p>';
            }
        });

    });
