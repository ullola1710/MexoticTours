// Array de tours (este se queda igual)
// toursData.js
const tours = [
  {
    id: 1, 
    estado: 'CDMX',
    name: 'Palacio Postal',
    img: './assets/products/PalacioPostal.jpg',
    description: 'Ícono del Centro Histórico con arquitectura única.',
    category: 'Cultura',
    horario: '',
    disponibilidad: '',
    duracion:'',
    precio: '',
    incluye:'', 
    leyenda:'',
  },
  {
    id: 2,
    estado: 'Querétaro',
    name: 'Centro Histórico de Querétaro',
    img: './assets/products/CentroHistorico.jpg',
    description: 'Ciudad privilegiada por su arquitectura, música e historia.',
    category: 'Cultura',
    horario:'' ,
    disponibilidad:'',
    duracion: '',
    precio: '',
    incluye:'' ,
    leyenda:'' ,
  },
  {
    id: 3,
    estado: 'Jalisco',
    name: 'Tour Tequila',
    img: './assets/products/tequila.png',
    description: 'Visita guiada a la fábrica de tequila artesanal.',
    category: 'Gastronomía',
    horario:'' ,
    disponibilidad:'' ,
    duracion:'' ,
    precio:'' ,
    incluye:'' ,
    leyenda:'' ,   
    precio:'',
  },
  {
    id: 4,
    estado: 'CDMX',
    name: 'Ragga by Joy Antara',
    img: './assets/products/Ragga.jpg',
    description: 'Escenografía iluminada y ambiente sensacional.',
    category: 'Fiesta',
    horario:'' ,
    disponibilidad:'' ,
    duracion:'',
    precio:'',
    incluye:'' ,
    leyenda:'' ,
  },
  {
    id:5,
    estado:'Querétaro',
    name: 'Carranza 50',
    img: './assets/products/Carranza.jpg',
    description: 'Restaurante con cocina mexicana en brasas.',
    category: 'Gastronomía',
    horario:'',
    disponibilidad:'',
    duracion:'',
    precio: '',
    incluye:'',
    leyenda:'',
  },
  {
    id: 6,
    estado:'Jalisco',
    name: 'Mercado San Juan de Dios',
    img: './assets/products/SanJuandeDios.jpg',
    description: 'Más de 4000 puestos con comida y artesanías.',
    category: 'Gastronomía',
    horario:'',
    disponibilidad:'',
    duracion: '2 a 4 horas',
    precio: '',
    incluye:'',
    leyenda:'',
  },
  {
    id: 7,
    estado: 'CDMX',
    name: 'Museo Soumaya',
    img: './assets/products/MuseoSoumaya.jpg',
    description: 'Museo de arte con arquitectura futurista.',
    category: 'Arte',
    horario:'',
    disponibilidad:'',    
    duracion: '',
    precio: '',
    incluye:'',
    leyenda:'',
  },
  {
    id: 8,
    estado:'Jalisco',
    name: 'Catedral de Guadalajara',
    img: './assets/products/CatedralGuadalajara.jpg',
    description: 'Imponente catedral con torres neogóticas.',
    category: 'Cultura',
    horario:'',
    disponibilidad:'',
    duracion:'',
    precio:'',
    incluye:'',
    leyenda:'',
  },
  {
    id: 9,
    estado:'Querétaro',
    name: 'Viaje a Bernal y Tequisquiapan',
    img: './assets/products/Bernal.jpg',
    description: 'Pasea por las hermosas calles de Bernal y Tequisquiapan. Prueba el delicioso vino y queso de la región semidesértica de Querétaro.',
    category: 'Gastronomía, Cultura',
    horario:'',
    disponibilidad:'',
    duracion:'',
    precio:'',
    incluye:'',
    leyenda:'',
  },
  {
    id: 10,
    estado:'CDMX',
    name: 'Museo de Arte Moderno',
    img: './assets/products/MuseoModerno.jpg',
    description: 'Obras modernas y contemporáneas en un espacio icónico.',
    category: 'Arte',
    horario:'',
    disponibilidad:'',
    duracion:'',
    precio:'',
    incluye:'',
    leyenda:'',
  }
];

// products.js
function addItem(tour) {
  const container = document.getElementById('tours-container');
  
  const card = document.createElement('div');
  card.classList.add('col-md-4');

  card.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${tour.img}" class="card-img-top" alt="${tour.estado}">
      <div class="card-body">
        <h5 class="card-title">${tour.name}</h5>
        <p class="card-category">${tour.category}</p>
        <p class="card-estado">${tour.estado}</p>
        <p class="card-text">${tour.description}</p>
        <button class="btn-mas-info" id="info">Más información</button>


      </div>
    </div>
  `;
   

  container.appendChild(card);
}

// main.js (al final)
tours.forEach(tour => addItem(tour));


