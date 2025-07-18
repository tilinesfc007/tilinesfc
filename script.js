  window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1500);
        });
        
        // Menú móvil
        const menuToggle = document.getElementById('menuToggle');
        const menu = document.getElementById('menu');
        
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Slider con flechas
        const sliderImages = document.querySelectorAll('.slider img');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let current = 0;
        
        function reset() {
            for (let i = 0; i < sliderImages.length; i++) {
                sliderImages[i].classList.remove('active');
            }
        }
        
        function startSlide() {
            reset();
            sliderImages[0].classList.add('active');
        }
        
        function slidePrev() {
            reset();
            current = (current - 1 + sliderImages.length) % sliderImages.length;
            sliderImages[current].classList.add('active');
        }
        
        function slideNext() {
            reset();
            current = (current + 1) % sliderImages.length;
            sliderImages[current].classList.add('active');
        }
        
        // Event listeners para las flechas
        prevBtn.addEventListener('click', slidePrev);
        nextBtn.addEventListener('click', slideNext);
        
        // Autoplay del slider
        let slideInterval = setInterval(slideNext, 5000);
        
        // Pausar autoplay al interactuar con las flechas
        const sliderControls = [prevBtn, nextBtn];
        sliderControls.forEach(control => {
            control.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            control.addEventListener('mouseleave', () => {
                slideInterval = setInterval(slideNext, 5000);
            });
        });
        
        startSlide();
        
        // Animación de palabras cambiantes (versión original)
        const words = document.querySelectorAll('.changing-words span');
        let wordIndex = 0;
        
        function rotateWords() {
            const currentWord = words[wordIndex];
            const nextWord = words[(wordIndex + 1) % words.length];
            
            // Animación para cambiar palabras
            currentWord.style.opacity = 0;
            currentWord.style.transform = 'translateY(-20px)';
            nextWord.style.opacity = 1;
            nextWord.style.transform = 'translateY(0)';
            
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        // Iniciar animación después de que cargue la página
        setTimeout(() => {
            setInterval(rotateWords, 3000);
        }, 1500);
        
        // Contador regresivo para la nueva temporada
        function updateCountdown() {
            const endDate = new Date("2025-09-10T00:00:00Z"); // 10 de septiembre 2025 UTC
            const now = new Date();
            const diff = endDate - now;
            
            if (diff <= 0) {
                document.getElementById('countdown').innerHTML = '<div class="countdown-ended">¡LA TEMPORADA HA COMENZADO!</div>';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        // Actualizar el contador cada segundo
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Estilo para cuando termine el contador
        const style = document.createElement('style');
        style.textContent = `
        .countdown-ended {
            color: var(--primary);
            font-size: 1rem;
            text-transform: uppercase;
            animation: pulse 0.5s infinite alternate;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 5px;
            margin: 1rem 0;
        }
        `;
        document.head.appendChild(style);
        
        // Animaciones al hacer scroll
        function animateOnScroll() {
            const postCards = document.querySelectorAll('.post-card');
            const memberCards = document.querySelectorAll('.member-card');
            const socialBoxes = document.querySelectorAll('.social-box');
            const clanParagraphs = document.querySelectorAll('.clan-info p');
            
            // Función para verificar si un elemento está en el viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
                );
            }
            
            // Animación para tarjetas de publicaciones
            postCards.forEach((card, index) => {
                if (isInViewport(card)) {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 200);
                }
            });
            
            // Animación para tarjetas de miembros
            memberCards.forEach((card, index) => {
                if (isInViewport(card)) {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 100);
                }
            });
            
            // Animación para cajas de redes sociales
            socialBoxes.forEach((box, index) => {
                if (isInViewport(box)) {
                    setTimeout(() => {
                        box.classList.add('animated');
                    }, index * 150);
                }
            });
            
            // Animación para párrafos del clan
            clanParagraphs.forEach((p, index) => {
                if (isInViewport(p)) {
                    setTimeout(() => {
                        p.classList.add('animated');
                    }, index * 300);
                }
            });
        }
        
        // Botón para volver arriba
        const backToTopBtn = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', () => {
            animateOnScroll();
            
            // Mostrar u ocultar el botón de volver arriba
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Ejecutar al cargar
        window.addEventListener('load', animateOnScroll);
        
        // Generar iconos que caen dinámicamente para cada tarjeta de miembro
        document.addEventListener('DOMContentLoaded', function() {
            const memberCards = document.querySelectorAll('.member-card');
            
            // Configuración de imágenes por miembro
            const memberImages = [
                ['./img/roda.png', './img/roda.png', './img/roda.png'],
                ['./img/m4fe.png', './img/m4fe.png', './img/m4fe.png'],
                ['./img/fran.png', './img/fran.png', './img/fran.png'],
                ['./img/piti.ico', './img/piti.ico', './img/piti.ico'],
                ['./img/user.png', './img/user.png', '.img/user.png'],
                ['./img/user.png', './img/user.png', './img/user.png'],
                ['./img/s12kke.png', './img/s12kke.png', './img/s12kke.png'],
                ['./img/user.png', './img/user.png', './img/user.png']
            ];
            
            memberCards.forEach((card, index) => {
                // Eliminar cualquier icono existente (por si acaso)
                const existingIcons = card.querySelectorAll('.card-falling-icon');
                existingIcons.forEach(icon => icon.remove());
                
                // Crear iconos que caen para cada tarjeta
                for (let i = 0; i < 3; i++) {
                    const icon = document.createElement('div');
                    icon.className = 'card-falling-icon';
                    
                    // Posición horizontal aleatoria dentro de la tarjeta
                    const leftPos = Math.random() * 80 + 10; // Entre 10% y 90%
                    
                    // Retraso de animación aleatorio
                    const delay = Math.random() * 10;
                    
                    icon.style.left = `${leftPos}%`;
                    icon.style.animationDelay = `${delay}s`;
                    
                    // Crear la imagen dentro del icono
                    const img = document.createElement('img');
                    img.src = memberImages[index][i % memberImages[index].length];
                    img.alt = 'Icon';
                    img.width = 30;
                    
                    icon.appendChild(img);
                    card.insertBefore(icon, card.firstChild);
                }
            });
        });
        
        // Sistema de Likes con persistencia por IP
        document.addEventListener('DOMContentLoaded', function() {
            // Obtener la IP del usuario (simulada para este ejemplo)
            // En un entorno real, necesitarías un backend para obtener la IP real
            const userIP = 'user_' + Math.floor(Math.random() * 1000000).toString();
            
            // Clave para almacenar los likes en localStorage
            const storageKey = 'tilines_fc_likes';
            
            // Obtener likes guardados o inicializar
            let likesData = JSON.parse(localStorage.getItem(storageKey)) || {
                pageLikes: 0,
                likedPages: [],
                postLikes: {},
                likedPosts: {}
            };
            
            // Actualizar contadores desde el almacenamiento
            document.getElementById('pageLikeCount').textContent = likesData.pageLikes;
            
            // Verificar si el usuario ya dio like a la página
            const pageLikeBtn = document.getElementById('pageLikeBtn');
            if (likesData.likedPages.includes(userIP)) {
                pageLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
                pageLikeBtn.classList.add('liked');
            }
            
            // Configurar evento para like de página
            pageLikeBtn.addEventListener('click', function() {
                if (!likesData.likedPages.includes(userIP)) {
                    // Añadir like
                    likesData.pageLikes++;
                    likesData.likedPages.push(userIP);
                    localStorage.setItem(storageKey, JSON.stringify(likesData));
                    
                    // Actualizar UI
                    document.getElementById('pageLikeCount').textContent = likesData.pageLikes;
                    pageLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
                    pageLikeBtn.classList.add('liked');
                    
                    // Animación
                    pageLikeBtn.classList.remove('liked');
                    void pageLikeBtn.offsetWidth; // Trigger reflow
                    pageLikeBtn.classList.add('liked');
                }
            });
            
            // Configurar likes para posts
            const postLikeButtons = document.querySelectorAll('.like-btn');
            
            // Inicializar contadores de posts
            postLikeButtons.forEach(button => {
                const postId = button.getAttribute('data-post-id');
                const likeCountElement = document.querySelector(`.like-count[data-post-id="${postId}"]`);
                
                // Establecer contador inicial
                likesData.postLikes[postId] = likesData.postLikes[postId] || 0;
                likeCountElement.textContent = likesData.postLikes[postId];
                
                // Verificar si el usuario ya dio like a este post
                if (likesData.likedPosts[postId] && likesData.likedPosts[postId].includes(userIP)) {
                    button.innerHTML = '<i class="fas fa-heart"></i>';
                    button.classList.add('liked');
                }
            });
            
            // Configurar eventos para likes de posts
            postLikeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const postId = this.getAttribute('data-post-id');
                    const likeCountElement = document.querySelector(`.like-count[data-post-id="${postId}"]`);
                    
                    // Inicializar si no existe
                    likesData.likedPosts[postId] = likesData.likedPosts[postId] || [];
                    
                    if (!likesData.likedPosts[postId].includes(userIP)) {
                        // Añadir like
                        likesData.postLikes[postId] = (likesData.postLikes[postId] || 0) + 1;
                        likesData.likedPosts[postId].push(userIP);
                        localStorage.setItem(storageKey, JSON.stringify(likesData));
                        
                        // Actualizar UI
                        likeCountElement.textContent = likesData.postLikes[postId];
                        this.innerHTML = '<i class="fas fa-heart"></i>';
                        this.classList.add('liked');
                        
                        // Animación
                        this.classList.remove('liked');
                        void this.offsetWidth; // Trigger reflow
                        this.classList.add('liked');
                    }
                });
            });
        });

        const seasonModal = document.getElementById('seasonModal');
const closeModal = document.getElementById('closeModal');
const seasonLink = document.querySelector('.post-card:nth-child(2) .read-more');

// Abrir modal al hacer clic en "Más información"
seasonLink.addEventListener('click', function(e) {
    e.preventDefault();
    seasonModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Deshabilitar scroll
});

// Cerrar modal
closeModal.addEventListener('click', function() {
    seasonModal.classList.remove('active');
    document.body.style.overflow = ''; // Habilitar scroll
});

// Cerrar al hacer clic fuera del modal
seasonModal.addEventListener('click', function(e) {
    if (e.target === seasonModal) {
        seasonModal.classList.remove('active');
        document.body.style.overflow = ''; // Habilitar scroll
    }
});

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && seasonModal.classList.contains('active')) {
        seasonModal.classList.remove('active');
        document.body.style.overflow = ''; // Habilitar scroll
    }
});
