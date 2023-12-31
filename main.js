import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

// -------------- declaring constant measurements -------------- //
// 1000km -> 1 unit


const radiusOfSaturn = 58.232;


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
sunLight.position.set(1000, 0, 0);
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



function createRing(innerRadius, outerRadius, segments, thickness, tubularSegments, textureMap, bumpMap) {
  const ringGeometry = new THREE.RingGeometry(
    innerRadius,
    outerRadius,
    segments,
    thickness,
    tubularSegments
  );

    const ringMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      bumpMap: textureLoader.load(bumpMap),
      map: textureLoader.load(textureMap),
      transparent: true,
      opacity: 1,
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    return ring;
  }

  // Example usage
  const ring1 = createRing(
    124.5, // innerRadius
    164.22, // outerRadius
    964, // segments
    12, // thickness
    764, // tubularSegments
    "./textures/SaturnRings/saturnRings.png", // textureMap
    "./textures/SaturnRings/saturnRings.png" // bumpMap
  );
  ring1.rotation.x = (Math.PI * 90) / 180; // Rotate 90 degrees on the x-axis to align with Saturn's axis
  ring1.rotation.z = (Math.PI * 21) / 180; // Tilt the plane of the rings
  scene.add(ring1);

  const ring2 = createRing(
    165.5, // innerRadius
    200.22, // outerRadius
    264, // segments
    8, // thickness
    64, // tubularSegments
    "./textures/SaturnRings/rings_color_map.png", // textureMap
    "./textures/SaturnRings/saturnRings.png" // bumpMap
  );
  ring2.rotation.x = Math.PI / 2;
  ring2.rotation.z = (Math.PI * 21) / 180;
  scene.add(ring2);

  const ring3 = createRing(
    203.5, // innerRadius
    224.22, // outerRadius
    164, // segments
    5, // thickness
    64, // tubularSegments
    "./textures/SaturnRings/rings_color_map.png", // textureMap
    "./textures/SaturnRings/saturnRings.png" // bumpMap
  );
  ring3.rotation.x = Math.PI / 2;
  ring3.rotation.z = (Math.PI * 21) / 180;
  scene.add(ring3);

  const ring4 = createRing(
    224.5, // innerRadius
    240.22, // outerRadius
    164, // segments
    2, // thickness
    64, // tubularSegments
    "./textures/SaturnRings/rings_color_map.png", // textureMap
    "./textures/SaturnRings/saturnRings.png" // bumpMap
  );
  ring4.rotation.x = Math.PI / 2;
  ring4.rotation.z = (Math.PI * 21) / 180;
  scene.add(ring4);



// --------- moons------------- //



function createMoon(radius, widthSegments, heightSegments, orbitRadius, texturePath, bumpMapPath) {
  const moonGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const moonMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(texturePath),
    specularMap: textureLoader.load(bumpMapPath),
  });
  
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.x = orbitRadius;
  return moon;
}

// Usage example
const titan = createMoon(
  2.574, // radius
  64, // widthSegments
  32, // heightSegments
  290, // orbitRadius
  "./textures/Saturn/moons/titan/titantexturemap2.jpg", // texturePath
  "./textures/Saturn/moons/titan/saturnbumpmap.jpg" // bumpMapPath
);
scene.add(titan);

const dione = createMoon(
  1.123, // radius
  64, // widthSegments
  32, // heightSegments
  360, // orbitRadius
  "./textures/Saturn/moons/dione/dionetexturemap.jpg", // texturePath
  "./textures/Saturn/moons/dione/dionebumpmap.jpg" // bumpMapPath
);
scene.add(dione);

const iapetus = createMoon(
  0.735, // radius
  64, // widthSegments
  32, // heightSegments
  320, // orbitRadius
  "./textures/Saturn/moons/iapetus/iapetustexturemap.jpg", // texturePath
  "./textures/Saturn/moons/iapetus/iapetusbumpmap.jpg" // bumpMapPath
);
scene.add(iapetus);

const rhea = createMoon(
  0.763, // radius
  64, // widthSegments
  32, // heightSegments
  420, // orbitRadius
  "./textures/Saturn/moons/rhea/rheatexturemap.jpg", // texturePath
  "./textures/Saturn/moons/rhea/rheabumpmap.jpg" // bumpMapPath
);
scene.add(rhea);

const tethys = createMoon(
  0.531, // radius
  64, // widthSegments
  32, // heightSegments
  360, // orbitRadius
  "./textures/Saturn/moons/tethys/tethystexturemap.jpg", // texturePath
  "./textures/Saturn/moons/tethys/tethysbumpmap.jpg" // bumpMapPath
);
scene.add(tethys);

function createAsteroid(radius, widthSegments, heightSegments, positionX, positionY, positionZ, texturePath) {
  const asteroidGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const asteroidMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(texturePath),
  });
  
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  asteroid.position.set(positionX, positionY, positionZ);
  return asteroid;
}

// Usage example
const asteroid = createAsteroid(
  1.5, // radius
  32, // widthSegments
  16, // heightSegments
  50, // positionX
  0,  // positionY
  200, // positionZ
  "./textures/asteroid_texture.jpg" // texturePath
);
scene.add(asteroid);

const titanOrbitRadius = 390;
const dioneOrbitRadius = 360;
const iapetusOrbitRadius = 320;
const rheaOrbitRadius = 420;
const tethysOrbitRadius = 360;

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  // Calculate elapsed time
  const elapsed = clock.getElapsedTime();

  // Update moon positions
  const titanOrbitSpeed = 0.5;
  const dioneOrbitSpeed = 0.2;
  const iapetusOrbitSpeed = 0.1;
  const rheaOrbitSpeed = 0.3;
  const tethysOrbitSpeed = 0.2;

  titan.position.set(
    Math.sin(elapsed * titanOrbitSpeed) * titanOrbitRadius,
    0, // Keep the y-coordinate at 0
    Math.cos(elapsed * titanOrbitSpeed) * titanOrbitRadius
  );
  dione.position.set(
    Math.sin(elapsed * dioneOrbitSpeed) * dioneOrbitRadius,
    0, // Keep the y-coordinate at 0
    Math.cos(elapsed * dioneOrbitSpeed) * dioneOrbitRadius
  );
  iapetus.position.set(
    Math.sin(elapsed * iapetusOrbitSpeed) * iapetusOrbitRadius,
    0, // Keep the y-coordinate at 0
    Math.cos(elapsed * iapetusOrbitSpeed) * iapetusOrbitRadius
  );
  rhea.position.set(
    Math.sin(elapsed * rheaOrbitSpeed) * rheaOrbitRadius,
    0, // Keep the y-coordinate at 0
    Math.cos(elapsed * rheaOrbitSpeed) * rheaOrbitRadius
  );
  tethys.position.set(
    Math.sin(elapsed * tethysOrbitSpeed) * tethysOrbitRadius,
    0, // Keep the y-coordinate at 0
    Math.cos(elapsed * tethysOrbitSpeed) * tethysOrbitRadius
  );

  // Update moon rotations
  titan.rotation.y += 0.09;
  titan.rotation.z += 0.9;
  dione.rotation.y += 0.07;
  iapetus.rotation.y += 0.06;
  rhea.rotation.y += 0.05;
  tethys.rotation.y += 0.049;

  // Update Saturn's rotation
  sphere.rotation.y = 0.085 * elapsed;

  // Update controls and render scene
  controls.update();
  renderer.render(scene, camera);
}

animate();
