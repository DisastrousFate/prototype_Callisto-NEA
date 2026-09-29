import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

export class Camera{
  constructor(scene, camera, renderer){
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer; // Hoping that these objects resemble pointers...
    this.setup = 0;
    this.orbitDistance = 2;
    this.lastPosition = new THREE.Vector3();

    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.autoRotate = false;
    this.controls.enablePan = false;
    this.controls.update();

  }

  animate(target){

    
    // if (Math.abs(deltaS) > 0.01) {
    //   this.setup = 0;
    //   console.log("Target moved, resetting camera setup.");
    // }


    // if(this.newPos > 0){
    //   this.newPos = this.newPos + 0.00001;
    //   this.controls.target.x = target.position.x + this.newPos;


    // } else{
    //   this.newPos = this.newPos + 0.000001;
    //   this.controls.target = target.position;
    //   this.controls.saveState();
    // }


    
    if(this.setup == 0){
      this.camera.position.set(
        target.position.x + this.orbitDistance,
        target.position.y + this.orbitDistance,
        target.position.z + this.orbitDistance
      );

      this.setup = 1;
    }

    // this.lastPosition = target.position;

    this.camera
    

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

