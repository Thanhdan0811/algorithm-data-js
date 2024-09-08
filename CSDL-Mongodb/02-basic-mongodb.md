# Mongodb là gì 
- Là 1 hệ quản trị csdl NoSQL.
- Ra đời 2007, MongoDB dùng document theo dạng BJSON. Ứng dụng có thể lấy data theo dạng JSON.

# Thuật ngữ trong Mongodb.
- Cấp độ cao nhất là Organizations.
- 1 Organizations có thể có nhiều project.
- 1 Project có thể có nhiều cluster.
- 1 cluster có thể có nhiều db.
- Trong mỗi db ta lại có các collection
- Mỗi collection lại có nhiều document.

- CLuster có thể hiểu như là 1 server vps, dùng để cài đặt mongodb. Từ đó chúng ta có thể tạo thêm nhiều db trên server đó.
- Collection tương đương với bảng bên SQL.


# Kết nối Mongodb 
- dùng mongo compass
- dùng mongo sh (terminal)
- Dùng extension MongoDB cho VS Code.
- Dùng Mongo driver (SDK tích hợp vào code, dùng npm cài)

# MongoDB CRUD Operations.
- Create Operations 
- Read Operations 
- Update Operations
- Delete Operations

- muốn trả về là số 1, không muốn trả về là số 0. 
- Project trả về field nào không trả về field nào : {"age": 0}
- filter : {age: {$gt: 20}} , lớn hơn 20 tuổi (gt = greater than)

# Mongosh trong mongodb compasss.
- ``` use db-name ``` : use node-basic => đi vào db
- create document in collection : ``` db.colection.insertOne(document) ``` : db.comments.insertOne({"content" : "hello"})
- insertMany :  db.comments.insertMany([{"content" : "hello"}, {"content": "phim này hay vl"}])

- Tìm kiếm document : Dùng find hoặc findOne. 
- db.comments.findOne({"view": 100})
- db.comments.findOne({"content": "hello"})
- db.comments.find({"content": "hello"})

- filter : 
- db.comments.findOne({"view": {$gt: 100}});

- update operations : 
- db.comments.updateOne({_id: ObjectId("664b04a5fe8b6cb60c70d418")}, {$set: {"content" : "Hi update content."}})
- db.comments.updateOne({_id: ObjectId("664b04a5fe8b6cb60c70d411")}, {$set: {"content" : "Hi update content."}}, {upsert: true})
- upsert nếu ko tồn tại thì tạo document cho nó.

- delete operations :
- db.comments.deleteOne({_id: ObjectId("664b04a5fe8b6cb60c70d418")})
