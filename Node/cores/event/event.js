const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myE = new EventEmitter();

myE.on('foo', () => {
   console.log("An event occurred");
});

myE.emit("foo");