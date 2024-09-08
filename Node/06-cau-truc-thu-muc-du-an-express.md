- folder gốc
```
folder-goc
    fd-dist
    fd-src
        fd-constants
            enum.ts
            httpStatus.ts
            message.ts
        fd-controllers
            users.controllers.ts
        fd-middlewares
            error.middlewares.ts
            file.middlewares.ts
            users.middlewares.ts
            validation.middlewares.ts
        fd-models
            fd-database
                Blacklist.ts
                Bookmark.ts
                Follower.ts
                Hashtag.ts
                Like.ts
                Media.ts
                Tweet.ts
                User.ts
            Error.ts
            Success.ts
        fd-routes
            users.routes.ts
        fd-services
            bookmarks.services.ts
            database.services.ts
            followers.services.ts
            hashtags.services.ts
            likes.services.ts
            medias.services.ts
            tweets.services.ts
            users.services.ts
        fd-utils
            crypto.ts
            email.ts
            file.ts
            helpers.ts
            jwt.ts
        index.ts
        type.d.ts


```

- thư mực dist chưa code build dự án.
- constants
- controllers : xử lý logic.
- middlewares : bộ tiền xử lý, bộ lọc, validations.
- services : là nơi xử lý các câu lệnh query, controller sẽ gọi đến services.

