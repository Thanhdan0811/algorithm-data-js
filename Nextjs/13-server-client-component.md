- Mặc định, mọi component trong Next.js app được xem là server component.
- CLient componnet sẽ có render ở server 1 lần sau đó là ở client.

# Rendering life cycle.
- Đối với RSC, cần xem xét 3 thành phần : browser (client), server-side Next.js, và React library.
- Các bước : 
    + Khi browser gửi request, Next match url với server component, Next sau đó instructs React render server component đó.
    + React sẽ render server component đó và child của nó, convert thành 1 JSON special được gọi là RSC payload.
    + Trong quá trinh rendering này, nếu bất cứ server component nào suspends react sẽ pause render lại và gửi placeholder value.
    + Cùng lúc đó, Client component instruction được chuẩn bị cho later của life cycle.
    + Next dùng RSC payload bao gồm client component instructions để generate HTML trên server.HTML sẽ được stream đến browser , lập tức được show Non-Interactive preview of route. 


- Có 3 chiến lược Server Rendering
- Static Rendering
- Dynamic Rendering
- Streaming


# Static Rendering 
- Static rendering là 1 cách server rendering ở đó HTML page được tạo ở thời điểm building app.
- Cách này page 1 lần, cached bởi CDN, được gửi đến client ngay lập tức.
- Tối ưu cho việc chia sẻ result rendering giữa các users khác nhau.
- Thích hợp cho blog , e-commerce product pages, documentation và marketing pages.

- Static rendering là mặc định redering trong app router.
- Tất cả routes được chuẩn bị ở build time mà ko cần thêm bước setup nào.


- Production Server và Dev Server : 
    + với Prod, 1 build được tối ưu sẽ được tạo 1 lần, và ta sẽ deploy build đó.
    + với Dev server, tập trung vào developer experience.
    + Với Prod, page sẽ được pre-rendered 1 lần khi run build command.
    + với Dev mode, page sẽ được pre-renderd với mỗi request.


- Prefetching : 
    + là 1 kỹ thuật được dùng để preload 1 route ở background trước khi user navigates tới nó.
    + với static routes, entire route được prefetched và cached bởi mặc định.
    + Khi load homepage, Next.js prefetched About và Dashboard, sẵn sàng cho navigate.


# Dynamic Rendering
- Routes được rendered cho mỗi user tại thời điểm nhận request.
- Phù hợp với dữ liệu cá nhân như cookies, query search chỉ có thể được biết tại request time.

- Trong quá trình rendering, nếu 1 dynamic function được bắt gặp, Next.js sẽ switch sang dynamically rendering cho cả route.
- Trong nextjs các functions này là : cookies(), headers(), and searchParams
- Dùng các hàm này sẽ opt cả route thành dynamic rendering tại request time.


# Streaming
- cho phép progressive UI rendering từ server.
- chia nhỏ thành chunks và stremed tới client khi sẵn sàng.
- Thấy 1 phần của page trước khi tất cả content đc load.


# Server-code only
- 1 phần code chỉ được render ở server.
- Có thể có nhiểu modules, functions dùng nhiều thư viện, environment variables...
- Vì Js module có thể shared lẫn nhau, nên có thể xảy ra việc code cho mỗi server có thể gửi đến client.
- cài package : `npm i server-only`

# Third-party packages.
- Sẽ có các packages bên thứ 3 chưa hỗ trợ server, đẫn đến truyền thông tin nhạy cảm đến browser.
- Ta có thể wrap third-party components mà phụ thuộc, liên quan client component vào CLient component riêng của ta.
- ta sẽ dùng react-slick :  npm i react-slick slick-carousel @types/react-slick
- Cần tạo ImagesSlider rieegn và khai báo 'use client'


# Context Providers
- Context providers đc rendered gần root của 1 application để share application state và logic.
- Nhưng React context không support trong Server Component , việc sử dụng context ở root sẽ dẫn đến error.
- Tạo 1 context và render provider của nó bên trong 1 CLient Component riêng biệt.


# Client-only code
- dùng package `client-only`
- npm i client-only

# Client Component Placement
- Để hỗ trợ cho việc server components không thể manage state và handle interacivity, ta cần tạo client components.
- Ta nên position các client components thấp hơn trong component tree.

- Nếu ta định nghĩa 1 component là 1 client component (`use client`) thì tất cả child component sẽ được xem là client component.
- Do đó cần định nghĩa client component càng sâu càng tốt.

# Interleaving Server and Client Component.
- Không thể nested Server componnet trong client component
- NHưng ta có thể truyền server componnet vào client component thông qua prop children.
