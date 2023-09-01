
import { Server } from "colyseus";
import http from "http";
import express from "express";
import { WebSocketTransport } from "@colyseus/ws-transport";
import path from 'path';
import { MyRoom } from "./rooms/MyRoom.js"; 

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

let indexPath = "dist/";
let clientFile = "index.html";

// serve client
app.use(express.static(indexPath));
let indexFile = path.resolve(indexPath + clientFile);
app.get('/', (req, res) => {
  res.sendFile(indexFile);
});

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: http.createServer(app),
    express: app,
    pingInterval: 5000,
    pingMaxRetries: 3,
    protocol: "wss"
  })
});

gameServer.define("my_room", MyRoom);

gameServer.listen(port);