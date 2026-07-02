const stickyHeader = document.querySelector(".sticky-header");
const stickyHeaderButtons = document.querySelectorAll(".sticky-header__button");
const desktop2HoverTargets = document.querySelectorAll(".desktop2-hover-target");
const desktop6HoverTargets = document.querySelectorAll(".desktop6-hover-target");
const desktop8CarouselButtons = document.querySelectorAll(".desktop8-carousel-button");
const desktop8CarouselSlides = document.querySelectorAll(".desktop8-carousel-slide");
const desktop9CardButtons = document.querySelectorAll(".desktop9-card-button");
const desktop10Section = document.querySelector("#page-10");
const desktop10CloseButtons = document.querySelectorAll(".desktop10-close-button");
const desktop11Carousel = document.querySelector(".desktop11-carousel");
const desktop11CarouselButtons = document.querySelectorAll(".desktop11-carousel-button");
const desktop11CarouselSlides = document.querySelectorAll(".desktop11-carousel-slide");
const revealSections = document.querySelectorAll("#page-1, #page-4, #page-5, #page-10, #page-11");
let desktop8ActiveSlide = -1;
let desktop11ActiveSlide = 0;

const updateStickyHeader = () => {
  stickyHeader.classList.toggle("is-visible", window.scrollY > 120);
};

updateStickyHeader();
window.addEventListener("scroll", updateStickyHeader, { passive: true });

stickyHeaderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

revealSections.forEach((section) => {
  revealObserver.observe(section);
});

desktop2HoverTargets.forEach((target) => {
  const replacement = document.querySelector(`.desktop2-replacement--${target.dataset.replacement}`);

  target.addEventListener("mouseenter", () => {
    replacement.classList.add("is-visible");
  });

  target.addEventListener("mouseleave", () => {
    replacement.classList.remove("is-visible");
  });

  target.addEventListener("focus", () => {
    replacement.classList.add("is-visible");
  });

  target.addEventListener("blur", () => {
    replacement.classList.remove("is-visible");
  });
});

desktop6HoverTargets.forEach((target) => {
  const vector = document.querySelector(`.desktop6-hover-vector--${target.dataset.vector}`);

  target.addEventListener("mouseenter", () => {
    vector.classList.add("is-hovered");
  });

  target.addEventListener("mouseleave", () => {
    vector.classList.remove("is-hovered");
  });

  target.addEventListener("focus", () => {
    vector.classList.add("is-hovered");
  });

  target.addEventListener("blur", () => {
    vector.classList.remove("is-hovered");
  });
});

const updateDesktop8Carousel = (previousSlide) => {
  desktop8CarouselSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === desktop8ActiveSlide);
    slide.classList.toggle("is-prev", index === previousSlide);
  });
};

desktop8CarouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.direction);
    const previousSlide = desktop8ActiveSlide;

    if (previousSlide === -1) {
      desktop8ActiveSlide = direction > 0 ? 0 : desktop8CarouselSlides.length - 1;
    } else {
      desktop8ActiveSlide = (desktop8ActiveSlide + direction + desktop8CarouselSlides.length) % desktop8CarouselSlides.length;
    }

    updateDesktop8Carousel(previousSlide);
  });
});

desktop9CardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    desktop10Section.classList.add(`is-${button.dataset.card}-open`);
  });
});

desktop10CloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    desktop10Section.classList.remove(`is-${button.dataset.card}-open`);
  });
});

const updateDesktop11Carousel = (previousSlide, direction) => {
  desktop11Carousel.classList.toggle("is-moving-right", direction > 0);
  desktop11Carousel.classList.toggle("is-moving-left", direction < 0);

  desktop11CarouselSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === desktop11ActiveSlide);
    slide.classList.toggle("is-exit-right", index === previousSlide && direction > 0);
    slide.classList.toggle("is-exit-left", index === previousSlide && direction < 0);
  });
};

desktop11CarouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.direction);
    const previousSlide = desktop11ActiveSlide;
    desktop11ActiveSlide = (desktop11ActiveSlide + direction + desktop11CarouselSlides.length) % desktop11CarouselSlides.length;
    updateDesktop11Carousel(previousSlide, direction);
  });
});
