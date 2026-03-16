// noticias.js - Gestión de noticias para el carrusel

// Base de datos de noticias (puedes agregar, modificar o quitar noticias fácilmente)
const noticiasDB = [
    {
        titulo: "Primer trabajo discográfico",
        fecha: "13 de Marzo, 2026",
        descripcion: "Lanzamiento del primer trabajo discográfico. Se puede escuchar en las redes sociales.",
        enlace: "#contacto",
        textoEnlace: "Ir →"
    },
    {
        titulo: "Adquirir libro Inagotable ser",
        fecha: "10 de Enero, 2026",
        descripcion: "Para adquirir el libro \"Inagotable ser\" hacer click en el enlace",
        enlace: "https://www.oximoron.ar/productos/inagotable-ser-stella-montiel-pqylr/?srsltid=AfmBOoqjhnfTF7chCjN-us1BYzGphbg9z6_jTCw5XNq38zWdr18gfPcf",
        textoEnlace: "Comprar \"Inagotable ser\"→",
        target: "_blank"
    },
    {
        titulo: "Letras de canciones",
        fecha: "5 de Diciembre, 2025",
        descripcion: "Mediante el siguiente enlace se puede acceder a la letras de algunas canciones.",
        enlace: "https://lyrics.lyricfind.com/artists/stella-montiel",
        textoEnlace: "Ir →"
    },
    {
        titulo: "X Congreso de Escritores Latinoamericanos",
        fecha: "18 de Agosto, 2025",
        descripcion: "Stella Montiel participará del congreso con la presentación de su obra 'Inagotable Ser'.",
        enlace: "https://www.instagram.com/p/DQuXVJzD1DJ/",
        textoEnlace: "Ir a la cultura viva →",
        target: "_blank"
    },    
    {
        titulo: "Radio Diputados",
        fecha: "17 de Mayo, 2024",
        descripcion: "Entrevista en Radio Diputados sobre la presentación del libro Permanencia",
        enlace: "https://creators.spotify.com/pod/profile/radio-diputados/embed/episodes/Stella-Montiel-presenta-su-libro-Permanencia-e2jpemv/a-ab9bgcm",
        textoEnlace: "Ir a la entrevista →",
        target: "_blank"
    },
    {
        titulo: "Uno Diario Entre Ríos",
        fecha: "16 de Mayo, 2024",
        descripcion: "Entrevista en Uno Diario Entre Ríos sobre la presentación del libro Permanencia",
        enlace: "https://www.unoentrerios.com.ar/escenario/stella-montiel-presentara-su-libro-poemas-titulado-permanencia-n10133759.html",
        textoEnlace: "Ir a la entrevista →",
        target: "_blank"    
    }
    // {
    //     titulo: "Presentación en la Feria del Libro",
    //     fecha: "20 de Noviembre, 2025",
    //     descripcion: "Participación en la Feria Internacional del Libro con la presentación de 'Sueños Ajenos'.",
    //     enlace: "#",
    //     textoEnlace: "Ver más →"
    // }
];

// Variables del carrusel
let blogGrid, blogCards, totalCards, currentIndex = 0, cardsPerView;

// Función para renderizar las noticias en el HTML
function renderizarNoticias() {
    blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    // Limpiar el contenedor
    blogGrid.innerHTML = '';
    let htmlContent = '';
    
    // Generar HTML para cada noticia
    noticiasDB.forEach(noticia => {
        const targetAttr = noticia.target ? `target="${noticia.target}" rel="noopener noreferrer"` : '';
        const enlaceCompleto = noticia.enlace ? 
            `<a href="${noticia.enlace}" class="read-more" ${targetAttr}>${noticia.textoEnlace}</a>` : '';
        
        const noticiaHTML = `
            <article class="blog-card">
                <h3>${noticia.titulo}</h3>
                <p class="blog-date">${noticia.fecha}</p>
                <p>${noticia.descripcion}</p>
                ${enlaceCompleto}
            </article>
        `;
        
        htmlContent += noticiaHTML;
    });
    blogGrid.innerHTML = htmlContent;
    
    // Actualizar variables después de renderizar
    blogCards = document.querySelectorAll('.blog-card');
    totalCards = blogCards.length;
    cardsPerView = getCardsPerView();
    
    // Reiniciar el carrusel
    currentIndex = 0;
    crearDots();
    actualizarCarrusel();
}

// Función para determinar cuántas tarjetas se muestran según el ancho
function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

// Función para actualizar la posición del carrusel
function actualizarCarrusel() {
    if (!blogCards || blogCards.length === 0) return;
    
    const cardWidth = blogCards[0].offsetWidth;
    const gap = 20;
    const moveDistance = currentIndex * (cardWidth + gap);
    blogGrid.style.transform = `translateX(-${moveDistance}px)`;
    actualizarDots();
}

// Función para mover el carrusel (disponible globalmente)
window.moveSlide = function(direction) {
    cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    
    actualizarCarrusel();
};

// Función para ir a un slide específico
function irASlide(index) {
    cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    if (index >= 0 && index <= maxIndex) {
        currentIndex = index;
        actualizarCarrusel();
    }
}

// Crear dots de navegación
function crearDots() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => irASlide(i));
        dotsContainer.appendChild(dot);
    }
    
    actualizarDots();
}

// Actualizar dots activos
function actualizarDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Función para agregar una nueva noticia (útil para administración)
window.agregarNoticia = function(titulo, fecha, descripcion, enlace = '#', textoEnlace = 'Leer más →', target = '') {
    const nuevaNoticia = {
        titulo: titulo,
        fecha: fecha,
        descripcion: descripcion,
        enlace: enlace,
        textoEnlace: textoEnlace,
        target: target
    };
    
    noticiasDB.push(nuevaNoticia);
    renderizarNoticias(); // Volver a renderizar todo
};

// Función para eliminar una noticia por índice
window.eliminarNoticia = function(indice) {
    if (indice >= 0 && indice < noticiasDB.length) {
        noticiasDB.splice(indice, 1);
        renderizarNoticias();
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    renderizarNoticias();
    
    // Evento de resize
    window.addEventListener('resize', function() {
        const oldCardsPerView = cardsPerView;
        cardsPerView = getCardsPerView();
        
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        crearDots();
        actualizarCarrusel();
    });
    
    // Actualizar después de cargar imágenes
    window.addEventListener('load', actualizarCarrusel);
});