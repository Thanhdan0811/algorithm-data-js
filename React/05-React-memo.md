# React.memo
- memo() đc gọi là Higher Order Component (HOC).


```
// App component
const app = () => {

    const [count, setCount] = useState(0);

    const increase = () => setCount(count + 1);

    return (
        <div style={{padding: `10px 32px`}}>
            <Content /> 
            <h1>{count}</h1>
            <button onClick={increase}>Click me!</button>       
        </div>
    )

}


// Content componnet
const Content = () => {

    return (
        <div>      
        </div>
    )

}

export default memo(Content)

```

- Nếu click vào button ở App thì sẽ re-render cả Content trong khi Content ko hề nhận props.
- dùng memo để tránh re-render không cần thiết.
- Memo sẽ check xem props truyền nào bất cứ 1 cái nào thay đổi nó sẽ re-render lại component.
- Nếu ở App truyền vào count cho Content thì mỗi khi count thay đổi ,Content sẽ re-render lại. nếu state khác trong App thay đổi mà không truyền vào Content thì Content ko re-render lại.


# useCallback()
- Tránh tạo ra hàm mới 1 cách không cần thiết.
- Dù đã áp dụng memo ở trên.
- Nếu truyền hàm increase như 1 props cho Content, thì khi state ở App thay đổi, App sẽ bị re-render, hàm increase sẽ đc khởi tạo 1 tham chiếu tới hàm mới.
- Lúc này memo sẽ nhận định là hàm increase sẽ là 1 hàm khác dù nội dung hàm ko thay đổi. 
- DO đó ta sẽ dùng useCallback() để fix.

- [] : truyền vào value cần check , nếu trong hàm dùng useCallback có sử dụng.

- Trường hợp, khi dùng memo mà truyền function vào dưới kiểu props.
- Trường hơp, callback được truyền vào props và được gọi trong effect và được theo dõi ở dependencies của effect.



```
// App component
const app = () => {

    const [count, setCount] = useState(0);

    const increase = useCallback(() => setCount(count + 1), []);

    return (
        <div style={{padding: `10px 32px`}}>
            <h1>{count}</h1>
            <Content increase={increase} /> 
               
        </div>
    )

}


// Content componnet
const Content = ({increase}) => {

    return (
        <div>  
            
            <button onClick={increase}>Click me!</button>        
        </div>
    )

}

export default memo(Content)

```

# useMemo
- Tránh thực hiện lại logic nào đó không cần thiết.

```
const total = useMemo(() => {
    const results = products.reduce((result, prod) => {
        console.log("Tính toán lại....");
        return result + prod.price;
    }, 0);


    return results; 
}, [products]);

// mỗi khi component re-render lai, nếu không có useMemo thì total sẽ bị tính toán lại , dùng useMemo sẽ chỉ tính toán lại khi cần thiết.


```

