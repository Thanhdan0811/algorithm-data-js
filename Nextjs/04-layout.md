- A Page is UI that is unique đối với 1 route.
- A layout là UI is shared between multiple pages trong app.

# Create layout.
- Có thể define layout bằng export default 1 react component từ layout.js hoặc layout.tsx
- Component này nên nhận 1 children prop , sau đó sẽ được phân bổ vào 1 child page trong quá trình rendering.


# layout nested.
- src/app/products/[productId]/layout.tsx  <=> localhost:3000/products/1
- Layout sẽ gồm Root layout to ở ngoài, layout của products details sẽ gồm page.tsx.
```
// [productId]/layout.tsx

export default function ProductDetailsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
          {children}
          <h2>Features products</h2>
      </>
    );
  }

```

# Route Group Layout.
- tổ chức project mà không ảnh hưởng URL.
- Apply layout đối với 1 số segment trong khi những layout khác không thay đổi.


```
src 
    app
        (auth)
            (with-auth-layout)
                login
                    page.tsx
                register
                    page.tsx
                layout.tsx
            fotgot-password
                page.tsx    

```

```
// (with-auth-layout)/layout.tsx
export default function ProductDetailsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
          {children}
          <h2>Features products</h2>
      </>
    );
  }

```