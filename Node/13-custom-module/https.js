const {send} = require('./request');
const response = require('./response');

// const sendTwo = require('./request');

// sendTwo();

function makeRequest(url, data) {
    send(url, data);
    return response.read(); 
}

const resData = makeRequest('https://google.com', 'hello');

console.log(resData);