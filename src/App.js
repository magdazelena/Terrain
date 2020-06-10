import React from 'react';
import THREE from './3d/three';
import SimplexNoise from 'simplex-noise';
function App() {
  let cols, rows, scene, renderer, camera;
  let scale = 20;
  let width = 2000;
  let height = 2000;
  let zArray = [];
  var simplex = new SimplexNoise();
  let geometry;
  let setup = ()=>{
        const canvas = document.createElement('canvas');
        cols = width/scale;
        rows = height/scale;
        let ioff = f;
        // for(let i = 0; i< cols; i++){
        //   let joff = f;
        //   for(let j = 0; j< rows; j++){
        //     zArray.push(map_range(simplex.noise2D(ioff,joff), 0, 1, -5, 5));
        //     joff+=.1;
        //   }
        //   ioff+=.1;
        // }
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
          camera.position.z = 50; 
          camera.position.x = 100;
          camera.position.y = -30;
 
             geometry = new THREE.PlaneGeometry(width*3, height*3, cols, rows)
      //        f-=0.1;
      //   generateZs(f);
        
      //   for(let x = 0; x < geometry.vertices.length; x++){
            
      //     geometry.vertices[x].z = isNaN(zArray[x])? 0: zArray[x];
      // }
            var material = new THREE.MeshBasicMaterial( {
              color: 0xff0000,
              wireframe: true
            } );
            geometry.verticesNeedUpdate = true;
          var mesh = new THREE.Mesh( geometry, material );
          mesh.rotateX(Math.PI/16)
          scene.add( mesh )
          //  wireframe = new THREE.WireframeGeometry( geometry );
      
          // var mat = new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 2 } );
          // wireframeModel = new THREE.LineSegments( wireframe, mat );
          //  mesh.add( wireframeModel );

      
  }
  let f = 0;

  let draw = () =>{
    requestAnimationFrame(draw);
    f+=.03;
    let ioff = f;
    zArray = [];
    for(let i = 0; i< cols; i++){
      let joff = 0;
      for(let j = 0; j< rows; j++){
        zArray.push(map_range(simplex.noise2D(ioff,joff), 0, 1, -20, 20));
        joff+=.1;
      }
      ioff+=.1;
    }
    for(let x = 0; x < geometry.vertices.length; x++){
        geometry.vertices[x].z = zArray[x];
    }
    geometry.verticesNeedUpdate = true;
    
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