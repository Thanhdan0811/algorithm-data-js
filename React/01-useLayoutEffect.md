- Khác với useEffect sẽ chạy sau khi DOM được painted , elemnt xuất hiện trước, r mới chạy useEffect và apply giá trị style.
- userLayoutEffect sẽ chạy trước khi DOM được painted, nên các giá trị style sẽ được áp cho element ngay.

- useEffect là async, sẽ ko block code lại.
- userLayoutEffect là sync, sẽ block render lại và chạy code trong useLayoutEffect, có thể làm chậm app.

- useEffect : 
    + Cập nhật lại state.
    + Cập nhật DOM
    + Render lại UI
    + Gọi cleanup nếu deps thay đổi.
    + Gọi Effect Callback

- useLayoutEffect : 
    + Cập nhật lại state.
    + Cập nhật DOM
    + Gọi cleanup nếu deps thay đổi. (sync)
    + Gọi Effect Callback. (sync)
    + Render lại UI