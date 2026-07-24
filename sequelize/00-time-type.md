Trong MySQL, các kiểu dữ liệu `DATETIME`, `DATETIME(6)`, `DATE`, `TIME`, và `TIME(6)` được dùng để lưu trữ các thông tin về ngày, giờ hoặc cả hai. Sự khác biệt giữa chúng chủ yếu nằm ở mức độ chi tiết mà chúng hỗ trợ. Dưới đây là sự phân biệt rõ ràng kèm ví dụ:

---

### 1. **DATETIME**
- **Mô tả**: Lưu trữ ngày và giờ ở định dạng `YYYY-MM-DD HH:MM:SS`.
- **Độ chính xác**: Không hỗ trợ phần nghìn giây (microseconds).
- **Dung lượng lưu trữ**: 8 byte.

**Ví dụ**:
```sql
CREATE TABLE example (
    event_time DATETIME
);

INSERT INTO example (event_time) VALUES ('2024-11-24 14:30:45');

SELECT * FROM example;
```
**Kết quả**:
```
2024-11-24 14:30:45
```

---

### 2. **DATETIME(6)**
- **Mô tả**: Tương tự như `DATETIME` nhưng hỗ trợ thêm phần nghìn giây (microseconds).
- **Độ chính xác**: Hỗ trợ tối đa 6 chữ số sau dấu chấm cho giây (tương ứng microseconds).
- **Dung lượng lưu trữ**: Tối đa 8 byte + 3 byte (phần microseconds).

**Ví dụ**:
```sql
CREATE TABLE example (
    event_time DATETIME(6)
);

INSERT INTO example (event_time) VALUES ('2024-11-24 14:30:45.123456');

SELECT * FROM example;
```
**Kết quả**:
```
2024-11-24 14:30:45.123456
```

---

### 3. **DATE**
- **Mô tả**: Lưu trữ ngày (không có thông tin về giờ) ở định dạng `YYYY-MM-DD`.
- **Độ chính xác**: Chỉ bao gồm ngày.
- **Dung lượng lưu trữ**: 3 byte.

**Ví dụ**:
```sql
CREATE TABLE example (
    event_date DATE
);

INSERT INTO example (event_date) VALUES ('2024-11-24');

SELECT * FROM example;
```
**Kết quả**:
```
2024-11-24
```

---

### 4. **TIME**
- **Mô tả**: Lưu trữ giờ (không có thông tin ngày) ở định dạng `HH:MM:SS`.
- **Độ chính xác**: Không hỗ trợ phần nghìn giây (microseconds).
- **Dung lượng lưu trữ**: 3 byte.

**Ví dụ**:
```sql
CREATE TABLE example (
    event_duration TIME
);

INSERT INTO example (event_duration) VALUES ('14:30:45');

SELECT * FROM example;
```
**Kết quả**:
```
14:30:45
```

---

### 5. **TIME(6)**
- **Mô tả**: Tương tự như `TIME` nhưng hỗ trợ thêm phần nghìn giây (microseconds).
- **Độ chính xác**: Hỗ trợ tối đa 6 chữ số sau dấu chấm cho giây.
- **Dung lượng lưu trữ**: Tối đa 3 byte + 3 byte (phần microseconds).

**Ví dụ**:
```sql
CREATE TABLE example (
    event_duration TIME(6)
);

INSERT INTO example (event_duration) VALUES ('14:30:45.123456');

SELECT * FROM example;
```
**Kết quả**:
```
14:30:45.123456
```

---

### **So sánh nhanh**

| Kiểu dữ liệu   | Định dạng                      | Bao gồm          | Hỗ trợ microseconds | Dung lượng |
|----------------|--------------------------------|------------------|----------------------|------------|
| `DATETIME`     | `YYYY-MM-DD HH:MM:SS`         | Ngày và giờ      | Không               | 8 byte     |
| `DATETIME(6)`  | `YYYY-MM-DD HH:MM:SS.ffffff`  | Ngày và giờ      | Có                  | 8+3 byte   |
| `DATE`         | `YYYY-MM-DD`                  | Chỉ ngày         | Không               | 3 byte     |
| `TIME`         | `HH:MM:SS`                    | Chỉ giờ          | Không               | 3 byte     |
| `TIME(6)`      | `HH:MM:SS.ffffff`             | Chỉ giờ          | Có                  | 3+3 byte   |

---

Nếu bạn cần sử dụng microseconds (độ chính xác cao), hãy chọn `DATETIME(6)` hoặc `TIME(6)`. Ngược lại, nếu không cần chi tiết này, các kiểu cơ bản như `DATETIME` hoặc `TIME` là đủ.