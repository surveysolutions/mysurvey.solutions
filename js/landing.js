// TYped in animation 
$(document).ready(function(){
	var typed = new Typed('#typed', {
		stringsElement: '#typed-strings',
		typeSpeed: 150,
		backDelay: 3000,
		backSpeed: 100,
		smartBackspace: false, // this is a default
		loop: true,
	});

	$("#video-tutorials").mouseover(function(){
		$(this).parents('.support').find('.laptop-icon').toggleClass( "YouTube" );
	});
	$("#video-tutorials").mouseleave(function(){
		$(this).parents('.support').find('.laptop-icon').toggleClass( "YouTube" );
	});
	$("#user-forum").mouseover(function(){
		$(this).parents('.support').find('.laptop-icon').toggleClass( "user-forum" );
	});
	$("#user-forum").mouseleave(function(){
		$(this).parents('.support').find('.laptop-icon').toggleClass( "user-forum" );
	});
});

// auto-height for the main gallery

var adjustNoticeHeight = function(){
	var height = $( window ).height();
	var width = $(window).width();
	if(width < height) {
		var newHeight = height / 1.5;
		$('#gallery').css("height", newHeight+"px"); 
		$('#gallery .carousel-item .image').css("height", newHeight+"px");  
		$('#gallery .carousel.gallery').css("height", newHeight+"px");  
	}else{
		$('.gallery').css("height", height+"px"); 
		$('#gallery .carousel-item .image').css("height", height+"px"); 
	}
	
};
$(document).ready(function () { 
	adjustNoticeHeight();
});
$( window ).resize(function() {
	adjustNoticeHeight();
});	

// Narrow navbar on scroll

$(window).scroll(function() {
	if($(this).scrollTop() > 60)  /*height in pixels when the navbar becomes navbar-default1*/
	{
		$('.navbar').addClass('fixed-top');
		$('#top-btn').css({"visibility" : "visible", "opacity" : "0.5" });
	} else {
		$('.navbar').removeClass('fixed-top');
		$('#top-btn').css({"visibility" : "hidden", "opacity" : "0" });
	}
});



// When the user clicks on the button, scroll to the top of the document
$(document).ready(function() {
	$("#top-btn").click(function(event) {
		event.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

});

// Slick slider, clients' logos (MOVED TO INDEX PAGE)
$(document).ready(function () {
    $('.customer-logos').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        variableWidth: true,
        arrows: false,
        dots: false,
        autoplaySpeed: 1500,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });

    $.getJSON('https://pds.mysurvey.solutions/api/report/mapBySurveys', function (data) {
        // Instantiate the map
        Highcharts.mapChart('map', {

            chart: {
                map: Highcharts.maps["custom/world-highres3"]
            },

            title: {
                text: null
            },
            tooltip: {
                 enabled: false
            },
           mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                },
                enableDoubleClickZoomTo: true,
                enableMouseWheelZoom: false
            },
            legend: {
                enabled: false
            },
            colorAxis: {
                min: 1,
                minColor: '#63c5df',
                maxColor: '#1d3d8c'
            },

            series: [{
                data: data.series,
                joinBy: ['iso-a2', 'code2'],
                name: 'Surveys in country',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                }
            }]
        });
    });

    $.getJSON('https://pds.mysurvey.solutions/api/report/surveyStatistics', function (data) {
        $('#statistics-interviews')[0].textContent = data.interviewsCount;
        $('#statistics-surveys')[0].textContent = data.surveysCount;
        $('#statistics-countries')[0].textContent = data.countriesCount;
        $('#map-countries')[0].textContent = data.countriesCount;
    });
});

// Scrollspy with animated scroll


$(document).ready(function(){ 
  
	// Add smooth scrolling on all links inside the navbar
	$("#gallery .gallery a,#gallery p a, .nav-item .btn").on('click', function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();
  
			// Store hash
			var hash = this.hash;
  
			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 60
			}, 300, function(){
	 
				// Add hash (#) to URL when done scrolling (default click behavior)
				//window.location.hash = hash;
			});
		}  // End if
	});
});


  /**
* jQuery scroroller Plugin 1.0
*
* http://www.tinywall.net/
* 
* Developers: Arun David, Boobalan
* Copyright (c) 2014 
*/
(function($){
    $(window).on("load",function(){
        $(document).scrollzipInit();
        $(document).rollerInit();
    });
    $(window).on("load scroll resize", function(){
        $('.numscroller').scrollzip({
            showFunction    :   function() {
                                    numberRoller($(this).attr('data-slno'));
                                },
            wholeVisible    :     false,
        });
    });
    $.fn.scrollzipInit=function(){
        $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>" );
    };
    $.fn.rollerInit=function(){
        var i=0;
        $('.numscroller').each(function() {
            i++;
           $(this).attr('data-slno',i); 
           $(this).addClass("roller-title-number-"+i);
        });        
    };
    $.fn.scrollzip = function(options){
        var settings = $.extend({
            showFunction    : null,
            hideFunction    : null,
            showShift       : 0,
            wholeVisible    : false,
            hideShift       : 0,
        }, options);
        return this.each(function(i,obj){
            $(this).addClass('scrollzip');
            if ( $.isFunction( settings.showFunction ) ){
                if(
                    !$(this).hasClass('isShown')&&
                    ($(window).outerHeight()+$('#scrollzipPoint').offset().top-settings.showShift)>($(this).offset().top+((settings.wholeVisible)?$(this).outerHeight():0))&&
                    ($('#scrollzipPoint').offset().top+((settings.wholeVisible)?$(this).outerHeight():0))<($(this).outerHeight()+$(this).offset().top-settings.showShift)
                ){
                    $(this).addClass('isShown');
                    settings.showFunction.call( this );
                }
            }
            if ( $.isFunction( settings.hideFunction ) ){
                if(
                    $(this).hasClass('isShown')&&
                    (($(window).outerHeight()+$('#scrollzipPoint').offset().top-settings.hideShift)<($(this).offset().top+((settings.wholeVisible)?$(this).outerHeight():0))||
                    ($('#scrollzipPoint').offset().top+((settings.wholeVisible)?$(this).outerHeight():0))>($(this).outerHeight()+$(this).offset().top-settings.hideShift))
                ){
                    $(this).removeClass('isShown');
                    settings.hideFunction.call( this );
                }
            }
            return this;
        });
    };
    function numberRoller(slno){
            var min=$('.roller-title-number-'+slno).attr('data-min');
            var max=$('.roller-title-number-'+slno).attr('data-max');
            var timediff=$('.roller-title-number-'+slno).attr('data-delay');
            var increment=$('.roller-title-number-'+slno).attr('data-increment');
            var numdiff=max-min;
            var timeout=(timediff*1000)/numdiff;
            //if(numinc<10){
                //increment=Math.floor((timediff*1000)/10);
            //}//alert(increment);
			numberRoll(slno,min,max,increment,timeout);
            
    }
    function numberRoll(slno,min,max,increment,timeout){//alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
        if(min<=max){
            $('.roller-title-number-'+slno).html(min);
            min=parseInt(min)+parseInt(increment);
            setTimeout(function(){numberRoll(eval(slno),eval(min),eval(max),eval(increment),eval(timeout))},timeout);
        }else{
            $('.roller-title-number-'+slno).html(max);
        }
    }
})(jQuery);