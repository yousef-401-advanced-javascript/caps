'use strict';
const events = require('./events');

events.on('pickup', pickUpHandler);


function pickUpHandler(payload){

  setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit',payload);


    setTimeout(()=>{
      console.log('DRIVER:delivered up' ,payload.orderId);
      events.emit('delivered',payload);
    },3000);
    
  }, 1000);
    
}
