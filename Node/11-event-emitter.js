const EventEmitter = require('events');

const celebrity = new EventEmitter();


// subscribe to celebrity for Observer 1
celebrity.on('race', function(res) {
    console.log("Congratulations? you are the best 1!");
})

// subscribe to celebrity for Observer 2
celebrity.on('race', function(res) {
    console.log("Congratulations? you are the best obsserver 2!");
})


process.on('exit', (code) => {
    console.log("process exited", code);
})
// trigger event.

celebrity.emit('race');