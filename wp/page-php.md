- Lấy title của page : `the_title();`;
- Lấy title của page theo id: `get_the_title(get_the_ID());`;
- Lấy content của page : `the_content();`;
- Lấy ảnh từ file ở theme ; `echo get_theme_file_uri();`;

- Thay đổi title theo từng trang, viết trong `functions.php` : 
```
function university_features() {
        add_theme_support('title-tag');
    }
    // action đổi title theo từng page
    add_action('after_setup_theme', 'university_features' );


==> title sẽ có dạng : title page - title site 
- để đổi title site thì vào cái general để đổi.

```

- Lấy url của page/blog, site : `<?php echo site_url('/about-us') ?>`, vào header hoặc page nào cần có url thì dùng.


- Lấy id của post/page : `echo get_the_ID();`;

- Lấy id của parent của post/page : `echo wp_get_post_parent_id();`;
- Lấy id parent của page/page với id hiện tại: `wp_get_post_parent_id(get_the_ID())`;
- Lấy link theo id : `get_permalink( wp_get_post_parent_id(get_the_ID()) )`;
- Lấy language : `<html <?php language_attributes(); ?>>`;
- Set charset : `<meta charset="<?php bloginfo('charset'); ?>">`
- Tự động add các class vào body liên quan đến page/post như id này kia : `<body <?php body_class(); ?> >`;

- active link : `<li <?php if (is_page('about-us') or wp_get_post_parent_id(0) == 17) echo 'class="current-menu-item"' ?> `

# Set custom trang nào là front-page nào là post.
- Vào `Settings` => `Reading` => chọn `A static page`


# Archives (Category, author, date, etc...)
- archive.php

# Custom queries.
- wp query content dựa vào url hiện tại.
- custom query cho phép ta chọn cái mà ta muốn.
ss