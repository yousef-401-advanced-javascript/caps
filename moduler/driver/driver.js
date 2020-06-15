'use strict';

const net = require('net');

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


client.connect(PORT, HOST, ()=>{
  console.log('driver connected');
});

client.on('data', (data)=>{
  const event = JSON.parse(data.toString());
  // console.log(event);
  if (event.event === 'pickup'){
    setTimeout(()=>{
      console.log(`picked up ${event.order.orderId}`);
     
      client.write(JSON.stringify({event:'in-transit', order:event.order}));
      
    }, 1000);
  }
  if(event.event === 'in-transit'){
    setTimeout(()=>{
      // console.log(7);
      console.log('DRIVER:delivered up' ,event.order.orderId);
      client.write(JSON.stringify({event:'delivered', order:event.order}));
  
    },3000);

  }
});

