import * as BABYLON from '@babylonjs/core';

export class Movement {
    constructor(scene) {
        this.scene = scene;
    }

    initMovement(pengu,penguWalkAnim,penguIdleAnim) {
        var inputMap = {};
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyDownTrigger, 
                function(evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
                }
            )
        );
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyUpTrigger, 
                function(evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
                }
            )
        );
        var animating = true;
        var boxSpeed = 0.1;
        var boxRotate = 0.03;

        this.scene.onBeforeRenderObservable.add(() => {
            var keydown = false;
            if (inputMap['w']) {
                pengu.moveWithCollisions(pengu.forward.scaleInPlace(boxSpeed));
                keydown = true;
            }
            if (inputMap['s']) {
                pengu.moveWithCollisions(pengu.forward.scaleInPlace(-boxSpeed));
                keydown = true;
            }
            if (inputMap['a']) {
                pengu.rotate(BABYLON.Vector3.Up(), -boxRotate);
                keydown = true;
            }
            if (inputMap['d']) {
                pengu.rotate(BABYLON.Vector3.Up(), boxRotate);
                keydown = true;
            }
            if (keydown) {
                if (!animating) {
                animating = true;
                    penguWalkAnim.start(true);
                }
                } else {
                if (animating) {
                    penguIdleAnim.start();
                    penguWalkAnim.stop();
                    animating = false;
                }
                }
        });
    }
}
