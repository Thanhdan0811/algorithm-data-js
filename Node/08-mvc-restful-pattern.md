- controller xử lý logic
- model xử lý database
- view nhận show cho ng dùng
- contorller -> model -> views



# RESTful API
- REST stands for REpresentational State Transfer, là quy ước một số quy tắc ràng buộc khi thiết kế hệ thống mạng.
- REST giúp client tương tác với server mà không cần biết cách hoạt động server ntn.
- REST có một số ràng buộc : 
    + Uniform Interface : Giao diện thống nhất.
    + Stateless : Không trạng thái.
    + Cacheable : Dữ liệu có thể lưu vào bộ nhớ cache
    + Client-Server : Máy Khách - Máy chủ
    + Layered System : Hệ Thống Phân Lớp.
    + Code on Demand : Code theo yêu cầu.


# API 
- API là cơ chế cho phép 2 thành phần phần mềm giao tiếp với nhau bằng 1 tập hợp các định nghĩa và giao thức.


# RESTful API
- RESTful API là một API chuẩn REST. 
- Sử dụng các phương thức HTTP : 
    + GET : đọc
    + PUT : cập nhật
    + DELETE: xóa
    + POST : tạo mới.

# Cung cấp tài nguyên hợp lí.
- Sử dụng id định danh cho URL thay vì dùng query-string. URL query-string sẽ dùng cho filter.
- /users/123 -> ok, /api?type=user&id=23 -> bad
- Thiết kế cho ng sử dụng , ko phải cho data của bạn.
- Giữ cho URL ngắn và dễ đọc nhất cho client.
- Sử dụng số nhiều trong url để có tính nhất quán : /customers/213213/orders/12321/lineitems/1

# Sử dụng các HTTP response code để xác định trạng thái api trả về.
- 200 OK : thành công.
- 201 CREATED : Tạo thành công (POST hoặc PUT)
- 204 NO CONTENT: Thành công nhưng không có gì trả về trong body, DELETE hoặc PUT
- 400 BAD REQUEST : Lỗi, có thể từ validate...
- 401 UNAUTHORIZED : Lỗi liên quan đén thiếu hoặc sai authentication token.
- 403 FORBIDDEN : Lỗi liên quan đến không có quyền truy cập.
- 404 NOT FOUND : Lỗi liên quan tài nguyên không tìm thấy.
- 405 MEHTOD NOT ALLOWED : Lõi liên quan method ko đc chấp nhận, 
- 500 INTERNAL SERVER ERROR : Lõi liên quan server bị lỗi.

# Sử dụng định dạng JSON hoặc XML để giao tiếp client-server.
- JSON là kiểu dữ liệu tiện dụng cho server và client giao tiếp với nhau.
- XML vẫn ok nhưng JSON phổ biến hơn.
