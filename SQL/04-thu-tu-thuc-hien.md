- Thứ tự truy vấn SQL : 
1.  FROM : Xác định table.
2.  WHERE : Lọc các hàng dữ liệu theo các điều kiện xác định.
3.  GROUP BY : Nhóm các hàng đã lọc theo 1 hoặc nhiều cột.
4.  HAVING : Lọc các nhóm đã được tạo ra bởi `GROUP BY` dựa trên điều kiện xác định.
5.  DISTINCT : loại bỏ trùng lặp
6.  SELECT : Chọn các cột hoặc tính toán dựa trên các hàng dữ liệu đã được nhóm và lọc.
7.  ORDER BY : Sắp xếp kết quả 
8.  LIMIT : Giới hạn số lượng kết quả trả về.

- Truncate không thể rollback.


- Tạo database

```Create, Update, delete database

CREATE DATABASE db_name
    [[DEFAULT] CHARACTER SET charset_name]
    [[DEFAULT] COLLATE SET collation_name]


// Thay đổi
ALTER DATABASE db_name
    [[DEFAULT] CHARACTER SET charset_name]
    [[DEFAULT] COLLATE SET collation_name]

// xóa
DROP DATABASE database_name;

```

- collate định nghĩa các rule về data đc sắp xếp hay so sánh ntn, có phân biệt hoa thường ko.
- Charset là bảng mã, tập hợp các ký tự.



# Sơ đồ quan hệ ERD (Entity Relationship diagram).
- Quy trình thiết kế DB :
    + Requirements analysis : xác định và viết chính xác csdl cần thiết để lm gì, dữ liệu nào sẽ đc lưu, các mục dữ liệu liên quan ntn.
    + Conceptual design : Chắt lọc các yêu cầu csdl thành mô tả chính thức về thiết kế cơ sở dữ liệu.
    + Logical design : Ánh xạ thiết kế cơ sở dữ liệu vào 1 hệ quản trị csdl thực tế và các bảng cơ sở dữ liệu.

- Khóa chính được gạch dưới.
- Thuộc tính có thể có nhiều dữ liệu thì sẽ bao bởi 2 hình ovan.

# Các quan hệ.
- Quan hệ 1 - nhiều : 1 khoa có thể có nhiều lớp học. 
- Quan hệ 1 - 1 : 1 trường thì chỉ có 1 hiệu trưởng, 1 ng chỉ có 1 cccd.
- QUan hệ nhiều - nhiều : 1 khóa học có thể có nhiều sinh viên , 1 sinh viên có thể tham gia nhiều khóa học.

- Entity thường là các danh từ, relationship sẽ thường là các động từ.
- Mối quan hệ được vẽ là 2 hình tam giác ghép lại.

- Thực thể trung gian : Thay thế các mối quan hệ nhiều nhiều.
- Chuyến bay có nhiều khách, khách sẽ có nhiều chuyến bay, relationship ở giữa là Books hay khách đặt máy bay, máy bay ddc khách đặt.
- Tách thành qhe 1 nhiều, nhiều 1.
    + Tạo thêm 1 thực thể booking : 