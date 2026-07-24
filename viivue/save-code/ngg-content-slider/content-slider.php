<?php
/**
 * @alias         Content Slider
 * @shortcode     [vii_content_slider]
 * @description   Content blocks marked with an icon in a navigable, multi-column slider format
 */

vc_lean_map('vii_content_slider', 'vii_content_slider_vc_settings');
function vii_content_slider_vc_settings(){
	return [
		"name"         => __("Content Slider", "ngg"),
		"base"         => "vii_content_slider",
		"description"  => __("Content blocks marked with an icon in a navigable, multi-column slider format", 'ngg'),
		"weight"       => - 100,
		"category"     => VC_CATEGORY,
		"as_parent"    => ['only' => 'vii_content_slider_child'],
		"is_container" => true,
		"js_view"      => 'VcColumnView',
		"params"       => [
			vc_map_add_css_animation(),
			...vii_get_vc_slider(['param' => 'autoplay']),
		],
	];
}

add_shortcode("vii_content_slider", "vii_content_slider_shortcode");
function vii_content_slider_shortcode($atts, $content, $shortcode_tag){
	// extract values
	$atts = vc_map_get_attributes($shortcode_tag, $atts);
	extract($atts);

	// var
	$html  = '';
	$class = $vii_bottom_spacing;

	// animation
	$animation_class     = ev_vc_animation_class($css_animation);
	$animation_attribute = $css_animation ? 'data-vc-stagger' : '';

	// slider settings
	$class            .= vii_get_vc_slider('class', $atts);
	$autoplay_speed   = vii_get_vc_slider('autoplay_speed', $atts);
	$is_autoplay      = $autoplay === 'yes';
	$flickity_options = [
		"contain"              => true,
		"fade"                 => false,
		"pageDots"             => false,
		"prevNextButtons"      => false,
		"cellAlign"            => "left",
		"wrapAround"           => false,
		"autoPlay"             => $autoplay_speed,
		"pauseAutoPlayOnHover" => $is_autoplay,
	];

	$total = substr_count($content, '[/vii_content_slider');
	$class .= ' has-' . $total . '-items';

	// html
	$html .= '<div class="vii-content-slider vii-full-width ' . $class . ' ' . $animation_class . '" ' . $animation_attribute . ' style="--total-items: ' . $total . ';" >';

	$html .= '<div class="vii-content-slider__inner ps-sticky">';
	$html .= '<div class="vii-content-slider__inner_scroll ps-absolute d-flex">';
	$html .= do_shortcode($content);
	$html .= '</div>';
	$html .= '</div>';

	$html .= '</div>';

	return $html;
}

/**
 * Content Slider > Child
 */

vc_lean_map('vii_content_slider_child', 'vii_content_slider_child_vc_settings');
function vii_content_slider_child_vc_settings(){
	return [
		"name"     => __("Content Slider Item", "eevee"),
		"base"     => "vii_content_slider_child",
		"as_child" => ['only' => 'vii_content_slider'],
		"params"   => [
			[
				"type"             => "dropdown",
				"heading"          => __('Icon type', 'eevee'),
				"param_name"       => 'icon_type',
				'value'            => [
					__("Icomoon", "eevee") => "icon",
					__("Image", "eevee")   => "image",
				],
				"admin_label"      => true,
				'save_always'      => true,
				'edit_field_class' => 'vc_col-xs-6',
			],
			[
				'type'             => 'icomoon_class',
				'heading'          => __('Icon', 'eevee'),
				'param_name'       => 'icon',
				'admin_label'      => true,
				'dependency'       => [
					'element' => 'icon_type',
					'value'   => "icon",
				],
				'edit_field_class' => 'vc_col-xs-6',
			],
			[
				'type'             => 'attach_image',
				'heading'          => __('Image', 'eevee'),
				'param_name'       => 'image',
				'admin_label'      => true,
				'dependency'       => [
					'element' => 'icon_type',
					'value'   => "image",
				],
				'edit_field_class' => 'vc_col-xs-6',
			],
			...vii_get_vc_heading(['default_tag' => 'p', 'default_style' => 'heading_4',]),
			[
				'type'       => 'textarea_html',
				'heading'    => __('Content', 'eevee'),
				'param_name' => 'content',
				'holder'     => 'div',
			],
		],
	];
}

add_shortcode("vii_content_slider_child", "vii_content_slider_child_shortcode");
function vii_content_slider_child_shortcode($atts, $content, $shortcode_tag){
	// extract values
	$atts = vc_map_get_attributes($shortcode_tag, $atts);
	extract($atts);

	// var
	$html      = '';
	$title     = vii_get_vc_heading("title", $atts);
	$image_tag = ev_get_attachment_image($image, false, 'medium');
	$class     = $vii_bottom_spacing;
	$class     .= ' type-' . $icon_type;

	// html
	$html .= '<div class="vii-content-slider__item no-margin-bottom ' . $class . '">';
	$html .= '<div class="vii-content-slider__item-inner bg-light-gray h100">';

	$html .= '<div class="vii-content-slider-header-img ">';
	// icon/image
	$html .= '<div class="vii-content-slider__image txt_color_primary t">';

	if($icon_type === 'icon'){
		$html .= '<i class="icon ' . $icon . '"></i>';
	}else{
		$html .= '<div class="image img-wrapper-contain">';
		$html .= $image_tag;
		$html .= '</div>';
	}

	$html .= '</div>';

	// title
	$html .= $title ? '<div class="vii-content-slider__item-heading mb20 wpb_text_column">' . $title . '</div>' : '';
	$html .= '</div>';
	// content
	if(ev_is_content_not_empty($content)){
		$html .= '<div class="vii-content-slider__item-content ps-relative overflow-hidden t">';
		$html .= '<div class="wpb_text_column">';
		$html .= ev_wpb_js_remove_wpautop($content);
		$html .= '</div>';
		$html .= '</div>';
	}

	$html .= '</div>';
	$html .= '</div>';

	return $html;
}

// Extend Classes
if(class_exists('WPBakeryShortCodesContainer')){
	class WPBakeryShortCode_vii_content_slider extends WPBakeryShortCodesContainer{
	}
}
