var initialize_owl_carousel = function(){
  $(".owl-carousel").owlCarousel({
    items: 1,
    navigation: true,
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    autoPlay: 4000
  });
};

$('div.modal').on('hidden.bs.modal', function() {
  window.location.hash = "";
});

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
  if (hash == "#rbct") {
    $("#rbc_alert_box").removeClass("hidden");
  };
};

initialize_owl_carousel();
