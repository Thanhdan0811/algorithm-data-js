/\*\*

- Patch TinyMCE windowManager.open to prevent Classic block popup
- from auto-triggering in Tablet/Mobile preview mode.
  \*/
  add_action('enqueue_block_editor_assets', function(){
  wp_add_inline_script('wp-edit-post', '
  (function(){
  function getDeviceType(){
  const editPost = wp.data.select("core/edit-post");
  return editPost?.\_\_experimentalGetPreviewDeviceType?.() || "Desktop";
  }

      		function patchEditor(editor){
      			const wm = editor.windowManager;
      			if(!wm || wm._viiPatched) return;
      			wm._viiPatched = true;
      			const originalOpen = wm.open.bind(wm);
      			wm.open = function(){
      				if(getDeviceType() !== "Desktop") return;
      				return originalOpen.apply(this, arguments);
      			};
      		}

      		if(typeof tinymce !== "undefined"){
      			tinymce.on("AddEditor", function(e){ patchEditor(e.editor); });
      		}

      		wp.data.subscribe(function(){
      			if(typeof tinymce === "undefined") return;
      			if(getDeviceType() === "Desktop") return;
      			tinymce.editors.forEach(patchEditor);
      		});
      	})();
      ', "after");

  });

/\*\*

- Inject content_css and style_formats into all TinyMCE instances (inline + popup),
- so Classic block formats are consistent in both Desktop and Tablet/Mobile modes.
  \*/
  add_filter('tiny_mce_before_init', 'vii_tinymce_settings');
  function vii_tinymce_settings($settings){
	$extra                           = THEME_URL . '/assets/css/variables.css,' . THEME_URL . '/editor-style.css';
	$settings['content_css']         = !empty($settings['content_css'])
  ? $settings['content_css'] . ',' . $extra
  : $extra;
  $settings['style_formats_merge'] = false;
  return $settings;
  }
