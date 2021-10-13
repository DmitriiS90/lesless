class Slider {
    sliderSize = 1207;

    constructor() {
        this.countPages;
        this.countSlideOnPage = 3;
        this.currentPage = 1;
        this.prevPage;
        this.currentSlide = 1;
        this.pagesWithSlides = [];
    }

    init() {
        const slides = document.querySelectorAll(".slider__card");
        const controlDots = document.querySelector(".controls__dots");
        const arrows = document.querySelectorAll(".controls__arrows button");
        const track = document.querySelector(".stick-track");

        if (!slides) {
            return;
        }

        this.pagesWithSlides = Object.entries(slides);

        this.setCountPage(slides);

        this.addActiveClass(slides)

        if (!controlDots) {
            return;
        }

        this.setDataPage(controlDots);

        controlDots.addEventListener("click", (event) => {
            console.log(event.target.dataset.page, this.countPages)
            this.prevPage = this.currentPage;
            this.currentPage = event.target.dataset.page;

            //const slide = pages[this.currentPage].firstSlide;
            //slide.classList.toggle("slider__card--active");

            this.currentPage ? track.style.transform = `translate(-${this.sliderSize * (this.currentPage - 1)}px) ` : track.style.transform = "translate(0px)";

        });

        this.moveArrows(arrows, track);
    }

    moveArrows(arrows, track) {
        arrows[0].addEventListener("click", () => {
            console.log(this.currentPage)

            if (this.currentPage > 1) {
                this.currentPage--
                track.style.transform = `translate(-${this.sliderSize * (this.currentPage - 1)}px) `
            }
        });
        arrows[1].addEventListener("click", () => {
            console.log(this.currentPage)

            if (this.currentPage < this.countPages) {
                this.currentPage++
                track.style.transform = `translate(-${this.sliderSize * (this.currentPage - 1)}px) `
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

    addActiveClass(slides) {
        const [firstSlide] = slides;
        firstSlide.classList.toggle("slider__card--active");
    }

    setCountPage(slides) {
        this.countPages = slides.length / this.countSlideOnPage;
    }
};

export default Slider;
