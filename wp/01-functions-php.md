


```
<?php 

    function basic_wp_files() {
        // load css file,
        // method wp_enqueue_style nhận vào 2 args
        // 1 là nickname cho style , gì cũng đc
        // 2 là location point đến style file.
        // get_stylesheet_uri() lấy style.css mặc định bên ngoài.
        wp_enqueue_style('basic_wp_main_styles', get_stylesheet_uri());
    }

    add_action('wp_enqueue_scripts', 'basic_wp_files');
    //  Tham số đầu cho biết loại action cần làm, 
    // Tham số thứ 2 là tên function sẽ chạy.
    // wp_enqueue_scripts : nói cho wp biết là sẽ cần load file

?>

```

- Tại sao 1 vài functions cần echo , 1 vài cái thì không ?
- function bắt đầu bằng `get` (`get_the_id();`) thì sẽ return về value không phải là echo ra.
- function khác đa phần sẽ trả về value đã `echo`.
