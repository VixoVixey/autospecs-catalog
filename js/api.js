const API_URL = 'https://dummyjson.com/products/category/vehicle';

// Diccionario de datos técnicos exactos en español e imágenes correspondientes
const CAR_DATA_MAP = {
    '300 touring': {
        title: 'Chrysler 300 Touring Sedan',
        description: 'Sedán ejecutivo tracción trasera. Motor Pentastar V6 3.6L, transmisión automática de 8 velocidades y chasis confort.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Chrysler_300_SRT8_%28LX%29_Washington_DC_Metro_Area%2C_USA.jpg/1280px-Chrysler_300_SRT8_%28LX%29_Washington_DC_Metro_Area%2C_USA.jpg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail'
    },
    'charger': {
        title: 'Dodge Charger SXT RWD',
        description: 'Sedán deportivo americano tracción trasera. Motor V6 3.6L, paquete aerodinámico y frenos de alto rendimiento.',
        image: 'https://cdn.ebizautos.media/used-2022-dodge-charger-sxtrwd-14442-22991332-1-640.jpg'
    },
    'hornet': {
        title: 'Dodge Hornet GT Plus Turbo',
        description: 'Crossover deportivo con motor 2.0L Turbo Hurricane4 (268 HP), tracción integral AWD y transmisión de 9 velocidades.',
        image: 'https://acnews.blob.core.windows.net/imgnews/paragraph/NPAZ_83b3ccf9f9154ddcb0761b3fb85606a1.webp'
    },
    'durango': {
        title: 'Dodge Durango SXT RWD',
        description: 'SUV de tres filas tracción trasera. Capacidad de remolque reforzada, suspensión adaptativa y motor V6 de alto torque.',
        image: 'https://imagescdn.dealercarsearch.com/Media/22424/24115988/639203396201282875.jpg'
    },
    'pacifica': {
        title: 'Chrysler Pacifica Touring',
        description: 'Monovolumen familiar con tren motriz V6 3.6L, sistema Stow n Go y asistencias electrónicas de conducción nivel 2.',
        image: 'https://hips.hearstapps.com/hmg-prod/images/2017-chrysler-pacifica-114-1560363830.jpg?crop=0.721xw:0.662xh;0.279xw,0.338xh&resize=2048:*'
    }
};

// Fichas técnicas base
const SPECS_BASE = [
    {
        id: 'spec-1',
        title: 'Volkswagen Golf GTI MK4 1.8T (AUQ)',
        description: 'Bloque 1.8L Turbo 20V (180 HP de fábrica). Pistones forjados, culata 5V y alto soporte para preparaciones big turbo.',
        category: 'autos',
        brand: 'Volkswagen',
        price: 4500,
        thumbnail: 'https://cdn.motor1.com/images/mgl/PzJJ8/s3/vw-golf-gti-25th-anniversary---leilao-uk.webp'
    },
    {
        id: 'spec-2',
        title: 'Transmisión Manual 02J (5 Velocidades)',
        description: 'Transmisión mecánica por cable con diferencial abierto estándar y carcasa reforzada para soporte de torque elevado.',
        category: 'transmision',
        brand: 'Volkswagen / Audi',
        price: 850,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTiKmaazjOUu-HWNU4sQzBJGofR0kDR7vadUx4TSX4Xp3SfSOfO3clQi3LphBsw7_U0ap7vyYloUF8ZSD4'
    },
    {
        id: 'spec-3',
        title: 'ECU Programable FuelTech FT450',
        description: 'Sistema de inyección secuencial y encendido programable con pantalla táctil, datalogger integrado y comunicación CAN.',
        category: 'electronica',
        brand: 'FuelTech',
        price: 1100,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrafVCgbwK09YNpSKLtF-zC-iKse58cr1OLx6uJ1w9RfdtfPpTN2M675Y&s=10'
    }
];

/**
 * Normaliza y traduce los datos de la API según el catálogo automotriz
 */
function normalizeCarData(item) {
    const lower = (item.title || '').toLowerCase();

    for (const [key, data] of Object.entries(CAR_DATA_MAP)) {
        if (lower.includes(key)) {
        return {
            title: data.title,
            description: data.description,
            thumbnail: data.image
        };
        }
    }

  // Si no coincide, mantiene los datos originales
    return {
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnail
    };
}

/**
 * Consulta la API DummyJSON y combina los datos normalizados en español
 * @returns {Promise<Array>}
 */
export async function fetchProductos() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        const productosAPI = (data.products || []).map(prod => {

            const normalized = normalizeCarData(prod);
            return {
                id: `api-${prod.id}`,
                title: normalized.title,
                description: normalized.description,
                category: 'autos',
                brand: prod.brand || 'Vehículo',
                price: prod.price,
                thumbnail: normalized.thumbnail
                };
            });


    return [...SPECS_BASE, ...productosAPI];
    } catch (err) {
        console.error('Error al consultar API externa:', err);
        return SPECS_BASE;
    }
}