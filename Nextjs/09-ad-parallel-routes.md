- Parallel Routes : là cơ chế routing nâng cao cho phép đòng thời rendering của nhiều pages trong cùng 1 layout.
- Parallel routes trong Next.js được định nghĩa sử dụng feature với tên gọi là `slots`
- Slots giúp cấu trức content theo kiểu module.
- Để định nghĩa 1 slot, ta dùng `@folder` naming convention.
- Each slot sẽ được passed như là 1 prop vào `layout.tsx` file tương ứng.


```
app
    complex-dashboard
        @notifications
            page.tsx
        @revenue
            page.tsx
        @users
            page.tsx
    page.tsx
    layout.tsx

// app/complex-dashboard/layout.tsx
export default function DashboardLayout({
    children,
    userss,
    revenue,
    notifications
}: {
    children: React.ReactNode;
    userss: React.ReactNode;
    revenue: React.ReactNode;
    notifications: React.ReactNode;
}) {

    return (<>
        <div>
            <div>{children}</div> {/*Content from page.tsx ; complex-dashboard/@children/page.tsx  */}
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>{userss}</div>
                    <div>{revenue}</div>
                </div>
                <div style={{ display: 'flex', flex: 1 }}>{notifications}</div>
            </div>
        </div>
        
    </>)

}
    

```

- Các thành phần này sẽ được đặt chung trong 1 layout.
- Independent Route Handling 
    + Each slot của layout, như user analytics sẽ có riêng own loading và error state.
    + Phù hợp trong trường hợp mỗi section của page load với speed khác nhau hoặc giải quyết lỗi errors đặc trưng khác nhau.


- Sub-navigation in routes 
    + Mỗi slot sẽ có chức năng cần thiết như là 1 mini-application, có navigation và state management riêng.
    + Hữu ích cho complex application như dashboard , mỗi sections serve các mục đích riêng biệt.


# unmatched routes
- khi thay đổi route cho từng slot rieegn biệt, các slot khác sẽ ở trạng thái unmatch route. nhưng vẫn sẽ giữ nguyên active state trước đó.
- Navigate từ UI : Nextjs sẽ giữ previously active state của các slot cho dù URL thay đổi.
- Page Reload : Nextjs sẽ ngay lập tức tìm `default.tsx` file bên trong mỗi unmatched slot.
- Nếu `default.tsx` file ko có trong bất cứ unmatch slots nào ở current route , thì sẽ render 404 error.

- `default.tsx` : là file fallback để render content khi mà framewordk ko thể tìm đc slot active state từ URL hiện tại.
- Có thể tự do define UI cho unmatch routes : bản sao của page.tsx hoặc làm lại custom view.


```
app
    complex-dashboard
        @notifications
            page.tsx
            default.tsx
        @revenue
            page.tsx
            default.tsx
        @users
            page.tsx
            default.tsx
    page.tsx
    default.tsx
    layout.tsx

```

# Conditional Routes.
- 