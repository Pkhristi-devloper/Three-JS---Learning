import "./style.css"
import "./index.css"

import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);


let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load("../public/world.webp")
let texture2 = textureLoader.load("../public/clouds.jpg")

const geo = new THREE.SphereGeometry(1, 320, 320);
const mat = new THREE.MeshPhysicalMaterial({map:texture})
const sphere = new THREE.Mesh(geo, mat);

const geo2 = new THREE.SphereGeometry(1.05, 320, 320);
const mat2 = new THREE.MeshPhysicalMaterial({alphaMap:texture2})
mat2.transparent = true;
const sphere2 = new THREE.Mesh(geo2, mat2);

mat.metalness = 0.5;
mat.roughness = 1.5;
camera.position.z = 5;
// sphere.position.y = 2;
// sphere.position.y = 2;

let hdri = new RGBELoader();
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/sunny_country_road_2k.hdr", (texture)=>{
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
})

const canvas = document.querySelector("#root");
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.DirectionalLight("white",5);
light.position.set(2, -0.8, 1);

let controls = new OrbitControls(camera, canvas)


//to see the light position and all
// let helper = new THREE.DirectionalLightHelper(light, 1);
// scene.add(helper);


scene.add(sphere,sphere2, light);

renderer.render(scene, camera);
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    sphere.rotation.y += 0.001;
    sphere2.rotation.y += 0.002;
    renderer.render(scene, camera);
}

animate();