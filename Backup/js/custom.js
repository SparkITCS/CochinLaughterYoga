/*=========================================================================
   Price Circle
========================================================================= */
$(document).ready(function() {
  $(".pr-pricebox").click(function(){
     $(this).pr-pricebox().toggleClass("pr-circle");
  });
});

/*=========================================================================
 progress bar
========================================================================= */

$(document).ready(function() {
  $(function() {
    $('progress').each(function() {
      var max = $(this).val();
      $(this).val(0).animate({ value: max }, { duration: 2000, easing: 'easeOutCirc' });
	  		});
  });
});


/*=========================================================================
   Accordion
========================================================================= */
/* -- 1 -- */
$(document).ready(function() {
  $(function() {
      $( "#f-accordion" ).accordion({
        collapsible: true,
        heightStyle: "content"
      });
    });
});



/*=========================================================================
 Tabs
========================================================================= */

;(function ( $, window, document, undefined ) {

    var pluginName = "tabulous",
        defaults = {
            effect: 'scale'
        };

       // $('<style>body { background-color: red; color: white; }</style>').appendTo('head');

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var links = this.$elem.find('a');
            var firstchild = this.$elem.find('li:first-child').find('a');
            var lastchild = this.$elem.find('li:last-child').after('<span class="tabulousclear"></span>');

            if (this.options.effect == 'scale') {
             tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescale');
            } else if (this.options.effect == 'slideLeft') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideleft');
            } else if (this.options.effect == 'scaleUp') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hidescaleup');
            } else if (this.options.effect == 'flip') {
                 tab_content = this.$elem.find('div').not(':first').not(':nth-child(1)').addClass('hideflip');
            }

            var firstdiv = this.$elem.find('#tabs_container, #tabs_container_dark');
            var firstdivheight = firstdiv.find('div:first').height();

            var alldivs = this.$elem.find('div:first').find('div');

            alldivs.css({'position': 'absolute','top':'40px'});

            firstdiv.css('height',firstdivheight+'px');

            firstchild.addClass('tabulous_active');

            links.bind('click', {myOptions: this.options}, function(e) {
                e.preventDefault();

                var $options = e.data.myOptions;
                var effect = $options.effect;

                var mythis = $(this);
                var thisform = mythis.parent().parent().parent();
                var thislink = mythis.attr('href');


                firstdiv.addClass('transition');

                links.removeClass('tabulous_active');
                mythis.addClass('tabulous_active');
                thisdivwidth = thisform.find('div'+thislink).height();

                if (effect == 'scale') {
                    alldivs.removeClass('showscale').addClass('make_transist').addClass('hidescale');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscale');
                } else if (effect == 'slideLeft') {
                    alldivs.removeClass('showleft').addClass('make_transist').addClass('hideleft');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showleft');
                } else if (effect == 'scaleUp') {
                    alldivs.removeClass('showscaleup').addClass('make_transist').addClass('hidescaleup');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showscaleup');
                } else if (effect == 'flip') {
                    alldivs.removeClass('showflip').addClass('make_transist').addClass('hideflip');
                    thisform.find('div'+thislink).addClass('make_transist').addClass('showflip');
                }


                firstdiv.css('height',thisdivwidth+'px');

                


            });

           


         
            
        },

        yourOtherFunction: function(el, options) {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };

})( jQuery, window, document );


$(document).ready(function($) {
    

    $('#tabs').tabulous({
    	effect: 'scale'
    });

     $('#tabs2').tabulous({
    	effect: 'slideLeft'
    });

     $('#tabs3').tabulous({
    	effect: 'scaleUp'
    });

    $('#tabs4, #tabs3-left-dark').tabulous({
    	effect: 'flip'
    });


});





/*=========================================================================
 Portfolio
========================================================================= */


$(document).ready(function() {
	jQuery(document).ready(function($) {
		var $container = jQuery('#portfolio-grid'),
			items_count = jQuery(".portfolio_item").size();
		
		$container.imagesLoaded( function(){
			setColumnWidth();
			$container.isotope({
				itemSelector : '.portfolio_item',
				hiddenClass : 'portfolio_hidden',
				resizable : false,
				transformsEnabled : true,
				layoutMode: 'fitRows'
			});
		});
		
		function getNumColumns(){
			var $folioWrapper = jQuery('#portfolio-grid').data('cols');
			
			if($folioWrapper == '2cols') {
				var winWidth = jQuery("#portfolio-grid").width(),
					column = 2;
				if (winWidth<380) column = 1;
				return column;
			}
			
			else if ($folioWrapper == '3cols') {
				var winWidth = jQuery("#portfolio-grid").width(),
					column = 3;
				if (winWidth<380) column = 1;
				else if(winWidth>=380 && winWidth<788) column = 2;
				else if(winWidth>=788 && winWidth<1160) column = 3;
				else if(winWidth>=1160) column = 3;
				return column;
			}
			
			else if ($folioWrapper == '4cols') {
				var winWidth = jQuery("#portfolio-grid").width(),
					column = 4;
				if (winWidth<380) column = 1;
				else if(winWidth>=380 && winWidth<788) column = 2;
				else if(winWidth>=788 && winWidth<1160) column = 3;
				else if(winWidth>=1160) column = 4;
				return column;
			}
		}
		
		function setColumnWidth(){
			var columns = getNumColumns(),
				containerWidth = jQuery("#portfolio-grid").width(),
				postWidth = containerWidth/columns;
			postWidth = Math.floor(postWidth);

			jQuery(".portfolio_item").each(function(index){
				jQuery(this).css({"width":postWidth+"px"});
			});
		}

		function arrange(){
			setColumnWidth();
			$container.isotope('reLayout');
		}

		jQuery(window).on("debouncedresize", function( event ) {
			arrange();
		});

		// Filter projects
		$('.filter a').click(function(){
			var $this = $(this).parent('li');
			// don't proceed if already active
			if ( $this.hasClass('active') ) {
				return;
			}

			var $optionSet = $this.parents('.filter');
			// change active class
			$optionSet.find('.active').removeClass('active');
			$this.addClass('active');

			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector });

			var hiddenItems = 0,
				showenItems = 0;
			jQuery(".portfolio_item").each(function(){
				if ( jQuery(this).hasClass('portfolio_hidden') ) {
					hiddenItems++;
				};
			});

			showenItems = items_count - hiddenItems;
			if ( ($(this).attr('data-count')) > showenItems ) {
				jQuery(".pagination__posts").css({"display" : "block"});
			} else {
				jQuery(".pagination__posts").css({"display" : "none"});
			}
			return false;
		});
	});
});








// ---------------------------------------------------------
// Magnific Popup Init
// ---------------------------------------------------------
function magnific_popup_init(item) {
	item.magnificPopup({
		delegate: 'a[data-gal^="prettyPhoto"]',
		type: 'image',
		removalDelay: 500,
		mainClass: 'mfp-zoom-in',
		callbacks: {
			beforeOpen: function() {
				// just a hack that adds mfp-anim class to markup 
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
			}
		},
		gallery: {enabled:true}
	});
}
// ---------------------------------------------------------
// !!!!!!!!!!!!!!!!!document ready!!!!!!!!!!!!!!!!!!!!!!!!!!
// ---------------------------------------------------------
jQuery(document).ready(function(){
// ---------------------------------------------------------
// Call Magnific Popup
// ---------------------------------------------------------
	jQuery(".thumbnail").parent().each(function(){magnific_popup_init(jQuery(this))});
// ---------------------------------------------------------
// Tooltip
// ---------------------------------------------------------
	jQuery("[rel='tooltip']").tooltip();
// ---------------------------------------------------------
// Back to Top
// ---------------------------------------------------------
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 100) {
			jQuery('#back-top').fadeIn();
		} else {
			jQuery('#back-top').fadeOut();
		}
	});
	jQuery('#back-top a').click(function () {
		jQuery('body,html').stop(false, false).animate({
			scrollTop: 0
		}, 800);
		return false;
	});
// ---------------------------------------------------------
// Add accordion active class
// ---------------------------------------------------------
	jQuery('.accordion').on('show', function (e) {
		jQuery(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
	});
	jQuery('.accordion').on('hide', function (e) {
		jQuery(this).find('.accordion-toggle').not(jQuery(e.target)).removeClass('active');
	});
// ---------------------------------------------------------
// Isotope Init
// ---------------------------------------------------------
	jQuery("#portfolio-grid").css({"visibility" : "visible"});
// ---------------------------------------------------------
// Menu Android
// ---------------------------------------------------------
	if(window.orientation!=undefined){
		var regM = /ipod|ipad|iphone/gi,
			result = navigator.userAgent.match(regM)
		if(!result) {
			jQuery('.sf-menu li').each(function(){
				if(jQuery(">ul", this)[0]){
					jQuery(">a", this).toggle(
						function(){
							return false;
						},
						function(){
							window.location.href = jQuery(this).attr("href");
						}
					);
				} 
			})
		}
	}
// ---------------------------------------------------------
// images loader
// ---------------------------------------------------------
	var MSIE8 = (jQuery.browser.msie) && (jQuery.browser.version == 8);
	jQuery('img[data-src]').bind('load', img_load_complete);
	jQuery(window).bind('resize', img_loader).bind('scroll', img_loader).trigger('scroll');
	
	function img_loader(){
		var get_img = jQuery('img[data-src]').eq(0)
		if(get_img[0]){
			var visible_height = jQuery(window).scrollTop() + jQuery(window).height(),
				img_top_position = get_img.offset().top;

			if(img_top_position<visible_height){
				get_img.attr({'src':get_img.attr('data-src')}).removeAttr('data-src');
				if(!MSIE8){
					get_img.fadeOut(0)
				}
			};
		}else{
			jQuery(window).unbind('resize', img_loader).unbind('scroll', img_loader);
		}
	}
	function img_load_complete(){
		jQuery(this).unbind('load');
		if(!MSIE8){
			jQuery(this).fadeIn(500)
		}
		img_loader();
	}
// ---------------------------------------------------------
// set voting post JS
// ---------------------------------------------------------
	jQuery('.ajax_voting').bind('click', voitng);
	function voitng(){
		var item= jQuery(this),
			item_parent = item.parents('[class*="meta_type"]'),
			type = item.attr('date-type'),
			item_class='user_'+type,
			count = parseInt(jQuery('.voting_count', item).text()),
			top_position = (type==='like') ? -18 : 18 ,
			mark = (type==='like') ? '+' : '-', 
			post_url = item.attr('href');

		jQuery('.post_like>a, .post_dislike>a', item_parent).unbind('click', voitng).removeAttr('href date-type').removeClass('ajax_voting').addClass('user_voting');
		item.removeClass('user_voting').addClass(item_class).find('.voting_count').text(++count).append('<span class="animation_item">'+mark+'1</span>');
		jQuery('.animation_item', item).stop(true).animate({'top':top_position, opacity:'0'}, 500, 'easeOutCubic', function(){jQuery(this).remove()});

		jQuery.post(post_url);
		return false;
	}
// ---------------------------------------------------------
// sprite loader
// ---------------------------------------------------------
	jQuery('.wpcf7-submit').after('<div class="ajax-loader"></div>');
	jQuery('.wpcf7-submit').click(function(){
		var listener = setInterval(
				function(){
					if(jQuery('img.ajax-loader').css('visibility')=='visible'){
						jQuery('div.ajax-loader').css({'display':'inline-block'});
					}else{
						jQuery('div.ajax-loader').css({'display':'none'});
						clearInterval(listener);
					}
				},100);
	})
});





$(document).ready(function() {
		// Init navigation menu
		jQuery(function(){
		// main navigation init
			jQuery('ul.sf-menu').superfish({
				delay: 1000, // the delay in milliseconds that the mouse can remain outside a sub-menu without it closing
				animation: {
					opacity: "show",
					height: "show"
				}, // used to animate the sub-menu open
				speed: "normal", // animation speed 
				autoArrows: false, // generation of arrow mark-up (for submenu)
				disableHI: true // to disable hoverIntent detection
			});

		//Zoom fix
		//IPad/IPhone
			var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
				ua = navigator.userAgent,
				gestureStart = function () {
					viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
				},
				scaleFix = function () {
					if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
						viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
						document.addEventListener("gesturestart", gestureStart, false);
					}
				};
			scaleFix();
		})
});
