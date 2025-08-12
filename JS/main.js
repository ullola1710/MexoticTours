// Array de tours (este se queda igual)
// toursData.js
const tours = [
  {
    id: 1 ,
    estado: 'CDMX',
    name: 'Palacio Postal',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Palacio_Postal_Mexico.jpg/640px-Palacio_Postal_Mexico.jpg',
    description: 'Ícono del Centro Histórico con arquitectura única.',
    category: 'Cultura',
    duracion:'',
    precio: '',
    incluye: '' ,
  },
  {
    estado: 'Querétaro',
    name: 'Centro Histórico de Querétaro',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Queretaro_centro.jpg',
    description: 'Ciudad privilegiada por su arquitectura, música e historia.',
    category: 'Cultura',
    duracion: '',
    precio: '',

  },
  {
    estado: 'Jalisco',
    name: 'Tour Tequila',
    img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpueblosmagicos.mexicodesconocido.com.mx%2Fjalisco%2Ftequila-jalisco%2F&psig=AOvVaw1U1g87mrBZHE3VOu84y_PD&ust=1754972641768000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiy8dj0gY8DFQAAAAAdAAAAABAE',
    description: 'Visita guiada a la fábrica de tequila artesanal.',
    category: 'Gastronomía',
    duracion: '',
    precio:'',
  },
  {
    estado: 'CDMX',
    name: 'Ragga by Joy Antara',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Nightclub.jpg',
    description: 'Escenografía iluminada y ambiente sensacional.',
    category: 'Fiesta',
    duracion:'',
    precio:'',
  },
  {
    estado:'Querétaro',
    name: 'Carranza 50',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Restaurant.jpg',
    description: 'Restaurante con cocina mexicana en brasas.',
    category: 'Gastronomía',
    duracion:'',
    precio: '',
  },
  {
    estado:'Jalisco',
    name: 'Mercado San Juan de Dios',
    img: './assets/mercado.jpg',
    description: 'Más de 4000 puestos con comida y artesanías.',
    category: 'Gastronomía',
    duracion: '2 a 4 horas',
    precio: '',
  },
  {
    estado: 'CDMX',
    name: 'Museo Soumaya',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Museo_Soumaya.jpg',
    description: 'Museo de arte con arquitectura futurista.',
    category: 'Arte',
    duracion: '',
    precio: '',
  },
  {
    estado:'Jalisco',
    name: 'Catedral de Guadalajara',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Catedral_Guadalajara.jpg',
    description: 'Imponente catedral con torres neogóticas.',
    category: 'Cultura',
    duracion:'',
    precio:'',
  },
  {
    estado:'',
    name: 'Viaje a Bernal y Tequisquiapan',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Feria_San_Marcos.jpg',
    description: 'Pasea por las hermosas calles de Bernal y Tequisquiapan. Prueba el delicioso vino y queso de la región semidesértica de Querétaro.',
    category: 'Gastronomía, Cultura',
    duracion:'',
    precio:'',
  },
  {
    estado:'CDMX',
    name: 'Museo de Arte Moderno',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Museo_Arte_Moderno.jpg',
    description: 'Obras modernas y contemporáneas en un espacio icónico.',
    category: 'Arte',
    duracion:'',
    precio:'',
  }
];

// main.js
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
        <p class="card-text">${tour.description}</p>
        <button class="btn-mas-info">Más información</button>


      </div>
    </div>
  `;

  container.appendChild(card);
}

// main.js (al final)
tours.forEach(tour => addItem(tour));

