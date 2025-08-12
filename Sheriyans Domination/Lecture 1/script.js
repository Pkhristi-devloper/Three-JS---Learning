// const camera = new THREE.PerspectiveCamera(
//     fov, // Field of view in degrees (usually between 45 and 75)
//     ratio, // tatio of height to width (usually window.innerWidth / window.innerHeight)
//     near, // near value. all the thing which are nearer than this value will not be rendered
//     far // far value. all the thing which are farther than this value will not be rendered
// )

//so we can say that everything between near and far will be rendered

// camera.position.z = 5; // Move the camera back so we can see the box
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const box = new THREE.Mesh(geometry, material);

scene.add(box);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
