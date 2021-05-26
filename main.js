// import "./style.css";
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// to begin any THREE.JS project You would need three objects, one 
//SCENE, CAMERA, RENDERER
// SCENE WOULD BE THE PLACE WHICH WOULD HAVE ALL YOUR OBJECTS 
/*
SCENE WOULD BE LIKE A PLACE WHERE WE KEEP OUR GAME OBJETCS IN UNITY
SO, A CAMERA IS JUST LIKE A CAMERA IN UNITY AND THERE ARE MANY TYPES
*/
const scene = new THREE.Scene();
// PERPECTIVE CAMERA IS LIKE THE ONE WHICH EYE CAN SEEE
/*
IN THREE.PerpectiveCamrera (^here goes the FOV, ^ASPECT RATIo, ^, ^ both are for view frtustum )
so, FOV is feild of view the max is 360 degreees. 0.1, 1000====> Almost evertyhing is visible
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000  );
// USe the canvas element as the main rendere which would render out on the page
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
// here setting the pixel rarion and the size of the reneder which would be needed to display what is there on the canvas

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Inittially cam pos is 0, 0, 0 so we need to set the z axis such that everything is visible
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xff6347});
const torus = new THREE.Mesh(geometry, material);


const pointLight = new THREE.PointLight(0xff6348);
pointLight.position.set(5, 5, 5 );
const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);




scene.add(torus);
scene.add(pointLight, ambientLight);
// scene.add(lightHelper, gridHelper);
renderer.render(scene, camera); 

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);

}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space-galaxy-background.jpg');
scene.background = spaceTexture;


const myTexture = new THREE.TextureLoader().load('IMG_20200311_150119.jpg');
const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: myTexture})
);
scene.add(me);


const roundTexture = new THREE.TextureLoader().load('1624.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const round = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: roundTexture,
    normalMap:normalTexture,
  }),
);
round.position.setZ(30);
round.position.setX(-10);

scene.add(round);
me.position.x = 2;
me.position.z = -5;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  round.rotation.x += 0.05;
  round.rotation.y += 0.075;
  round.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update;
  // moon.rotation.x += 0.005;
  renderer.render(scene, camera); 
}
animate();
