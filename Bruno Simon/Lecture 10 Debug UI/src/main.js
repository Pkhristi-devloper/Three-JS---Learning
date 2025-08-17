import "./style.css";
import * as THREE from "three";
import * as LIL from "lil-gui";
import gsap from "gsap";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Renderer
let canvas = document.querySelector("#root");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Cube Geometry & Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//GUI
const gui = new LIL.GUI();
// gui.add(cube.position,'x',-10,10,0.1)
// gui.add(cube.position,'y',-10,10,0.1)
// gui.add(cube.position,'z',-10,10,0.1)
gui.add(cube.position, "x").min(-10).max(10).step(0.01).name("Elevation");

gui.add(cube, "visible");
gui.add(material, "wireframe");
gui.addColor(material, "color");

const parameters = {
  spin: () => {
    gsap.to(cube.rotation, {
      y: cube.rotation.y + 10,
      duration: 1.5,
    });
  },
};
gui.add(parameters, "spin");

window.addEventListener("keydown", (e) => {
  if (e.key == "h") {
    if (gui._hidden) {
      gui.show();
    } else {
      gui.hide();
    }
  }
});
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
