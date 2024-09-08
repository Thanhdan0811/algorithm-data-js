MySQL cung cấp một số kiểu dữ liệu thời gian để lưu trữ ngày, giờ, và cả ngày giờ kết hợp. Dưới đây là các kiểu dữ liệu thời gian chính trong MySQL và giải thích về từng loại:

### 1. `DATE`
- **Mô tả**: Lưu trữ ngày mà không có thời gian.
- **Định dạng**: `'YYYY-MM-DD'` (ví dụ: `'2024-09-02'`).
- **Phạm vi**: Từ `'1000-01-01'` đến `'9999-12-31'`.

### 2. `TIME`
- **Mô tả**: Lưu trữ khoảng thời gian hoặc thời gian trong ngày.
- **Định dạng**: `'HH:MM:SS'` (ví dụ: `'13:45:30'`).
- **Phạm vi**: Từ `'-838:59:59'` đến `'838:59:59'`.

### 3. `DATETIME`
- **Mô tả**: Lưu trữ cả ngày và giờ.
- **Định dạng**: `'YYYY-MM-DD HH:MM:SS'` (ví dụ: `'2024-09-02 13:45:30'`).
- **Phạm vi**: Từ `'1000-01-01 00:00:00'` đến `'9999-12-31 23:59:59'`.
- **Lưu ý**: `DATETIME` không phụ thuộc vào múi giờ của hệ thống.

### 4. `TIMESTAMP`
- **Mô tả**: Lưu trữ ngày giờ với thông tin múi giờ và thường dùng để ghi lại thời điểm xảy ra sự kiện.
- **Định dạng**: `'YYYY-MM-DD HH:MM:SS'` (ví dụ: `'2024-09-02 13:45:30'`).
- **Phạm vi**: Từ `'1970-01-01 00:00:01' UTC` đến `'2038-01-19 03:14:07' UTC`.
- **Lưu ý**: `TIMESTAMP` thay đổi dựa trên múi giờ của hệ thống và có thể tự động cập nhật khi dùng với `CURRENT_TIMESTAMP` và `ON UPDATE CURRENT_TIMESTAMP`.

### 5. `YEAR`
- **Mô tả**: Lưu trữ năm.
- **Định dạng**: `'YYYY'` (ví dụ: `'2024'`).
- **Phạm vi**: Từ `1901` đến `2155`, hoặc `0000`.

### 6. `DATE/TIME` với `Fractional Seconds` (MySQL 5.6.4+)
- **Mô tả**: Có thể lưu trữ thêm phần giây với độ chính xác cao (microseconds).
- **Các loại**: `TIME(fsp)`, `DATETIME(fsp)`, `TIMESTAMP(fsp)`.
- **Ví dụ**: `'2024-09-02 13:45:30.123456'` (với 6 chữ số cho phần giây).
- **fsp**: Fractional Seconds Precision (từ 0 đến 6).

### Ví dụ sử dụng

- **Tạo bảng với các cột thời gian**:

    ```sql
    CREATE TABLE events (
        id INT PRIMARY KEY AUTO_INCREMENT,
        event_date DATE,
        event_time TIME,
        event_datetime DATETIME,
        event_timestamp TIMESTAMP,
        event_year YEAR
    );
    ```

- **Chèn dữ liệu vào bảng**:

    ```sql
    INSERT INTO events (event_date, event_time, event_datetime, event_timestamp, event_year)
    VALUES ('2024-09-02', '13:45:30', '2024-09-02 13:45:30', CURRENT_TIMESTAMP, 2024);
    ```

### Tổng kết

- **`DATE`**: Dùng để lưu ngày mà không cần thời gian.
- **`TIME`**: Dùng để lưu thời gian trong ngày hoặc khoảng thời gian.
- **`DATETIME`**: Dùng để lưu cả ngày và giờ, không phụ thuộc vào múi giờ.
- **`TIMESTAMP`**: Dùng để lưu cả ngày và giờ với múi giờ, thường dùng để ghi nhận thời gian sự kiện.
- **`YEAR`**: Dùng để lưu năm.

Các kiểu dữ liệu này giúp quản lý và thao tác với thời gian trong MySQL hiệu quả, phù hợp với các nhu cầu lưu trữ và xử lý khác nhau.