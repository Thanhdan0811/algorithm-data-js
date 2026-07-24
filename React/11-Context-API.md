Passing state into multiple deeply nested child components.
A solution to prop drilling.

Allow us to "broadcast" global state to the entire app.

1. Provider: gives all child components access to value. (thường bọc app)
2. value: data that we want to make available.
3. Consumers: all components that read the provided context value.

Value updated => all consumers re-render.

We can re-use component consumer anywhere without props required if has.

```create Provider and give values.

const PostContext = createContext();

// App component
<PostContext.Provider value={{
    posts: searchedPost,
    onClearPosts: hanldeClearPosts,
    ...
}}>
    <App />
</PostContent.Provider>

```

```Consumer get value
// Header component
function Header() {
    // Consuming context's value
    const { onClearPosts } = useContext(PostContext);
    // ...
}

function Results() {
    const { posts } = useContext(PostContext);
    // ...
}


```

PostContext là 1 component nên viết hoa.

# Advanced Pattern: Custom provider and hook.
Tạo file riêng. 

```PostContext.js
export const PostContext = useContext();

export default function PostProvider({children}) {
    //... all logic
    return <>
        <PostContext.Provider
            value={{
                posts: searchedPost,
                onClearPosts: hanldeClearPosts,
                ...
            }}
        >
            {children}
        </PostContext.Provider>
    </>
}

function usePosts() {
    const context = useContext(PostContext);
    if (context === undefined) throw new Error("PostContext was used outside provider")
    return context;
}

```

```App.jsx
function App() {
   const { onClearPosts } = usePosts();
    return <>
        <PostProvider>
            // childe compoennt.
        </PostProvider>
    </>
}

```


# State type
We have local state, global state, remote state, ui state.
Local state: useState, useReducer or useRef.
Parent component: useStrate, useReducer, useRef.
Context: Global state, context api + useState or useReducer.
Global state: Redux, React Query, SWR, Zustand.
URL : React Router.
Browser: localStorage.
