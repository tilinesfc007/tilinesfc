window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

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

prevBtn.addEventListener('click', slidePrev);
nextBtn.addEventListener('click', slideNext);

let slideInterval = setInterval(slideNext, 5000);

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

const words = document.querySelectorAll('.changing-words span');
let wordIndex = 0;

function rotateWords() {
    const currentWord = words[wordIndex];
    const nextWord = words[(wordIndex + 1) % words.length];

    currentWord.style.opacity = 0;
    currentWord.style.transform = 'translateY(-20px)';
    nextWord.style.opacity = 1;
    nextWord.style.transform = 'translateY(0)';
    
    wordIndex = (wordIndex + 1) % words.length;
}

setTimeout(() => {
    setInterval(rotateWords, 3000);
}, 1500);

function updateCountdown() {
    const endDate = new Date("2025-09-10T00:00:00Z");
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

updateCountdown();
setInterval(updateCountdown, 1000);

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

function animateOnScroll() {
    const postCards = document.querySelectorAll('.post-card');
    const memberCards = document.querySelectorAll('.member-card');
    const socialBoxes = document.querySelectorAll('.social-box');
    const clanParagraphs = document.querySelectorAll('.clan-info p');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    }

    postCards.forEach((card, index) => {
        if (isInViewport(card)) {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 200);
        }
    });
    
    memberCards.forEach((card, index) => {
        if (isInViewport(card)) {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 100);
        }
    });
    
    socialBoxes.forEach((box, index) => {
        if (isInViewport(box)) {
            setTimeout(() => {
                box.classList.add('animated');
            }, index * 150);
        }
    });
    
    clanParagraphs.forEach((p, index) => {
        if (isInViewport(p)) {
            setTimeout(() => {
                p.classList.add('animated');
            }, index * 300);
        }
    });
}

const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    animateOnScroll();
    
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

window.addEventListener('load', animateOnScroll);

document.addEventListener('DOMContentLoaded', function() {
    const memberCards = document.querySelectorAll('.member-card');
    
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
        const existingIcons = card.querySelectorAll('.card-falling-icon');
        existingIcons.forEach(icon => icon.remove());
        
        for (let i = 0; i < 3; i++) {
            const icon = document.createElement('div');
            icon.className = 'card-falling-icon';
            
            const leftPos = Math.random() * 80 + 10;
            const delay = Math.random() * 10;
            
            icon.style.left = `${leftPos}%`;
            icon.style.animationDelay = `${delay}s`;
            
            const img = document.createElement('img');
            img.src = memberImages[index][i % memberImages[index].length];
            img.alt = 'Icon';
            img.width = 30;
            
            icon.appendChild(img);
            card.insertBefore(icon, card.firstChild);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const userIP = 'user_' + Math.floor(Math.random() * 1000000).toString();
    const storageKey = 'tilines_fc_likes';

    let likesData = JSON.parse(localStorage.getItem(storageKey)) || {
        pageLikes: 0,
        likedPages: [],
        postLikes: {},
        likedPosts: {}
    };
    
    document.getElementById('pageLikeCount').textContent = likesData.pageLikes;

    const pageLikeBtn = document.getElementById('pageLikeBtn');
    if (likesData.likedPages.includes(userIP)) {
        pageLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
        pageLikeBtn.classList.add('liked');
    }
    
    pageLikeBtn.addEventListener('click', function() {
        if (!likesData.likedPages.includes(userIP)) {
            likesData.pageLikes++;
            likesData.likedPages.push(userIP);
            localStorage.setItem(storageKey, JSON.stringify(likesData));
            
            document.getElementById('pageLikeCount').textContent = likesData.pageLikes;
            pageLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
            pageLikeBtn.classList.add('liked');
            
            pageLikeBtn.classList.remove('liked');
            void pageLikeBtn.offsetWidth;
            pageLikeBtn.classList.add('liked');
        }
    });
    
    const postLikeButtons = document.querySelectorAll('.like-btn');
    
    postLikeButtons.forEach(button => {
        const postId = button.getAttribute('data-post-id');
        const likeCountElement = document.querySelector(`.like-count[data-post-id="${postId}"]`);

        likesData.postLikes[postId] = likesData.postLikes[postId] || 0;
        likeCountElement.textContent = likesData.postLikes[postId];
        
        if (likesData.likedPosts[postId] && likesData.likedPosts[postId].includes(userIP)) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('liked');
        }
    });

    postLikeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            const likeCountElement = document.querySelector(`.like-count[data-post-id="${postId}"]`);
            
            likesData.likedPosts[postId] = likesData.likedPosts[postId] || [];
            
            if (!likesData.likedPosts[postId].includes(userIP)) {
                likesData.postLikes[postId] = (likesData.postLikes[postId] || 0) + 1;
                likesData.likedPosts[postId].push(userIP);
                localStorage.setItem(storageKey, JSON.stringify(likesData));
                
                likeCountElement.textContent = likesData.postLikes[postId];
                this.innerHTML = '<i class="fas fa-heart"></i>';
                this.classList.add('liked');
                
                this.classList.remove('liked');
                void this.offsetWidth;
                this.classList.add('liked');
            }
        });
    });
});


const seasonModal = document.getElementById('seasonModal');
const closeModal = document.getElementById('closeModal');
const seasonLink = document.querySelector('.post-card:nth-child(2) .read-more');

seasonLink.addEventListener('click', function(e) {
    e.preventDefault();
    seasonModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', function() {
    seasonModal.classList.remove('active');
    document.body.style.overflow = '';
});

seasonModal.addEventListener('click', function(e) {
    if (e.target === seasonModal) {
        seasonModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && seasonModal.classList.contains('active')) {
        seasonModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});


const galleryItems = document.querySelectorAll('.gallery-item');
const galleryPrevBtn = document.querySelector('.gallery-prev');
const galleryNextBtn = document.querySelector('.gallery-next');
let currentGalleryIndex = 0;

function showGallerySlide(index) {
    galleryItems.forEach(item => item.classList.remove('active'));
    galleryItems[index].classList.add('active');
    currentGalleryIndex = index;
}

galleryPrevBtn.addEventListener('click', () => {
    let newIndex = currentGalleryIndex - 1;
    if (newIndex < 0) newIndex = galleryItems.length - 1;
    showGallerySlide(newIndex);
});

galleryNextBtn.addEventListener('click', () => {
    let newIndex = currentGalleryIndex + 1;
    if (newIndex >= galleryItems.length) newIndex = 0;
    showGallerySlide(newIndex);
});


let galleryInterval = setInterval(() => {
    let newIndex = currentGalleryIndex + 1;
    if (newIndex >= galleryItems.length) newIndex = 0;
    showGallerySlide(newIndex);
}, 5000);

document.querySelector('.season-gallery').addEventListener('mouseenter', () => {
    clearInterval(galleryInterval);
});

document.querySelector('.season-gallery').addEventListener('mouseleave', () => {
    galleryInterval = setInterval(() => {
        let newIndex = currentGalleryIndex + 1;
        if (newIndex >= galleryItems.length) newIndex = 0;
        showGallerySlide(newIndex);
    }, 5000);
});

// Mini juego
let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let isGameRunning = false;

const openGameBtn = document.getElementById('openGameBtn');
const gameContainer = document.getElementById('gameContainer');
const gameArea = document.getElementById('gameArea');
const gameTimer = document.getElementById('timer');
const scoreDisplay = document.getElementById('scoreDisplay');
const restartGameBtn = document.getElementById('restartGameBtn');
const closeGameBtn = document.getElementById('closeGameBtn');
const modalTriggerBtn = document.getElementById('modalTriggerBtn');
const gameModal = document.getElementById('gameModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const finalScoreText = document.getElementById('finalScoreText');

openGameBtn.addEventListener('click', () => {
    gameContainer.style.display = 'flex';
    startGame();
});

closeGameBtn.addEventListener('click', () => {
    endGame();
    gameContainer.style.display = 'none';
});

restartGameBtn.addEventListener('click', startGame);

modalTriggerBtn.addEventListener('click', () => {
    gameModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    gameModal.style.display = 'none';
});

playAgainBtn.addEventListener('click', () => {
    gameModal.style.display = 'none';
    startGame();
});

function startGame() {
    score = 0;
    timeLeft = 30;
    isGameRunning = true;
    
    gameArea.innerHTML = '';
    scoreDisplay.textContent = 'Puntos: 0';
    gameTimer.textContent = timeLeft;
    modalTriggerBtn.style.display = 'none';
    
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        gameTimer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    gameInterval = setInterval(createDot, 800);
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    modalTriggerBtn.style.display = 'block';
    finalScoreText.innerHTML = `Tu puntuación final: <span style="color: #FF6B00;">${score}</span> puntos`;
}

function createDot() {
    if (!isGameRunning) return;
    
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.width = '40px';
    dot.style.height = '40px';
    dot.style.backgroundColor = '#FF6B00';
    dot.style.borderRadius = '50%';
    dot.style.cursor = 'pointer';
    dot.style.boxShadow = '0 0 10px rgba(255,107,0,0.7)';
    
    const maxX = gameArea.offsetWidth - 40;
    const maxY = gameArea.offsetHeight - 40;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}px`;
    
    dot.addEventListener('click', () => {
        if (!isGameRunning) return;
        
        dot.style.transform = 'scale(1.2)';
        dot.style.opacity = '0.7';
        
        score++;
        scoreDisplay.textContent = `Puntos: ${score}`;
        
        setTimeout(() => {
            dot.remove();
        }, 100);
    });
    
    setTimeout(() => {
        if (dot.parentNode === gameArea) {
            dot.remove();
        }
    }, 1500);
    
    gameArea.appendChild(dot);
}

function adjustGameForMobile() {
    if (window.innerWidth <= 768) {
        gameArea.style.height = '50vh';
    } else {
        gameArea.style.height = '60vh';
    }
}

window.addEventListener('load', adjustGameForMobile);
window.addEventListener('resize', adjustGameForMobile);

function toggleGameButton() {
    const openGameBtn = document.getElementById('openGameBtn');
    if (window.innerWidth <= 768) {
        openGameBtn.style.display = 'flex';
    } else {
        openGameBtn.style.display = 'none';
    }
}

window.addEventListener('load', toggleGameButton);
window.addEventListener('resize', toggleGameButton);
  const versionsModal = document.getElementById('versionsModal');
        const closeVersionsModal = document.getElementById('closeVersionsModal');
        const openVersionsModal = document.getElementById('openVersionsModal');

        // Abrir modal al hacer clic en "Descargar" en la tarjeta de Versión Oficial
        openVersionsModal.addEventListener('click', function(e) {
            e.preventDefault();
            versionsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Cerrar modal
        closeVersionsModal.addEventListener('click', function() {
            versionsModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        versionsModal.addEventListener('click', function(e) {
            if (e.target === versionsModal) {
                versionsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && versionsModal.classList.contains('active')) {
                versionsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            const socialIcons = document.querySelectorAll('.social-icon-btn');
            
            socialIcons.forEach(icon => {
                icon.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.2) rotate(10deg)';
                });
                icon.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0)';
                });
            });
        });