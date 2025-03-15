//////////////////// Function for animation slider ////////////////////////
        let currentSlide = 0;
        const slideInterval = 3000; // 3 seconds for auto-slide

        function moveSlide(direction) {
        const slides = document.querySelector('.slides');
        const totalSlides = document.querySelectorAll('.slide').length;

        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        }

        function moveToSlide(index) {
        currentSlide = index;
        const slides = document.querySelector('.slides');
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        }

        function updateDots() {
        const dots = document.querySelectorAll('.w-slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('w-active');
            if (index === currentSlide) {
                dot.classList.add('w-active');
                }   
            });
        }

        // Initialize first dot as active
        updateDots();

        // Auto-slide functionality
        setInterval(() => {
            moveSlide(1); // Move to the next slide every 3 seconds
        }, slideInterval);
