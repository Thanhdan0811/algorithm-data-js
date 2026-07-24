Nếu đi phỏng vấn, mình sẽ giải thích theo trình tự này. Vừa đúng bản chất, vừa không sa đà vào chi tiết implementation.

---

# 1. Vấn đề gốc: TypeScript type bị mất sau khi compile

Ví dụ:

```ts
@Injectable()
export class AppService {
  constructor(private readonly userRepo: UserRepository) {}
}
```

Trong TypeScript, constructor nhận `UserRepository`.

Nhưng sau khi compile sang JavaScript:

```js
class AppService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }
}
```

Thông tin `UserRepository` đã biến mất.

JavaScript runtime không biết tham số đầu tiên là gì.

---

# 2. Nhưng NestJS cần biết dependency là gì

NestJS có DI Container.

Khi tạo `AppService`, nó cần biết:

```txt
AppService cần gì?
→ UserRepository
```

để làm:

```ts
const repo = container.get(UserRepository);

const appService = new AppService(repo);
```

Nếu không biết constructor cần gì thì không thể inject.

---

# 3. TypeScript giải quyết bằng metadata

Trong `tsconfig.json`:

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

Khi compiler thấy class có decorator:

```ts
@Injectable()
export class AppService {
  constructor(private userRepo: UserRepository) {}
}
```

nó sẽ sinh thêm metadata.

JS output đại khái:

```js
AppService = __decorate(
  [Injectable(), __metadata("design:paramtypes", [UserRepository])],
  AppService,
);
```

---

# 4. Metadata thực chất là gì?

Nó là dữ liệu được gắn vào class.

Có thể hình dung:

```txt
AppService
 └── Metadata
      └── design:paramtypes
            [UserRepository]
```

Thông qua thư viện:

```ts
import "reflect-metadata";
```

metadata được lưu bằng:

```js
Reflect.defineMetadata("design:paramtypes", [UserRepository], AppService);
```

và đọc bằng:

```js
Reflect.getMetadata("design:paramtypes", AppService);
```

---

# 5. NestJS lấy dependency như thế nào?

Khi khởi động:

```ts
@Injectable()
export class AppService {
  constructor(private userRepo: UserRepository) {}
}
```

Nest thực hiện logic tương tự:

```js
const deps = Reflect.getMetadata("design:paramtypes", AppService);
```

Kết quả:

```js
[UserRepository];
```

Sau đó:

```js
const repo = container.get(UserRepository);

const service = new AppService(repo);
```

Đó là cách constructor injection hoạt động.

---

# 6. @Injectable() thực sự làm gì?

Đây là phần rất nhiều người trả lời chưa chính xác.

Nhiều người nói:

> "@Injectable đánh dấu class là injectable."

Điều này không sai, nhưng chưa đủ.

Điều quan trọng hơn:

> Sự hiện diện của decorator khiến TypeScript emit metadata (`design:paramtypes`) để NestJS có thể đọc dependency.

Ví dụ:

```ts
@Injectable()
export class AppService {
  constructor(private repo: UserRepository) {}
}
```

Compiler sinh:

```js
__metadata("design:paramtypes", [UserRepository]);
```

NestJS đọc metadata đó.

---

# 7. Nếu tắt emitDecoratorMetadata thì sao?

```json
{
  "emitDecoratorMetadata": false
}
```

Compiler không sinh:

```js
__metadata("design:paramtypes", [UserRepository]);
```

nữa.

NestJS đọc:

```js
Reflect.getMetadata("design:paramtypes", AppService);
```

sẽ nhận:

```js
undefined;
```

Nó không biết constructor cần gì.

Kết quả:

```txt
Nest can't resolve dependencies of AppService (?).
```

---

# 8. Tại sao @Inject() vẫn hoạt động?

Ví dụ:

```ts
@Injectable()
export class AppService {
  constructor(
    @Inject(UserRepository)
    private repo: UserRepository,
  ) {}
}
```

Ở đây Nest không cần suy luận từ:

```txt
design:paramtypes
```

nữa.

Nó đọc metadata do chính `@Inject()` tạo ra.

Nên vẫn hoạt động ngay cả khi không có type metadata.

---

# 9. Reflect là gì?

`Reflect` là object chuẩn của JavaScript.

Thư viện:

```ts
import "reflect-metadata";
```

mở rộng nó bằng:

```js
Reflect.defineMetadata(...)
Reflect.getMetadata(...)
```

Ví dụ:

```js
Reflect.defineMetadata("role", "admin", User);
```

Đọc lại:

```js
Reflect.getMetadata("role", User);
```

sẽ nhận:

```txt
admin
```

NestJS dùng cơ chế tương tự để lưu thông tin dependency.

---

# 10. Câu trả lời phỏng vấn ngắn gọn

Nếu interviewer hỏi:

> NestJS làm constructor injection như thế nào?

Bạn có thể trả lời:

> NestJS sử dụng Reflection và metadata. Khi bật `emitDecoratorMetadata`, TypeScript sẽ emit metadata về constructor parameter types vào runtime thông qua `reflect-metadata`. Ví dụ constructor nhận `UserRepository` sẽ được lưu dưới metadata `design:paramtypes`. Khi khởi động, NestJS đọc metadata này bằng `Reflect.getMetadata()`, xác định các dependency cần thiết, lấy instance tương ứng từ DI Container rồi inject vào constructor. Nếu tắt `emitDecoratorMetadata`, NestJS sẽ không tự suy luận được dependency từ type và thường phải dùng `@Inject()` để chỉ định token một cách tường minh.

Đây là câu trả lời mà hầu hết senior NestJS hoặc interviewer backend sẽ đánh giá là đúng bản chất.
