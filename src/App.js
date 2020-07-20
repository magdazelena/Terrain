import React from 'react';
import THREE from './3d/three';
import SimplexNoise from 'simplex-noise';
import { VertexColors } from 'three';
function App() {
  let cols, rows, scene, renderer, camera;
  let scale = 20;
  let width = 2000;
  let height = 2000;
  let zArray = [];
  let r = 800;
  let segments = 10;
  var positions = [];
  var colors = [];
  let wireframe, wireframeModel;   
  var simplex = new SimplexNoise();
  let geometry;
  let setup = ()=>{
        const canvas = document.createElement('canvas');
        cols = width/scale;
        rows = height/scale;
        scene = new THREE.Scene();
        scene.add( new THREE.AmbientLight( 0x111111 ) );

				// var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );

				// directionalLight.position.x = Math.random() - 0.5;
				// directionalLight.position.y = Math.random() - 0.5;
				// directionalLight.position.z = Math.random() - 0.5;
				// directionalLight.position.normalize();

				// scene.add( directionalLight );


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

            var material = new THREE.MeshBasicMaterial( {
              color: 0xffffff,
              opacity: .8,
              transparent: true
            } );
          console.log(geometry);
          geometry.verticesNeedUpdate = true;
          var mesh = new THREE.Mesh( geometry, material );
          mesh.rotateX(Math.PI/20)
          scene.add( mesh );
          wireframe = new THREE.WireframeGeometry( geometry );
          // for ( var i = 0; i < geometry.vertices.length; i ++ ) {
          
          //   var x = geometry.vertices[i].x;
          //   var y = geometry.vertices[i].y;
          //   var z = isNaN(zArray[i]) ? geometry.vertices[i].z : zArray[i];

          //   // positions

          //   positions.push( x, y, z );

          //   // colors

          //   colors.push( ( x / r ) + 0.5 );
          //   colors.push( ( y / r ) + 0.5 );
          //   colors.push( ( z / r ) + 0.5 );

          // }
              
	

           
         
          var mat = new THREE.LineBasicMaterial( { linewidth: 25, vertexColors: VertexColors} );
            
          wireframeModel = new THREE.LineSegments( wireframe, mat );
          console.log(wireframeModel);
          // wireframeModel.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
          // wireframeModel.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
          // wireframeModel.geometry.computeBoundingSphere();
          mesh.add( wireframeModel );

      
  }

  let f = 0;

  let draw = () =>{
    requestAnimationFrame(draw);
    f+=.003;
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
    positions = [];
    colors = [];
    geometry.verticesNeedUpdate = true;
    wireframe.fromGeometry(geometry);
    for(let x = 0; x < geometry.vertices.length; x++){
        geometry.vertices[x].z = zArray[x];
       
    }

    

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