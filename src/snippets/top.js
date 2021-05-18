<script>
(function() {
  ready(function() {
    const scrollToTopButton = document.getElementById('js-top');
    const pageContainer = document.getElementById('page-container');

    pageContainer.onscroll = function() { 
      scrollToTopButton.className = "top-link show"; 
    }

    scrollToTopButton.onclick = function(e) {
      document.getElementById('page-container').scroll({top:0,behavior:'smooth'});
      scrollToTopButton.className = "top-link hide"; 
    }
  })
})();
</script>