jQuery(document).ready(function($){

  $(window).on('load', function() {
    var copyid = 0;
		$('pre').each(function(){
			copyid++;
			var lang = $(this).attr('class').trim().replace('language-','');
			$(this).attr('data-copyid', copyid).wrap('<div class="pre-wrapper" />');
			$(this).parent().css('margin', $(this).css('margin'));
			$(this).parent().css('width',  $(this).width() + 'px');
			$('<button class="copy-snippet">Copy</button>').insertAfter( $(this)).data('copytarget', copyid);
			$('<button class="pre-language">'+lang+'</button>').insertAfter( $(this));
		});

		/* bonus, change background color for HTTP codes */
		$('code').each(function(){
			if (/^[2][0-9][0-9]$/.test($(this).text())) {
				$(this).css('background-color', '#BCF3A2');
			}
			else if (/^[4-5][0-9][0-9]$/.test($(this).text())) {
				$(this).css('background-color', '#EF526E85');
			}
			else if (/^[1,3][0-9][0-9]$/.test($(this).text())) {
				$(this).css('background-color', '#EAFCA2');
			}
		});

		$('strong').each(function(){
			if ($(this).text() === 'TIP') {
				$(this).css('background-color', '#6647FF');
				$(this).css('border-radius', '0.25em');
				$(this).css('padding', '0.325em 0.75em');
				$(this).css('color', 'white');
				$(this).css('font-family', 'Inter');
				$(this).css('font-weight', 'bold');
				$(this).css('font-size', '0.75em');
			}
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

			// Set value to text to be copied
      var div = document.createElement('div');
      div.innerHTML = $pre.html();
			textArea.value = div.innerText;

			document.body.appendChild(textArea);
			textArea.select();

			try {
				document.execCommand('copy');
				$copyButton.text('Copied').prop('disabled', true);
			} catch (err) {
				$copyButton.text('FAILED: Could not copy').prop('disabled', true);
			}

			// Hide the textArea
			textArea.style.visibility = 'hidden';

			setTimeout(function(){
				$copyButton.text('Copy').prop('disabled', false);
			}, 3000);
		}
	});
});