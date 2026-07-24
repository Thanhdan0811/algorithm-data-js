- mặc định font-size 100% là 16px
- 1 rem == 1 em == 16px

- em là đơn vị phụ thuộc và thuộc tính font-size của chính nó hoặc phần tử chứa nó.
```
.em {
    width: 10em;
    height: 10em;
    font-size: 32px; // => lúc này 1 em sẽ là 32 px, phụ thuộc vào font-size, nên box sẽ to hơn.
}

```

- rem là đơn vị phụ thuộc vào thuộc tính font-size của thẻ html.
```
.rem {
    width: 10rem;
    height: 10rem;
    font-size: 32px; // 1 rem là 16px do là của html.
}
```


- cách qui đổi : 
- 100% là 16px => set font-size là 62.5% => 1 rem là 10px

```
html {
    font-size: 62.5%; // => 1rem là 10px
}
```
