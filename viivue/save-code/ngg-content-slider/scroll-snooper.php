<?php
/**
 * @alias    Scroll Snooper
 * @author-uri https://github.com/phucbm/scroll-snooper
 * @version  1.2.2
 */
add_action('wp_enqueue_scripts', 'vii_scroll_snooper_scripts');
function vii_scroll_snooper_scripts(){
	$scroll_snooper_version = '1.2.2';

	wp_register_script('vii-scroll-snooper', ev_get_vendor_url(__FILE__) . '/js/scroll-snooper.min.js', false, $scroll_snooper_version, true);

	// enqueue sample
	wp_enqueue_script('vii-scroll-snooper');
}
