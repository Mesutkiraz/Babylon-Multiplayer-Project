import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder , ActionManager, ExecuteCodeAction } from '@babylonjs/core';
import { Environment } from './modules/environments.js';
import { CustomCamera } from './modules/camera.js';
import { Character } from './modules/character.js';
import * as Colyseus from "colyseus.js";
var client = new Colyseus.Client('ws://localhost:3000');


const canvas = document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);

const createScene = () => {
  const scene = new Scene(engine);

  const environment = new Environment(scene);
  const camera = new CustomCamera(scene, canvas);
  const character = new Character(scene);

  client.joinOrCreate("my_room").then(room => {
    console.log(room.sessionId, "joined", room.name);
}).catch(e => {
    console.log("JOIN ERROR", e);
});


  camera.initCamera();
  environment.initLight();
  environment.initMap();
  character.initCharacter();
  
  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});