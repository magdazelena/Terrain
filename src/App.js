import React, { useRef } from 'react';
import THREE from './3d/three';
import SimplexNoise from 'simplex-noise';
function App() {
  let canvasRef = useRef();
  let cols, rows, scene, renderer, camera;
  let scale = 20;
  let width = 2000;
  let height = 2000;
  let setup = ()=>{
        const canvas = canvasRef.current;
        const backgroundColor = 0x1d1c3a;
        cols = width/scale;
        rows = height/scale;
        //scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        //renderer
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        ///this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);
        //camera
        camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          camera.position.z = 30 
          camera.position.x = 0;
          camera.position.y = -3;
          //lights
          let hemiLight = new THREE.HemisphereLight(0xffffff,  0.91);
            hemiLight.position.set(0, 50, 0);
            // Add hemisphere light to scene
            scene.add(hemiLight);

      
  }
  let draw = () =>{
    requestAnimationFrame(draw);
          renderer.render(scene, camera);
       

  }
  setup();
  draw();
  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
