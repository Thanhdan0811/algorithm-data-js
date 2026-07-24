const { Buffer } = require('buffer');;



const buffer = Buffer.alloc(10000, 0);

const bufferUnsage = Buffer.allocUnsafe(10000); // faster alloc, vì ko ghi 0 vào memory.
// không an toàn vì có thể chưa data nhạy cảm.
/* 
Buffer.from()
Buffer.concat()
- cả 2 này dùng allocUnsafe để xử lý. nhưng sẽ ko lưu nhiều hơn và fill với dữ liệu đưa vào.

*/
// Buffer.from()
// Buffer.concat()



for(let i=0;i<bufferUnsage.length;i++) {
    if (bufferUnsage[i] !== 0) {
        console.log(
            `Element at position ${i} has value: ${bufferUnsage[i].toString(2)}`
        );
    }
}

