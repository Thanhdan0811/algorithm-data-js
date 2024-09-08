https://css-tricks.com/snippets/css/complete-guide-grid/

# `display: grid | inline-grid;`
    + grid items sẽ tự kéo dãn full width của container.
    + inline-grid thì không.


# `grid-template-rows & grid-template-columns`

- grid-template-rows : 50px 100px; 
    + items 1, 2 : sẽ set chiều rows cứng lần lượt là 50px và 100px, các items ở row tiếp theo sẽ là content.

- grid-template-columns : 90px 50px 120px; 
- grid-template-columns : 1fr 1fr 2fr; 
    + Tương tự rows nhưng theo columns.

- Đơn vị `fr` tạo grid flexible, fr được tính dựa vào khoảng trống còn lại khi kết hợp với các values length khác.

```
.container {
    grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}

```

# `grid-template-areas`

```
.container {
  grid-template-areas: 
    "<grid-area-name> | . | none | ..."
    "...";
}
// '.' value này thể hiện 1 empty grid cell.
// 'none' không có grid area đc định nghĩa.

.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}

```

- _Lưu ý_ : name này sẽ là đặt cho area, không phải line. line sẽ là `header-start`

# Minmax `grid-template-rows: minmax(100px, auto); grid-template-columns: minmax(auto, 50%) 1fr 3em`
- auto thì sẽ strech theo size. ví dự trên rows sẽ lớn hơn 100px và theo content.


# Repeat `grid-template-columns: 30px repeat(3, 1fr) 30px`:
- khoảng trống còn lại chia 3.


# Grid Gap `grid-row-gap: 20px; grid-column-gap: 5rem;`
- `grid-gap: 2rem`: => `gỉd-row-gap grid-column-gap`
- không tạo gap ở cạnh. chỉ giữa các rows và columns.



# Position items by grid line numbers.
- grid lines là các lines biếu diễn start, end hoặc giữa của các columns, rows tracks.
- Các line được tăng từ 1.

```
  grid-column-start: <number> | <name> | span <number> | span <name> | auto;
  grid-column-end: <number> | <name> | span <number> | span <name> | auto;
  grid-row-start: <number> | <name> | span <number> | span <name> | auto;
  grid-row-end: <number> | <name> | span <number> | span <name> | auto;
```

```
.item {
    grid-row-start: 2; 
    grid-row-end: 3; 
    grid-column-start: 2; 
    grid-column-end: 3;

    //
    grid-column-end: five;
    grid-row-start: row1-start;
    grid-column-end: span col4-start; // mở rộng end tại line start của col4.
    grid-row-start: 2;
    grid-row-end: span 2; // tại line start của 2 mở rộng ra 2 ô.

}

```

# viết tắt : grid-column , grid-row
- `grid-column => grid-column-start grid-column-end`
- `grid-row => grid-row-start grid-row-end`

```
.item {
    grid-column: <start-line> / <end-line> | <start-line> / span <value>;
    grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}

.item-c {
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}
```

# Viết tắt :  grid-area
- `grid-area: grid-row-start grid-column-start grid-row-end grid-column-end`;

```
.item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}

.item-d {
  grid-area: 1 / col4-start / last-line / 6;

}

// ví dụ
.container {
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}

// ví dụ trên tương tự như sau.
.container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
  grid-template-areas: 
    "header header header" 
    "footer footer footer";
}
```

# Viết tắt Grid Template.
```
.container {
  grid-template: none | <grid-template-rows> / <grid-template-columns>;
}
```

# `justify-self` align item bên trong so với cell theo chiều horizontal hay chiều inline axis, content ở trong cell

```
.item {
  justify-self: start | end | center | stretch;
}

```

# `align-self` : như `justify-self` nhưng theo chiều block axis hay verticle.
```
.item {
  align-self: start | end | center | stretch;
}
```