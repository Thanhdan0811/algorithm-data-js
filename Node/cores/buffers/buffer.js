const { Buffer } = require("buffer");
/* 
const memoryContainer = Buffer.alloc(4); // 4 bytes (32 bits) toàn bộ là 0.

console.log(memoryContainer);
console.log(memoryContainer[0]);


memoryContainer[0] = 0xF4;
console.log(memoryContainer[0]); => 244 in decimals.
memoryContainer[1] = 0x34;
memoryContainer[2] = -34;
console.log(memoryContainer[2]); // lưu hex là de, in ra decimal là 222
// method này giúp ghi vào buffer ở dạng số nguyền vào, ở vị trí 2.
memoryContainer.writeInt8(-34, 2);
memoryContainer[3] = 0xFf;

console.log(memoryContainer); // log ra buffer hiển thị hexadecimal.
console.log(memoryContainer[0]); // khi in ra sẽ hiển thị ở decimal. 0xF4 => 244
console.log(memoryContainer[1]); // min lưu là 0, max là 255.
console.log(memoryContainer.readInt8(2));
console.log(memoryContainer[3]); 

console.log(memoryContainer.toString('hex')); => show ra full hex value, ex: f4300ff

*/

// from sẽ tự động xác định kích thước byte cần thiết.
/* const b = Buffer.from([0x48, 0x69, 0x21]);
const c = Buffer.from("486921", 'hex');


console.log(b.toString('utf-8'))
console.log(c.toString('utf-8')) */

// chuyển đổi string thành binary dựa vào utf-8
const c = Buffer.from("Hi!", "utf-8");
console.log(c);
