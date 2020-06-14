'use strict';
require('dotenv').config();
const faker = require('faker');
const events = require('./events');


events.on('delivered',deliveredHandler);

setInterval(()=>{
  let orderData = {
    storeName:faker.name.jobTitle() ,
    orderId:faker.random.uuid(),
    customerName:faker.name.findName() ,
    address:faker.address.streetAddress() ,
  };
  events.emit('pickup', orderData);
},5000);

function deliveredHandler(payload){
  console.log('VENDOR:thank you for delivering');
}