// Variables
import { normalizadorTour } from "./normalizador.js";

// Leer JSON 
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
    } // if 
  });
} // loadProducts

async function ensureProducts(){
    if(typeof loadProducts === "function"){
        return await loadProducts();
    } // if
    const stored = localStorage.getItem("products");
    if (stored) return JSON.parse(stored);
    const res = await fetch("products.json");
    return await res.json();
} // ensureProducts

function emptySlideHTML(message){
    return `<div class="carousel-item active">
                <div class="p-5 text-center">
                    <h5 class="text-white">${message}</h5>
                </div>
            </div>`;
} // emptySlideHTML

function cardHTML(exp){
    const {
        comentario, calificacion, fecha, usuario, imagen, tourName
    }  = exp;
    return `<div class="col-12 col-md-6 mb-5">
                <div class="card p-4 text-center h-100">
                    <div class="stars">${stars(calificacion)}</div>
                    <div class="date">${fecha ? formatDateMx(fecha) : ''}</div>
                    <img class="carruselImg mt-2" src="${imagen}" alt="${tourName}"
                        onerror="this.src='https://via.placeholder.com/800x500?text=Mexotic+Tours'">
                    <p class="mt-3">"${comentario}"</p>
                    <small class="text-muted d-block">— ${usuario}
                    <small class="text-muted">📍 ${tourName}</small>
                    </small>
                </div>
            </div>`;
} // cardHTML

// estrellas
function stars(rate){
    const n = Number(rate) || 0;
    const full = Math.floor(n);
    const half = n - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    const estrella = '<i class="bi bi-star-fill" style="font-size: 1.5rem"></i>';
    const mitad = '<i class="bi bi-star-half" style="font-size: 1.5rem"></i>';
    const vacia = '<i class="bi bi-star" style="font-size: 1.5rem"></i>';

    return estrella.repeat(full) + (half ? mitad : '') + vacia.repeat(empty);
} // stars


// para el contenido a desplegar
function contenido(array, size){
    const out = [];
    for (let i = 0; i < array.length; i += size) out.push(array.slice(i, i + size));
    return out;
} // contenido

// Formato para fechas
function parseDateSmart(s) {
    if (!s) return 0;
    const str = String(s).trim();

    const m1 = str.match(/^(\d{2})-(\d{2})-(\d{4})$/); // dd-mm-yyyy
    if (m1) {
        const [, dd, mm, yyyy] = m1;
        return new Date(`${yyyy}-${mm}-${dd}T00:00:00`).getTime();
    }
    const t = Date.parse(str);
    return isNaN(t) ? 0 : t;
} // parseDateSmart

// Mostrar dd/mm/aaaa
function formatDateMx(s) {
    const ts = parseDateSmart(s);
    if (!ts) return '';
    const d = new Date(ts);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
} // formatDateMx

document.addEventListener("DOMContentLoaded", initExperiences);

async function initExperiences(){
    const carousel = document.getElementById("carouselExampleIndicators");
    const inner = carousel?.querySelector(".carousel-inner");
    const indicator = carousel?.querySelector(".carousel-indicators");
    if(!inner || !indicator) return;

    try{
        const tours = await ensureProducts();
        
        // Solo experiencias
        const experiencia = tours.flatMap(tour => {
            const list = Array.isArray(tour.experiencia)? tour.experiencia : [];
            const backUpImg = tour.img || tour.img_portada || '';
            const tourName = tour.name || "Tour";
            return list.map(exp => ({
                comentario: exp.comentario ?? '',
                calificacion: Number(exp.calificacion ?? 0),
                fecha: exp.fecha ?? '',
                usuario: exp.usuario ?? "Anónimo",
                imagen: exp.imgExperiencia || backUpImg,
                tourName
            })); // .map
        }); // flatMap

        // Ordenar de la fecha más reciente a la más antigua
        experiencia.sort((antigua, reciente) => parseDateSmart(reciente.fecha) - parseDateSmart(antigua.fecha));

        // Renderizar
        inner.innerHTML = '';
        indicator.innerHTML = '';

        if(experiencia.length === 0){
            inner.innerHTML = emptySlideHTML("Aún no hay experiencias para mostrar.");
            return;
        } // if - existen experiencias o no 

        // grupos
        const grupo = contenido(experiencia, 2);
        grupo.forEach((par, idx) => {
            // indicador
            const btn = document.createElement("button");
            btn.type = "button";
            btn.setAttribute("data-bs-target", "#carouselExampleIndicators");
            btn.setAttribute("data-bs-slide-to", String(idx));
            btn.ariaLabel = `Slide ${idx + 1}`;
            if(idx === 0) btn.classList.add("active");
            indicator.appendChild(btn);

            // diapos
            const diapo = document.createElement("div");
            diapo.className = `carousel-item${idx === 0 ? ' active' : ''}`;
            diapo.innerHTML = `<div class="row g-4 justify-content-center">${par.map(cardHTML).join('')}</div>`;
            inner.appendChild(diapo);
        }); // forEach

    } catch (element){
        inner.innerHTML = emptySlideHTML("Error al cargar experiencias");
        indicator.innerHTML = '';
    } // try - catch
} // initExperiences
