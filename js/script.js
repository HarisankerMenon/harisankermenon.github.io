// SIMPLE DOT CURSOR + HOVER SCALE
const cursorDot = document.querySelector(".cursor-dot");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

document.querySelectorAll(".hover-target").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1.7)";
  });
  el.addEventListener("mouseleave", () => {
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

// SCROLL REVEAL (fade in/out)
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  },
  { threshold: 0.25 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// SMOOTH SCROLL FOR INTERNAL LINKS
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    e.preventDefault();
    const offset = 80;
    const top =
      targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
});

// LIGHT PARALLAX EFFECT ON HERO
const heroSection = document.querySelector(".hero-section");
const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  const factor = Math.min(scrolled, window.innerHeight);

  // shift background a bit
  heroSection.style.backgroundPositionY = `${factor * 0.25}px`;

  // move hero text slightly for depth
  heroContent.style.transform = `translateY(${factor * 0.08}px)`;
});

// IMAGE FADE-IN ON LOAD
const fadeImages = document.querySelectorAll(".fade-image");
fadeImages.forEach((img) => {
  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", () => img.classList.add("loaded"));
  }
});

// NAV HIGHLIGHT ON SCROLL
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((sec) => sectionObserver.observe(sec));
