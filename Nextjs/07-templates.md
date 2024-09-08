- templates sẽ tương tự như layouts : wrap mỗi child hoặc page.
- Nhưng với templates, khi 1 user navigates giữ các routes mà share chung 1 template, 1 instance mới của component sẽ được mounted, DOM elements được tạo, 
state thì không được lưu lại, effects thì đc tái đồng bộ (re-synchronized).

- Template được định nghĩa bằng cách exporting 1 default React Component từ 1 `template.js` hoặc `template.tsx`

- Tương tự như layout, templates cũng nên có 1 children prop sẽ render nested segments trong routes.


```
// app/(auth)/layout.tsx
"use client"!

import Link from "next/link";

import { usePathname } from "next/navigation";
import "../style.css";
import { useState } from "react";

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
    const [input, setInput] = useState('');
    
    return (
      <>
      <div>
        <div><input type="text" value={input} onChange={e => setInput(e.target.value)} /></div>
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

- Nếu đễ tên file là `layout.tsx` thì khi ta điền value vào input, sau đó click vào link chuyển trang, thì input sẽ không đc reset lại. 
- Do sẽ chỉ làm mới children mà không render lại các thành phần khác.
- Nên nếu ta đổi lại thành `template.tsx` thì sẽ reset lại input.

- Layout.tsx sẽ đươc khai báo trước sau đó là template.tsx nếu dùng chung 2 cái.

