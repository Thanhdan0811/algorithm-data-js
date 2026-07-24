- Quản lý tài nguyên khi được truy cập đồng thời.
- Để có thể khôi phục dữ liệu khi lỗi.
- Giải thuật : DB được lưu trên đĩa hay OS, 
- Khi chỉnh data thì data từ OS được đưa lên memory, khi thay đổi value từ 10 thành 11 thì sẽ được ghi vào bộ nhớ như log buffer (DDl, DML)
- bảng log là được ghi tuần tự. 
- Ví dụ tại 1 thời điểm có 2 yêu cầu 10 -> 11 và 10 -> 12 thì lock sẽ đảm bảo tại 1 thời điểm chỉ có 1 được thực hiện.
- WAL : write ahead logs.
- rolling forward đi theo tuần tự của logs.
- Undo hay rollback : khi chưa được commit thì sẽ rollback lại trước đó.


1. ghi vào  write-ahead log : ghi log 1 cách tuần tự.
2. apply log : khoi phục dữ liệu đến trạng thái cuối cùng.
3. undo : sử dụng thông tin để rollback các dữ liệu chưa commit.


- DB có thể tách 2 dạng là dữ liệu và không phải là dữ liệu.
- Dự liệu : Row, Table, Page/Block, Database. tức là lock có thể ở cả row, table, page, database.
- index cũng là dữ liệu.