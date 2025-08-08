// Array de tours
const tours = [
    {
        nombre: "Tour CDMX Histórico",
        descripcion: "Recorre los lugares más emblemáticos de la Ciudad de México.",
        precio: 1200,
        imagen: "./assets/tour-cdmx.jpg",
        categoria: "cultura",
        estado: "cdmx"
    },
    {
        nombre: "Ruta del Tequila Jalisco",
        descripcion: "Vive la experiencia del tequila desde su origen.",
        precio: 1500,
        imagen: "./assets/tour-jalisco.jpg",
        categoria: "gastronomia",
        estado: "jalisco"
    },
    {
        nombre: "Querétaro Colonial",
        descripcion: "Descubre la arquitectura y cultura de Querétaro.",
        precio: 1100,
        imagen: "./assets/tour-queretaro.jpg",
        categoria: "arte",
        estado: "queretaro"
    }
];

// Render de tours
const toursContainer = document.getElementById("tours-container");

function mostrarTours(lista) {
    toursContainer.innerHTML = ""; // Limpia antes de renderizar
    lista.forEach(tour => {
        toursContainer.innerHTML += `
            <div class="col-12 col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src="${tour.imagen}" class="card-img-top" alt="${tour.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${tour.nombre}</h5>
                        <p class="card-text">${tour.descripcion}</p>
                        <p class="fw-bold">$${tour.precio} MXN</p>
                        <button class="btn btn-primary">Ver más</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Mostrar todos al inicio
mostrarTours(tours);
