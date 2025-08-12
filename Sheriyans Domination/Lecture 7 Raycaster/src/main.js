import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 5;
let light = new THREE.AmbientLight("white", 1);
scene.add(light);

const directionalLight1 = new THREE.DirectionalLight("white", 5);
directionalLight1.position.set(5, 10, -7.5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight("white", 1);
directionalLight1.position.set(-5, -10, 7.5);
scene.add(directionalLight2);

// scene.add(camera)
const geoBox = new THREE.BoxGeometry();
const matBox = new THREE.MeshStandardMaterial({ color: "green" });
const box = new THREE.Mesh(geoBox, matBox);
box.position.x = -1.25;

scene.add(box);

const geoSphere = new THREE.SphereGeometry(0.5, 32, 32);
const matSphere = new THREE.MeshStandardMaterial({ color: "blue" });
const sphere = new THREE.Mesh(geoSphere, matSphere);

sphere.position.x = 1.5;

scene.add(sphere);

let canvas = document.querySelector("#root");

let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let controls = new OrbitControls(camera, canvas);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let previousIntersected = null;
let originalColor = null;
function pointerMove(e) {
  pointer.setX((e.clientX / window.innerWidth) * 2 - 1);
  pointer.setY(-(e.clientY / window.innerHeight) * 2 + 1);

  raycaster.setFromCamera(pointer, camera);
  //this will return the objects on which we are hovering from the array
  let intersectElems = raycaster.intersectObjects([sphere, box]);

  //if we want that when we hover on the any object of the scene then we can also use this like below
  //   let intersects = raycaster.intersectObjects(scene.children)

  if (intersectElems.length > 0) {
    if(previousIntersected != intersectElems[0].object){
      if(previousIntersected){
        previousIntersected.material.color.set(originalColor)
      }
      previousIntersected= intersectElems[0].object
      originalColor = previousIntersected.material.color.getHex()
      previousIntersected.material.color.set(0xff0000)
    }
  } else{
    if(previousIntersected){
        previousIntersected.material.color.set(originalColor)
        previousIntersected = null;
    }
  }
}
window.addEventListener("mousemove", pointerMove);
function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
