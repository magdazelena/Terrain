import * as THREE from 'three';
import { Zlib } from 'three/examples/js/libs/inflate.min';

window.THREE = THREE;
window.Zlib = Zlib;

require('three/examples/js/controls/OrbitControls');
require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/loaders/FBXLoader');
export default {...THREE, OrbitControls: window.THREE.OrbitControls, GLTFLoader: window.THREE.GLTFLoader, FBXLoader: window.THREE.FBXLoader};