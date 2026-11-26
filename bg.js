import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(3, 3, 5);
scene.add(sun);

const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.2, 0.35, 160, 20),
  new THREE.MeshStandardMaterial({ color: 0x8b5cf6, wireframe: true })
);
scene.add(knot);

let model;
new GLTFLoader().load('assets/avatar.glb', (gltf) => {
  model = gltf.scene;
  model.scale.setScalar(1.4);
  model.position.set(2.2, -1.3, 0);
  scene.add(model);
});

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  knot.rotation.x += 0.2 * delta;
  knot.rotation.y += 0.3 * delta;
  if (model) model.rotation.y += 0.6 * delta;
  renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
