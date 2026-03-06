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
const navItems = navLinks.querySelectorAll('a');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

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
    dots[slideIndex - 1].classList.add('active');
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
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
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

// Toggle CV completo
document.addEventListener('DOMContentLoaded', function() {
    const verMasBtn = document.getElementById('ver-mas-btn');
    if (verMasBtn) {
        verMasBtn.addEventListener('click', function() {
            const cv = document.getElementById('cv-completo');
            if (cv.style.display === 'none') {
                cv.style.display = 'block';
                this.textContent = 'Ver menos...';
            } else {
                cv.style.display = 'none';
                this.textContent = 'Ver más...';
            }
        });
    }
});

// Elementos del modal de poemas
const modal = document.getElementById('poemModal');
const abrirBtn = document.getElementById('abrirPoemasBtn');
const cerrarBtn = document.getElementById('closePoemModal');

// Función para abrir el modal
function abrirModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // deshabilitar scroll
}

// Función para cerrar
function cerrarModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // restaurar scroll
}

// Eventos
if (abrirBtn) {
    abrirBtn.addEventListener('click', abrirModal);
}

if (cerrarBtn) {
    cerrarBtn.addEventListener('click', cerrarModal);
}

// Cerrar haciendo clic fuera del contenido (en el fondo del modal)
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
