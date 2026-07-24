- thẻ a có thuộc tính rel liên quan đến bảo mật. rel = "noopener noreferrer";


- thẻ sematics 
- header, footer
- aside thẻ bên trái phải.
- menu thì dùng thẻ nav
- main là chính.

- section 
- article tượng trưng cho bài viết.
- iframe nhúng nguồn vào.
- span dành cho đoạn chữ ngắn
- strong in đậm
- em là italic nghiêng
- b như trong, i như em.


- phân biệt thẻ inline và block.

- Liên kết thì dùng a, văn bản thì dùng p, 
- khối thì dùng dev hoặc sematic.
- custom attribute : data-name


# BEM : Block Element Modifier
- Block__ELement--modifier
- Block--modifier
- Block__Element
- Ví dụ : laptop, laptop__keyboard, laptop__touchpad, laptop--small, laptop-expensive, laptop__touchpad--smooth.


```
<div class="dropdown">
    <div class="dropdown__select">
      <span class="dropdown__selected"></span>
      <i class="fa fa-caret-down dropdown__caret"></i>
    </div>

    <div class="dropdown__list">
      <div class="dropdown__item">
        <span class="dropdown__title"></span>
        <i class="fa fa-plus dropdown__icon"></i>
      </div>
    </div>
  </div>

// HOặc

<div class="dropdown">
    <div class="dropdown__select">
      <span class="dropdown__select_selected"></span>
      <i class="fa fa-caret-down dropdown__select_caret"></i>
    </div>

    <div class="dropdown__list">
      <div class="dropdown__list_item">
        <span class="dropdown___list_item_title"></span>
        <i class="fa fa-plus dropdown__list_item_icon"></i>
      </div>
    </div>
  </div>

```