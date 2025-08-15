// Variables
const detalleUrl = (tour) => `tours.html?place=${tour.place}`;
let allTours = [];

// Agregar card
function addItem(tour) {
    const container = document.getElementById('tours-container');
    const card = document.createElement('div');
    
    card.classList.add("col-md-4");
    card.dataset.place = tour.estado;
    card.dataset.category = tour.category;

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
    const selectedPlace = document.querySelector('.placeFilter.active')?.dataset.place || 'all';
    const selectedCategories = document.querySelector ('.categoryFilter.active')?.dataset.category || 'all';
    //Array.from(document.querySelectorAll('.category-option input:checked')).map(checkbox => checkbox.value);

    let filteredTours = allTours;

    // Filtrar por lugar
    if (selectedPlace !== 'all') {
        filteredTours = filteredTours.filter(tour => tour.estado === selectedPlace);
    }

    // Filtrar por categorías
    if (selectedCategories !== 'all') {
        filteredTours = filteredTours.filter(tour => selectedCategories.includes(tour.category));
    }

    return filteredTours;
}

// Función para renderizar un array de tours
function renderTours() {
    const container = document.getElementById('tours-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de renderizar

    const toursToRender = filterTours();

    if (!Array.isArray(toursToRender) || toursToRender.length === 0) {
        container.innerHTML = '<p class="text-center w-100">No se encontraron tours con los filtros seleccionados.</p>';
        return;
    }

    toursToRender.forEach(tour => addItem(tour));
}

// Cargar productos
document.addEventListener("DOMContentLoaded", () => {
    // Leer JSON
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            allTours = data; // Guardar los tours en la variable global
            const placeParam = getParam("place");

            if (placeParam) {
                const tour = allTours.find(t => t.place === placeParam);
                if (tour) {
                    loadTour(tour); // Cargar tour específico
                } else {
                    document.body.innerHTML = "<h2>Tour no encontrado</h2>";
                }
            } else {
                renderTours(); // Renderizar todos los tours o los filtrados
            }
        })
        .catch(err => {
            console.error("Error al cargar producto ", err);
        });

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
            if (checkbox.checked) {
                document.querySelector('.category-btn[data-category="all"]')?.classList.remove('active');
            }
            const anyChecked = document.querySelectorAll('.category-option input:checked').length > 0;
            if (!anyChecked) {
                document.querySelector('.category-btn[data-category="all"]')?.classList.add('active');
            }
            renderTours();
        });
    });

    // Event Listener para el botón "Todos"
    document.querySelector('.category-btn[data-category="all"]')?.addEventListener('click', () => {
        document.querySelectorAll('.category-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelector('.category-btn[data-category="all"]')?.classList.add('active');
        renderTours();
    });
});

// Obtener parámetros de la URL
function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Cargar detalles de un tour específico
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

    const ul = document.createElement('ul');
    ul.classList.add('list-includes');

    (tour.incluye || []).forEach(item => {
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
}