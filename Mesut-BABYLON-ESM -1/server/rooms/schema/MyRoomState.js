import { Schema, MapSchema, defineTypes } from '@colyseus/schema';

export class Player extends Schema {
  constructor() {
    super();

  }
}

defineTypes(Player, {
  x: 'number',
  y: 'number',
  z: 'number',
  rotationX: 'number',
  rotationY: 'number',
  rotationZ: 'number',
  animationState: 'string',
  boombox: 'string',
});

export class MyRoomState extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
  }
}

defineTypes(MyRoomState, {
  players: { map: Player },
});