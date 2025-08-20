// Variables
const detalleUrl = (tour) => `tours.html?id=${tour.id}`;
let allTours = [];


function getParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
} // getParam - URL

// Agregar card
function addItem(tour){
    const container = document.getElementById('tours-container');
    const card = document.createElement('div');
    // const detalleUrl = `tour.html?{tour.id}`;
    
    card.classList.add("col-md-4");
    card.dataset.place = tour.estado;
    card.dataset.category = tour.category.toLowerCase(); // Convertir a minúsculas para consistencia


    card.innerHTML= `
    <div class="card h-100 shadow-sm d-flex flex-column">
        <img src="${tour.img}" class="card-img-top" alt="${tour.name}">
        <div class="card-body d-flex flex-column">
            <h3 class="card-title clamp-2">${tour.name}</h5>
            <p class="card-category">${tour.category}</p>
            <p class="card-estado">${tour.estado}</p>
            <p class="card-text mt-2 clamp-5 flex-grow-1">${tour.description}.</p>
            <div class="card-footer bg-transparent border-0 mt-auto">
                <a href="${detalleUrl(tour)}"class="btn-custom">Más información</a>
            </div>
        </div>
    </div>
    `;
    container.appendChild(card);
}//Función AddItem Productos 

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


function loadTour(tour){
    const title = document.getElementById('tour-title');
    if(!title) return;

    document.getElementById('tour-title').textContent = tour.name;
    // document.getElementById('tour-price').textContent = tour.precioExclusivo || tour.precio;
    document.getElementById('tour-price').textContent = `$${tour.precio} MXN por persona`;
    document.getElementById('tour-image').src = tour.img;
    document.getElementById('tour-image').alt = tour.name;

    if(tour.img_portada){
        document.getElementById('tour-header').style.backgroundImage = `url("${tour.img_portada}")`;
        //document.body.style.backgroundImage = `url("${tour.img_portada}")`;
    }

    const includesList = document.getElementById('tour-includes');
    includesList.innerHTML= "";

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
        <p><i class ="bi bi-alarm" style="margin-right: 0.5rem;"></i>Salida: ${tour.informacionTour?.salida || "-"}<br>Regreso aproximado: ${tour.informacionTour?.regresoAprox || "-"}</p>
        <p><i class = "bi bi-calendar-event" style="margin-right: 0.5rem;"></i>${tour.informacionTour?.frecuencia || "-"}</p>
        <p><i class = "bi bi-people" style="margin-right: 0.5rem;"></i>${tour.informacionTour?.grupos || "-"}</p>
    `;
    document.getElementById("tour-info").innerHTML = infoHTML;
}

// Promesa
function loadProducts(){
    return new Promise((resolve, reject) => {
        const stored = localStorage.getItem("products");
        if(stored){
            resolve (JSON.parse(stored));
        } // if
        else{
            fetch ("products.json")
            .then(res => res.json())
            .then(resolve)
            .catch(reject);
        } // else
    }); // return load Products
} // loadProducts

// Cargar productos
document.addEventListener("DOMContentLoaded", () =>{
    // Leer JSON - Se leía JSON anteriormente, pero se agrega en el método loadProducts()
    // fetch("products.json")
    // .then(res => res.json())
    // .then(data =>{
    //     const tours = data;
    //     const placeParam = getParam("place"); 

    loadProducts()
    .then(tours => {
        const idParam = getParam("id");

        if(idParam){
            const tour = tours.find(t => t.id == idParam);
            if (tour){
                loadTour(tour); // Busca y trae el tour correspondiente
            } else {
                document.body.innerHTML = "<h2>Tour no encontrado</h2>";
            }
        } // if(idParam)
        else {
            tours.forEach(tour => addItem(tour));
        } // else
    })
    .catch(err =>{
        console.error("Error al cargar producto ", err);
    });
}); // DOM

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
