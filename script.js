import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


/* =====================================
   CUSTOM CURSOR
===================================== */

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (e) => {

  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;

});


function animateCursor() {

  ringX += (mouseX - ringX) * .12;
  ringY += (mouseY - ringY) * .12;

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


/* =====================================
   THREE.JS COFFEE MODEL
===================================== */

const container = document.getElementById("coffee-model");

const scene = new THREE.Scene();

scene.background = null;


const camera = new THREE.PerspectiveCamera(
  35,
  container.clientWidth / container.clientHeight,
  .1,
  100
);

camera.position.set(
  0,
  0.4,
  4.8
);


const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
  container.clientWidth,
  container.clientHeight
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.25;

container.appendChild(renderer.domElement);


/* =====================================
   LIGHTING
===================================== */

const ambientLight =
  new THREE.HemisphereLight(
    0xfff4df,
    0x251914,
    2
  );

scene.add(ambientLight);


const keyLight =
  new THREE.DirectionalLight(
    0xffe8b0,
    4
  );

keyLight.position.set(
  3,
  5,
  4
);

keyLight.castShadow = true;

scene.add(keyLight);


const fillLight =
  new THREE.PointLight(
    0xb96842,
    18,
    10
  );

fillLight.position.set(
  -3,
  1,
  2
);

scene.add(fillLight);


const rimLight =
  new THREE.PointLight(
    0xd5b15a,
    12,
    8
  );

rimLight.position.set(
  3,
  1,
  -3
);

scene.add(rimLight);


/* =====================================
   COFFEE MODEL
===================================== */

const loader = new GLTFLoader();

let coffeeModel = null;

loader.load(

  "https://polyfork.dev/cdn/coffee-cup-90be67.glb",

  (gltf) => {

    coffeeModel = gltf.scene;

    coffeeModel.scale.set(
      2.1,
      2.1,
      2.1
    );

    coffeeModel.position.set(
      0,
      -0.65,
      0
    );

    coffeeModel.rotation.y = -.35;

    coffeeModel.traverse((object) => {

      if (object.isMesh) {

        object.castShadow = true;
        object.receiveShadow = true;

      }

    });

    scene.add(coffeeModel);

  },

  undefined,

  (error) => {

    console.log(
      "3D model could not load:",
      error
    );

  }

);


/* =====================================
   MOUSE PARALLAX
===================================== */

let targetRotationX = 0;
let targetRotationY = 0;

document.addEventListener(
  "mousemove",
  (event) => {

    const x =
      event.clientX /
      window.innerWidth;

    const y =
      event.clientY /
      window.innerHeight;

    targetRotationY =
      (x - .5) * .8;

    targetRotationX =
      (y - .5) * .4;

  }
);


/* =====================================
   ANIMATION
===================================== */

const clock = new THREE.Clock();

function animate() {

  requestAnimationFrame(animate);

  const time =
    clock.getElapsedTime();

  if (coffeeModel) {

    coffeeModel.rotation.y +=
      (
        targetRotationY -
        coffeeModel.rotation.y
      ) * .035;

    coffeeModel.rotation.x +=
      (
        targetRotationX -
        coffeeModel.rotation.x
      ) * .025;

    coffeeModel.position.y =
      -.65 +
      Math.sin(time * 1.2) * .08;

  }

  renderer.render(
    scene,
    camera
  );

}

animate();


/* =====================================
   RESIZE
===================================== */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      container.clientWidth /
      container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

  }
);


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
        distance * -.035;

      image.style.transform =
        `translateY(${movement}px)`;

    });

  }
);
