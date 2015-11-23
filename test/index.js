"use strict";

var socket = new WebSocket("ws://localhost:9000");

socket.onmessage = function(msg) {
  console.log(msg);
};

socket.onerror = function(err) {
  console.error(err);
};
