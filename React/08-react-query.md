- React query là library cho data fetching.
- Vì state management ở React ko phù hợp với async state hoặc server state.
- Server state có thể đc update từ user nào đó, và nó là async API. 
- `npm i @tanstack/react-query`
- `npm i @tanstack/react-query-devtools`


# Main conceipt
- Query và Mutation
- Query là lấy data ở đâu đó
- Mutation là thay đổi data.

# Set up 
- Import `QueryClientProvider` và bọc children lại.
- Tạo instance là QueryClient