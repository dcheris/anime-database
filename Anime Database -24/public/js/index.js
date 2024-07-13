let carouselItemPosition = 0;
let heroCarousel = document.getElementsByClassName('hero-carousel-item');
const totalCarousel = heroCarousel.length;

console.log(carouselItemPosition);
document.getElementById('carousel-btn-next')
    .addEventListener("click", function () {
        nextCarouselItem();
    });

document.getElementById('carousel-btn-prev')
    .addEventListener("click", function () {
        prevCarouselItem();
    });
//#FIXME REFACTOR FUNCTIONS AS NEXT AND PREV ARE SIMILAR AS WELL AS THE DOM elements
const updateCarouselPosition = function () {
    let newCarousel = Array.from(heroCarousel);
    newCarousel.forEach(item => {
        item.classList.remove('active-carousel-item');
        item.classList.add('hidden-carousel-item');
    });
    newCarousel[carouselItemPosition].classList.add('active-carousel-item');
};

const nextCarouselItem = function () {
    if (carouselItemPosition === totalCarousel - 1) {
        carouselItemPosition = 0;
    } else {
        carouselItemPosition++;
    }
    updateCarouselPosition();
};

const prevCarouselItem = function () {
    if (carouselItemPosition === 0) {
        carouselItemPosition = totalCarousel - 1;
    } else {
        carouselItemPosition--;
    }
    updateCarouselPosition();
};

