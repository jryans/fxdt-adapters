"use strict";

require("babel-core/register")({
  only: function(path) {
    if (!path.includes("node_modules")) {
      return true;
    }
    if (path.match(/node_modules\/devtools|node_modules\/sdk/)) {
      return true;
    }
    return false;
  }
});

const WebSocketServer = require("ws").Server;
const valenceServer = require("../lib/chromium/server");
const Task = require("../lib/util/task");

let wsServer = new WebSocketServer({ port: 9000 });

console.log("Listening for WS on *:9000");

wsServer.on("connection", connection => {
  connection.on("message", console.log);
  connection.send("hello");

  Task.spawn(function*() {
    let url = "http://localhost:9222";
    try {
      yield valenceServer.ping(url);
    } catch (e) {
      return Promise.reject(new Error("Chrome Desktop not found"));
    }
    let transport = valenceServer.connect(url);
    connection.connect(transport);
  });
});
