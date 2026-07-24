<?php
/**
 * @alias         Blog Slider
 * @shortcode     [ifs_blog_slider]
 * @description   Blog Slider 3 items per slide
 */

add_shortcode("ifs_blog_slider", "ifs_blog_slider_shortcode");
function ifs_blog_slider_shortcode($atts, $content, $shortcode_tag){
	// extract values
	$atts = shortcode_atts([
		'heading_tag'        => 'h2',
		'heading_style'      => 'heading_3',
		'title'              => '',
		'ids'                => [],
		'autoplay'           => 'no',
		'autoplay_speed'     => 3,
		'loop'               => 'no',
		'ifs_bottom_spacing' => IFS_DEFAULT_SPACING,
		'return_value'       => true,
	], $atts, $shortcode_tag);
	extract($atts);
	
	// var
	$html  = '';
	$title = ifs_get_vc_heading("title", $atts);
	$ids   = $ids ? array_map('intval', explode(',', $ids)) : [];
	$class = ifs_get_vc_bottom_spacing($atts);
	
	// animation
	$class               .= ' ' . ev_vc_animation_class($css_animation);
	$animation_attribute = $css_animation ? 'data-vc-stagger' : '';
	
	// slider settings
	$class            .= ifs_get_vc_slider('class', $atts);
	$autoplay_speed   = ifs_get_vc_slider('autoplay_speed', $atts);
	$is_autoplay      = $autoplay === 'yes';
	$is_slider_loop   = $loop === 'yes';
	$flickity_options = [
		"pageDots"             => false,
		"prevNextButtons"      => false,
		"groupCells"           => 1,
		"cellAlign"            => "left",
		"wrapAround"           => $is_slider_loop,
		"autoPlay"             => $autoplay_speed,
		"pauseAutoPlayOnHover" => $is_autoplay,
	];
	
	// html
	$args = [
		'post_type'           => POST_TYPE,
		'posts_per_page'      => 6,
		'suppress_filters'    => false,
		'orderby'             => 'date',
		'order'               => 'DESC',
		'ignore_sticky_posts' => 1,
	];
	if(!empty($ids)){
		$args['posts_per_page'] = - 1;
		$args['post__in']       = $ids;
		$args['orderby']        = 'post__in';
		$args['order']          = 'ASC';
	}
	
	$blog_query = new WP_Query($args);
	if($blog_query->have_posts()){
		$count = $blog_query->post_count;
		$class .= $count === 1 ? ' has-single-item' : '';
		$class .= $count === 2 ? ' has-2-items' : '';
		$class .= $count > 1 && $count <= 3 ? ' has-less-items' : '';
		
		$html .= '<div class="ifs-blog-slider ' . $class . '" data-flickity-wrapper ' . $animation_attribute . '>';
		$html .= ifs_heading_slider($title); // title
		// slider
		$html .= '<div class="ifs-blog-slider__wrapper ifs-full-width overflow-hidden">';
		$html .= '<div class="ifs-blog-slider__items avoid-cls-slider ps-relative" data-flickity-responsive="' . ev_array_to_json($flickity_options) . '">';
		while($blog_query->have_posts()){
			$blog_query->the_post();
			ob_start();
			get_template_part('components/blog/partials/blog', 'grid');
			$html .= ob_get_clean();
		}
		$html .= '</div>';
		$html .= '</div>';
		
		$html .= '</div>';
	}
	wp_reset_postdata();
	
	return $html;
}

/**
 * Assets
 */

//enqueue styles
add_action('wp_enqueue_scripts', function(){
	if(ifs_show_blog_slider()){
		wp_enqueue_style('ifs-blog-slider');
	}
}, 15);

//enqueue scripts
add_action('wp_enqueue_scripts', function(){
	if(ifs_show_blog_slider()){
		wp_enqueue_script('ifs-flickity-extend');
	}
}, 12);

/**
 * Check shortcode
 */

function ifs_show_blog_slider(){
	return apply_filters('ifs_blog_slider_visible', ev_vc_has_shortcode('ifs_blog_slider'));
}