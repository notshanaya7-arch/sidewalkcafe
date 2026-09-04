/* =========================================
   SIDEWALK — INTERACTIONS
========================================= */


/* CUSTOM COFFEE CURSOR */

const cursor = document.querySelector(".cursor");
const cursorGlow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {

  mouseX = e.clientX;
  mouseY = e.clientY;

});


function animateCursor() {

  currentX += (mouseX - currentX) * 0.14;
  currentY += (mouseY - currentY) * 0.14;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  cursorGlow.style.left = `${mouseX}px`;
  cursorGlow.style.top = `${mouseY}px`;

  requestAnimationFrame(animateCursor);

}

animateCursor();



/* HERO CUP PARALLAX */

const heroCup = document.querySelector(".hero-object");

document.addEventListener("mousemove", (e) => {

  if (!heroCup) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;
  const y = (window.innerHeight / 2 - e.clientY) / 45;

  heroCup.style.transform =
    `translate(${x}px, calc(-50% + ${y}px)) rotate(${x * -.3}deg)`;

});



/* BIG COFFEE PARALLAX */

const coffeeBig = document.querySelector(".coffee-big");

document.addEventListener("mousemove", (e) => {

  if (!coffeeBig) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 18;
  const y = (e.clientY / window.innerHeight - 0.5) * 18;

  coffeeBig.style.transform =
    `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${8 + x / 3}deg)`;

});



/* HOVER CURSOR */

const interactiveElements =
  document.querySelectorAll("a, .food-item, .location-card, .hoodie-card, .bake-cloud span");

interactiveElements.forEach((element) => {

  element.addEventListener("mouseenter", () => {

    cursor.style.transform =
      "translate(-50%, -50%) scale(1.45)";

  });

  element.addEventListener("mouseleave", () => {

    cursor.style.transform =
      "translate(-50%, -50%) scale(1)";

  });

});



/* SCROLL REVEAL */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.15
    }

  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});



/* MAGNETIC BUTTONS */

const buttons =
  document.querySelectorAll(".button, .nav-button, .final-button, .spotify-button");

buttons.forEach((button) => {

  button.addEventListener("mousemove", (e) => {

    const rect = button.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    button.style.transform =
      `translate(${x * .12}px, ${y * .12}px)`;

  });

  button.addEventListener("mouseleave", () => {

    button.style.transform = "translate(0,0)";

  });

});



/* HOODIE 3D TILT */

const hoodieCards =
  document.querySelectorAll(".hoodie-card");

hoodieCards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const y =
      (e.clientY - rect.top) / rect.height;

    const rotateY =
      (x - .5) * 8;

    const rotateX =
      (y - .5) * -8;

    card.style.transform =
      `perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-8px)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

  });

});



/* BEANS FLOATING */

const beans =
  document.querySelectorAll(".beans");

window.addEventListener("scroll", () => {

  const scroll =
    window.scrollY;

  beans.forEach((bean, index) => {

    const speed =
      (index + 1) * .08;

    bean.style.transform =
      `translateY(${scroll * speed}px) rotate(${scroll * speed}deg)`;

  });

});



/* ACTIVE NAV */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 200;

    if (window.scrollY >= sectionTop) {

      current = section.getAttribute("id");

    }

  });

  navLinks.forEach((link) => {

    link.style.opacity =
      link.getAttribute("href") === `#${current}`
        ? "1"
        : ".55";

  });

});
