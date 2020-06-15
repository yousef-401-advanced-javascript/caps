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
  // console.log(2);
  // socket.on('pickup', (payload)=>{allEvents('pickup', payload);});//its gonna prepared before implementing vendor setInterval function
  // console.log(3);
  // socket.on('in-transit', (payload)=>{allEvents('in-transit', payload);});
  // console.log(4);
  // socket.on('delivered', (payload)=>{allEvents('delivered', payload);});
  socket.on('data', (buffer)=>dispatchEvent(buffer));

  socket.on('error', (error)=> console.log(`error : ${error.message}`));

  socket.on('end', (end)=>delete socketPool[id]);
});


function dispatchEvent(buffer){
  // console.log(JSON.parse(buffer.toString()));
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


