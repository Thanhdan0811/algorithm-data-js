- Tạo table : 

```
CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, is_manager BOOLEAN, salary INTEGER);
create table people (
  id INTEGER,
  handle TEXT,
  name TEXT,
  age INTEGER,
  balance INTEGER,
  is_admin BOOLEAN
);

```

- Edit table mà không làm thay đổi data.

```
alter table employees
rename to contractors;

alter table contractors
rename column salary to invoice;

// add or drop a column
alter table contractors
add column job_title TEXT

alter table contractors
drop column is_manager;


// Ví dụ
alter table people 
  rename to users;

alter table users
  rename COLUMN handle to username;

alter table users
  add COLUMN password TEXT;

```

# Database Migrations :
- Là 1 chuỗi các thay đổi đối với relational database.
- Nếu thêm column vào table thì thường sẽ không sao, do trước đó không dùng tới column mới thêm vào.
- Nếu bỏ đi 1 column thì sẽ là 1 vấn đề lớn.

- `An "up" migration is simply the set of changes you want to make, like altering/removing/adding/editing a table in some way. A "down" migration includes the changes that would revert any of the "up" migration's changes.`


- add column : 
    + Update DB 
    + Update Code

- delete column:
    + Update code , ko query tới nó nữa.
    + Update DB để ko bị crash.

- Update column hay table.
    + việc update cả code và db sẽ mất thời gian.
    + Cần turn off db , app để cập nhật lại dữ liệu.
    + Hoặc có thể copy 1 bản db và thay đổi.
    + hoặc dùng aliasing, cho table 1 second name.

- UP and DOWN Migration.
- UP : create table => delete col => create table => rename col => delete table
- DOWN : ít dùng, trường hợp backup, delete table => add col => delete table => rename column => add table.