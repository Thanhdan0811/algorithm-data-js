# optimization with children
```
// not optimization, each counter change, SlowComponent re-render.
function Test() {
    const [counter, setCounter] = useState(0);
    
    return <div>
        <button onClick={() => setCount(c => c + 1)}>Increase: {count</button>
        <SlowComponent />
    </div>
}

//
function Counter({children}) {
    const [counter, setCounter] = useState(0);
    
    return <div>
        <button onClick={() => setCount(c => c + 1)}>Increase: {count}</button>
        {children}
    </div>
}
function Test() {
    const [counter, setCounter] = useState(0);
    
    return <div>
        <Counter>
            <SlowComponent /> 
            // SlowComponent này được khởi tạo ngay lúc này nên khi Counter re-render thì ko ảnh hưởng.
            // 
        </Counter>
    </div>
}
```


# memo
Technique that executes a pure function once.
memo function create a component will not re-render when its parent re-renders, as long as props the same.
only use when component is heavy (slow rendering), re-render often.

Component still re-render when state or context change.

```memoFunction

memo(function Archive({show}) {
    return <div></div>
})

if show is an normal object then memo will re-render even that object not change property.

```

# useMemo and useCallback
useMemo for memoize values
useCallback for function

These 2 function still have dependency array.

three big uses cases: 
Memoizing props to prevent wasted render with memo.
Memoizing values to avoid expensive re-calculations on every render.
Memoizing values that are used in dependency array of another hook.

````useMemo

const archiveOptions = useMemo(() => {
    return {
        show: false, 
        title: "Post archive in addition"
    }
}, []);

```


```useCallback

useEffect(function() {
    getCity(id);
}, [id, getCity])

// getCity cần bọc trong useCallback để tránh infinite call network.

```
