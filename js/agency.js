$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

if (window.location.hash) {
  var hash = window.location.hash;
  var regex = /\#projects\_.*/
  if (hash.match(regex)) {
    $(hash).modal('show');
  }
};
