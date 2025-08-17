import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

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

/*
//first way to create a Float32Array
//Float32Array
const array = new Float32Array(9);

//first vertices
array[0]=0;
array[1]=0;
array[2]=0;

//second vertices
array[3]=0;
array[4]=1;
array[5]=0;

//third vertices
array[6]=1;
array[7]=0;
array[8]=0;

*/

//another way to create a float32 array is

// const positionArray = new Float32Array([
//     0,0,0,  //first vertice
//     0,1,0, //second vertice
//     1,0,0  //third vertice
// ])

// buffer attribute
// const positionAttribute = new THREE.BufferAttribute(positionArray,3)

// Cube Geometry & Material
// const geometry = new THREE.BufferGeometry;
// geometry.setAttribute("position", positionAttribute)

let count = 5000;
let positionArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 32 * 32; i++) {
  positionArray[i] = (Math.random() - 0.5) * 1;
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionAttribute);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//controls
let controls = new OrbitControls(camera,renderer.domElement)

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update()
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Responsive resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
