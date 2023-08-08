import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

// -------------- declaring constant measurements -------------- //
// 1000km -> 1 unit


const radiusOfSaturn = 58.232;

const titanRadius = 2.574;
const titanWidthSegments = 64;
const titanheightSegments = 32;
// const titanOrbitRadius = 1221.870
const titanOrbitRadius = 180;

const dioneRadius = 0.561;
const dioneWidthSegments = 64;
const dioneheightSegments = 32;
// const dioneOrbitRadius = 377.396
const dioneOrbitRadius = 190;

const iapetusRadius = 0.735;
const iapetusWidthSegments = 64;
const iapetusheightSegments = 32;
const iapetusOrbitRadius = 260.82;

const rheaRadius = 0.764;
const rheaWidthSegments = 64;
const rheaheightSegments = 32;
const rheaOrbitRadius = 227.108;

const tethysRadius = 0.531;
const tethysWidthSegments = 64;
const tethysheightSegments = 32;
const tethysOrbitRadius = 294.619;

// scene, camera and renderer

const scene = new THREE.Scene();


const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeMapTexture = cubeTextureLoader.load([
  './textures/stars.png',  // Positive X
  '/textures/stars.png',   // Negative X
  '/textures/stars.png',    // Positive Y
  '/textures/stars.png', // Negative Y
  '/textures/stars.png',  // Positive Z
  '/textures/stars.png',   // Negative Z
]);

scene.background = cubeMapTexture;

const ambientLight = new THREE.AmbientLight(0xffffff); // White color
ambientLight.intensity = 0.05; // Adjust the intensity value (0.0 to 1.0) to control brightness
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  10,
  6000 //
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 202, 300);
controls.update();

// axes helper
const axesHelper = new THREE.AxesHelper(100, 100, 100);
scene.add(axesHelper);

// start clock
const clock = new THREE.Clock();

// add light source
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(100, 0, 0);
scene.add(sunLight);

// add saturn
const textureLoader = new THREE.TextureLoader();
const saturnMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load("./textures/Saturn/saturntexturemap.jpg"),
  bumpMap: textureLoader.load("./textures/Saturn/saturnbumpmap.png"),
  bumpScale: 0.4,
});
// saturnMaterial.map.colorSpace = THREE.SRGBColorSpace;
const saturngeometry = new THREE.SphereGeometry(radiusOfSaturn, 64, 32);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(saturngeometry, saturnMaterial);
sphere.rotation.x = (Math.PI * 21) / 180;

scene.add(sphere);

// add saturn rings
const ringInnerRadius = 74.5; // Adjust as needed
const ringOuterRadius = 140.22; // Adjust as needed
const ringSegments = 64;
const ringTubularSegments = 764; // Add this line
const ringThickness = 8;

const ring2InnerRadius = 149.22; // Adjust as needed
const ring2OuterRadius = 169.22; // Adjust as needed
const ring2Segments = 64;
const ring2TubularSegments = 64; // Add this line
const ring2Thickness = 5;

const ringGeometry = new THREE.RingGeometry(
  ringInnerRadius,
  ringOuterRadius,
  ringSegments,
  ringThickness,
  ringTubularSegments
);

const ring2Geometry = new THREE.RingGeometry(
  ring2InnerRadius,
  ring2OuterRadius,
  ring2Segments,
  ring2Thickness,
  ring2TubularSegments
);
const ringMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide, // Make the material visible from both sides
  bumpMap: textureLoader.load("./textures/SaturnRings/rings_map.png"),
  map: textureLoader.load("./textures/SaturnRings/rings_color_map.png"),
  transparent: true,
  opacity: 1,
});

const tempMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var pos = ringGeometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
  v3.fromBufferAttribute(pos, i);
  ringGeometry.attributes.uv.setXY(i, v3.length() < 139 ? 0 : 1, 1);
}

//describe abbove 5 lines

var pos2 = ring2Geometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos2.count; i++) {
  v3.fromBufferAttribute(pos2, i);
  ring2Geometry.attributes.uv.setXY(i, v3.length() < 139 ? 0 : 1, 1);
}

const rings = new THREE.Mesh(ringGeometry, ringMaterial);
rings.position.set(0, 0, 0);
rings.rotation.x = Math.PI / 2;
rings.rotation.z = (Math.PI * 85) / 180; // Convert 85 degrees to radians
scene.add(rings);

const rings2 = new THREE.Mesh(ring2Geometry, ringMaterial);
rings2.position.set(0, 0, 0);
rings2.rotation.x = Math.PI / 2;
rings2.rotation.z = (Math.PI * 85) / 180; // Convert 85 degrees to radians
scene.add(rings2);

// --------- moons------------- //

// titan
const titanGeometry = new THREE.SphereGeometry(
  titanRadius,
  titanWidthSegments,
  titanheightSegments
);
const titanMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load("./textures/Saturn/moons/titan/titantexturemap2.jpg"),
  specularMap: textureLoader.load(
    "./textures/Saturn/moons/titan/saturnbumpmap.jpg"
  ),
});
const titan = new THREE.Mesh(titanGeometry, titanMaterial);
titan.position.x = titanOrbitRadius;
scene.add(titan);

// dione
const dioneGeometry = new THREE.SphereGeometry(
  dioneRadius,
  dioneWidthSegments,
  dioneheightSegments
);
const dioneMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load("./textures/Saturn/moons/dione/dionetexturemap.jpg"),
});
const dione = new THREE.Mesh(dioneGeometry, dioneMaterial);
dione.position.x = dioneOrbitRadius;
dione.position.y = 100;
scene.add(dione);

// iapetus
const iapetusGeometry = new THREE.SphereGeometry(
  iapetusRadius,
  iapetusWidthSegments,
  iapetusheightSegments
);
const iapetusMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load(
    "./textures/Saturn/moons/iapetus/iapetustexturemap.jpg"
  ),
});
const iapetus = new THREE.Mesh(iapetusGeometry, iapetusMaterial);
iapetus.position.x = 80;
iapetus.position.y = 80;
scene.add(iapetus);

// rhea
const rheaGeometry = new THREE.SphereGeometry(
  rheaRadius,
  rheaWidthSegments,
  rheaheightSegments
);
const rheaMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load("./textures/Saturn/moons/rhea/rheatexturemap.jpg"),
});
const rhea = new THREE.Mesh(rheaGeometry, rheaMaterial);
rhea.position.x = 80;
rhea.position.y = 80;
rhea.position.z = 80;
scene.add(rhea);

// tethys
const tethysGeometry = new THREE.SphereGeometry(
  tethysRadius,
  tethysWidthSegments,
  tethysheightSegments
);
const tethysMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load(
    "./textures/Saturn/moons/tethys/tethystexturemap.jpg"
  ),
});
const tethys = new THREE.Mesh(tethysGeometry, tethysMaterial);
tethys.position.x = 0;
tethys.position.y = 80;
tethys.position.z = 80;
scene.add(tethys);

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  // required if controls.enableDamping or controls.autoRotate are set to true

  titan.rotation.y += 0.09;
  titan.rotation.z += 0.9;
  dione.rotation.y += 0.07;
  sphere.rotation.y = 0.085 * clock.getElapsedTime();
  iapetus.rotation.y += 0.06;
  rhea.rotation.y += 0.05;
  tethys.rotation.y += 0.049;
  controls.update();
  renderer.render(scene, camera);
  const titanOrbitSpeed = 0.5;   
  const dioneOrbitSpeed = 0.2;   
  const iapetusOrbitSpeed = 0.1; 
  const rheaOrbitSpeed = 0.3;    
  const tethysOrbitSpeed = 0.4;  


  const elapsed = clock.getElapsedTime();
  titan.position.set(
    Math.sin(elapsed * titanOrbitSpeed) * titanOrbitRadius,
    0,
    Math.cos(elapsed * titanOrbitSpeed) * titanOrbitRadius
  );
  dione.position.set(
    Math.sin(elapsed * dioneOrbitSpeed) * dioneOrbitRadius,
    0,
    Math.cos(elapsed * dioneOrbitSpeed) * dioneOrbitRadius
  );
  iapetus.position.set(
    Math.sin(elapsed * iapetusOrbitSpeed) * iapetusOrbitRadius,
    0,
    Math.cos(elapsed * iapetusOrbitSpeed) * iapetusOrbitRadius
  );
  rhea.position.set(
    Math.sin(elapsed * rheaOrbitSpeed) * rheaOrbitRadius,
    0,
    Math.cos(elapsed * rheaOrbitSpeed) * rheaOrbitRadius
  );
  tethys.position.set(
    Math.sin(elapsed * tethysOrbitSpeed) * tethysOrbitRadius,
    0,
    Math.cos(elapsed * tethysOrbitSpeed) * tethysOrbitRadius
  );

}

animate();
