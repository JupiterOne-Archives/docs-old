jQuery(document).ready(function($){

  $(window).on('load', function() {
    var copyid = 0;
		$('pre').each(function(){
			copyid++;
			$(this).attr('data-copyid', copyid).wrap('<div class="pre-wrapper" />');
			$(this).parent().css('margin', $(this).css('margin'));
			$(this).parent().css('width',  $(this).width() + 'px');
			$('<button class="copy-snippet">Copy</button>').insertAfter( $(this) ).data('copytarget', copyid);
		});
  });
	
	$('body').on( 'click', '.copy-snippet', function(ev){
		ev.preventDefault();

		var $copyButton = $(this);

		$pre = $(document).find('pre[data-copyid=' + $copyButton.data('copytarget' ) + ']');
		if ( $pre.length ) {
			var textArea = document.createElement("textarea");

			// Place in top-left corner of screen regardless of scroll position.
			textArea.style.position = 'fixed';
			textArea.style.top = 0;
			textArea.style.left = 0;

			// Ensure it has a small width and height. Setting to 1px / 1em
			// doesn't work as this gives a negative w/h on some browsers.
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			
			// We don't need padding, reducing the size if it does flash render.
			textArea.style.padding = 0;

			// Clean up any borders.
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';

			// Avoid flash of white box if rendered for any reason.
			textArea.style.background = 'transparent';

			//Set value to text to be copied
      var div = document.createElement('div');
      div.innerHTML = $pre.html();
			textArea.value = div.innerText;

			document.body.appendChild(textArea);
			textArea.select();

			try {
				document.execCommand('copy');
				$copyButton.text('Copied').prop('disabled', true);;
			} catch (err) {
				$copyButton.text('FAILED: Could not copy').prop('disabled', true);;
			}
			setTimeout(function(){
				$copyButton.text('Copy').prop('disabled', false);;
			}, 3000);
		}
	});
});