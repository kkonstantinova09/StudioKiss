// ========== MOBILE MENU ==========
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // ========== ГАЛЕРЕЯ (карусель) ==========
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    let slides = [];
    let currentIndex = 0;
    let totalSlides = 0;

    function updateCarousel() {
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentIndex);
                });
            }
        }
    }

    if (track && dotsContainer) {
        slides = Array.from(track.children);
        totalSlides = slides.length;
        // create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
        if (prevBtn) prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });
    }

    // ========== СЛАЙДЕР ИНТЕРЬЕРНЫЕ СТУДИИ ==========
    const studiosTrack = document.getElementById('studiosTrack');
    const prevStudio = document.getElementById('studiosPrev');
    const nextStudio = document.getElementById('studiosNext');
    let studioIndex = 0;
    if (studiosTrack && prevStudio && nextStudio) {
        const studioSlides = Array.from(studiosTrack.children);
        const totalStudio = studioSlides.length;
        let slidesToShow = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
        function updateStudioSlider() {
            const slideWidth = studioSlides[0]?.offsetWidth + 20;
            studiosTrack.style.transform = `translateX(-${studioIndex * slideWidth}px)`;
        }
        window.addEventListener('resize', () => {
            slidesToShow = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
            updateStudioSlider();
        });
        nextStudio.addEventListener('click', () => {
            if (studioIndex < totalStudio - slidesToShow) studioIndex++;
            else studioIndex = 0;
            updateStudioSlider();
        });
        prevStudio.addEventListener('click', () => {
            if (studioIndex > 0) studioIndex--;
            else studioIndex = totalStudio - slidesToShow;
            updateStudioSlider();
        });
        updateStudioSlider();
    }

    // ========== ФИЛЬТРАЦИЯ И ПАГИНАЦИЯ (services) ==========
    const servicesData = [
        { id: 1, name: "Свадебный декор", category: "decor", price: "35 000 ₽", desc: "Цветы, арки, оформление зала", img: "https://i.pinimg.com/736x/9c/4c/19/9c4c19c2be74251203e4890d343b6534.jpg" },
        { id: 2, name: "Корпоратив под ключ", category: "event", price: "120 000 ₽", desc: "Кейтеринг, ведущий, шоу", img: "https://i.pinimg.com/1200x/e2/fe/28/e2fe28b29ea5fd1692c0acd49412d767.jpg" },
        { id: 3, name: "Дизайн интерьера", category: "interior", price: "90 000 ₽", desc: "3D-визуализация, подбор мебели", img: "https://i.pinimg.com/1200x/a0/d8/68/a0d868a1a97c8a72ce5b61c36505097e.jpg" },
        { id: 4, name: "Флористика", category: "decor", price: "15 000 ₽", desc: "Букеты, композиции", img: "https://i.pinimg.com/736x/4b/2c/76/4b2c76fbe8955ce3c3d92ba1fa94bf72.jpg" },
        { id: 5, name: "Event-координация", category: "event", price: "50 000 ₽", desc: "Полное сопровождение", img: "https://i.pinimg.com/736x/73/4d/62/734d622070d25087b44761b53d9e3ae8.jpg" },
        { id: 6, name: "Лофт-студия", category: "interior", price: "180 000 ₽", desc: "Интерьер в стиле лофт", img: "https://i.pinimg.com/1200x/13/aa/0b/13aa0b1e8507db3069fffbad2b5fd468.jpg" }
    ];
    let currentCategory = "all";
    let currentPage = 1;
    const itemsPerPage = 4;

    function renderServices() {
        const filtered = currentCategory === "all" ? servicesData : servicesData.filter(s => s.category === currentCategory);
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const paginated = filtered.slice(start, start + itemsPerPage);
        const grid = document.getElementById('servicesGrid');
        if (grid) {
            grid.innerHTML = paginated.map(s => `
                <div class="service-card">
                    <div class="service-img"><img src="${s.img}" alt="${s.name}"></div>
                    <h3>${s.name}</h3>
                    <p>${s.desc}</p>
                    <div class="price">от ${s.price}</div>
                    <a href="services.html" class="btn-outline">Подробнее</a>
                </div>
            `).join('');
            const paginationDiv = document.getElementById('paginationControls');
            if (paginationDiv) {
                let btns = '';
                for (let i = 1; i <= totalPages; i++) {
                    btns += `<button class="${i === currentPage ? 'active-page' : ''}" data-page="${i}">${i}</button>`;
                }
                paginationDiv.innerHTML = btns;
                document.querySelectorAll('[data-page]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        currentPage = parseInt(e.target.dataset.page);
                        renderServices();
                    });
                });
            }
        }
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            currentPage = 1;
            renderServices();
        });
    });
    if (document.getElementById('servicesGrid')) renderServices();

    // ========== ФОРМА ЗАКАЗА ==========
    const form = document.getElementById('eventOrderForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = document.getElementById('formMessage');
            msg.textContent = '✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
            msg.style.color = 'green';
            form.reset();
            setTimeout(() => msg.textContent = '', 4000);
        });
    }

    // ========== SEO ПЛАГИН (имитация) & Google Analytics (имитация) ==========
    // Добавляем мета-теги robots, seo-like
    if (!document.querySelector('meta[name="robots"]')) {
        const metaRobots = document.createElement('meta');
        metaRobots.name = "robots";
        metaRobots.content = "index, follow";
        document.head.appendChild(metaRobots);
    }
    // Имитация GA
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-XXXXXX-1');
    console.log("SEO plugin & GA imitation active");
});