'use strict';
const net = require('net');
const uuidV4 = require('uuid').v4;
const PORT = process.env.PORT ||3000;
const server = net.createServer();
//////////---------------\\\\\\\\\\\\\\\\
// const events = require('../events');
// require('../vendor/vendor');
/////////////--------------\\\\\\\\\\\\\\\\\
server.listen(PORT, ()=>console.log(`listening on PORT ${PORT}`));
const socketPool = {};

server.on('connection', (socket)=>{
  // console.log(socket);
  const id = `socket-${uuidV4}`;
  socketPool[id] = socket;
 
  socket.on('data', (buffer)=>dispatchEvent(buffer));

  socket.on('error', (error)=> console.log(`error : ${error.message}`));

  socket.on('end', (end)=>delete socketPool[id]);
});


function dispatchEvent(buffer){
  const message = JSON.parse(buffer.toString());
  allEvents(message.event, message.order);
  // console.log(message);
  broadcast(message);
}
function broadcast(message){
  const payload = JSON.stringify(message);
  // console.log(payload);
  for(let socket in socketPool){
    socketPool[socket].write(payload);
  }
}
function allEvents(event, payload){
  console.log('EVENT:', {
    event:event,
    time:new Date().toString(),
    payload:payload,
  });
}
server.on('error', (e) => console.log('SERVER ERROR', e.message));

// require('../driver/driver');


