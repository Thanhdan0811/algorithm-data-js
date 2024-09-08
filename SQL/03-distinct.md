

# Distinct
```
// trả về cặp khác nhau country và first_name
SELECT DISTINCT country, first_name
FROM Customers;


// đếm số elements khác nhau.
SELECT COUNT(DISTINCT country)
FROM Customers;

```

# select as alias
- gán column hay table 1 name tạm thời để xác định column hay table đó về sau.


```
SELECT column_1 AS alias_1, 
       column_2 AS alias_2, 
... ...column_n AS alias_n
FROM table_name

```

```
SELECT customer_id AS cid, first_name AS name
FROM Customers;

```

# SQL AS With Expression 

- Kết hợp nhiều columns và biểu diện thành 1 column dùng `CONCAT()` funciton.
```
SELECT CONTACT(first_name, ' ', last_name) AS full_name
FROM Customers;

```

- Đối với SQLite thì chuyển `CONCAT()` thành `||`

```
SELECT first_name || ' ' || last_name AS full_name
FROM Customers;

```

# MIN MAX Functions

```
SELECT *
FROM Customers
WHERE age = (
    SELECT MIN(age)
    FROM Customers
);

```

# COUNT funcitons

```
// with where
SELECT COUNT(country)
FROM Customers
WHERE country = 'UK';

// distinct
SELECT COUNT(DISTINCT country)
FROM Customers;

```

# SUM  AVG functions

```
// SUM
SELECT SUM(amount) AS total_sales
FROM Orders;


// AVG
SELECT customer_id, AVG(amount) AS average_spends
FROM Orders
GROUP BY customer_id;

```