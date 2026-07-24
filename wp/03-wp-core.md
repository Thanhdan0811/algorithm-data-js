### **Các Core Chính của WordPress (WP Core)**
WordPress Core là **phần lõi (nền tảng chính)** của WordPress, bao gồm **các file hệ thống, thư viện, API** giúp WordPress hoạt động. Nó được thiết kế **mở rộng** để lập trình viên có thể **tùy chỉnh mà không cần sửa trực tiếp vào core**.

---

## **1. Cấu trúc thư mục WordPress Core**
📂 **Thư mục gốc WordPress**
```
📂 wp-admin/          # Khu vực quản trị (Admin Panel)
📂 wp-includes/       # Thư viện và các hàm core
📂 wp-content/        # Theme, Plugin, Uploads (KHÔNG phải core)
📄 wp-config.php      # Cấu hình database
📄 .htaccess          # Cấu hình web server
📄 index.php          # Điểm vào của WordPress
📄 wp-load.php        # Load hệ thống WordPress
📄 wp-settings.php    # Load cấu hình WordPress
```
💡 **Lưu ý:**  
- `wp-content/` chứa **theme, plugin, media**, nhưng **không phải core**.  
- Không nên sửa trực tiếp file trong `wp-admin/` hoặc `wp-includes/`, vì **cập nhật WordPress sẽ ghi đè**.

---

## **2. Các Thành Phần Chính của WordPress Core**
WordPress Core bao gồm các **API chính** để giúp theme/plugin hoạt động mà không cần sửa trực tiếp vào hệ thống.

| **Thành phần** | **Chức năng** |
|--------------|--------------|
| **Database API** | Kết nối và thao tác với **MySQL Database** |
| **Options API** | Lưu trữ và lấy dữ liệu từ bảng `wp_options` |
| **Transients API** | Lưu dữ liệu tạm thời (cache) |
| **Query API** | Xử lý **truy vấn WP_Query** để lấy bài viết, trang |
| **Hooks (Actions & Filters)** | Cho phép **chèn, sửa đổi** chức năng mà không sửa core |
| **REST API** | Cho phép **lấy dữ liệu WordPress qua API** (JSON) |
| **Shortcode API** | Cho phép tạo shortcode `[custom_shortcode]` |
| **Filesystem API** | Quản lý file hệ thống (đọc, ghi, sửa) |
| **Theme API** | Quản lý theme và template |
| **Plugin API** | Quản lý plugin và các hook |
| **Cron API** | Lập lịch tự động trong WordPress |
| **Multisite API** | Hỗ trợ tạo **nhiều site trong 1 WordPress** |

---

## **3. Các File Core Quan Trọng**
📌 **Một số file quan trọng trong `wp-includes/`**
| **File** | **Chức năng** |
|---------|--------------|
| `wp-load.php` | Khởi tạo hệ thống WordPress |
| `wp-settings.php` | Load các file cần thiết để chạy WordPress |
| `wp-db.php` | Xử lý kết nối MySQL (Database API) |
| `class-wp-hook.php` | Quản lý các **hook (action, filter)** |
| `class-wp-query.php` | Xử lý WP_Query để lấy bài viết |
| `class-wp-rewrite.php` | Xử lý **permalinks (URL đẹp)** |
| `functions.php` | Chứa nhiều **hàm mặc định** của WordPress |
| `script-loader.php` | Quản lý `wp_enqueue_script()` và `wp_enqueue_style()` |
| `pluggable.php` | Chứa các hàm có thể **ghi đè** trong `functions.php` |

📌 **Một số file trong `wp-admin/`**
| **File** | **Chức năng** |
|---------|--------------|
| `admin.php` | Tải toàn bộ trang quản trị WordPress |
| `edit.php` | Giao diện quản lý bài viết trong admin |
| `theme-editor.php` | Trình chỉnh sửa theme trực tiếp |
| `plugin-editor.php` | Trình chỉnh sửa plugin trực tiếp |

---

## **4. WordPress Core Hoạt Động Như Thế Nào?**
1️⃣ **Người dùng truy cập website**  
2️⃣ `index.php` gọi `wp-load.php` để khởi động WordPress  
3️⃣ `wp-settings.php` tải toàn bộ hệ thống  
4️⃣ Chạy `wp-includes/class-wp-query.php` để lấy dữ liệu từ database  
5️⃣ Theme/Plugin sử dụng **Hooks, REST API, WP_Query** để hiển thị nội dung  
6️⃣ WordPress trả về HTML để hiển thị trên trình duyệt  

📌 **Mô hình hoạt động:**  
```
📥 Request từ User
   ⬇
📄 index.php → wp-load.php → wp-settings.php
   ⬇
🔄 Hooks, WP_Query, REST API xử lý dữ liệu
   ⬇
📄 Theme (header.php, index.php, footer.php)
   ⬇
📤 HTML xuất ra trình duyệt
```

---

## **5. Có thể sửa WordPress Core không?**
🚨 **KHÔNG NÊN!** 🚨  
- WordPress cập nhật thường xuyên, nếu bạn sửa core, **mọi thay đổi sẽ bị ghi đè**.  
- Thay vào đó, hãy dùng **Hooks (Actions & Filters)** hoặc **REST API** để mở rộng chức năng.  

📌 **Ví dụ sửa WordPress mà không chạm vào core:**
✔ **Thay đổi tiêu đề bài viết bằng Filter Hook**
```php
function modify_post_title($title) {
    return "🔥 " . $title;
}
add_filter('the_title', 'modify_post_title');
```
✔ **Chặn người dùng truy cập `wp-admin` nếu không phải Admin**
```php
function restrict_admin_access() {
    if (!current_user_can('manage_options') && !wp_doing_ajax()) {
        wp_redirect(home_url());
        exit;
    }
}
add_action('admin_init', 'restrict_admin_access');
```

---

## **6. Tổng Kết**
| **Thành phần** | **Vai trò** |
|--------------|------------|
| `wp-admin/` | Quản lý khu vực Admin |
| `wp-includes/` | Chứa thư viện, class, API WordPress |
| `wp-content/` | Theme, Plugin, Upload (không thuộc core) |
| `wp-config.php` | Cấu hình database |
| **Database API** | Quản lý MySQL của WordPress |
| **Hooks (Actions & Filters)** | Giúp mở rộng chức năng mà không sửa core |
| **REST API** | Kết nối WordPress với ứng dụng bên ngoài |

💡 **Lời khuyên:**  
✔ **Không sửa file trong `wp-includes/` hoặc `wp-admin/`**.  
✔ **Sử dụng `functions.php`, hooks và plugins để mở rộng WordPress**.  
✔ **Dùng `wp_enqueue_script()`, `wp_enqueue_style()` thay vì chỉnh sửa HTML trực tiếp**.  

Bạn muốn tìm hiểu sâu hơn phần nào trong WordPress Core? 🚀