

//Estrcuctura para const de productos/tours
const productos = [
    {
        estado:"Jalisco",
        nombre:"Tequila",
        img:"",
        categoria:"Cultura, Fiesta",
        horario:"10:00-18:00",
        descripcion:"Visita los campos de agave y observa cómo se produce y destila la bebida, mientras degustas cócteles y aprendes sobre sus orígenes.",
        disponibilidad:"Sábados y Domingos",
        duracion:"10 hrs",
        precio:"790.00",
        incluye:"",

    },
    {
        estado:"Jalisco",
        nombre:"Mercado San Juan de Dios",
        img: "assets/mercado.jpg",
        categoria:"Gastronomía, Cultura",
        horario:"Lunes a Domingo, de 8:00 a 20:00 horas",
        descripcion:"",
        disponibilidad:"",
        duracion:"Visita recomendada de 2 a 4 horas",
        precio:"",
        incluye:"Acceso a tres niveles con áreas de comida típica, artesanías, ropa, dulces y productos locales.",
        
    },
        {
        estado:"Jalisco",
        nombre:"Tour al sitio Arqueológico de los Guachimontones",
        img:"",
        categoria:"Cultura",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"6 hrs",
        precio:"",
        incluye:"",

    },
            {
        estado:"Jalisco",
        nombre:"Sierra Tour Mazamitla Adventure",
        img:"",
        categoria:"Cultura, Fiesta",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"4 hrs",
        precio:"",
        incluye:"",

    },
            {
        estado:"CDMX",
        nombre:"Tour gastronómico por el Centro Histórico CDMX",
        img:"",
        categoria:"Gastronomía, Cultura",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"3 hrs",
        precio:"",
        incluye:"",

    },
            {
        estado:"CDMX",
        nombre:"Palacio de Bellas Artes",
        img:"",
        categoria:"Arte",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"",
        precio:"",
        incluye:"",

    },
            {
        estado:"CDMX",
        nombre:"Museo Nacional de Antropología",
        img:"",
        categoria:"Cultura",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"",
        precio:"",
        incluye:"",

    },
            {
        estado:"CDMX",
        nombre:"Jardines FLotantes de Xochimilco",
        img:"",
        categoria:"Fiesta, Cultura",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"",
        precio:"",
        incluye:"",

    },
            {
        estado:"Querétaro",
        nombre:"Peña de Bernal",
        img:"",
        categoria:"Cultura, Gastronomía",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"3 hrs",
        precio:"",
        incluye:"",

    },
            {
        estado:"Querétaro",
        nombre:"Centro Histórico de Querétaro",
        img:"",
        categoria:"Cultura",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"",
        precio:"",
        incluye:"",

    },
            {
        estado:"Querétaro",
        nombre:"Tour Gastronómico de Querétaro",
        img:"",
        categoria:"Gastronomía",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"",
        precio:"",
        incluye:"",

    },
            {
        estado:"Querétaro",
        nombre:"Museo de Arte de Querétaro",
        img:"",
        categoria:"Arte, Cultura",
        horario:"",
        descripcion:"",
        disponibilidad:"",
        duracion:"",
        precio:"",
        incluye:"",

    },
];
const contenedor = document.getElementById("contenedor-productos");
productos.forEach(producto => {
  contenedor.innerHTML += `
    <div class="col-4 card-body">
      <div class="col">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.estado}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="card-title">${producto.categoria}</h6>
            <p class="card-text">${producto.duracion}</p>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text"><strong>$${producto.precio}</strong></p>
            <button type="button" class="btn btn-primary"
             style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            Más información
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
});
