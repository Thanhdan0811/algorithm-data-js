


```
require('./request');
// node sẽ tự động tìm extension dưới đây, nên lúc require không cần thêm đuôi entensions.
require.extensions
=> '.js': [Function (anonymous)]
    '.json': [Function (anonymous)]
    '.node': [Function (anonymous)]

```

# CommonJS (2009) and ECMAScript Modules
- CommonJS là kiểu module.exports = {...}
- ECMAScript 2015 : import/export.
- Để dùng ECMAScript module cần set "type": "module" trong file package.json hoặc đổi thành .mjs extension.
- Khi dùng import cần ghi rõ extension .js hay .mjs

- module.exports sẽ cache module đc import khi đc import ở nhiều nơi.

```
require.cache để xem cache trong nodejs.


```


# file index.js
- là 1 file đặc biệt với node, Cho phép xem 1 folder như là 1 module.

```
// folder internals/index.js
module.exports = {
    // send: request.send
    // ...require('./request')
    request: require('./request'),
}

//
const internals = require('./internals');


```

# axios

```
const axios = require('axios');

axios.get('https://www.google.com')
    .then((res) => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })

```


# QUnar lý version 

^4.16.0 : nhận các version 4.16 - 4.17. upload tất cả bản minor/patch trong tương lai.
~4.16.0 : chỉ nhận các version 4.16, update tất cả bản patch trong tương lai.

- https://semver.npmjs.com/


- Semantic version : Cách đặt tên cho version.
- `MAJOR.MINOR.PATCH`
- Major : thay đổi lớn về api
- Minor : Thêm chức năng tương thích ngc với phiên bản trước.
- Patch : bản vá lỗi.