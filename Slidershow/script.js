let totalSlides = document.querySelectorAll('.slide_item').length;
let currentSlide = 0;

document.querySelector('.slide_width').style.width = `calc(100vw * ${totalSlides})`;

function goPrev() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1
    }
    updateMargin();
}

function goNext() {
    currentSlide++;
    if (currentSlide > (totalSlides -1)) {
        currentSlide = 0;
    }
    updateMargin();
}

function updateMargin() {
    let newMargin = (currentSlide * document.body.clientWidth);
    document.querySelector('.slide_width').style.marginLeft = `-${newMargin}px`
}
