- Ta có thể tạo custom request handlers cho routes của ta sử dụng features được gọi là route handlers.
- Routes Handlers cho phép tạo RESTful endpoints, cho ta full control thông qua response.
- Không có chi phí phát sinh khi tạo và cấu hình 1 server riêng biệt.
- Route handler cũng ok cho việc tạo external API requests.
- Route hanlders run server-side, ensuring các thông tin bảo mật sẽ ko đc gửi đến browser.
- Route Handlers sẽ tương tự với API routes trong Page router.

- Nếu trong 1 folder route tồn tại đồng thời 2 file là route.ts và page.tsx thì page.tsx sẽ bị route.ts ghi đè.
- Để tránh conflict này ta sẽ tạo 1 subfolder là api và move file route.ts vào đó.

```


```

# Query params 
```
// route.ts
import { NextRequest } from "next/server";
import { comments } from "./data";


export async function GET(request: NextRequest) {   
    
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    
    const filteredComments = query ? comments.filter(comment => comment.text.includes(query)) : comments;
    
    console.log(searchParams);
    return Response.json(filteredComments); 
}

```

# Redirect 
```
import { NextRequest } from "next/server";
import { comments } from "./data";


export async function GET(request: NextRequest) {
    
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    
    const filteredComments = query ? comments.filter(comment => comment.text.includes(query)) : comments;
    
    console.log(searchParams);
    return Response.json(filteredComments); 
}

export async function POST(request: Request) {
    const comment = await request.json();
    const newComment = {
        id: comments.length + 1,
        text: comment.text
    }

    comments.push(newComment);

    return new Response(JSON.stringify(newComment), {
        headers: {
            'Content-Type': 'application/json'
        },
        status: 201
    })
}

```

# Headers in Route Handlers
- HTTP headers represent metadata liên quan đến API request và response.
- `Request Headers` : được gửi bởi client, chứa các thông tin qtrong về request, giúp server hiểu và xử lý.
- 'User-Agent'  được dùng để xác định browser và operating system tới server.
- 'Accept' mô tả content types như text, video hoặc image formats mà client có thể xử lý.
- 'Authorization' header được dùng bởi client để authenticate bản thân nó với server.

- `Response Headers` : được gửi ngc lại từ server cho client. CUng cấp thông tin về server và data được gửi trong response.
- 'Content-Type' header : diễn tả media type của response, loại data được trả về, `text/html` cho HTML documents, `application/json` cho JSON data....

```
// profile/api/route.ts
import { type NextRequest } from "next/server";

import { headers } from 'next/headers';

export async function GET(request : NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const headerList = headers();


    console.log(requestHeaders.get('Authorization'));
    console.log(headerList.get('Authorization'));


    return new Response('<h1>Hello</h1>', {
        headers: {
            'Content-Type': 'text/html'
        }
    });
}

```

# Cookes in Route Handlers
- Là 1 data nhỏ mà server gửi cho uses's web browser.
- Browser có thể store cookie và gửi nó lại cho server ở các requests sau.
- Cookies được dùng cho 3 mục đích chính : 
    + Session management như logins, shopping carts
    + Cài đặt cá nhân như user preferences và themes.
    + theo dõi , phân tích hành vi người dùng.

```
// profile/api/route.ts
import { type NextRequest } from "next/server";

import { headers, cookies } from 'next/headers';

export async function GET(request : NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const headerList = headers();

    cookies().set("resultsperpage", "20")
    const theme = request.cookies.get('theme');

    console.log(requestHeaders.get('Authorization'));
    console.log(headerList.get('Authorization'));
    
    // get cookies
    console.log(theme);
    console.log(cookies().get('resultsperpage'));
    

    return new Response('<h1>Hello</h1>', {
        headers: {
            'Content-Type': 'text/html',
            "Set-Cookie": 'theme=dark'
        }
    });
}

```


# Caching in Route Handlers.
- Route handlers sẽ được cached ở mặc định khi dùng GET method với Response object trong Nextjs.
- Để tránh cach ta sẽ dùng `dynamic mode` trong `Segment Config Option`.

```
// time/route.ts
// khi build và start development thì nó sẽ bị cach , ko gửi time mới nhất lên.
export async function GET() {
    return Response.json({
        time: new Date().toLocaleTimeString
    })
}

```

- không cho cache
```
export const dynamic = 'force-dynamic'; // 'auto' là mặc định

export async function GET() {
    return Response.json({
        time: new Date().toLocaleTimeString
    })
}

```

- Cách khác : 
    + dùng new Request object với GET method.
    + employing dynamic functions như headers() và cookies()
    + dùng HTTP method khác get.


# Middleware
- là tính năng cho phép chặn và điều khiển flow của requests và responses trong app.
- Nó được thực hiện ở global level , cải thiện các features như redirection, URL, rewrites....

- Cho phép xác định path cụ thể sẽ được active.
    + Custom matcher config.
    + Conditional statements.

- Custom matcher config

```
import { NextResponse, type NextRequest } from "next/server";
export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/profile'
}

```

- Conditional statements
```
import { NextResponse, type NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/profile') {
        // return NextResponse.redirect(new URL('/', request.url))
        return NextResponse.rewrite(new URL('/', request.url))
    };
}

```

- Cookies 
