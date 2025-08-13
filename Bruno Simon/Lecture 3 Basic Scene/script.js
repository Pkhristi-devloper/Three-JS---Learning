const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight)

scene.add(camera)
camera.position.z = 5;

const material = new THREE.MeshBasicMaterial({color:"red"})
const geometry = new THREE.BoxGeometry(1,1,1)
let box = new THREE.Mesh(geometry,material)
scene.add(box)


let canvas = document.querySelector(".canvas")
let renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene,camera)