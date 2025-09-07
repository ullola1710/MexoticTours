// export function normalizadorTour(raw = {}){
function normalizadorTour(raw = {}){
    const id = raw.id ?? raw.idTour ?? null;
    const name = raw.nombre ?? raw.name ?? '';
    const image = raw.img ?? raw.image ?? '';
    const cover = raw.imgPortada ?? raw.img_portada ?? '';
    const state = raw.estado ?? raw.state ?? '';
    const city = raw.ciudad ?? raw.city ?? '';
    const description = raw.descripcion ?? raw.description ?? '';
    const categories = Array.isArray(raw.categoria) ? raw.categoria : [raw.categoria];
    const price = Number(raw.precio ?? raw.price ?? 0);
    const priceExclusive = Number(raw.precioExclusivo ?? raw.exclusivePrice ?? 0);

    // let includes;
    // if (Array.isArray(raw.incluye)) {
    //     includes = raw.incluye;
    // } else if (typeof raw.incluye === 'string') {
    //     includes = raw.incluye.split('\n').filter(x => x.trim() !== '');
    // } else if (Array.isArray(raw.includes)) {
    //     includes = raw.includes;
    // } else {
    //     includes = [];
    // } // if includes

    let includes;
    if (Array.isArray(raw.incluye)) {
        includes = raw.incluye;
    } else if (typeof raw.incluye === 'string') {
        includes = raw.incluye.split('\n').filter(x => x.trim() !== '');
    } else if (Array.isArray(raw.includes)) {
        includes = raw.includes;
    } else if (typeof raw.includes === 'string') {
        includes = raw.includes.split('\n').filter(x => x.trim() !== '');
    } else {
        includes = [];
    } // if 2 - includes

    const info = raw.informacionTour ?? raw.info ?? {};
    const salida = info.salida ?? info.start ?? '-';
    const regresoAprox = info.regresoAprox ?? info.endApprox ?? '-';
    const frecuencia = info.frecuencia ?? info.frequency ?? '-';
    const grupos = info.grupos ?? info.groups ?? '-';

    return {
    id,
    name,
    image,
    cover,
    state,
    city,
    description,
    categories,
    price,
    priceExclusive,
    includes,
    info: { salida, regresoAprox, frecuencia, grupos },
    _raw: raw
  }; 
} // normalizadorTour 