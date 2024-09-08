# React Server Componnets
- Là 1 cấu trúc mới giới thiệu bởi React team v18
- 2 loại : Server và Client compnents.


- Next thì tất cả component là Server components
- Các server components có khả năng chạy tasks như đọc files hay fetching data từ database.
- Nhưng các server compnents này không thể dùng hooks hoặc handle các user interactions.


- Để tạo client component, ta cần phải thêm `'use client'` ở top của component file.
- Ngược lại với server component, client component chỉ có thể dùng hooks và manage interactions. ko thể đọc files.

# Routing
- Nextjs có cơ chế file-system based routing.
- URL paths được định nghĩa bởi files và folders.

## Routing Conventions 
- all routes phải được tạo bên trong app folder.
- Mỗi file tương ứng với 1 route phải được đặt tên là page.js hoặc page.tsx
- Mỗi folder tương ứng với 1 path segment trong browser URL.

- Scenario 1 : localhost:3000 => src/app/page.tsx
- Scenario 2 : localhost:3000/about => src/app/about/page.tsx
- Scenario 2 : localhost:3000/profile => src/app/profile/page.tsx

- scenario 3 : localhost:3000/blog => src/app/blog/page.tsx
- scenario 3 : localhost:3000/blog/first => src/app/blog/first/page.tsx
- scenario 3 : localhost:3000/blog/second => src/app/blog/second/page.tsx

- Nếu enter 1 path ko có thì sẽ trả về trang 404.


## Dynamic routes

- scenario 4 : localhost:3000/products => src/app/products/page.tsx
- scenario 4 : localhost:3000/products/1 (product details) => src/app/products/[productId]/page.tsx

```
export default function ProductDetails({
  params,
}: {
  params: { productId: string };  // typescript
}) {
  return (
    <>
      <h1>Detail about product {params.productId}</h1>
    </>
  );
}

```

## Dynamic Nested Routes

- Scenario 5 : localhost:3000/products/1 => src/app/products/[productId]/page.tsx
- Scenario 5 : localhost:3000/products/1/reviews/1 => src/app/products/[productId]/reviews/[reviewId]/page.tsx (reviews khong có page.tsx)

## Catch-all segments

- Scenario 6 : localhost:3000/docs/feature1/concept1
- Scenario 6 : localhost:3000/docs/feature1/concept2
- Scenario 6 : localhost:3000/docs/feature2/concept1
- Scenario 6 : localhost:3000/docs/feature2/concept2

- 20 Features x 20 Concepts = 400

```
Feature 1
    concept 1
    concept 2
    concept 3
    concept 4
    concept 5
Feature 2
Feature 3
Feature 4
Feature 5

```

=> ta sẽ dùng catch-all segments để bắt tất cả segments vào 1 page.

=> src/app/docs/[...slug]/page.tsx  => localhost:3000/docs/feature1/concept1 hay localhost:3000/docs/feature1 đều sẽ vào file page.tsx trong [...slug] folder.

- NOTE : src/app/docs => trả về 404 error page. Để lấy luôn file page.tsx trong [...slug] thêm 1 cặp dấu [] => src/app/docs/[[...slug]]/page.tsx

```
<!-- [...slug]/page.tsx -->
export default function Docs( { params } : {
    params: {
        slug: string[]
    }
}) {

    if (params.slug.length === 2) {
        return <h1>
            Viewing docs for feature {params.slug[0]} and concept {params.slug[1]}
        </h1>
    } else if (params.slug.length === 1) {
        return <h1>
            Viewing docs for feature {params.slug[0]}
        </h1>
    }

    return <h1>Docs Home Page</h1>
}


```

## Not Found Page.
- tạo file : not-found.tsx trong folder app.
- Ta có thể navigate về not-found page cho nested route.

```
src/app/products/[productId]/reviews/[reviewId]/not-found.tsx
src/app/products/[productId]/reviews/[reviewId]/page.tsx

// [reviewId]/page.tsx
import { notFound } from "next/navigation";

export default function ProductDetails({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  if (parseInt(params.reviewId) > 1000) {
    notFound();  // => navigate về not-found page.
  }

  return (
    <>
      <h1>
        Review {params.reviewId} for product {params.productId}
      </h1>
    </>
  );
}


```
