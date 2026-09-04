/* =====================================
   SIDEWALK CAFÉ — SCRIPT
===================================== */


/* =====================================
   CUSTOM CURSOR
===================================== */

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


/* =====================================
   CURSOR
===================================== */

if (cursor && ring) {

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

  });


  function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  /* =====================================
     CURSOR INTERACTION
  ===================================== */

  const interactive = document.querySelectorAll(
    "a, button, .location-card, .hoodie-card, .food-card"
  );

  interactive.forEach((element) => {

    element.addEventListener("mouseenter", () => {

      ring.style.width = "70px";
      ring.style.height = "70px";
      ring.style.background = "rgba(213,177,90,.12)";

    });

    element.addEventListener("mouseleave", () => {

      ring.style.width = "42px";
      ring.style.height = "42px";
      ring.style.background = "transparent";

    });

  });

}


/* =====================================
   REMOVE OLD 3D HOUSE / COFFEE MODEL
===================================== */

/*
   The old version of the website used
   Three.js to create the hero object.

   We don't need that anymore because
   the hero now uses a REAL SideWalk photo.
*/

const oldModel = document.getElementById("coffee-model");

if (oldModel) {
  oldModel.remove();
}


/* =====================================
   REMOVE OLD HERO DECORATIONS
===================================== */

document
  .querySelectorAll(
    ".model-glow, .floating-label, .open-badge"
  )
  .forEach((element) => {

    element.remove();

  });


/* =====================================
   REAL SIDEWALK HERO PHOTO
===================================== */

const heroVisual =
  document.querySelector(".hero-visual");

if (heroVisual) {

  heroVisual.style.backgroundImage =
    'url("https://sidewalkindia.com/wp-content/uploads/2025/03/coffee-shop-1.png")';

  heroVisual.style.backgroundSize = "cover";

  heroVisual.style.backgroundPosition = "center";

  heroVisual.style.backgroundRepeat = "no-repeat";

}


/* =====================================
   MOUSE PARALLAX
===================================== */

let targetX = 0;
let targetY = 0;

document.addEventListener(
  "mousemove",
  (event) => {

    const x =
      event.clientX /
      window.innerWidth;

    const y =
      event.clientY /
      window.innerHeight;

    targetX = (x - 0.5) * 10;
    targetY = (y - 0.5) * 6;

  }
);


/* =====================================
   HERO PHOTO PARALLAX
===================================== */

function heroParallax() {

  if (!heroVisual) return;

  const rect =
    heroVisual.getBoundingClientRect();

  const visible =
    rect.bottom > 0 &&
    rect.top < window.innerHeight;

  if (visible) {

    heroVisual.style.backgroundPosition =
      `calc(50% + ${targetX}px) calc(50% + ${targetY}px)`;

  }

  requestAnimationFrame(heroParallax);

}

heroParallax();


/* =====================================
   IMAGE PARALLAX
===================================== */

const images =
  document.querySelectorAll(
    ".story-image-wrap img, .coffee-image img, .people-image img"
  );


window.addEventListener(
  "scroll",
  () => {

    const scrollY =
      window.scrollY;

    images.forEach((image) => {

      const rect =
        image.parentElement.getBoundingClientRect();

      const center =
        window.innerHeight / 2;

      const distance =
        rect.top - center;

      const movement =
        distance * -0.035;

      image.style.transform =
        `translateY(${movement}px)`;

    });

  }
);


/* =====================================
   SMOOTH NAVIGATION
===================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


/* =====================================
   PAGE READY
===================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "SideWalk Café website loaded successfully."
    );

  }
);
