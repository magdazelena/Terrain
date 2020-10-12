import React from 'react';
import THREE from './3d/three';
import OrbitControls from './3d/three';
import SimplexNoise from 'simplex-noise';
function App() {
  let cols, rows, scene, renderer, camera;
  let scale = 20;
  let width = 2000;
  let height = 2000;
  let zArray = [];
  var simplex = new SimplexNoise();
  let geometry;
  let light1, light2, light3;
  let controls;
  var positionChange = width / 3;
  var frontLight;
  let setup = () => {
    const canvas = document.createElement('canvas');
    cols = width / scale;
    rows = height / scale;
    let ioff = f;
    for (let i = 0; i < cols; i++) {
      let joff = f;
      for (let j = 0; j < rows; j++) {
        zArray.push(map_range(simplex.noise2D(ioff, joff), 0, 1, -5, 5));
        joff += .1;
      }
      ioff += .1;
    }
    //scene
    scene = new THREE.Scene();
    //renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    //camera
    camera = new THREE.PerspectiveCamera(
      200,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    camera.position.x = 100;
    camera.position.y = -100;
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    // var axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);
    // //controls.update() must be called after any manual changes to the camera's transform
    // camera.position.set(0, 20, 100);
    // controls.update();
    geometry = new THREE.PlaneGeometry(width * 3, height * 3, cols, rows)

    var material = new THREE.MeshStandardMaterial({
      color: 0x769fb6,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    geometry.verticesNeedUpdate = true;
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI / 26)
    scene.add(mesh);
    //lights
    var light = new THREE.HemisphereLight(0x769fb6, 0x000000, 2);
    scene.add(light);
    light1 = new THREE.PointLight(0xff0040, 3, width / 2, 2);
    light1.position.z = 102;
    scene.add(light1);
    light2 = new THREE.PointLight(0x0040ff, 3, width / 1.5, 2);
    light2.position.z = 100;
    scene.add(light2);

    light3 = new THREE.PointLight(0x80ff80, 1, width, 2);
    light3.position.z = 253;
    scene.add(light3);
    frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(3000, 300, 3000).normalize(); // just a direction. you can normalize
    scene.add(frontLight);
  }
  let f = 0;
  let rmapped = 0;
  let draw = () => {
    requestAnimationFrame(draw);
    var time = Date.now() * 0.0005;
    f += .01;
    let ioff = f;
    zArray = [];
    for (let i = 0; i < cols; i++) {
      let joff = 0;
      for (let j = 0; j < rows; j++) {
        zArray.push(map_range(simplex.noise2D(ioff, joff), 0, 1, -10, 10));
        joff += .1;
      }
      ioff += .1;
    }
    for (let x = 0; x < geometry.vertices.length; x++) {
      geometry.vertices[x].z = zArray[x];
    }
    geometry.verticesNeedUpdate = true;
    light1.position.x = Math.sin(time * 0.1) * positionChange;
    light1.position.y = Math.sin(time * 0.4) * positionChange;
    light2.position.x = Math.cos(time * 0.3) * positionChange;
    light2.position.y = Math.sin(time * 0.2) * positionChange;

    light3.position.x = Math.sin(time * 0.9) * positionChange;
    light3.position.y = Math.sin(time * 0.5) * positionChange;
    var h = rmapped * 0.01 % 1;
    var s = 0.5;
    var l = 0.5;
    frontLight.color.setHSL(h, s, l);
    renderer.render(scene, camera);

    rmapped++;
    //controls.update();
    renderer.render(scene, camera);

  }
  setup();
  draw();
  return (
    <div className="App">
    </div>
  );
}

export default App;
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}