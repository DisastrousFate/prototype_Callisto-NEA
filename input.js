import { NoToneMapping } from 'three';
import {gameObjects} from './main.js'


function findMesh(meshName) {
    const found = gameObjects.find(object => object.name === meshName);
    return found;
}

function movePlayer(key){
    let moveObject = findMesh('moveObject')
    if (moveObject) {
        // object exists, begin command execution...

        if(key == 'w'){
            moveObject.position.z -= 0.1;
        }
        if(key == 's'){
            moveObject.position.z += 0.1;
        }
        if(key == 'a'){
            moveObject.position.x -= 0.1;
        }
        if(key == 'd'){
            moveObject.position.x += 0.1;
        }
        

    }
}



export class Input{
    constructor(canvas){

        canvas.addEventListener('focus', () => {
            // Complete focus on screen.
        });
        
        canvas.addEventListener('blur', () => {
            // No focus, go to ingame menu
        });

        canvas.addEventListener('keydown', (key) => {
            console.log(key.key)
            switch (key.key){
                case 'w':
                    movePlayer(key.key);
                    
                    break;
                case 'a':
                    movePlayer(key.key);

                    break;
                case 's':
                    movePlayer(key.key);

                    break;
                case 'd':
                    movePlayer(key.key);

                    break;
            }
            
            
        });

    }
}

