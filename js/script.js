class LaadoGateway {

    constructor() {

        this.currentScreen = 0;

        this.screens = [
            'login-screen',
            'access-screen',
            'slideshow-screen',
            'gift-screen'
        ];

        this.slideshowIndex = 0;

        this.captions = [
            'Every memory with you became special ❤️',
            'Distance never changed feelings.',
            'You were always worth every effort.',
            'Our story continues, no matter what ❤️',
            'This moment is all yours ✨'
        ];

        this.password = 'Budhu@1806';

        this.isMusicPlaying = false;

        this.giftOpened = false;

        this.init();

    }

    init() {

        this.cacheElements();

        this.bindEvents();

        this.initParticles();

        this.preloadImages();

        this.showScreen(0);

    }

    cacheElements() {

        this.elements = {

            screens:
                document.querySelectorAll('.screen'),

            loginBtn:
                document.getElementById('login-btn'),

            passwordInput:
                document.getElementById('password'),

            loginError:
                document.getElementById('login-error'),

            loginSuccess:
                document.getElementById('login-success'),

            musicToggle:
                document.getElementById('music-toggle'),

            bgMusic:
                document.getElementById('bg-music'),

            unlockSound:
                document.getElementById('unlock-sound'),

            clickSound:
                document.getElementById('click-sound'),

            giftSound:
                document.getElementById('gift-sound'),

            loadingProgress:
                document.querySelector('.loading-progress'),

            slideshowImages:
                document.querySelectorAll('.slideshow-image'),

            captionText:
                document.getElementById('caption-text'),

            giftBox:
                document.getElementById('gift-box'),

            giftContent:
                document.getElementById('gift-content'),

            tapText:
                document.getElementById('tap-text'),

            particlesCanvas:
                document.getElementById('particles-canvas')

        };

    }

    bindEvents() {

        this.elements.loginBtn.addEventListener(
            'click',
            () => this.handleLogin()
        );

        this.elements.passwordInput.addEventListener(
            'keypress',
            (e) => {

                if (e.key === 'Enter') {
                    this.handleLogin();
                }

            }
        );

        this.elements.musicToggle.addEventListener(
            'click',
            () => this.toggleMusic()
        );

        this.elements.giftBox.addEventListener(
            'click',
            () => this.openGift()
        );

    }

    async handleLogin() {

        const password =
            this.elements.passwordInput.value;

        this.playSound('click');

        this.elements.loginError.classList.add('hidden');

        this.elements.loginSuccess.classList.add('hidden');

        if (password === this.password) {

            this.elements.loginSuccess.classList.remove('hidden');

            this.elements.loginSuccess.classList.add('show');

            if (!this.isMusicPlaying) {
                this.toggleMusic();
            }

            await this.sleep(1500);

            this.transitionToAccess();

        } else {

            this.elements.loginError.classList.remove('hidden');

            this.elements.loginError.classList.add('show');

            this.elements.passwordInput.animate(
                [
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-6px)' },
                    { transform: 'translateX(6px)' },
                    { transform: 'translateX(0)' }
                ],
                {
                    duration: 400
                }
            );

        }

    }

    async transitionToAccess() {

        this.playSound('unlock');

        this.showScreen(1);

        await this.sleep(3000);

        this.startSlideshow();

    }

    startSlideshow() {

        this.showScreen(2);

        this.slideshowIndex = 0;

        this.showSlide();

    }

    showSlide() {

        this.elements.slideshowImages.forEach((slide) => {
            slide.classList.remove('active');
        });

        if (this.elements.slideshowImages[this.slideshowIndex]) {

            this.elements.slideshowImages[
                this.slideshowIndex
            ].classList.add('active');

            this.elements.captionText.textContent =
                this.captions[this.slideshowIndex];

        }

        this.slideshowIndex++;

        if (this.slideshowIndex < this.elements.slideshowImages.length) {

            setTimeout(() => {
                this.showSlide();
            }, 3500);

        } else {

            setTimeout(() => {
                this.showGiftScreen();
            }, 2000);

        }

    }

    showGiftScreen() {

        this.showScreen(3);

    }

    openGift() {

        if (this.giftOpened) return;

        this.giftOpened = true;

        this.playSound('gift');

        this.elements.giftBox.classList.add('opening');

        this.elements.tapText.style.opacity = '0';

        this.elements.giftContent.classList.remove('hidden');

        setTimeout(() => {

            this.elements.giftContent.classList.add('show');

        }, 600);

        this.createParticleBurst();

    }

    showScreen(index) {

        this.elements.screens.forEach((screen, i) => {

            screen.classList.toggle(
                'active',
                i === index
            );

        });

        this.currentScreen = index;

    }

    toggleMusic() {

        if (!this.isMusicPlaying) {

            this.elements.bgMusic.volume = 0.3;

            this.elements.bgMusic.play();

            this.elements.musicToggle.classList.add('active');

            this.isMusicPlaying = true;

        } else {

            this.elements.bgMusic.pause();

            this.elements.musicToggle.classList.remove('active');

            this.isMusicPlaying = false;

        }

    }

    playSound(type) {

        const sounds = {

            unlock:
                this.elements.unlockSound,

            click:
                this.elements.clickSound,

            gift:
                this.elements.giftSound

        };

        const sound = sounds[type];

        if (sound) {

            sound.currentTime = 0;

            sound.volume = 0.5;

            sound.play().catch(() => {});

        }

    }

    initParticles() {

        const canvas =
            this.elements.particlesCanvas;

        const ctx =
            canvas.getContext('2d');

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

        const particles = [];

        const particleCount =
            Math.min(40, window.innerWidth / 25);

        for (let i = 0; i < particleCount; i++) {

            particles.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,

                radius: Math.random() * 2 + 1,

                speedX: (Math.random() - 0.5) * 0.3,

                speedY: (Math.random() - 0.5) * 0.3,

                opacity: Math.random() * 0.5

            });

        }

        const animate = () => {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            particles.forEach((p) => {

                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(255,255,255,${p.opacity})`;

                ctx.fill();

                p.x += p.speedX;

                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width)
                    p.speedX *= -1;

                if (p.y < 0 || p.y > canvas.height)
                    p.speedY *= -1;

            });

            requestAnimationFrame(animate);

        };

        animate();

        window.addEventListener('resize', () => {

            canvas.width = window.innerWidth;

            canvas.height = window.innerHeight;

        });

    }

    createParticleBurst() {

        const gift =
            this.elements.giftBox;

        gift.animate(
            [
                {
                    transform: 'scale(1)'
                },
                {
                    transform: 'scale(1.08)'
                },
                {
                    transform: 'scale(1)'
                }
            ],
            {
                duration: 700,
                easing: 'ease'
            }
        );

    }

    preloadImages() {

        const images =
            document.querySelectorAll(
                '.slideshow-image img'
            );

        images.forEach((img) => {

            const preload = new Image();

            preload.src = img.src;

        });

    }

    sleep(ms) {

        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );

    }

}

document.addEventListener('DOMContentLoaded', () => {

    new LaadoGateway();

});