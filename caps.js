'use strict';


const events = require('./moduler/events');

require('./moduler/vendor');
events.on('pickup', (payload)=>{allEvents('pickup', payload);});
events.on('in-transit', (payload)=>{allEvents('in-transit', payload);});
events.on('delivered', (payload)=>{allEvents('delivered', payload);});




function allEvents(event, payload){
  console.log('EVENT:', {
    event:event,
    time:new Date().toString(),
    payload:payload,
  });
}

require('./moduler/driver');


