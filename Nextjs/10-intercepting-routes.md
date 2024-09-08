- Intercepting routes : cho phép chặn hoặc stop default routing behaviour để show view hoặc component khi mà navigating giữa UI, trong khi giữ route cho trường hợp như page reloads.
- hữu dụng trong trường hợp muốn show 1 route trong khi giữ context của page hiện tại.
- Load route ở 1 chỗ khác của app tại current layout hiện tại.

# Conventions

- `(.)` để match segments trong cùng level.
- `(..)` để match segments ở trên 1 level.
- `(..)(..)` để match segments ở trên 2 level.
- `(...)` để match segments ở root app directory.


```



```

# Parallel Intercepting routes