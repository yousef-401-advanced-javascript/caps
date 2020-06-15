'use strict';
require('dotenv').config();
const faker = require('faker');
// const events = require('../events');
const net = require('net');

const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=>{
  console.log('vendor connected');
});

  client.on('data', (data)=>{
    // console.log(data.toString());
    const event = JSON.parse(data.toString());
    // console.log(event);
    // console.log('');
    if (event.event === 'delivered'){
      console.log(`thank you for delivering ${event.order.orderId}`);
    }
  });
  setInterval(()=>{
    let orderData = {
      storeName:faker.name.jobTitle() ,
      orderId:faker.random.uuid(),
      customerName:faker.name.findName() ,
      address:faker.address.streetAddress() ,
    };
    // console.log(5);
    
    // console.log(hi)
    client.write(JSON.stringify({event:'pickup', order:orderData}));
    // events.emit('pickup', orderData);
  },5000);


// console.log(1);

// events.on('delivered',deliveredHandler);


// function deliveredHandler(payload){
//   console.log('VENDOR:thank you for delivering', payload.orderId);
// }