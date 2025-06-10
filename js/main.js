document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const heroSection = document.querySelector('.hero-section');
    const skillItems = document.querySelectorAll('.skills-container li');
    const logo = document.querySelector('.logo');

    // Efecto Parallax para el fondo del hero
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        heroSection.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
    });

    // Toggle del menú móvil con animación suave
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            setTimeout(() => {
                navLinks.style.opacity = '1';
                navLinks.style.transform = 'translateY(0)';
            }, 10);
        } else {
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        }
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Scroll suave con efecto de aceleración
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de aparición al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación de scroll a todas las secciones y cards
    sections.forEach(section => {
        section.classList.add('scroll-animation');
        observer.observe(section);
    });

    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('scroll-animation');
        observer.observe(card);
    });

    // Efecto de hover 3D para las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Efecto de partículas para el fondo (opcional, descomentar si se desea usar)
    /*
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
    */

    // Cambiar estilo del header al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Efecto de transparencia gradual
        const scrolled = Math.min(currentScroll / 200, 1);
        header.style.backgroundColor = `rgba(42, 42, 42, ${scrolled * 0.9})`;
        
        // Mantener el header siempre visible
        header.style.transform = 'translateY(0)';
        lastScroll = currentScroll;
    });

    // Animación de typing para el título (opcional)
    const title = document.querySelector('.hero-content h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Efecto de hover para las habilidades
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.05)';
            item.style.backgroundColor = 'var(--primary-color)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            item.style.backgroundColor = 'var(--glass-background)';
        });
    });

    // Funcionalidad del logo
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 