import * as BABYLON from '@babylonjs/core';


export class Environment {
    constructor(scene) {
        this.scene = scene;
    }

    initMap() {
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, this.scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        
        groundMaterial.diffuseTexture = new BABYLON.Texture(`./texture/Floor_Ground.jpg`, this.scene);
        groundMaterial.diffuseTexture.uScale = 5;
        groundMaterial.diffuseTexture.vScale = 5;
        groundMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        ground.material = groundMaterial;
    }

    initLight() {
        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), this.scene);
    }
}