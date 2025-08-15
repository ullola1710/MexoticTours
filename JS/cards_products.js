// Variables
const detalleUrl = (tour) => `tours.html?place=${tour.place}`;

function getParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
} // getParam - URL

// Agregar card
function addItem(tour){
    const container = document.getElementById('tours-container');
    const card = document.createElement('div');
    // const detalleUrl = `tour.html?{tour.place}`;
    
    card.classList.add("col-md-4");

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

    // Tabla
    const ul = document.createElement('ul');
    ul.classList.add('list-includes');

    (tour.incluye || []).forEach(item => {
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


// Cargar productos
document.addEventListener("DOMContentLoaded", () =>{
    // Leer JSON
    fetch("products.json")
    .then(res => res.json())
    .then(data =>{
        const tours = data;
        const placeParam = getParam("place"); 

        if(placeParam){
            const tour = tours.find(t => t.place === placeParam);
            if (tour){
                loadTour(tour); // Busca y trae el tour correspondiente
            } else {
                document.body.innerHTML = "<h2>Tour no encontrado</h2>";
            }
        } // if(placeParam)
        else {
            tours.forEach(tour => addItem(tour));
        } // else
    })
    .catch(err =>{
        console.error("Error al cargar producto ", err);
    });
}); // DOM












