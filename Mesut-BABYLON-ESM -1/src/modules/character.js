import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';

import { Movement } from './movement.js';

export class Character {
    
    constructor(scene) {
        this.scene = scene;
        
    }
    initCharacter(camera) {
        const movement = new Movement(this.scene);
        let pengu;
        BABYLON.SceneLoader.ImportMesh("", "/Penguin_CH/", "Penguin_Male_CH.gltf", this.scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        pengu = newMeshes[0];
        pengu.scaling.scaleInPlace(2);
        var penguAnimationGroups = animationGroups;
        const penguWalkAnim = penguAnimationGroups[1];
        const penguIdleAnim = penguAnimationGroups[0];

        movement.initMovement(pengu,penguWalkAnim,penguIdleAnim);
        //this.scene.activeCamera.parent = pengu;
        });
    }
}
