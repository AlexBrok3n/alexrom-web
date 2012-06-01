$(function() {
	$('ul.hover_block li').hover(function(){
		$(this).find('img').animate({top:'182px'},{queue:false,duration:500});
	}, function(){
		$(this).find('img').animate({top:'0px'},{queue:false,duration:500});
	});
});


$(document).ready(function() {
	$('.box-container-img').hover(function(){
		var distance = $(this).outerHeight();
		$(this).find('.box-image').animate({ top : distance },{queue:false,duration:400});
	}, function(){
		$(this).find('.box-image').animate({ top : '0px' },{queue:false,duration:400});
	});              
});

// test modernizr
$(document).ready(function() {
	if (!Modernizr.multiplebgs) {	 
	 $.colorbox({
		 href:"actualiza.html", 
		 width:"930px",
		 height:"650px"
	  });
	} 
});

// Masonry

$(function(){

  var 
	speed = 600,   // animation speed
	$wall = $('#images').find('.wrap')
  ;

  $wall.masonry({
	//columnWidth: 100, 
	// only apply masonry layout to visible elements
	itemSelector: '.work-box:not(.invis)',
	animate: true,
	animationOptions: {
	  duration: speed,
	  queue: false
	}
  });

  $('#filtering-nav a').click(function(){        

	if(!$(this).hasClass('on')) {
		$('#filtering-nav a').removeClass('on');
		$(this).addClass('on');
	}
	
	var colorClass = '.' + $(this).attr('class').split(" ")[0];

	if(colorClass == '.all') {
	  // show all hidden boxes
	  $wall.children('.invis')
		.toggleClass('invis').fadeIn(speed);
	} else {  
	  // hide visible boxes 
	  $wall.children().not(colorClass).not('.invis')
		.toggleClass('invis').fadeOut(speed);
	  // show hidden boxes
	  $wall.children(colorClass+'.invis')
		.toggleClass('invis').fadeIn(speed);
	}
	$wall.masonry();				

	return false;
  });

});

// Cross slide

jQuery(function($) {
 $('#crossslide').crossSlide({
  fade: 1
 }, [
	{
    src:  'images/ipad-preview-1.jpg', 
    from: 'top left 0.7x',
    to:   'bottom right 1x',
    time: 2
   }, {
    src:  'images/ipad-preview-2.jpg',
    from: 'bottom left 0.5x',
    to:   'top right',
    time: 2
   }, {
    src:  'images/acerca-de-mi-background.jpg',
    from: '100% 80% 0.7x',
    to:   '80% 0% 1x',
    time: 2
   }, {
    src:  'images/ipad-preview-3.jpg',
    from: '15% 90% 0.8x',
    to:   '15% 0% 0.4x',
    time: 2
   }, {
   src:  'images/ipad-preview-4.jpg',
   from: 'bottom left 0.4x',
   to:   'top right 0.8x',
   time: 2
  }
 ]);
});

// Colorbox

$(document).ready(function(){
	$("a[data-images-group]").colorbox();
});

// onePageMenu

$(document).ready(function() {	
	$('nav').onePageMenu({
		findSameAnchors: true,
		thresholdInViewport: 300,
		selectorAnimationDuration: 1000,
		selectorAnimationEasing: 'easeOutQuart',
		scrollToDefaults: {
			duration: 1000,
			easing: 'easeOutQuart'
		},
		afterActive: function() {
			$('#nav-logo').removeClass().addClass($(this).attr('id').replace('nav-', 'logo-'));
		}
  	});
});

$(document).ready(function() {   
    $(".fade").fadeOut(1000);      
});

$('.works-in-detail').click(function(){     
    $(".fade").fadeIn(1000);      
});

$(document).ready(function() {   
	$("#myform").bind("submit", function() {                
		var $form = $(this);
		$.ajax({
			type : "post",
			cache: false,
			url : $form.attr('action'),
			data : $form.serialize(),
			dataType: "text",
			beforeSend: function() {
				$("#loading").fadeIn();
				 $("#contactButtom").attr('disabled', true);
			},
			error: function(data) {
				$("#loading").fadeOut();
				$("#contactButtom").attr('disabled', false);
				$("#contactKo").html("Error fatal").fadeIn().delay(5000).fadeOut();
			},
			success: function(data) {
				$("#loading").fadeOut();
				$("#contactButtom").attr('disabled', false);
				//las respuestas Json usan un wrapper por seguridad que debe ser borrado para usar el objeto JSON
				var responseObject = jQuery.parseJSON(data.substring(data.indexOf("\/\*")+2, data.lastIndexOf("\*\/")));
				if (responseObject.message) {                            
					if(responseObject.type == "success") {
						$("#contactOk").html(responseObject.message).slideToggle("slow").delay(6000).slideToggle("slow");
					} else {
						$("#contactKo").html(responseObject.message).slideToggle("slow").delay(6000).slideToggle("slow");
					}
				}
			}
		});
		return false;
	});
	
	$("#contactOk").bind("click", function() {
		var $contactOk = $(this);		
		$contactOk.fadeOut();
	});
});