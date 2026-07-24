//  0100 1000 0110 1001 0010 0001
const { Buffer } = require('buffer');


const c = Buffer.alloc(3);

c[0] = 0x48;
c[1] = 0x69;
c[2] = 0x21;

console.log(c);
console.log(c.toString('utf-8'));