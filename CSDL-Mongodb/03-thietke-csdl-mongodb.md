- Khi thiết kế Schema cho MongoDB , ta có 2 lựa chọn là Embedding hay Referencing (còn gọi là nhúng và tham chiếu.)

- Nhúng là đưa hết data vào trong document, 
- Ưu điểm : 
    + Bạn có thể truy xuất tất cả thông tin liên quan trong một query.
    + Tránh việc join hoặc lookup trong ứng dụng.
    + Update các thông tin liên quan trong một query duy nhất.

- Nhược điểm : 
    + Khi document lớn lên sẽ gây gánh nặng cho các trường ko liên quan. Có thể khắc phục bằng cách hạn chế kích thước của các document mà bạn gửi qua cho mỗi truy vấn.
    + Giới hạn cho document là 16MB trong MongoDB. đây là giới hạn nếu có quá nhiều dữ liệu đc nhúng vào document.
    

- Tham chiếu : là lưu trữ data trong một document thuộc collection riêng biệt và tham chiếu đến nó thông qua việc sử dụng khóa ngoại và toán tử $lookup (tương tự JOIN trong SQL)

- Ưu điểm : 
    + Sẽ có các document nhỏ hơn.
    + Những dữ liệu không cần thiết sẽ không được đính kèm vào các truy vấn.
    + Giảm lượng dữ liệu trùng lặp

- Hạn chế : 
    + Để truy xuất được hết data, chúng ta cần tối thiểu 2 qurey hoặc dùng $loopkup


# Các quan hệ.
- Quan hệ 1-1 (One-to-One)
    + 1 người dùng chỉ có 1 email duy nhất và ngược lại.
    + Có thể mô hình hóa quan hệ 1-1 bằng cặp key-value trong database.
    + {"name": "dan ng", "email": "danng0811@gmail.com"}

- Quan hệ 1 - it (One-to-Few)
    + Một người dùng có 1 vài địa chỉ nhận hàng.
    + Ta có thể nhúng array bên trong object.

- Quan hệ 1 - nhiều (One to Many)
    + Ví dụ như 1 chiếc xe đạp có nhiều item khác nhau.
    + Khi vừa vào trang chi tiết sản phẩm , show ra thông tin sơ bộ của sp đó.
    + {"name": "xe đạp loại A", "parts": ["ObjectID('AAAA')", "ObjectID('BBBB')"]}
    + {"_id": "ObjectID('AAAA')", "name": "yên xe đạp"}
    + Chỉ hiển thị thông tin sơ bộ của sp, khi nào cần chi tiết thì hiển thị rõ hơn.

    + Khi có 1 ứng dụng ghi log server. Mỗi máy chủ có thể lưu hàng tỷ message 
    + Cho dù có dùng array objectID thì vẫn có thể vượt mức 16 MB.
    + Ta có thể lưu ngược lại là mỗi log message sẽ lưu trữ 1 host mà nó thuộc về.
    + host : {"_id": "ObjectID("AABB")", "name": "server.com", "ipaddr": "127.123.123.1"}
    + Log message : {"time": 12-12-123023, "host": ObjectID("AABB"), "mess" : "error"} => lưu id của host, thay vì ngược lại , host lưu nhiều id của log.

# Các nguyên tắc 
- Ưu tiên nhúng trừ khi chúng ta có 1 lý do thuyết phục.
- Khi cần truy cập vào một đối tượng riêng biệt, đây là lúc không dùng nhúng.
- Tránh joins/lookups nếu có thể, nhưng nếu giúp shema tốt thì ok.
- Array không nên để phát triển không giới hạn. Nếu có hơn vài trăm document ở phía "nhiều" thì đừng nhúng chúng; Nếu có hơn vài ngàn document ở phía "nhiều" thì đừng sử dụng array ObjectID tham chiếu. Mảng với số lượng lớn item là lý do không nên dùng nhúng.
- Với MongoDB, cách mà bạn mô hình hóa dữ liệu phụ thuộc vào cách bạn sử dụng dữ liệu. 

# Quan hệ nhiều nhiều (Many-to-Many)
- Kiểu hay gặp trong thực tế. Ví dụ build toto list, 1 user có nhiều task và 1 task có thể có nhiều user được assign vào.
```
<!-- users -->
{
    "_id": ObjectID("AAF1"),
    "name": "Kate Monster",
    "tasks": [ObjectID("ADF9), ObjectID("AE02), ObjectID("AE73)]
}

<!-- task -->
{
    "_id": ObjectID("ADF9"),
    "description": "Write blog post about MongoDB schema design",
    "due_date": ISODate("2014-04-01"),
    "owners": [ObjectID("AAF1), ObjectID("BB3G")]
}

```
- MỖi user có 1 sub array các ObjectID task và mỗi task cũng có 1 sub array các ObjectID owners.

# Recap
- 1 -1 : Ưu tiên key value
- 1 - ít : Ưu tiên nhúng.
- 1 - nhiều : Ưu tiên tham chiếu.
- 1 - rất nhiều : Ưu tiên tham chiếu.
- Nhiều - Nhiều : Ưu tiên tham chiếu.


#  Lưu ý khi thiết kế schema twitter theo MongoDB.
- Tên collection nên được đặt theo số nhiều, kểu snake_case.
- Tên field nên được đặt theo dạng snake_case : email_verify_token.
- _id là trường được MongoDB tự động tạo ra, không cần phải thêm trường _id vào. 
- Trường __created_at__, __updated_at__ có kiểu 'Date' để dễ dàng sắp xếp theo thời gian.
- Trường __created_at__ nên luôn được thêm vào khi tạo mới document.
- Trường __updated_at__ thì là optional
- Tất cả trường đại diện id của document thì nên có kiểu : ObjectId.
- Để biết kiểu dữ liệu mà mongo hỗ trợ xem tại : https://docs.mongodb.com/manual/reference/bson-types/
