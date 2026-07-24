# Border.

```
border: 2px soldid black;
border-width: 2px;
border-style: solid | dotted | dash;
border-color: pink;

border-top | right | bottom | bottom;


border-radius: 10px;
border-top-left-radius: 4px;
// top-right, bottom-left, bottom-right


```

# margin

```
margin: 20px; // => top, right, bottom, left, 20px
margin: 20px 40px; // => top, bottom là 20px; left, right là 40px
margin: 10px 20px 30px; top 10px; left, right là 20px; bottom là 30px;
margin-left: auto;
margin-right: auto;

margin-collapse : margin top và bottom nào lớn hơn thì áp giá trị đó.


```

# Font

```
- goolge font

body {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    font-style: italic;

}

```

# liên quan đến text

```
line-height: 1 | 2 ...;
text-align: left | right | center | justify;
letter-spacing: 5px;
word-spacing: 2px;
// Hiển thị ... trên 1 hàng
// không cho xuống hàng, chữ chỉ hiển thị 1 dòng.
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

// Hiển thị ... ở hàng thứ 3, bỏ cái white-space đi.
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
text-overflow: ellipsis;


// word-break trường hợp 1 word nhập quá dài.
word-break: break-all | break-word (rớt kiểu có ý nghĩa);


// 1 nửa back ground text
background: none;
    box-shadow: inset 0 -0.4em 0 var(--background-noti);
    padding: 0 2px;
    display: inline;

=> inline sẽ chạy theo từng dòng, box-shadow sẽ bắt theo từng dòng.
=> inline-bloc hay block sẽ tạo 1 block và đi theo block.
```

# scrollbar

```
scrollbar-width: thin;
scrollbar-color: gray transparent;
```
