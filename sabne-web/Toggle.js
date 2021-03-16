$(document).ready(function() {
	const divs = $('div[data-toggle = tooltip]');

	$('.disclaimer').trigger('click');

	divs.each(function() {
		$(this).on('click', (ev) => {
			// $(ev.target).next('div').slideToggle(1000);
			$(ev.target).next('div').toggle(1000);
		});
	});

	$(function() {
		$('.jtoggle').tooltip();
	});

	$('a').on('click', function(event) {
		if (this.hash !== '') {
			event.preventDefault();

			var hash = this.hash;
			$('html, body').animate(
				{
					scrollTop: $(hash).offset().top
				},
				800,
				function() {
					window.location.hash = hash;
				}
			);
		}
	});

	$(function() {
		$(document).scroll(function() {
			var $nav = $('.navbar');
			$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
		});
	});
});
