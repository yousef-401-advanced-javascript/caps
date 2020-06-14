'use strict';


const events = require('./moduler/events');
require('./moduler/vendor');

events.on('pickup', (payload)=>{allEvents('pickup', payload);});
events.on('in-transit', (payload)=>{allEvents('in-transit', payload);});




function allEvents(event, payload){
  console.log('EVENT:', {
    event:event,
    time:new Date().toString(),
    payload:payload,
  });
}
events.on('delivered', (payload)=>{allEvents('delivered', payload);});

require('./moduler/driver');


