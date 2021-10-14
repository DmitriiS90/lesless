class Slider {
    constructor(id, { perPage, sliderSize }) {
        this.id = id;
        this.sliderSize = sliderSize;
        this.perPage = perPage;
        this.countPages;
        this.currentPage = 1;
        this.currentSlide = 0;
        //this.prevPage;
        //this.pagesWithSlides = [];
    }

    mount() {
        const slides = document.querySelectorAll(".slider__card");
        const controlDots = document.querySelector(".controls__dots");
        const arrows = document.querySelectorAll(".controls__arrows button");
        const track = document.querySelector(".stick-track");

        if (!slides) {
            return;
        }
        //this.pagesWithSlides = Object.entries(slides);

        this.setCountPage(slides);

        this.addActiveClass(slides)

        if (!controlDots) {
            return;
        }

        this.setDataPage(controlDots);

        this.checkDots(controlDots, track, slides);

        this.moveArrows(arrows, track, slides);
    }

    checkDots(controlDots, track, slides) {
        controlDots.addEventListener("click", (event) => {
            //this.prevPage = this.currentPage;
            this.currentPage = event.target.dataset.page;
            this.currentSlide = event.target.dataset.page * this.perPage - this.perPage;

            slides.forEach((slide) => { slide.classList.toggle("slider__card--active", false) })
            this.addActiveClass(slides)

            //const slide = pages[this.currentPage].firstSlide;
            //slide.classList.toggle("slider__card--active");

            this.currentPage ? track.style.transform = `translate(-${this.sliderSize * (this.currentPage - 1)}px) ` : track.style.transform = "translate(0px)";

        });
    }

    moveArrows(arrows, track, slides) {
        arrows[0].addEventListener("click", () => {

            if (this.currentSlide > 0) {
                this.removeActiveClass(slides)
                this.currentSlide--
                slides[this.currentSlide - 1].classList.toggle("slider__card--active");
                track.style.transform = `translate(-${402 * (this.currentSlide - 1)}px) `
            }

        });
        arrows[1].addEventListener("click", () => {

            if (this.currentSlide < slides.length) {
                this.removeActiveClass(slides)
                this.addActiveClass(slides)
                this.currentSlide++
                track.style.transform = `translate(-${402 * (this.currentSlide - 1)}px) `
            }

        });
    }

    setDataPage(controlDots) {
        const dots = controlDots.children;

        const dotsAsArray = Object.entries(dots);

        dotsAsArray.forEach(([key, dot]) => {
            dot.dataset.page = +key + 1;
        });

        // const [dot] = dots;
        // dot.classList.toggle("control-dot--active");
        // dot.checked = "true";
        // dot.addEventListener("click", () => {
        //     dot.classList.toggle("control-dot--active");
        // });
    }

    removeActiveClass(slides) {
        slides.forEach((slide) => { slide.classList.toggle("slider__card--active", false) })
    }
    
    addActiveClass(slides) {
        // const [firstSlide] = slides;
        // firstSlide.classList.toggle("slider__card--active");
        slides[this.currentSlide].classList.toggle("slider__card--active");
    }

    setCountPage(slides) {
        this.countPages = slides.length / this.perPage;
    }
};

export default Slider;
