'use strict';
// const events = require('../events');
// events.on('pickup', pickUpHandler);
// function pickUpHandler(payload){
const net = require('net');

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


client.connect(PORT, HOST, ()=>{
  console.log('driver connected');
});

client.on('data', (data)=>{
  // console.log(data.toString());
  const event = JSON.parse(data.toString());
  // console.log(event);
  // console.log('');
  if (event.event === 'pickup'){
    setTimeout(()=>{
      console.log(`picked up ${event.order.orderId}`);
      // console.log(6);
      // console.log(`DRIVER: picked up ${payload.orderId}`);
      // events.emit('in-transit',payload);
      client.write(JSON.stringify({event:'in-transit', order:event.order}));
      
    }, 1000);
  }
  if(event.event === 'in-transit'){
    setTimeout(()=>{
      // console.log(7);
      console.log('DRIVER:delivered up' ,event.order.orderId);
      // events.emit('delivered',payload);
      client.write(JSON.stringify({event:'delivered', order:event.order}));
  
    },3000);

  }
});

// }
