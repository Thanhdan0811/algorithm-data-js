

# the loop
- `the_title()` : trả về title của post/blog
- `the_content()`: trả về content của post/blog
- `the_permalink`: link dẫn đến chi tiết post/blog.
- `the_post`: lấy post/blog hiện tại.
- `have_posts()`: loop đến khi hết post.
```
<?php 

    // loop while still have post
    while(have_posts()) {
        // keep track which post currently working with.
        the_post(); ?>
        <h2>
            <!-- Link này sẽ dẫn đến single.php , xem chi tiết của post. -->
            <a href="<?php the_permalink() ?>">
                Hello <?php the_title() ?>
            </a>
        </h2>
        <p><?php the_content() ?></p>
        <hr />
    <?php

    }

?>

```

# header, footer
- `get_header();` : chèn file header.php
    + `wp_head()` : gọi bên trong thẻ head, chèn css, js, meta tags, google fonts.. cho cả plugins, theme.
- `get_footer()` : chèn file footer.php
    + `wp_footer();`: điểm kết thúc và hiện admin bar lên. gọi trước thẻ đóng body. tải js file, analytics, tracking scripts.

- `wp_add_inline_style` : viết style ở inline.