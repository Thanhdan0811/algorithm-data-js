- App Router dùng React Server Component (RSC), cho phép fetch data dùng cả ở server components hoặc client components.


# Fetching Data Server Component.
# Loading and error states
- Implement loading state, define và export React component trong loading.tsx
- Handling Error, define và export React Component trong error.tsx


# JSON server setup
- npm i json-server@0.17.               

# Caching data.
- Mặc định, Next.js tự động caches values được returned từ fetch trong Data Cache trên server.
- Data cache là server-side cache sẽ giữ kết quả của data fetches qua các requests đến máy chủ và deployment.
- Giúp hạn chế việc re-fetch data từ data source đối với mỗi request.


# Opting Out of Caching
- để ko cache set -> cache : "no-store"
- Khi set `no-store`, các fetch sau cũng sẽ ko catch.
- Để không ảnh hưởng các fetch sau, ta khai báo : `export const fetchData = 'default-cache'`;

```

export const fetchData = 'default-cache'
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export default async function ProductsPage() {
  const response = await fetch("http://localhost:3001/products", {
    cache: 'no-store'
  });
  const products = await response.json();

//   nếu dùng no-store ở trên, fetch bên dưới sẽ ko cache nữa.
  const detailResponse = await fetch("http://localhost:3001/products/1", {
    cache: 'no-store'
  });
  const detailProduct = await detailResponse.json();

  return (
    <>
      <ul className="space-y-4 p-4">
        {products.map((product: Product) => {
          return (
            <>
              <li
                key={product.id}
                className="p-4 bg-white shadow-md rounded-lg text-gray-700"
              >
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p>{product.description}</p>
                <p className="text-lg font-medium">{product.price}</p>
                <p className="text-lg font-medium">{detailProduct.price}</p>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

```

- Mặc định, Next sẽ cache fetch() requests xảy ra trước bất cứ dynamic funcions (cookies(), headers(), searchParams()) nào được dùng, và sẽ không cache requests sau (ở dưới) dynamic functions.
