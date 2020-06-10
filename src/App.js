import React from 'react';
import THREE from './3d/three';
import SimplexNoise from 'simplex-noise';
function App() {
  let cols, rows, scene, renderer, camera;
  let scale = 10;
  let width = 1000;
  let height = 1000;
  let zArray = [];
  var simplex = new SimplexNoise();
  let geometry, wireframe, wireframeModel;
  let setup = ()=>{
        const canvas = document.createElement('canvas');
        cols = width/scale;
        rows = height/scale;
        
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
            500,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          camera.position.z = 30 
          camera.position.x = 0;
          //camera.position.y = -window.innerHeight/2;
 
             geometry = new THREE.PlaneGeometry(width, height, cols, rows)
             f-=0.1;
        let ioff = f;
        for(let i = 0; i< cols; i++){
          let joff = 0;
          for(let j = 0; j< rows; j++){
            zArray.push(map_range(simplex.noise2D(ioff,joff), 0, 1, -5, 5));
            joff+=.1;
          }
          ioff+=.1;
        }
        for(let x = 0; x < geometry.vertices.length; x++){
            
          geometry.vertices[x].z = isNaN(zArray[x])? 0: zArray[x];
      }
            var material = new THREE.MeshPhongMaterial( {
              color: 0xff0000
            } );
          var mesh = new THREE.Mesh( geometry, material );
          mesh.rotateX(-Math.PI/16)
          scene.add( mesh )
           wireframe = new THREE.WireframeGeometry( geometry );
      
          var mat = new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 2 } );
          wireframeModel = new THREE.LineSegments( wireframe, mat );
           mesh.add( wireframeModel );

      
  }
  let f = 0;
  let draw = () =>{
    requestAnimationFrame(draw);
          renderer.render(scene, camera);
       
      geometry.verticesNeedUpdate = true;
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