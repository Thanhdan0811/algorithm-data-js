- Request memoization là 1 kỹ thuật loại bỏ request trùng lặp cho cùng 1 data trong 1 single render pass.
- Cho phép re-use data trong React Component tree, chặn network call bị dư.
- Ở request đầu tiên, data được fetched từ bên ngoài, và result được stored trong memory.
- Các request sau cho cùng 1 data trong cùng 1 render pass trả lại result từ memory và không gọi request lần nữa.

- Đây là tính năng của React không phải của Next.
- Memoization chỉ áp dụng cho GET request trong fetch request.
- Memoization chỉ áp dụng trong React Component tree, Nó không mở rộng đến fetch requests trong Route Handlers vì không phải là 1 phần của React Component Tree.
- Trong những cases fetch không dùng, thì để Memoization ta có thể dùng React Cache function để memoize functions.


# Revalidation 
- là quá trình lọc lại data cache và re-fetching data cuối.

- Time-based revalidation : Nextjs tự động revalidates data sau 1 khoảng thời gian đã qua.


```
const response = await fetch("http://localhost:3001/products", {
    next: {
        revalidate: 10, // 10 seconds
    }
  });
  const products = await response.json();

```

- Ta có thể set revalidation route segment configuration để thiết lập default revalidation time cho layout or page : 
- `export const revalidate = 10;`
- Lowest Revalidate time xuyên suốt layout và page của 1 single route sẽ quyết định revalidation frequency của toàn bộ route.