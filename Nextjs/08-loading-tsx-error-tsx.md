- `loading.tsx` cho phép create loading state sẽ display cho users khi 1 specific route segments content đang load.
- the loading state appears immediately upon navigation.


- Next cho phép user tương tác với các phần khác, khi mà 1 segment nào đó dang load.


# error.tsx
- file này sẽ chỉ ở client component.
- Tự động wrap route segment và nested children trong React Error Boundary.
- Tạo UI error riêng để để hiển thị chi tiết.
- Cô lập (Isolate) errors để các functional khác vẫn chạy.


```
'use client';

export default function ErrorBoundary({error}: {error: Error}) {
    return <div>
        Error : {error.message} In Review
    </div>
}

```

```
<Layout>
    <Template>
        <ErrorBoundary fallback={<Errror />}>
            <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<NotFound />}>
                    <Page />
                </ErrorBoundary>
            </Suspense>
        </ErrorBoundary>
    </Template>
</Layout>

```


# Recovering from Errors
- reset function sẽ re-render lại ErrorBoundary content.
- Có thể reset luôn ở cả client side.


```
'use client';

export default function ErrorBoundary({error, reset}: {error: Error, reset: () => void}) {
    return <div>
        Error : {error.message} In Review
        <button onClick={reset}>Try Again</button>
    </div>
}

```

# Handling Errors in Nested Routes.
- Errors bubble up cho tới error boundary cha gần nhất.
- 1 error.tsx file sẽ bắt các errors cho tất cả nested child segments.
- Đặt error.tsx file ở các level khác nhau trong nested folders của route, ta có thể có độ chi tiết của error handling.

# Handling Erros in layouts.
- Error Boundary sẽ ko catch errors thrown ở layout vì nó đc nested bên trong layout component.
