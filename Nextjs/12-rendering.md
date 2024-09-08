- Rendering là quá trình xử lý chuyển đổi code thành user interfaces.
- Nextjs, chọn đúng thời điểm và nơi để rendering là thiết yếu cho building 1 performant application.

- CSS, SSR và RSCs

- Rendering in React -> Rendering in Next.js


# Client Side Rendering (CSR)
- React là thư viện tạo Single Page Applications (SPAs).
- Cách rendering , component code được chuyển cho user trực tiếp trong browser (the client) sẽ là CSR.
- CSR trở thành chuẩn cho SPAs , với tính ứng dụng rộng rãi.
- Nhưng có các hạn chế :
    + SEO : Generating HTML , chỉ có 1 div tag sẽ không tốt cho SEO, ít thông tin cho seach engines để index.
    + Performance : Browser sẽ handle tất cả code, như fetching data, computing UI,... có thể làm chậm mọi thứ. user sẽ thấy được trang web lâu hơn.


# Server-side rendering (SSR)
- Cải thiện SEO 
- User có thể thấy HTML content 
- Giai đoạn :
    + user gửi request đến server
    + server gửi lại HTML full + Js reference
    + UI gửi request JS đến server 
    + Server gửi lại js cần thiết.
    + ở UI khi nhận đc JS và excuted : giai đoạn này đc gọi là hydration , lúc này static HTML nhận được từ server sẽ hoàn thiện.

- Trong giai đoạn hydration, React sẽ đảm nhận control ở browser, cấu trúc lại component tree ở memory ở static HTML

- Server side Solutions : 
    + Static Site Generation (SSG)
    + Server-Side Rendering (SSR
    
- SSG xảy ra ở thời điểm build time, khi mà application đc build trên server. Pages này được render và sẵn sàng gửi đi. Phù hợp cho content không thay đổi thường xuyên nhug blog posts.
- SSR : renders page khi được yêu cầu truyền trong response khi user requests. phù hợp cho thông tin cá nhân như social media feeds, HTML phụ thuộc vào logged-in user.


- SSR hạn chế :
    + Ta có thể phải fetch mọi thứ trước khi show cái gì đó. Componnet khong thể bắt đầu render cho tới khi data loaded.
    + Phải load được mọi thứ trước khi hydrate bất cứ cái gì. Để React thêm interactivity cho server-rendered HTML, component tree ở browser phải chính xác match server-generated component tree. Có nghĩa là tất cả JS cho components phải đc loaded ở client trước khi bắt đầu hydrating.
    + Phải hydrate mói thứ trước khi user có thể interact với bất cứ thứ gì. React hydrates component tree ở single pass, tức là 1 khi bắt đầu hydrating, thì sẽ không stop cho tới khi finished toàn bộ tree.
- Từ đây , ta thấy hạn chế là phải giải quyết tất cả mới đi tiếp đc. hoặc là không có gì đc hoàn thành.


## Suspense SSR Architecture.
- Sử dụng <Suspense> component để unlock 2 tính năng của SSR : 
    + HTML steaming ở server.
    + Selective hydration ở client.

- HTML steaming : 
```
<Layout>
    <Header/>
    <Sidenav/>
    <Suspense fallback={<Spinner />}>
        <MainContent/>
    </Suspense>
    <Footer/>
</Layout>

```


- wrap Maincontent trong Suspense, React sẽ không đợi maincotent load xog, mà sẽ xử lý các thành phần khác trước.
- Khi server đã sẵn sàng cho data của MainContent thì sẽ gửi thêm HTML và js script để xác định đúng vị trí của HTML này.


- Code splitting : cho phép đánh dấu code segments nào đó là ko cần load ngay lập tức, báo cho bundler tách chúng thành các `script` tag.
- Dùng `React.lazy` cho code splitting cho phép tách main section's code ra khỏi primary JS bundle.
- Các phần khác trừ main code sẽ được download độc lập bởi client, mà ko cần chờ main section's code.


# React Server Componnets (RSC)
- Kiến trúc này giới thiệu dual-component model : 
    + Client Componnets
    + Server Componnets

- Sự khác biệt không nằm ở chức năng của componnet mà là nơi chúng được thực thi và môi trường cụ thể chúng đc tạo ra để tương tác.

- Client Component được rendered trên client-side (CSR) , nhưng có thể được rendered HTML ở server SSR, cho phép user ngay lập tức thấy page HTML thay vì blank screen.
- Client component ưu tiên chay ở client nhưng có thể đc chạy ở server nếu cần optimization.


- Server Component : loại react component mới, hoạt động trên server. code ở server và ko được down tới client.

- Điều này giúp giảm bundle size. loại bỏ hydration step, tăng tốc app loading và interaction.


# Rendering Environments
- Có 2 environments mà web có thể được rendered: client và server.
 
