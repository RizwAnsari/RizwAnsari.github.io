$(document).ready(function(){
    $(".disclaimer").trigger('click'); 
});

$(function () {
  	$('.jtoggle').tooltip();
})

$(document).ready(function(){
	$(".toggle1").click(function(){
		// $(".points").slideToggle(1000);
		$(".points1").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle1-1").click(function(){
		// $(".points").slideToggle(1000);
		$(".points1-1").toggle(1000);
	});
});
			
$(document).ready(function(){
	$(".toggle1-2").click(function(){
		// $(".points").slideToggle(1000);
		$(".points1-2").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle2").click(function(){
		// $(".points").slideToggle(1000);
		$(".points2").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle4").click(function(){
		// $(".points").slideToggle(1000);
		$(".points4").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle6").click(function(){
		// $(".points").slideToggle(1000);
		$(".points6").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle7").click(function(){
		// $(".points").slideToggle(1000);
		$(".points7").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle8").click(function(){
		// $(".points").slideToggle(1000);
		$(".points8").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle9").click(function(){
		// $(".points").slideToggle(1000);
		$(".points9").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle10").click(function(){
		// $(".points").slideToggle(1000);
		$(".points10").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle11").click(function(){
		// $(".points").slideToggle(1000);
		$(".points11").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle12").click(function(){
		// $(".points").slideToggle(1000);
		$(".points12").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle13").click(function(){
		// $(".points").slideToggle(1000);
		$(".points13").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle19").click(function(){
		// $(".points").slideToggle(1000);
		$(".points19").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle20").click(function(){
		// $(".points").slideToggle(1000);
		$(".points20").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle24").click(function(){
		// $(".points").slideToggle(1000);
		$(".points24").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle27-1").click(function(){
		// $(".points").slideToggle(1000);
		$(".points27-1").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle27-2").click(function(){
		// $(".points").slideToggle(1000);
		$(".points27-2").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle31").click(function(){
		// $(".points").slideToggle(1000);
		$(".points31").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle32").click(function(){
		// $(".points").slideToggle(1000);
		$(".points32").toggle(1000);
	});
});

$(document).ready(function(){
	$(".toggle34").click(function(){
		// $(".points").slideToggle(1000);
		$(".points34").toggle(1000);
	});
});



$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    } 
  });
});


$(function() {
	$(document).scroll(function(){
		var $nav = $(".navbar");
		$nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
	});
});