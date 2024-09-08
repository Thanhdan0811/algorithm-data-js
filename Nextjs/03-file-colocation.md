- bắt buộc phải có page.tsx và trong file phải export default về react componnet.
- ta có thể tạo folder component cùng cấp với app để lưu các components.

# Private Folders
- A private folder diễn tả 1 private implementation detail và không được xem set là 1 routing system.
- Nghĩa là folder và sub-folders của nó sẽ bị loại ra khỏi routing.
- Để tạo private folder ta thêm vào đầu tên folder là : _name-folder


# Route Groups
- Cho phép ta group routes và project files mà không ảnh hưởng URL path structure.
- Ví dụ thực thi authentication routes : Register, Login, Forgot Password.
- Khi ta đổi tên folder thành : (auth) thì path sẽ là : localhost:3000/register thay vì localhost:3000/auth/register
- Giúp cho việc nhóm group dễ dàng hơn.
