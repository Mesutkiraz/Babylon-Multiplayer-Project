import { Room } from 'colyseus';
import { MyRoomState, Player } from './schema/MyRoomState.js'; // Ensure that these are also exported as ES6 modules

export class MyRoom extends Room {

  onCreate(options) {
    this.setState(new MyRoomState());
    this.onMessage("updatePosition", (client, inputForce) => {
    const player = this.state.players.get(client.sessionId);
    
    if(!inputForce || inputForce.h > 1 || inputForce.v < -1){
      return false;
    }

    // update position based on input forces
    let speed = 0.1;
    let rotSpeed = 0.03;
    player.rotationY = (player.rotationY || 0) - inputForce.h * rotSpeed;
    player.x += -Math.sin(player.rotationY) * inputForce.v * speed;
    player.z += -Math.cos(player.rotationY) * inputForce.v * speed;
    console.log(client.sessionId, "move ", "X: ", player.x, "Z: ", player.z , "RotateY: ", player.rotationY);
});

this.onMessage("updateAnimation", (client, animationState) => {
  const player = this.state.players.get(client.sessionId);
  player.animationState = animationState.animation;
  //Broadcast this animation state to all other players in the room

  this.broadcast("animationUpdate", { sessionId: client.sessionId,animation: animationState.animation });
});

this.onMessage("boombox", (client) => {
 console.log("boombox");
  this.broadcast("boombox-clicked", { initiatedBy: client.sessionId });
});
   
  }

  onJoin(client, options) {
    console.log(client.sessionId, "joined!");
  
    // Create Player instance
    const player = new Player();
  
    // Place Player at a random position
    const FLOOR_SIZE = 50;
    player.x = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);
    player.y = 0;
    player.z = -(FLOOR_SIZE / 2) + (Math.random() * FLOOR_SIZE);
  
    // Place player in the map of players by its sessionId
    // (client.sessionId is unique per connection!)
    this.state.players.set(client.sessionId, player);
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

};
