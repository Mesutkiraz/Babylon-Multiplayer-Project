import * as BABYLON from '@babylonjs/core';
export class CustomCamera {
    constructor(scene) {
        this.scene = scene;
    }
    initCamera() {
        const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);
    }
}
