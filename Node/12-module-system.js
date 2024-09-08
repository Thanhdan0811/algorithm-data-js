// const http = require('http');

// const http = require('https');
const { request, get } = require('https');


// nhận vào string
// http không dùng đc với https linke
// https module sẽ đc.
const req = http.request("https://www.google.com", (res) => {
    // event data, có param là chunk các data.
    res.on("data", (chunk) => {
        console.log(`Data chunk: ${chunk}`);
    });

    res.on('end', () => {
        console.log("No more data");
    })
});

// cần phải có req.end(); không có sẽ chạy ko có end.
req.end();