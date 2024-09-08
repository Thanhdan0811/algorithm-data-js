- read eval print and loop

# process.argv 
- trả về array chứa các command-line arguments được truyền vào khi Node.js process đc chạy.
- first element sẽ là process.execPath 
- second element sẽ là path của JS file đc thực thi. 
- Các arguments còn lại sẽ là các command-line tiếp theo.

```
// hello.js
const mission = process.argv[2]

// mở terminal 
node hello.js explore

// lúc này mission sẽ có value là explore, argv[0] sẽ là path của process, argv[1] sẽ là path hello.js

```

# Event loop
- chạy trong libuv
- Event loop là 1 piece of code trong libuv để xử lý events async.
- Handle async code liên quan đến async callback functions.
- Node tự động vào loop thực thi code và thoát 1 cách tự động khi không còn function.
- Các async như setTimeout, setInteval, file system để read file.

- setTImeout(callBackOne, 1000); => sau 1s thì callback được đưa vào callBackQueue (FIFO), 

```
while(!shouldExit) {
    processEvents();
}

```

- event loop sẽ làm gì với queue của callbacks ? 
- Thực chất có các queues khác nhau. Mỗi queue sẽ handles các pharse khác nhau của event loop.
- Mỗi phases sẽ chịu trách nhiệm cho các operations khác nhau. 
- Có 4 phases chính : Timers, I/O callbacks (system file), setImmediate, Close callbacks.

- Có 3 loại Timer : setTimeout, setInterval, setImmediate (callback đc truyền vào sẽ được executed càng sớm càng tốt trong events loop).

- Events loop flow : 
+ Lần đầu event loop thực thi ở lần iteration đầu tiên, phase đầu tiên sẽ đc xử lý, là Timers

+ Sau đó là I/O Callbacks : network, file 
(This is the majority of all your callbacks in a real life node application)

+ Sau đó là SetImmediate: nó vẫn chạy sau Timers và I/O

+ Close callbacks : đây là phase khi ta close 1 file hoặc networkd connection và ta có callback để xử lý.

+ Sau đó, lại bắt đầu 1 second iteration check lại các phases.

- process là 1 instance của EventEmiiter.


# Observer pattern.

- 
- EventEmmiter : để tạo event.
- Dùng callback để gửi notify đến observer.

```
const EventEmitter = require('events')

```




