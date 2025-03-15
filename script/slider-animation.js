let currentSlide = 0;
    const slideInterval = 3000;
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    const dotContainer = document.querySelector('.w-slider-nav');

    function createDots() {
        dotContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('w-slider-dot');
            dot.textContent = i + 1;
            dot.setAttribute('onclick', `moveToSlide(${i})`);
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Show slide ${i + 1} of ${totalSlides}`);
            if (i === 0) dot.classList.add('w-active');
            dotContainer.appendChild(dot);
        }
    }

    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateSlider();
    }

    function moveToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function updateSlider() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll('.w-slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('w-active', index === currentSlide);
        });
    }

    createDots();
    setInterval(() => moveSlide(1), slideInterval);
