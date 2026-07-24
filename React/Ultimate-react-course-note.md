

# 18 Advanced State Management.
Dùng thư viện `leaflet` để nhúng map vào project `worldwise`

clip 12.
xem lại project, check code.


# 19 Performance Optimization and Advanced useEffect
Props đổi không làm component re-render lại. 
Có 3 cách để optimizations react: 
1. prevent wasted renders.
Dùng memo, useMemo(), useCallback(), passing elements as children or regular prop.
2. improve app speed/responsiveness
useMemo(), useCallback(), useTransition()
3. reduce bundle size.
using fewer 3 party packages, code splitting, lazy loading.

Component re-render khi state, context thay đổi và parent re-renders.
Component re-render không có nghĩa là DOM có update, chỉ có nghĩa là component function được called. điều này có thể làm chậm app.



