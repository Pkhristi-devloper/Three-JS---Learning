import {
  GLTFLoader,
  OrbitControls,
  RGBELoader,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);

camera.position.set(35, 50, 70);

let gltfLoader = new GLTFLoader();
gltfLoader.load("../gun.glb", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.position.y = -3;
  gltf.scene.rotation.y = 3 * Math.PI / 4;
});

const rgbe = new RGBELoader();
rgbe.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_pit_1k.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
  }
);

let amb = new THREE.AmbientLight("white", 3);
scene.add(amb);

// let boxGeo = new THREE.BoxGeometry();
// let boxMat = new THREE.MeshStandardMaterial({ color: "green" });
// let box = new THREE.Mesh(boxGeo, boxMat);

// scene.add(box);

let canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

let controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.enableZoom = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();
