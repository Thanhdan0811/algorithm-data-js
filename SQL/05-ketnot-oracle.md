






```Tạo user và phân quyền trên Oracle sql developer.
Create USER c##danitktc IDENTIFIED BY "123456";
GRANT CREATE SESSION TO c##danitktc;
GRANT CREATE TABLE TO c##danitktc; 
GRANT CREATE VIEW TO c##danitktc; 
GRANT CREATE PROCEDURE TO c##danitktc; 
GRANT UNLIMITED TABLESPACE TO c##danitktc;

```


# create table

```
CREATE TABLE USERCLASS 
(
  ID VARCHAR2(20) NOT NULL 
, USERNAME VARCHAR2(255) NOT NULL 
, COLUMN1 VARCHAR2(50) NOT NULL 
, ROLEID VARCHAR2(20) 
, CONSTRAINT USERCLASS_PK PRIMARY KEY 
  (
    ID 
  )
  ENABLE 
);

create table USER (
    id varchar(20) not null primary key,
    username varchar(255) not null,
    parsword varchar(50) not null,
    roleid varchar(50) 
);


User(id, username, password, role_id)
Role(id, name)
Permission(id, name)
RolePermission(role_id, permission_id)
Student(id, name)
Course(id, name, description)
Enrollment(id, student_id, course_id, enrollment_date)
Attendance(id, student_id, course_id, date, status)

```

Union : 1 2 3 4 5 6 
Union all : 1 2 3 3 4 4 5 6