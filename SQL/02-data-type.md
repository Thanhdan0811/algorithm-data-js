# trong SQLite
- NULL - null value.
- INTEGER - signed integer stored 0,1,2,3,4,6 hoặc 8 bytes.
- REAL - floating point value stored dưới dạng 64 bíts. 
- TEXT - text string, UTF-8
- BLOB - (binary large object) , dùng cho images, audio , 
- BOOLEAN : true , false và được lưu dưới dạng 1, 0.

```
alter table posts 
  rename column author_id to poster_id;

alter table posts 
  add column is_edited BOOLEAN;

alter table posts
  drop column is_sponsored;

```

# NULL Values
- NULL diễn tả là missing ở cell.
- Dùng `constraint` để định nghĩa 1 field có là NULL hay không.

