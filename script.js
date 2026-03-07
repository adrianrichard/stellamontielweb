// Control de reproducción de audio
let currentAudio = null;
let currentButton = null;

function playAudio(audioId, button) {
    const audio = document.getElementById(audioId);
    
    // Si hay otro audio reproduciéndose, detenerlo
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        if (currentButton) {
            currentButton.textContent = 'Escuchar';
            currentButton.classList.remove('playing');
        }
    }
    
    // Reproducir o pausar
    if (audio.paused) {
        audio.play();
        button.textContent = '⏸ Pausar';
        button.classList.add('playing');
        currentAudio = audio;
        currentButton = button;
    } else {
        audio.pause();
        button.textContent = 'Escuchar';
        button.classList.remove('playing');
    }
    
    // Restablecer el botón cuando termine la canción
    audio.addEventListener('ended', function() {
        button.textContent = 'Escuchar';
        button.classList.remove('playing');
    });
}

// Menú Hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un link
if (navLinks) {
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Variables para el carrusel
let slideIndex = 1;

// Mostrar la primera diapositiva al cargar
document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
});

// Control del carrusel
function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('carousel-slide');
    const dots = document.getElementsByClassName('dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de navBar al scrollear
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Efectos hover en tarjetas
const songCards = document.querySelectorAll('.song-card');
songCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 15px 35px rgba(217, 70, 239, 0.3)';
    });
    
    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    });
});

// Animación de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar observador a elementos
document.querySelectorAll('.song-card, .blog-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ===== CÓDIGO DEL MODAL PARA 4 LIBROS =====
document.addEventListener('DOMContentLoaded', function() {
    // Toggle CV completo
    const verMasBtn = document.getElementById('ver-mas-btn');
    if (verMasBtn) {
        verMasBtn.addEventListener('click', function() {
            const cv = document.getElementById('cv-completo');
            if (cv) {
                if (cv.style.display === 'none' || cv.style.display === '') {
                    cv.style.display = 'block';
                    this.textContent = 'Ver menos...';
                } else {
                    cv.style.display = 'none';
                    this.textContent = 'Ver más...';
                }
            }
        });
    }

    // ===== MODAL DE POEMAS =====
    const modal = document.getElementById('poemModal');
    const closeBtn = document.getElementById('closePoemModal');
    
    if (!modal || !closeBtn) {
        console.error('No se encontraron los elementos del modal');
        return;
    }
    
    // Obtener los 4 botones
    const btnLibro1 = document.getElementById('abrirPoemasBtn1'); // Permanencia
    const btnLibro2 = document.getElementById('abrirPoemasBtn2'); // Fuente inagotable
    const btnLibro3 = document.getElementById('abrirPoemasBtn3'); // Nuestros sentidos
    const btnLibro4 = document.getElementById('abrirPoemasBtn4'); // El ser
    
    console.log('Botón Libro 1 (Permanencia):', btnLibro1);
    console.log('Botón Libro 2 (Fuente):', btnLibro2);
    console.log('Botón Libro 3 (Inagotable ser):', btnLibro3);
    console.log('Botón Libro 4 (Sueños ajenos):', btnLibro4);
    
    // Función para abrir el modal con el libro correspondiente
    function abrirModal(libroId) {
        // Cambiar el título según el libro
        const tituloModal = document.getElementById('modalTitle');
        if (!tituloModal) return;
        
        // Ocultar todos los contenidos
        const cont1 = document.getElementById('contenidoLibro1');
        const cont2 = document.getElementById('contenidoLibro2');
        const cont3 = document.getElementById('contenidoLibro3');
        const cont4 = document.getElementById('contenidoLibro4');
        
        if (cont1) cont1.style.display = 'none';
        if (cont2) cont2.style.display = 'none';
        if (cont3) cont3.style.display = 'none';
        if (cont4) cont4.style.display = 'none';
        
        // Mostrar el contenido correspondiente
        switch(libroId) {
            case 1:
                tituloModal.innerHTML = 'Poemas de <em>Permanencia</em>';
                if (cont1) cont1.style.display = 'block';
                break;
            case 2:
                tituloModal.innerHTML = 'Poemas de <em>Fuente inagotable</em>';
                if (cont2) cont2.style.display = 'block';
                break;
            case 3:
                tituloModal.innerHTML = 'Poemas de <em>Inagotable ser</em>';
                if (cont3) cont3.style.display = 'block';
                break;
            case 4:
                tituloModal.innerHTML = 'Poemas de <em>Sueños ajenos</em>';
                if (cont4) cont4.style.display = 'block';
                break;
        }
        
        // Mostrar el modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Asignar eventos a los botones
    if (btnLibro1) {
        btnLibro1.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal(1);
        });
    }
    
    if (btnLibro2) {
        btnLibro2.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal(2);
        });
    }
    
    if (btnLibro3) {
        btnLibro3.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal(3);
        });
    }
    
    if (btnLibro4) {
        btnLibro4.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal(4);
        });
    }
    
    // Función para cerrar el modal
    function cerrarModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Cerrar con el botón X
    if (closeBtn) {
        closeBtn.addEventListener('click', cerrarModal);
    }
    
    // Cerrar haciendo clic fuera del modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            cerrarModal();
        }
    });
});