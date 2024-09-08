- npm i mongoose 

# import file json vào mongodb.

`mongoimport --db courses --collection courses --file data.json --jsonArray`;



# Query with mongoose
- `find()` : lấy tất cả documents.
- `limit(number)` : giới hạn số lượng trả về.
- `select({name: 1, author: 1} | "name author")` : chỉ lấy field nhất định.

```
Course.find()
.limit(2)
// .select({name: 1, author: 1})
.select("name author")
.then(courses => {
    console.log("courses: ", courses);
})

```

# So sánh.

- `eq` : equal.
- `ne` : not equal.
- `gt` : greater than.
- `gte` : greather than or equal.
- `lt` : less than.
- `lte` : less than or equal.
- `in` : in.
- `nin` : not in.

```
Course.find({price: {$gt: 10, $lt: 20}})
.select("name author price")
.then(courses => {
    console.log("courses: ", courses);
})

==============
// in ra 10, 15, 20
Course.find({price: {$in: [10, 15, 20]}})
.select("name author price")
.then(courses => {
    console.log("courses: ", courses);
})
```

# and và or
- `.and([{}, {}])` : ghi các điều kiện cho and.
- `.or([{}, {}])` : ghi các điều kiện cho and.

```
Course.find()
.and([{author: "Mosh"}, {isPublished: true}])
.select("name author price isPublished")
.then(courses => {
    console.log("courses: ", courses);
})

```

# Regular expression.
- có thể áp dụng regular expression

```
Course.find({name: /^node/i})
.select("name author price isPublished")
.then(courses => {
    console.log("courses: ", courses);
})

```

# countDocuments và Limit, skip.

```
// api/courses?pageNumber=2&pageSize=3
// const pageNumber = 2
// const pageSize = 3
// kết hợp skip và limit để phân trang.

Course.find()
.select("name author price isPublished")
// .countDocuments()
.skip((pageNumber - 1) * pageSize)
.limit(pageSize)
.then(courses => {
    console.log("courses: ", courses);
})

```

# FindById và findOne
- Chú ý : findById nếu truyền vào là string của object ID thì bên schema phải bỏ trường _id: String đi.
- Nếu truyền vào là string ID thì bên schema phải có field : _id: String.

```
// Course.findById("66b822d9288ce9d48ce8fbec")
// findOne trả về object đầu tiên thỏa điều kiện, find trả về array tất cả object thỏa điều kiện.
Course.findOne({author: "Mosh"})
.select("name author price isPublished")
.then(courses => {
    console.log("courses: ", courses);
})
```

# Update documents.


- Dùng findById r update nó.
```
Course.findById("66b822d9288ce9d48ce8fbec")
.select("name author price isPublished")
.then(course => {
    console.log("courses: ", course);
    course.author = "Dan new";
    course.name = "PHP Course"

    course.save()
        .then((c) => console.log("save update", c))
        .catch(err => console.log("update err", err))
})
```

- Dùng `findByIdAndUpdate()`
```
Course.findByIdAndUpdate("66b822d9288ce9d48ce8fbec", {$set: {name: "Dan use find by id and update",  price: 40}})
.then((res) => console.log(res))
```

- Dùng `updateOne`
```
Course.updateOne({_id: "66b822d9288ce9d48ce8fbec"}, {$set: {name: "Dan use updateOne",  price: 16}})
.then((res) => console.log(res))    
```

- Dùng `updateMany`
- xóa field isPublished trong tất cả documents
```
Course.updateMany({}, {$unset: {isPublished: 1}})
.then((res) => console.log(res))
```

# Delete Documents.

- Dùng `deleteOne`
```
Course.deleteOne({author: "Mosh"})
.then((res) => console.log(res))
```


- Dùng `deleteMany`
```
Course.deleteMany({author: "Mosh"})
.then((res) => console.log(res))
```

- Dùng `findByIdAndDelete`
```
Course.findByIdAndDelete("66b822d9288ce9d48ce8fbef")
.then((res) => console.log(res))
```

- Dùng `findOneAndDelete`