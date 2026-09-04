/* ==================================================
   SIDEWALK INTERACTIONS
================================================== */


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (event) => {

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

    cursorRing.style.left = event.clientX + "px";
    cursorRing.style.top = event.clientY + "px";

});


/* =========================================
   CURSOR HOVER EFFECT
========================================= */

const hoverElements =
    document.querySelectorAll("a, button, .philosophy-card, .menu-item, .location, .hoodie-card");

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursorRing.style.width = "60px";
        cursorRing.style.height = "60px";

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.style.width = "35px";
        cursorRing.style.height = "35px";

    });

});


/* =========================================
   MOBILE MENU
========================================= */

const mobileButton = document.querySelector(".mobile-menu");
const nav = document.querySelector(".navbar nav");

mobileButton.addEventListener("click", () => {

    nav.classList.toggle("show-mobile");

});


/* =========================================
   3D COFFEE MOUSE PARALLAX
========================================= */

const coffee = document.querySelector(".coffee-scene");

document.addEventListener("mousemove", (event) => {

    if (!coffee) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 18;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

    coffee.style.transform =
        `translateY(-50%) rotateY(${x}deg) rotateX(${-y}deg)`;

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".story-grid, .philosophy-card, .menu-item, .location, .hoodie-card, .contact-grid"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================
   HOVER 3D TILT
========================================= */

const cards = document.querySelectorAll(
    ".philosophy-card, .menu-item, .location"
);

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================
   PARALLAX COFFEE BACKGROUND
========================================= */

const coffeeBanner = document.querySelector(".coffee-image");

window.addEventListener("scroll", () => {

    if (!coffeeBanner) return;

    const rect =
        coffeeBanner.parentElement.getBoundingClientRect();

    const offset =
        rect.top * 0.12;

    coffeeBanner.style.transform =
        `translateY(${offset}px) scale(1.08)`;

});


/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const target =
            document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

        nav.classList.remove("show-mobile");

    });

});
