(function($,win) {
/** jQuery eSlidenav Plugin
* Copyright (C) 2011 by Abhishek Dev
* MIT License @ http://bit.ly/abhishekdevMIT-License
* @function
* @description creates a menu selection where a selector animates/moves behind the menu items to highlight the hover over or the active selector
* @author Abhishek Dev
* @date 20-Sep-2011
* @lastmodified 21-Sep-2011 by Abhishek Dev
* 
*/
	$.fn.eSlidenav = function(options) {
	
		options = $.extend({
			overlap : 20,
			speed : 500,
			resetin : 1500,
			bgcolor : '#CCCCCC',
			easing : 'easeOutExpo',
			moveaxis: 'y',
			onHover : {enter:$.noop, out: $.noop},
			onClick : $.noop,
			autoresizeSelector: false 
		}, options);
	
		return this.each(function() {
		
		 	var $nav = $(this),
		 		$currentSelected = $nav.children('.selected'),
		 		$selector = $('<li class="selector"/>'),
		 		Timer = {"reset":null,throttle:null},
				verticalMove = (options.moveaxis === 'y') ? true : false,
				selectorCSS;
		 	
			
			
			
			function styleSelector(){
				selectorCSS = verticalMove ? {
					width : $currentSelected.outerWidth() + options.overlap,
					height : $currentSelected.outerHeight(),
					left : $currentSelected.position().left - options.overlap / 2,
					top : $currentSelected.position().top 
				}:{
					width : $currentSelected.outerWidth() ,
					height : $currentSelected.outerHeight() + options.overlap,
					left : $currentSelected.position().left ,
					top : $currentSelected.position().top - options.overlap / 2
				};
				
				console.log($currentSelected);
				//Set BgColor and append to control
				$.extend(selectorCSS, {backgroundColor : options.bgcolor});
		 		$selector.css(selectorCSS);
			}
	
			styleSelector();
			$selector.appendTo(this)
			
			//Set Events
			$nav.delegate('li:not(.selector)', {
				"mouseenter.sliderNav" : function() {
					clearTimeout(Timer.reset);
					clearTimeout(Timer.throttle);
					var $this = $(this);
					function animateSelector(){
						var axisAnimation = verticalMove ? {
								top : $this.position().top,
								height: $this.outerHeight()
							}:{
								left : $this.position().left,
								width : $this.outerWidth()
							};
						
						$selector.animate(axisAnimation,
							{
								duration : options.speed,
								easing : options.easing,
								queue : false,
								complete: function(){
									if($.isFunction(options.onHover.enter)){
										options.onHover.enter.call(win,$this.get(0));
									}
								}
							});
					}
					Timer.throttle = setTimeout(animateSelector,200);
				}, 
			
				"mouseleave.sliderNav": function() {
					var $this = $(this);
					function resetToOriginal() {
						var axisAnimation = verticalMove ? {
							height : $currentSelected.outerHeight(),
							top : $currentSelected.position().top
						}:{
							width : $currentSelected.outerWidth(),
							left : $currentSelected.position().left
						}
						$selector.animate(axisAnimation, 
							{
								duration: options.speed, 
								complete: function(){
									if($.isFunction(options.onHover.out)){
										options.onHover.out.call(win,$this.get(0));
									}
								}
							});
					}
					
					if(!options.resetin && typeof options.resetin !== "number"){
						updateActiveToSelected($this);
					}else{
						Timer.reset = setTimeout(resetToOriginal, options.resetin);
					}
				}
			});
			
			function updateActiveToSelected($this){
				$this.addClass("selected")
					 .siblings().removeClass("selected");
				$currentSelected = $this;
			}
			
			//Click and Action Handler
			$nav.delegate('li','click.slideNav',function(e){
				var $this = $(this);
				if($this.hasClass("selected")){return;}
				
				updateActiveToSelected($this);
				
				if($.isFunction(options.onClick)){
					options.onClick.call(win,this);
				}
			});
			
			if(options.autoresizeSelector){
				$(window).bind("resize.eSlidenav",styleSelector);
			}
			
		
		});
	
	};

})(jQuery,window);



/* Sample Code
----------------------------*/

jQuery(function(){
	function onClick(el){
		console.log("Clicked on:",el);
	}
	
	function onHoverIn(el){
		console.log("Hovered in:",el);
	}
	
	function onHoverOut(el){
		console.log("Hovered out:",el);
	}
	
	//Create slidenav
	$("#nav").eSlidenav({
			onHover : {enter:onHoverIn, out: onHoverOut},
			onClick : onClick 
	});
});