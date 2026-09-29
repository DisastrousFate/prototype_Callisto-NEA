import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject} from 'three/addons/renderers/CSS2DRenderer.js';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

import * as graphics from './graphics.js';
import * as hud from './hud.js';
import * as camera from './camera.js';
import * as input from './input.js';

const scene = new THREE.Scene();
const pCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
const mainRenderer = new THREE.WebGLRenderer({antialias: true});
const orbitControls = new camera.Camera(scene, pCam, mainRenderer);

const gameObjects = []
export {gameObjects}

const div_2D = document.getElementById('HTML');
const div_mainScreen = document.getElementsByClassName('main-screen')[0];

// 3D Graphics Renderer

const canvas = mainRenderer.domElement;
canvas.setAttribute('tabindex', 0);

// Input
const gameInput = new input.Input(canvas);


mainRenderer.setSize(window.innerWidth, window.innerHeight);
mainRenderer.setAnimationLoop(render);
mainRenderer.setPixelRatio(window.devicePixelRatio);

div_mainScreen.appendChild(mainRenderer.domElement);

// HTML Renderer Lower Toolbar
const HTMLRenderer = new CSS2DRenderer();
HTMLRenderer.setSize(window.innerWidth, window.innerHeight);
HTMLRenderer.domElement.style.position = 'absolute';
HTMLRenderer.domElement.style.top = '0';
HTMLRenderer.domElement.style.left = '0';
HTMLRenderer.domElement.style.pointerEvents = 'none';

// 2D/HTML elements
div_2D.appendChild(HTMLRenderer.domElement);

const lower_toolbar = document.createElement('div');
div_2D.appendChild(lower_toolbar);
lower_toolbar.setAttribute('id', 'lower-toolbar');

const lowerToolbarText = document.createElement('h1');
lowerToolbarText.innerHTML = 'Lower Toolbar';
lower_toolbar.appendChild(lowerToolbarText);


// Cube rendered to camera to render as 2D

const HUD = new hud.HUD(scene, pCam);
HUD.square();
scene.add(pCam);


// Movement
const moveObject = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 	0x880808})
);
moveObject.position.y = moveObject.scale.y/2
moveObject.name = "moveObject"
scene.add(moveObject);
gameObjects.push(moveObject);

// Cube
const geometry = new THREE.BoxGeometry( .5, .5, .5 );
const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const cube = new THREE.Mesh( geometry, material );

const label1 = new graphics.TextLabel('Cube', lower_toolbar);
cube.add(label1.textObject);
scene.add( cube );
gameObjects.push(cube);

// Plane
const groundPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10,1,1),
  new THREE.MeshBasicMaterial({color: 'gray', side: THREE.DoubleSide})
)
groundPlane.rotateX(Math.PI/2)

scene.add(groundPlane);
gameObjects.push(groundPlane);

// ------------------------------------------- //

let foundobject = '';

console.log(gameObjects)

for (let i of gameObjects){
  console.log(i.name)
  // for (let j of i){
  //   foundobject = j
  // }
}

console.log(foundobject)


function resizeRendererToDisplaySize(renderer) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if ((window.innerWidth != canvas.width) || (window.innerHeight != height)) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    pCam.aspect = canvas.clientWidth / canvas.clientHeight;
    pCam.updateProjectionMatrix();
	}

}

function render( time ) {
  resizeRendererToDisplaySize(mainRenderer);
  resizeRendererToDisplaySize(HTMLRenderer);

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
  cube.translateZ(0.01);
  cube.castShadow = true;

  orbitControls.animate(moveObject);

  mainRenderer.render( scene, pCam );
  HTMLRenderer.render( scene, pCam );
}

