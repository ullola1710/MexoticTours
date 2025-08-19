// Variables
const detalleUrl = (tour) => `tours.html?place=${tour.place}`;
let allTours = [];

// Función para agregar la tarjeta de un tour al DOM
function addItem(tour) {
    const container = document.getElementById('tours-container');
    const card = document.createElement('div');
    
    card.classList.add("col-md-4");
    // Se corrigen los dataset, usando `tour.estado` y `tour.category` del JSON.
    // Esto es crucial para que los filtros funcionen.
    card.dataset.place = tour.estado;
    card.dataset.category = tour.category.toLowerCase(); // Convertir a minúsculas para consistencia

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
        // CORRECCIÓN: Se remueve el espacio extra en el split
        selectedPlaces = activePlaceButton.dataset.place.split(',');
    }

    // CORRECCIÓN: Se usa `querySelectorAll` para obtener todos los checkboxes
    let selectedCategories = Array.from(document.querySelectorAll('.category-option input:checked')).map(checkbox => checkbox.dataset.category.toLowerCase());
    
    if (activeCategoryButton && activeCategoryButton.dataset.category === 'all') {
        selectedCategories = ['all'];
    } else if (selectedCategories.length === 0) {
        // Si no hay checkboxes de categoría seleccionados y no está activo el botón 'Todo',
        // entonces no hay categorías para filtrar, por lo que se mostrará 'no hay tours'
        selectedCategories = [];
    }

    let filteredTours = allTours;

    // Filtrar por lugar si hay un lugar activo
    if (selectedPlaces.length > 0) {
        // CORRECCIÓN: Se filtra sobre la variable `filteredTours`
        filteredTours = filteredTours.filter(tour => selectedPlaces.includes(tour.estado));
    }

    // Filtrar por categorías si hay categorías seleccionadas y no es el filtro 'all'
    if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
        filteredTours = filteredTours.filter(tour => {
            // El `tour.category` de tu JSON puede tener múltiples categorías
            const tourCategories = tour.category.split(' y ').map(c => c.trim().toLowerCase());
            // Se verifica si alguna de las categorías del tour está en las categorías seleccionadas
            return tourCategories.some(tc => selectedCategories.includes(tc));
        });
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

// Cargar productos y gestionar eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    // Leer JSON de manera asíncrona
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            allTours = data; // Guardar todos los tours en la variable global
            renderTours(); // Muestra todos los tours al cargar la página.
        })
        .catch(err => {
            console.error("Error al cargar producto ", err);
            const container = document.getElementById('tours-container');
            container.innerHTML = '<p class="text-center w-100">Error al cargar los tours. Por favor, inténtalo de nuevo más tarde.</p>';
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
            // Se corrige la lógica para que el botón "Todo" se desactive
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
    
   
});

