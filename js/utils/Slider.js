class Slider {
    slides = document.querySelectorAll(".slider__card");
    controlDots = document.querySelector(".controls__dots");
    labels = document.querySelectorAll(".slider__controls label");
    arrows = document.querySelectorAll(".controls__arrows button");
    track = document.querySelector(".stick-track");
    constructor(id, { perPage, sliderSize }) {
        this.id = id;
        this.sliderSize = sliderSize;
        this.perPage = perPage;
        this.countPages;
        this.currentPage = 1;
        this.currentSlide = 0;
    }

    mount() {

        if (!this.slides) {
            return;
        }

        this.setCountPage();
        this.addActiveSlide()
        this.addActiveDot()

        if (!this.controlDots) {
            return;
        }

        this.setDataPage();
        this.checkDots();
        this.moveArrows();
    }

    checkDots() {
        this.controlDots.addEventListener("click", (event) => {

            this.currentPage = event.target.dataset.page;
            this.currentSlide = this.currentPage * this.perPage - this.perPage;

            this.addActiveDot()
            this.removeActiveSlide()
            this.addActiveSlide()

            this.currentPage ? this.track.style.transform = `translate(-${this.sliderSize * (this.currentPage - 1)}px) ` : this.track.style.transform = "translate(0px)";

        });
    }

    moveArrows() {
        this.arrows[0].addEventListener("click", () => {

            if (this.currentSlide > 0) {
                this.removeActiveSlide()
                this.currentSlide--
                this.slides[this.currentSlide - 1].classList.toggle("slider__card--active");
                this.track.style.transform = `translate(-${this.sliderSize / this.perPage * (this.currentSlide - 1)}px) `
            }

        });
        this.arrows[1].addEventListener("click", () => {

            if (this.currentSlide < this.slides.length) {
                this.removeActiveSlide()
                this.addActiveSlide()
                this.currentSlide++
                this.track.style.transform = `translate(-${this.sliderSize / this.perPage * (this.currentSlide - 1)}px) `
            }

        });
    }

    setDataPage() {
        const dots = this.controlDots.children;
        const dotsAsArray = Object.entries(dots);

        dotsAsArray.forEach(([key, dot]) => {
            dot.dataset.page = +key + 1;
        });
    }

    removeActiveSlide() {
        this.slides.forEach((slide) => { slide.classList.toggle("slider__card--active", false) })
    }

    addActiveSlide() {
        this.slides[this.currentSlide].classList.toggle("slider__card--active");
    }

    addActiveDot() {
        this.labels.forEach((label) => { label.classList.toggle("control__dot--active", false) })
        this.labels[this.currentPage - 1].classList.toggle("control__dot--active")
    }

    setCountPage() {
        this.countPages = this.slides.length / this.perPage;
    }
};

export default Slider;
