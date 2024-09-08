- JWT : JSON Web Token (JWT)
- btoa() : mã hóa base54
- atob() : dịch mã base64
- token thường có 3 phần ngăn nhau là dấu . : Header, Payload, Signature.
- signature dùng hàm : HMACSHA256()

# install
- npm i jsonwebtoken
- npm i --save @types/jsonwebtoken


# hash password


```
import { createHash } from 'node:crypto'

const sha256 = (content) => {
    return createHash('sha256').update(content).digest('hex')
}

```