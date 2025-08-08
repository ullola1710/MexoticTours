// Array de tours (este se queda igual)
const tours = [
    {
        nombre: "Palacio Postal (La Quinta Casa de Correo)",
        descripcion: "Es icono emblemático del Centro Histórico dadas sus características y cualidades artísticas.",
        precio: 1200,
        imagen: "http://googleusercontent.com/file_content/1", // Reemplaza con tus rutas
        categoria: ["arte", "cultura"],
        estado: "cdmx"
    },
    {
        nombre: "Centro Histórico de Querétaro",
        descripcion: "Es una ciudad verdaderamente privilegiada porque aquí se unen la arquitectura, música, la historia...",
        precio: 1100,
        imagen: "http://googleusercontent.com/file_content/2", // Reemplaza con tus rutas
        categoria: ["cultura"],
        estado: "queretaro"
    },
    {
        nombre: "Tour Tequila",
        descripcion: "Ruta que da inicio e el centro histórico de Guadalajara hacia Tequila, con visita guiada en fábrica de tequila artesanal.",
        precio: 1500,
        imagen: "http://googleusercontent.com/file_content/3", // Reemplaza con tus rutas
        categoria: ["cultura", "gastronomia"],
        estado: "jalisco"
    }
    // ... agrega más tours aquí
];

// Render de tours
const toursContainer = document.getElementById("tours-container");

function mostrarTours(listaDeTours) {
    toursContainer.innerHTML = ""; // Limpia el contenedor

    if (listaDeTours.length === 0) {
        toursContainer.innerHTML = `<p class="col-12 text-center">No se encontraron tours con esos filtros.</p>`;
        return;
    }

    // Usamos .map() para crear un array de strings HTML y .join() para unirlos
    const cardsHTML = listaDeTours.map(tour => `
        <div class="col-12 col-md-6 col-lg-4 d-flex">
            <div class="card h-100 w-100 shadow-sm">
                <img src="${tour.imagen}" class="card-img-top" alt="${tour.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${tour.nombre}</h5>
                    <p class="card-text">${tour.descripcion}</p>
                    <div class="mt-auto pt-2"> <p class="fw-bold fs-5 mb-2">$${tour.precio} MXN</p>
                        <a href="#" class="btn btn-primary w-100">Más información</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Inserta todo el HTML de una vez. ¡Más eficiente!
    toursContainer.innerHTML = cardsHTML;
}

// Mostrar todos los tours al cargar la página
mostrarTours(tours);