- Quy trình làm :
- `Cần phải linh động, tìm solution nhanh nhất nhưng cũng phải đúng`
- `Chủ động hỏi`

# Ảnh thì thường phải có

- aspect ratio ở div,
- ev_get_attachment_image check hàm php này, thông số thứ 3 check wrapper ảnh là bao nhiêu chỉnh cho nó gần nhất để giảm load size.
- check class img-wrapper-cover thì phải có thêm skeleton-bg, còn nếu là img-wrapper-contain thì không cần.

- Radius thì thường nên đúng thiết kế, từ trên xuống mobile.
- Các phần có thể click thì chú ý thêm hover và focus-visible.
- Item mà có chữ và ảnh người thì không nên làm opacity mờ nó.
- Nếu có ảnh người và text thì không cho text cho mặt người.
- Kiếm tra lại các class không dùng, dư thừa.
- Spacing giữa các item nếu dùng grid hoặc flex thì nên bằng hoặc nhỏ hơn 2 cạnh container.
- Với card ở mobile thì spacing nên bằng nhau, spacing giữ các nội dung nên hợp lí.

# Trước khi code:

- file css, cần có comment lớn.
- File css, khi code hover, focus thì hạn chế thay đổi focus visible, nếu xấu mới thay đổi.
- File css, Nếu selector là duy nhất rồi thì không cần parent trước đó.
- Đặt tên variable đồng nhất và ko đặt dư.

- form : file gravityform.css để custom form field,
- vc-gravityfrom để style layout form.
- form-style-varialbes thêm các biến cho txt_color_white.

- Code ưu tiên automic class.

## Cắt hình.

- Cắt hình : Size cắt theo hình : 480 - 768 - 1024 - 1280 - 1440 -1920
- khi cắt thì nhân x2 lên, mà bị default như 1920 thì chỉ cắt 1920.
- image -> resize ; - xuất hình => file => export => export as => jpg
- image size => ko quá 1 MB, Jpeg option chọn high là đủ.

# Trước khi push

- Check lại tất cả các file đã làm : php, css, js.
- Xem lại format code trước khi push.
- Check comment, spacing và format. comment cách xuống 1 hàng.
- variable css và style không viết chung 1 line.

# Các class :

- a11y-focus : để tọa hiệu ứng focus-visible nếu đó không phải là thẻ a hoặc button.
- đọc class hover-trigger để phóng to ảnh khi hover :

```css
.vii-hover-image img {
  transition: transform 0.3s;
}

.hover-trigger:hover .vii-hover-image:before,
a.vii-hover-image:hover:before,
a:hover .vii-hover-image:before {
  opacity: 0.3;
}
.hover-trigger:hover .vii-hover-image img,
a.vii-hover-image:hover img,
a:hover .vii-hover-image img {
  transform: scale(1.05);
}
```

- dàn layout grid theo flex :

```html
<div
  class="
    fl-center flex-grid-template 
    flex-grid-col-4 md:flex-grid-col-3 tablet-v:flex-grid-col-2 xs:flex-grid-col-1 flex-grid-gap-32 
    md:flex-grid-gap-16
"
></div>
```

- các class liên quan image

```html
<div class="skeleton-bg img-wrapper-cover | container "></div>
```

# Slider

- nếu có button cần nằm bên ngoài `view-port div` thêm attribute sau : `data-flickity-wrapper` ở ngoài div wrapper.
- Lấy flickity bằng : `Flickity.data(element)`;

## blog slider of deep c

```js
document.querySelectorAll(".vii-blog-slider").forEach((wrapper) => {
  const blogSliderItemsElement = wrapper.querySelector(
    ".vii-blog-slider__items",
  );
  const flik = Flickity.data(blogSliderItemsElement);
  const slidesCount = flik.slides?.length || 1;
  const blogSliderNav = wrapper.querySelector(".vii-blog-slider__nav");
  const navigationCustom = wrapper.querySelector(".flickity-navigation-custom");
  const processScroll = (progress = 0) => {
    if (!navigationCustom) return;

    // desktop show 4 sliders.
    let maxSlider = 4;

    // These innerWidth values should match the CSS media queries for the slider
    if (window.innerWidth <= 480) {
      maxSlider = 1;
    } else if (window.innerWidth <= 768) {
      maxSlider = 2;
    } else if (window.innerWidth <= 1023) {
      maxSlider = 3;
    }
    let countTemp = slidesCount - maxSlider;

    /* total sliders more than max slider can show. then not slide, otherwise slide and show nav slider. */
    const lineWidth = 100 / (countTemp <= 0 ? -1 : countTemp + 1);
    blogSliderNav.style.display = lineWidth <= 0 ? "none" : "";
    navigationCustom.style.setProperty("--line-width", lineWidth + "%");
    navigationCustom.style.setProperty("--progress", progress.toFixed(3));
  };
  processScroll();
  flik.on("scroll", function (progress) {
    processScroll(progress);
  });
});
```

```css
.flickity-navigation-custom__line {
  /* --line-width and --progress are from js */
  width: var(--line-width, 100%);
  left: calc((100% - var(--line-width, 100%)) * var(--progress, 0));
  position: absolute;
  display: inline-block;
  top: 0;
  bottom: 0;
  background-color: var(--vii-color-primary);
}
```

- fix CLS

# Làm footer

- thêm `#year` cho @year
- Gắn link cho logo
- Dùng custom menu cho list menu.
- Sdt dùng link `tel:(+84)02838104462`.
- Mở grid chia cột, nếu chưa đúng gán id và style max-widht.
- Link của viivue thì open in new tab.

- Chính sách bảo mật, điều khoản dịch vụ sẽ nằm ở trên.
- Site by Viivue là đi chung.
- All rights reserved là đi chung.

# process svg to url

- cắt export svg
- https://jakearchibald.github.io/svgomg/ vào trang này làm sạch và copy code lại.
- goolge chọn svg to base 64 và copy code. https://codebeautify.org/svg-to-base64-converter

# Note

- Check lại hình nhập sát như design ko chừa khoảng trắng.
- Check lại số cột bám sát design

# container-type:inline-size;

- Dùng `container-type:inline-size;` ở parent để tính toán w, h ở child bằng `100cqi`;

```Ex: Success Software -> linked icons component

.ifs-linked-icons {
    --img-size:180px;

    width:clamp(920px, 78.8vw, 100%);
    max-width:100%;
    container-type:inline-size;
}
.ifs-linked-icons-less-than-4-items .ifs-linked-icons__inner {
    --gap-column:calc((100cqi - (4 * var(--img-size))) / 3);

    column-gap:var(--gap-column);width:fit-content;
}

```

1.Những điều học được qua các project của công ty:

- Clean code css, js, cải thiện code được phần nào. cắt ảnh, animation.
- Dùng AI cơ bản, claude code.
- Trải nghiệm nhiều layout design khác nhau.

  2.Những điểm yếu cần cải thiện trong thời gian sắp tới:

- kỹ năng code cần cải thiện làm nhanh hơn và hiệu quả hơn.
- Dùng AI hiệu quả hơn.
- Cải thiện giao tiếp trao đổi với team và mọi người trong công ty.

  3.Dự định sắp tới

- Cải thiện điểm yếu ở số 2.
- Đủ khả năng nhận các task về animation khó hơn.
- Ít revise hơn.

  4.Hỗ trợ

- Hỗ trợ về mặt code Khi gặp khó khăn.
- Hỗ trợ gợi ý về cách dùng AI tốt hơn.

  5.Mức lương mong muốn

- Hi vọng có thể tăng từ 3tr đến 5tr so với mức lương hiện tại.

# Trước khi code.

- Hỏi lại thông tin task trước, nêu cách hiểu bản thân. xog tìm giải pháp, có thể hỏi xác nhận lại giải pháp và làm.
