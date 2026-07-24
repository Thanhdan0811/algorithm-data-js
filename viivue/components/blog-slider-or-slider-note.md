```php file bcnb blog slider ref
	$blog_query = new WP_Query($args);
	if($blog_query->have_posts()){
		$count = $blog_query->post_count;
		$class .= $count === 1 ? ' has-single-item' : '';
		$class .= $count === 2 ? ' has-2-items' : '';
		$class .= $count <= 3 ? ' has-less-items' : '';

		$html .= '<div class="bcnb-blog-slider ' . esc_attr($class) . '" ' . $animation_attribute . ' data-flickity-wrapper>';

		// header
		$html .= '<div class="bcnb-blog-slider__header fl-center-v mb45">';
		$html .= $title ? '<div class="bcnb-blog-slider__title wpb_text_column">' . $title . '</div>' : ''; // title
		$html .= '<div class="hidden-tablet-v ml-auto">' . bcnb_flickity_arrows_html('bcnb-blog-slider__nav') . '</div>'; // arrows
		$html .= '</div>'; // bcnb-blog-slider__header

		// items
		$html .= '<div class="bcnb-blog-slider__wrapper bcnb-full-width overflow-hidden ' . $animation_class . '">';
		$html .= '<div class="bcnb-blog-slider__items avoid-cls-slider ps-relative" data-flickity-responsive="' . ev_array_to_json($flickity_options) . '">';
		while($blog_query->have_posts()){
			$blog_query->the_post();
			ob_start();
			get_template_part('components/blog/partials/blog');
			$html .= ob_get_clean();
		}
		$html .= '</div>'; // bcnb-blog-slider__items
		$html .= '</div>'; // bcnb-blog-slider__wrapper

		// button
		$html .= $button ? '<div class="bcnb-blog-slider__button ta-center">' . $button . '</div>' : '';

		$html .= '</div>';
	}
```

```CSS file
/*********************************************
 * Blog Slider
**********************************************/
.bcnb-blog-slider {
    --slider-gap:var(--bcnb-gap-container);
    --slider-w:calc((var(--bcnb-container) + var(--slider-gap)) / 3);
}

/* header */
.bcnb-blog-slider__header {gap:10px var(--bcnb-gap-container);}
.bcnb-blog-slider:has(.is-cannot-slide) .bcnb-blog-slider__header:not(:has(.wpb_text_column)) {margin-bottom:0;}

/* slider */
.bcnb-blog-slider__items {
    padding-left:calc(var(--bcnb-gap-side) - .5px);padding-right:var(--bcnb-gap-side);
    margin:0 calc(-1 * var(--slider-gap) / 2);
}
.bcnb-blog-slider .bcnb-blog-item {
    width:var(--slider-w);
    padding:0 calc(var(--slider-gap) / 2);
}

/* button todo: FE replace this CSS by atomic class */
.bcnb-blog-slider__button {padding-top:var(--bcnb-spacing-45);}


/*********************************************
 * Blog Slider - Responsive
**********************************************/
@media only screen and (min-width:1560px) {
    .bcnb-blog-slider {--slider-gap:1.1vw;}
}
@media only screen and (max-width:920px) {
    .bcnb-blog-slider,
    .bcnb-blog-slider.has-less-items {--slider-w:calc((var(--bcnb-container) + var(--slider-gap)) / 2.2);}
}
@media only screen and (max-width:920px) and (min-width:769px) {
    .bcnb-blog-slider:is(.has-2-items, .has-single-item) {--slider-w:calc((var(--bcnb-container) + var(--slider-gap)) / 2);}
}
@media only screen and (min-width:769px) {
    .bcnb-blog-slider {overflow:hidden;}
}
@media only screen and (max-width:768px) {
    .bcnb-blog-slider,
    .bcnb-blog-slider.has-less-items {
        --slider-w:calc((var(--bcnb-container) + var(--slider-gap)) / 1.5);
        --slider-gap:var(--bcnb-gap-container);
    }
    .bcnb-blog-slider__items .flickity-viewport {overflow:visible;}
}
@media only screen and (max-width:480px) {
    .bcnb-blog-slider,
    .bcnb-blog-slider.has-less-items {--slider-w:calc((var(--bcnb-container) + var(--slider-gap)) / 1.1);}
    .bcnb-blog-slider.has-single-item {--slider-w:calc(var(--bcnb-container) + var(--slider-gap));}
}

```

- Flow làm:

1. Style header title trước nếu có. kamai giờ blog slider
2. Style blog item trước , kimai giờ blog oveview
   Check cắt ảnh không có border radius
   Check style title, color, font, margin bottom, border radius, border
   Check thêm design xem có gì thêm như effect này kia.
   Check case trong trường hợp background trắng, background trong txt_color_white.
   Check case hover đổi màu text, hiệu ứng button cta nếu có,
   Check hover vào item kích hiệu ứng hover

3. Style blog slider
   Tạo Demo SLider full có loop, full không loop, 4 items, 3 items, 2 items, 1 items.
   Check nếu có header title: style, font, margin bottom.
   Check khi không có header thì nav vẫn giữ bên phải.
   Check gap giữ các items.
   Từ màn hình 1180px trở lên có thể ẩn phần items dư ra đi.
   Từ màn hình 1180 hoặc 1024 trờ xuống thì có thể show phần items dư ra do ẩn cái nav đi rồi.
