import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

// -------------- declaring constant measurements -------------- //
// 1000km -> 1 unit
const radiusOfSaturn = 58.232;

const titanRadius = 2.574;
const titanWidthSegments = 64;
const titanheightSegments = 32;
// const titanOrbitRadius = 1221.870
const titanOrbitRadius = 120;

const dioneRadius = 0.561;
const dioneWidthSegments = 64;
const dioneheightSegments = 32;
// const dioneOrbitRadius = 377.396
const dioneOrbitRadius = 160;

const iapetusRadius = 0.735;
const iapetusWidthSegments = 64;
const iapetusheightSegments = 32;
const iapetusOrbitRadius = 3560.82;

const rheaRadius = 0.764;
const rheaWidthSegments = 64;
const rheaheightSegments = 32;
const rheaOrbitRadius = 527.108;

const tethysRadius = 0.531;
const tethysWidthSegments = 64;
const tethysheightSegments = 32;
const tethysOrbitRadius = 294.619;

// scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
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
scene.add(sphere);

// add saturn rings
const ringInnerRadius = 74.5; // Adjust as needed
const ringOuterRadius = 140.22; // Adjust as needed
const ringSegments = 64;

const ringGeometry = new THREE.RingGeometry(
  ringInnerRadius,
  ringOuterRadius,
  ringSegments
);
const ringMaterial = new THREE.MeshPhongMaterial({
  bumpMap: textureLoader.load("./textures/SaturnRings/rings_map.png"),
  map: textureLoader.load("./textures/SaturnRings/rings_color_map.png"),
});

const tempMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var pos = ringGeometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++) {
  v3.fromBufferAttribute(pos, i);
  ringGeometry.attributes.uv.setXY(i, v3.length() < 139 ? 0 : 1, 1);
}
const rings = new THREE.Mesh(ringGeometry, ringMaterial);
rings.position.set(0, 0, 0);
rings.rotation.x = Math.PI / 2;
rings.rotation.y = Math.PI / 2;
scene.add(rings);

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

  titan.rotation.y += 0.05;
  dione.rotation.y += 0.05;
  sphere.rotation.y = 0.05 * clock.getElapsedTime();
  iapetus.rotation.y += 0.05;
  rhea.rotation.y += 0.05;
  tethys.rotation.y += 0.05;
  controls.update();
  renderer.render(scene, camera);

  const elapsed = clock.getElapsedTime();
  // titan.position.set(Math.sin(elapsed) * titanOrbitRadius, 0, Math.cos(elapsed) * titanOrbitRadius);
  // dione.position.set(Math.sin(elapsed) * dioneOrbitRadius, 0, Math.cos(elapsed) * dioneOrbitRadius);
  // iapetus.position.set(Math.sin(elapsed) * iapetusOrbitRadius, 0, Math.cos(elapsed) * iapetusOrbitRadius);
  // rhea.position.set(Math.sin(elapsed) * rheaOrbitRadius, 0, Math.cos(elapsed) * rheaOrbitRadius);
  // tethys.position.set(Math.sin(elapsed) * tethysOrbitRadius, 0, Math.cos(elapsed) * tethysOrbitRadius);
}

animate();
