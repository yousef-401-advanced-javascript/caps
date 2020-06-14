'use strict';

const EE = require('events');

module.exports = new EE();


//because if we create in every file an events
//its will be new event not the same one
//like what happens with you in Linked list testing 
