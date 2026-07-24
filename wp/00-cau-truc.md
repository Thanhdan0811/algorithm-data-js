
- codex.wordpress.org
- developer.wordpress.org


Cấu trúc code trong **WordPress (WP)** có thể được chia thành nhiều cấp độ, tùy vào bạn đang làm gì:  
- **Phát triển theme (giao diện)**  
- **Phát triển plugin (chức năng mở rộng)**  
- **Tùy chỉnh core WordPress (ít khi làm)**  

Dưới đây là cấu trúc chuẩn khi lập trình WordPress.  

---

## **1. Cấu trúc thư mục của một Theme WordPress**
📂 `wp-content/themes/your-theme/`  
└── 📄 `style.css` *(File quan trọng, chứa thông tin theme)*  
└── 📄 `functions.php` *(Nạp các tính năng mở rộng cho theme)*  
└── 📄 `index.php` *(File chính để hiển thị trang web)*  
└── 📄 `header.php` *(Phần đầu trang - Header)*  
└── 📄 `footer.php` *(Phần cuối trang - Footer)*  
└── 📄 `sidebar.php` *(Thanh sidebar nếu có)*  
└── 📄 `single.php` *(Giao diện chi tiết bài viết)*  
└── 📄 `page.php` *(Giao diện trang tĩnh)*  
└── 📄 `archive.php` *(Trang danh mục, lưu trữ bài viết)*  
└── 📄 `search.php` *(Trang kết quả tìm kiếm)*  
└── 📄 `404.php` *(Trang lỗi 404)*  
└── 📂 `assets/` *(Chứa hình ảnh, CSS, JS...)*  
└── 📂 `templates/` *(Lưu các file mẫu tái sử dụng)*  

### 🔹 **Giải thích nhanh:**
- **`style.css`** → Bắt buộc, chứa metadata của theme.  
- **`functions.php`** → File quan trọng, nạp các tính năng như đăng ký menu, enqueue CSS/JS, tạo post type...  
- **`index.php`** → File chính của theme, là điểm cuối nếu WP không tìm thấy template phù hợp.  
- **`header.php`, `footer.php`, `sidebar.php`** → Chia nhỏ giao diện để dễ quản lý.  
- **`single.php`, `page.php`, `archive.php`...** → Điều khiển cách hiển thị bài viết, trang, danh mục...  

📌 **Ví dụ:**
Khi mở một bài viết, WordPress sẽ tìm file **single.php**. Nếu không có, nó dùng **index.php**.

---

## **2. Cấu trúc code trong file `functions.php`**
Trong file này, bạn sẽ thêm các **hook**, **filter**, **custom post type**, **enqueue scripts**, v.v.

🔹 **Ví dụ đăng ký menu trong `functions.php`:**
```php
function my_theme_setup() {
    register_nav_menu('primary', 'Main Menu');
}
add_action('after_setup_theme', 'my_theme_setup');
```
📌 **Kết quả:** Thêm menu để quản lý trong WordPress.

🔹 **Ví dụ thêm CSS & JS vào theme**
```php
function my_theme_scripts() {
    wp_enqueue_style('main-style', get_stylesheet_uri());
    wp_enqueue_script('custom-js', get_template_directory_uri() . '/js/custom.js', array('jquery'), false, true);
}
add_action('wp_enqueue_scripts', 'my_theme_scripts');
```

---

## **3. Cấu trúc của Plugin WordPress**
📂 `wp-content/plugins/my-plugin/`  
└── 📄 `my-plugin.php` *(File chính của plugin, bắt buộc)*  
└── 📄 `functions.php` *(Chứa các function phụ trợ, nếu cần)*  
└── 📂 `includes/` *(Chứa các file logic chính, nếu plugin lớn)*  
└── 📂 `assets/` *(Chứa CSS, JS, hình ảnh...)*  
└── 📂 `templates/` *(Chứa giao diện riêng của plugin)*  

🔹 **Ví dụ file `my-plugin.php`:**
```php
<?php
/*
Plugin Name: My Custom Plugin
Description: Plugin đơn giản hiển thị thông báo.
Version: 1.0
Author: Bạn
*/

function my_plugin_message() {
    return '<p>Chào mừng bạn đến với website!</p>';
}
add_shortcode('welcome_message', 'my_plugin_message');
?>
```
📌 **Kết quả:** Khi dùng `[welcome_message]` trong bài viết, nó hiển thị `"Chào mừng bạn đến với website!"`.

---

## **4. Cấu trúc Code trong Template Theme**
### 🔹 **File `index.php` cơ bản**
```php
<?php get_header(); ?>

<main>
    <?php 
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            the_title('<h2>', '</h2>');
            the_content();
        }
    } else {
        echo '<p>Không có bài viết nào.</p>';
    }
    ?>
</main>

<?php get_footer(); ?>
```
📌 **Giải thích:**
- `get_header()` → Gọi `header.php`.  
- `have_posts()` → Kiểm tra nếu có bài viết.  
- `the_post()` → Lấy dữ liệu bài viết hiện tại.  
- `the_title()` → Hiển thị tiêu đề bài viết.  
- `the_content()` → Hiển thị nội dung bài viết.  
- `get_footer()` → Gọi `footer.php`.  

---

## **5. Cấu trúc WordPress Hooks (Action & Filter)**
### 🔹 **Action Hooks (Thực hiện một hành động)**
```php
add_action('wp_footer', function() {
    echo '<p>Đây là footer!</p>';
});
```
📌 **Kết quả:** Thêm đoạn text vào cuối trang.

### 🔹 **Filter Hooks (Chỉnh sửa dữ liệu trước khi hiển thị)**
```php
add_filter('the_title', function($title) {
    return '🔥 ' . $title;
});
```
📌 **Kết quả:** Mọi tiêu đề bài viết sẽ có biểu tượng 🔥 trước tiêu đề.

---

## **6. Cấu trúc Query WP (Lấy dữ liệu bài viết)**
🔹 **Query mặc định trong vòng lặp:**
```php
if (have_posts()) {
    while (have_posts()) {
        the_post();
        the_title('<h2>', '</h2>');
        the_excerpt();
    }
}
```
📌 Lấy danh sách bài viết mới nhất.

🔹 **Query Custom (WP_Query)**
```php
$my_query = new WP_Query(array(
    'post_type' => 'post',
    'posts_per_page' => 5
));
if ($my_query->have_posts()) {
    while ($my_query->have_posts()) {
        $my_query->the_post();
        the_title('<h3>', '</h3>');
    }
}
wp_reset_postdata();
```
📌 **Giải thích:**
- `WP_Query` → Truy vấn bài viết theo điều kiện tùy chỉnh.  
- `'post_type' => 'post'` → Lấy bài viết thường.  
- `'posts_per_page' => 5` → Chỉ lấy 5 bài.  
- `wp_reset_postdata();` → Trả lại dữ liệu bài viết mặc định sau query.

---

## **7. Tổng kết**
- **Làm theme**: Chỉnh sửa các file `functions.php`, `style.css`, `index.php`, v.v.  
- **Làm plugin**: Tạo file `my-plugin.php` với các hook và shortcode.  
- **Dùng hook**: `add_action()` để thực hiện hành động, `add_filter()` để chỉnh sửa nội dung.  
- **Query bài viết**: Dùng `WP_Query` để lấy bài viết theo điều kiện.  

Bạn muốn tập trung vào phần nào trước? (Làm theme, plugin, tối ưu WP, hay tạo site affiliate?) 🚀