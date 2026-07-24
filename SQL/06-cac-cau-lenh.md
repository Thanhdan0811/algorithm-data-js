# Duplicate và update


```
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...)
ON DUPLICATE KEY UPDATE column1 = VALUES(column1), column2 = VALUES(column2), ...;

```

- INSERT INTO ... VALUES ...
Chèn dữ liệu vào bảng.

- ON DUPLICATE KEY UPDATE
Nếu xảy ra trùng lặp trên khóa chính (PRIMARY KEY) hoặc một cột có ràng buộc UNIQUE, thay vì báo lỗi, câu lệnh này sẽ cập nhật giá trị của các cột được chỉ định.

- VALUES(column_name)
Dùng để lấy giá trị từ phần INSERT (giá trị mà bạn định chèn vào).
Ví dụ: VALUES(type) sẽ lấy giá trị của cột type từ lệnh INSERT.