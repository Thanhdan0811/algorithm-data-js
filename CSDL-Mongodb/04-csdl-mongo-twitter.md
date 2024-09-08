# Phân tích chức năng users collection. 
- các trường đăng ký : `name`, `email`, `day_of_birth`, `password` bên cạnh đó là có cả `_id` tự động tạo bởi Mongodb.

- Sau khi đk thì sẽ có 1 email đính kèm `email_verify_token` đễ xác thực email
- kiểu : nguyenthanhdan.com/verify-email?email_verify_token=123321123
- Mỗi user chỉ có 1 `email_verify_token` duy nhất, vì nếu user nhấn re-send email thì sẽ tạo ra `email_verify_token` mới thay thế cái cũ. 
- Vậy nên ta lưu thêm trường `email_verify_token` vào schema 'Users'. Trường này có kiểu 'string', nếu user xác thực email thì ta sẽ set '' rỗng.

- Tương tự ta có chức năng quên mật khẩu thì sẽ gửi email về để reset mật khẩu, ta cũng dùng 'fotgot_password_token' để xác thực. 
- nguyenthanhdan.com/forgot-password?forgot_password_token=123321123
- Vậy ta cũng lưu thêm trường 'fotgot_password_token' vào schema 'Users'. có kiểu string , reset password thì trường này set về rỗng.

- Nên có 1 trường là `verify` để biết trạng thái của user. Ví dụ chưa xác thực email, đã xác thực, lên tích xanh, giá trị của nó nên là enum.
- Người dùng có thể update các thông tin sau vào profile : `bio`, `location`, `website`, `username`, `avatar`, `cover_photo`.
- Vậy ta cũng lưu các trường này vào schema User với kiểu là `string`. 
- `avatar`, `cover_photo` đơn giản chỉ là string url.
- Đây là các giá trị optional, người dùng không nhập thì vẫn có thể dùng bth. set về rỗng khi không nhập.

- Cuối cùng là trường `created_at`, `updated_at` để biết thời gian tạo và cập nhật user. Lưu vào schema User với kiểu `Date`. luôn có giá trị.

```
enum UserVerifyStatus {
    Unverified, // chưa xác thực email, mặc định = 0
    Verified, // đã xác thực
    Banned // bị khóa
}

interface User {
    _id: ObjectId
    name: string
    email: string
    date_of_birth: Date
    password: string
    created_at: Date
    updated_ate: Date
    email_verify_token: string // jwt hoặc '' nếu đã xác thực email.
    fotgot_password_token: string // jwt hoặc '' nếu đã xác thực đổi password
    verify: UserVerifyStatus // (0 Unverified ,1 Verified ,2 Banned)

    bio: string // optional
    location: string // optional
    website: string  // optional
    username: string  // optional
    avatar: string  // optional
    cover_photo: string  // optional
}


```


# refresh_tokens
- Đọc tài liệu về authentication : 
    + Basic Authentication : Giải ngỗ authentication
    + Cookie và Session Authentication
    + JWT

- Hệ thống sẽ dùng JWT để xác thực người dùng. Vậy mỗi lần người dùng đăng nhập thành công thì sẽ tạo ra 1 JWT access token và 1 refresh token.
- JWT access token thì không cần lưu vào database, vì chúng ta sẽ cho nó stateless
- Con refresh token thì cần lưu vào database để tăng tính bảo mật.

Một user thf có thể có nhiều refresh token (không giới hạn), nên không thể lưu hết vào trong collection `usser` được => quan hệ 1 - rất nhiều
Và đôi lúc chúng ta chỉ quan tâm đến refresh token mà không cần biết user là ai. Vậy nên ta tạo ra 1 collection riêng để lưu refresh token.


```
interface RefreshToken {
    _id: ObjectId
    token: string
    created_at: Date
    user_id: ObjectId
}

```

# followers collection
- Một người có thể follow nhiều user khác. dùng mảng `followings` không tối ưu vì chạm đến giới hạn 16MB.
- Tìm user A đang follow ai thi dễ, ngược lại ai đang follow user A thì khó.
- Do đó cần tạo collection riêng để lưu các mỗi quan hệ follow giữa các user là hợp lí hơn cả.
- user có nhiều followers và 1 follower có nhiều user khác follow lại.


```
interface Follower {
    _id: ObjectId
    user_id: ObjectId
    followed_user_id: ObjectId
    created_at: Date
}

```

# tweets collection
- Tính năng:
    + Tweet có thể chứa text, hashtags, metions, ảnh, video.
    + Tweet có thể hiển thị everyone hoặc twitter circle.
    + Tweet có thể quy định người reply (everyone, ng chúng ta follow, người chúng ta metions)

- Tweet sẽ có nested tweet, tức là tweet cha tweet con, không thể dùng nested object vì 16MB. query 1 Tweet con rất khó.
- Ta sẽ thêm trường `parent_id` để biết tweet này là con ai, null thì là tweet gốc.
- Tweet thường thì sẽ có `content` là string. Còn nếu là retweet thì sẽ ko có `content` mà chỉ có `parent_id` , lúc này có thể `content` là rỗng hoặc null.
- rống tuy chiểm bộ nhớ hơn null, nhưng tiện hơn.
- `audience` đại diện cho tính riêng tư của tweet, tweet có thể là public cho mọi ng hoặc chỉ cho 1 nhóm người. Nên `visibility` có thể là `TweetAudience` enum.

- `medias` là mảng ObjectId của các media. Vì mỗi tweet chỉ có thể có 1 vài media. Nếu upload ảnh thì ko thể upload đc video và ngc lại. Nên `medias` có thể là `Media[]`
- Lượt view thì chúng ta có thể chia ra làm 2 loại ; `guest_views` là số lượng lượt xem của tweet từ người dùng không đăng nhập. `user_views` cho đăng nhập.
- 2 trường này sẽ có kiểu là number.


```
interface Tweet {
    _id: ObjectId
    user_id: ObjectId
    type: TweetType
    audience: TweetAudience
    content: string
    parent_id: null | ObjectId
    hashtags: ObjectId[]
    mentions: ObjectId[]
    medias: Media[]
    guest_views: number
    user_views: number
    created_at: Date
    updated_at: Date
}

interface Media {
    url: string
    type: MediaType // video, image
}

enum MediaType {
    Image,
    Video
}

enum TweetAudience {
    Everyone, 
    TwitterCircle
}

enum TweetType {
    Tweet, 
    Retweet,
    Comment,
    QuoteTweet
}

```

# Bookmarks và likes collections
- Bookmark các tweet lại, mỗi user không giới hạn số lượng bookmark. 
- Không cần `updated_at` là vì trong trường hợp ng dùng unbookmark thì chúng ta sẽ xóa document này di.

```
interface Bookmark {
    _id: ObjectId
    user_id: ObjectId
    tweet_id: ObjectId
    created_at: Date
}

interface Like {
    _id: ObjectId
    user_id: ObjectId
    tweet_id: ObjectId
    created_at: Date
}

```


# hashtag collections
- Hỗ trợ tìm kiếm theo hashtag
- MỖi tweet có thể có ít hashtag.
- Mỗi hashtag có rất nhiều tweet.

```
interface Tweet {
    _id: ObjectId
    hashtags: string[]
    <!-- Không nên nhúng vào tweet như này, sẽ gây khó trong việc tìm kiếm những tweet nào có hashtag này, cũng như gây lặp lai dữ liệu về hashtag. -->
}


interface Tweet {
    _id: ObjectId
    hashtags: ObjectId[]
    <!-- Nên lưu dạng ObjectId[] -->
}

interface Hashtags {
    _id: ObjectId
    name: string
    created_at: Date
}

```

- Tạo 1 array ObjectId `hashtags` trong collection `tweets`

- Tạo 1 collection riêng để lưu `hashtags` và không lưu mảng `tweet_id` vào trong collection `hashtags` dễ tới 16MB.
- Khi search các tweet liên quan hashtag thì ta sẽ dùng id hashtag  để tìm trong colection `tweets`.
