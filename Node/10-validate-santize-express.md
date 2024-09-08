# Register 
- nhập email/password
- api users/register
- validate định dạng email/password
- Kiểm tra email có chưa
- Hash password (mã hóa 1 chiều), thêm user với hashpassword vào db user. 
- Sign access_token và refresh_token
- Lưu refresh_token vào DB refresh_tokens
- Gửi email xác thực về cho ng dùng.
- Trả về access_token, refresh_token. status ng dùng là unverified.


# Login
- 

# Logout

# Validator.
- Dùng __express-validator__ : npm i express-validator
- __express-validator__ sử dụng bên trong là thư viện `validator.js`, có thể đọc thêm ở đây
- express-validator validators sẽ ko report validation errors đến users 1 cách tự động.
- Việc trả về lỗi sẽ do ta customs.

# Santizing Inputs
- Khi truyền bằng query có thể sẽ bị truyền code html hay script , bị tấn công XXS
- trong __express-validator__ dùng __escape()__ để transform các ký tự đặc biệt của HTML thành dạng text.

- matchedData() : tự động collects tất cả data `đã được express-validator validated và sannitized.`
- Nếu ko đc qua express-validators thì sẽ ko lấy ra từ data đc.



```
const express = require('express');
const { query, validationResult, matchedData } = require('express-validator');

const app = express()

app.use(express.json())

// localhost:3001/hello?person="Dan"
app.get('/hello',query('person').notEmpty().withMessage('person query khong dc empty').escape() ,(req, res) => {
    console.log(req.query);
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        const data = matchedData(req);
        console.log(data);
        return res.send(`Hello, ${req.query.person}`);
    }

    return res.status(400).json({errors: errors.array()})
})

app.listen(3001, () => {
    console.log("App server starting....!!!");
}) 


```

# Schema validation
- 


# Error handling.
- request handling có 3 tham số.
- error handling có 4 tham số : err, req, res, next

- gọi `next()` để chuyển đến request handler tiếp theo.
- gọi `next(err)` để chuyển đến error handling tiếp theo.

- Khi xảy ra lỗi trong synchronous handler thì sẽ tự động chuyển đến error handler.
- khi xảy ra lỗi trong asynchronous handler thì sẽ phải gọi `next(err)`


# Thống nhất lỗi.
- Nên thống nhất lỗi trả về cho ng dùng.

- Lỗi thường :
```
{
    message: string
    error_info?: any
}

```

- Lỗi validation (422) :
```
{ 
    message: string,
    errors: {
        [field: string] : {
            msg: string
            location: string
            value: any
        }
    }
}

```