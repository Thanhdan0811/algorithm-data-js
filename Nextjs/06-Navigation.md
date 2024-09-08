- Link Component Navigation 
- Để cho phép client-sdie Navigation , Next.js cung cấp Link Component.
- `<Link>` component là React Component. Cần import từ `'next/link'`.


```
// app/products/page.tsx
import Link from "next/link"

export default function ProductList() {
    return <>
    <Link href='/'>Home</Link>
        <h1>Product List</h1>
        <h2>Product 1</h2>
        <h2>Product 2</h2>
        <h2>Product 3</h2>
    </>
}

```

# Dynamic Link
```
// app/products/page.tsx

import Link from "next/link"

export default function ProductList() {

    const productId = 100;

    return <>
        <Link href='/'>Home</Link>
        <h1>Product List</h1>
        <h2><Link href="products/1">Product 1</Link></h2>
        <h2><Link href="products/2">Product 2</Link></h2>
        <h2><Link href="products/3" replace>Product 3</Link></h2>
        <h2><Link href={`products/${productId}`}>Product {productId}</Link></h2>
    </>
}

```

- `replace` : sẽ thay thế url history thay vì add thêm vào khi click vào link, và click nút back sẽ trở về `'/'`

# Active Link
- dùng `usePathname` để lấy ra pathname check active link.
- NOTE : `usePathname` chỉ được dùng ở client component thêm 'use client'.


```
"use client"!

import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  {name: "Register", href: "/register"},
  {name: "Login", href: "/login"},
  {name: "Forgot Password", href: "/forgot-password"},
]

export default function WithAuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const pathname = usePathname(); // only works in Client Component
    
    return (
      <>
      <div>
          {
            navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link href={link.href} key={link.name} className={isActive ? 'font-bold mr-4' : 'text-blue-500 mr-4'}>
                  {link.name}
                </Link>
              )
            })
          }
          {children}
      </div>
      </>
    );
  }

```

# Navigating Programmatically

- Dùng useRouter để navigate đến page khác.
- NOTE : phải dùng ở 'use client'
```
'use client';
import { useRouter } from 'next/navigation'

export default function OrderProduct() {

    const router = useRouter();

    const handleClick = () => {
        console.log("Placing your order");
        // router.push("/");
        // router.replace("/");
        router.back();
        router.forward();
    }

    return <>
        <h1>Order Product</h1>;
        <button onClick={handleClick}>Place Order</button>
    </>
}
```