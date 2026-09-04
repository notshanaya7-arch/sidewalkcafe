/* =========================
   SMOOTH CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateCursor() {

  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================
   HERO CUP PARALLAX
========================= */

const cup = document.querySelector(".cup");

document.addEventListener("mousemove", (e) => {

  if (!cup) return;

  const x = (e.clientX / window.innerWidth - .5);
  const y = (e.clientY / window.innerHeight - .5);

  cup.style.transform = `
    translate(${x * 18}px, ${y * 18}px)
    rotate(-13deg)
    rotateY(${-18 + x * 12}deg)
    rotateX(${y * -8}deg)
  `;
});


/* =========================
   BEAN PARALLAX
========================= */

const beans = document.querySelectorAll(".bean");

document.addEventListener("mousemove", (e) => {

  const x = e.clientX / window.innerWidth - .5;
  const y = e.clientY / window.innerHeight - .5;

  beans.forEach((bean, index) => {

    const speed = (index + 1) * 12;

    bean.style.marginLeft = `${x * speed}px`;
    bean.style.marginTop = `${y * speed}px`;

  });

});


/* =========================
   HOVER CURSOR
========================= */

const interactive = document.querySelectorAll("a, button");

interactive.forEach((item) => {

  item.addEventListener("mouseenter", () => {

    ring.style.width = "70px";
    ring.style.height = "70px";

  });

  item.addEventListener("mouseleave", () => {

    ring.style.width = "45px";
    ring.style.height = "45px";

  });

});


/* =========================
   SCROLL REVEAL
========================= */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.12
  }
);

sections.forEach((section) => {
  observer.observe(section);
});


/* =========================
   IMAGE PARALLAX
========================= */

window.addEventListener("scroll", () => {

  const scroll = window.scrollY;

  const hero = document.querySelector(".hero");

  if (hero) {

    hero.style.backgroundPosition =
      `center ${scroll * 0.12}px`;

  }

});
