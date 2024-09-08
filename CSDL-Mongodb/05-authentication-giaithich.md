# authentication và authorization
- Authentication là quá trình xác thực người dùng

- Nếu cho phép người dùng truy cập vào tài nguyên nhất định thì sẽ dùng authorization.
- Authorization là quá trình xác định người dùng có quyền truy cập vào tài nguyên nào.
- Authorization có cấp độ cao hơn của Authentication, xác thực người dùng trước rồi mới xác định người dùng có quyền truy cập vào tài nguyên nào.


# Luồng hoạt động của authentication 
- Bước 1 : Client sẽ gửi 1 request lên server chứa thông tin định danh client là ai, cài này có thể là username/password, một đoạn mã nào đấy hoặc là token, một số thông tin khác.
- Bước 2 : Server sẽ kiểm tra thông tin định danh của client với thông tin trong database. Nếu thonog tin định danh đúng, server sẽ trả về 1 dấu hiệu gì đó để client biết là đăng nhập thành công.
- Bước 3 : Client sẽ lưu lại dấu hiệu này, và gửi dấu hiệu này lên server mội khi client muốn truy cập vào các tài nguyên của server.
- Bước 4 : Server sẽ kiểm tra dấu hiệu, nếu hợp lệ, server sẽ trả về tài nguyên cần thiết.

# Basic Authentication
- Server kiểm tra `Authorization` trong HTTP header. Nếu `Authorization` không hợp lệ, server sẽ trả về 1 response với `WWW-Authenticate` nằm trong header. website sẽ hiện popup yêu cầu bạn nhập username/password.
- Nhập username/password, nhấn OK , trình duyệt sẽ mã hóa username/password thành chuỗi base64 theo quy tắc `username:password` và gửi lên HTTP header `Authorization`.
- Server kiểm tra và giải mã `Authorization` trong HTTP header. Nếu hợp lệ, server sẽ trả về thông tin website, nếu không hợp lệ thì server sẽ trả về popup yêu cầu nhập lại.

```
const express = require('express')
const app = express()
const port = 3000

// Hàm xác thực Basic Authentication
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  console.log(authHeader) // Basic dXNlcm5hbWU6cGFzc3dvcmQ=

  if (authHeader) {
    // Giải mã chuỗi base64
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const username = auth[0]
    const password = auth[1]

    if (username === 'username' && password === 'password') {
      return next()
    }
  }

  // WWW-Authenticate sẽ giúp trình duyệt hiển thị popup đăng nhập
  // Ở đây, Basic chỉ ra rằng máy chủ yêu cầu xác thực Basic Authentication.
  // realm (optional) là một thuộc tính tùy chọn mô tả phạm vi bảo mật của tài nguyên được yêu cầu.
  // Giá trị cái realm này chỉ để mô tả thôi, không có cũng được
  res.setHeader('WWW-Authenticate', 'Basic realm="example"')
  res.status(401).send('Authentication required')
}

// Sử dụng hàm xác thực cho tất cả các route
app.use(authenticate)

// Route chào mừng
app.get('/', (req, res) => {
  res.send('Chào mừng bạn đến với ứng dụng Node.js sử dụng Basic Authentication!')
})

// Khởi chạy máy chủ
app.listen(port, () => {
  console.log(`Máy chủ đang chạy tại http://localhost:${port}`)
})


```

__Ưu Điểm__ : đơn giản, có thể triển khai trên Nginx hoặc Apache, ko cần can thiệp code BE.

__Nhược điểm__ : 
    + Không an toàn, vì username/password được mã hóa base64, có thể bị tấn công bằng bắt request , (Man-in-the-middle), cần dùng HTTPS mã hóa giữa client và server.
    + Thiếu tính linh hoạt: không hỗ trợ nhiều cấp độ xác thực.
    + Không thể logout khỏi websist, cần tắt trình duyệt.
    + Không thể dùng cho các ứng dụng mobile.


# Cookie là gì ?
- Cookie là 1 file nhỏ được lưu trên thiết bị user. Coookie thường được dùng để lưu thông tin về người dùng website như : tên, địa chỉ, giỏ hàng...
- Cookie được ghi và đọc theo domain.
- Ví dụ khi request đến web google , thì server google trả về cookie thì trình duyệt sẽ lưu cookie cho domain google
- Sau đó khi gửi request đến google, trình duyệt sẽ tìm kiếm cookie của google và gửi lên server.

- Một website có thể lưu nhiều cookie khác nhau, ví dụ profile, cart, history....
- Bộ nhớ cookie có giới hạn, 1 website thường chỉ nên lưu 50 cookie, ko vượt quá 4KB.

- Cookie được lưu trong 1 file file này đc lưu trên ổ cứng,
    + Mac google chrome : `/Users/<username>/Library/Application Support/Google/Chrome/Default/Cookies`;

- Cách ghi dữ liệu lên cookie của trình duyệt.
    + khi gửi request và nhận response, server set cookie => return về `Set-Cookie` in response.
    + Có thể dùng JS để set coookie thông qua `document.cookie`
    + Mở devtool lên và set cookie lên máy tính của bạn.


- Cách đọc cookie :
    + khi vào 1 url thì trình duyệt __tự động__ gửi cookie lên server,
    + let x = document.cookie
    + NOTE : nếu cookie được set HttpOnly thì ko đọc đc bằng js.

- Demo: 
```
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

// Sử dụng cookie-parser để đọc cookie dễ dàng hơn thông qua req.cookies
app.use(cookieParser())

// Tạo cookie mới
app.get('/set-cookie', (req, res) => {
  // Điều này tương tự như res.setHeader('Set-Cookie', 'username=John Doe; Max-Age=3600')
  res.cookie('username', 'John Doe', { maxAge: 3600 * 1000 })
  res.send('Cookie đã được tạo')
})

// Đọc cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username
  res.send(`Cookie "username" có giá trị là: ${username}`)
})

// Trang chủ
app.get('/', (req, res) => {
  res.send('Xin chào! Hãy tạo hoặc đọc cookie bằng cách truy cập /set-cookie hoặc /get-cookie')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})


```

# 1 số lưu ý về cookie
- HttpOnly : khi set `HttpOnly` cho 1 cookie thì cookie ko đọc đc bằng JS, tránh đc __tấn công XSS__.

```
// Thiết lập cookie với httponly
res.cookie('cookieName', 'cookieValue', { httpOnly: true })


```

- Secure : Khi set Secure cho cookie thì cookie chỉ đc gửi lên server khi trang web đc truy cập bằng HTTPS, tránh tấn công __MITM (Man in the middle attack)__
```
res.cookie('cookieName', 'cookieValue', { secure: true })

```

- Tấn công CSRF
- Cách 1 : `SameSite=Strict` cho cookie
```
res.cookie('username', 'John Doe', {
  maxAge: 3600 * 1000,
  httpOnly: true,
  sameSite: true // Thêm thuộc tính SameSite=Strict cho cookie
})

```

