var Event = require('stupid-event');
var Callctrl = require('stupid-callctrl');

function ScrollDirection(opts){
 	var self = {};
	var opts = opts || {};
	var tick = opts.tick;
	var event = Event();
	var lastScrollPosition = window.pageYOffset;
	var tolerance = opts.tolerance || 10;
	var shift = Callctrl.shift(scrollDown, scrollUp);

	/*
	* Private
	*/

	function init(){
		tick.add(update);
	}

	function update(){
		if(window.pageYOffset <= 0){
			// event.trigger('direction/down');
			scrollDown();
			return;
		}else if(window.pageYOffset >= (document.documentElement.scrollHeight - window.innerHeight)){
			// event.trigger('direction/up');
			scrollUp();
			return;
		}

		var scrollDiff = window.pageYOffset - lastScrollPosition;
		if(Math.abs(scrollDiff) > tolerance){
			if(scrollDiff > 0){
				shift.alpha();
			}else{
				shift.beta();
			}
		}
		lastScrollPosition = window.pageYOffset;
	}

	function scrollDown(){
		event.trigger('direction/down');
	}

	function scrollUp(){
		event.trigger('direction/up');
	}

	/*
	* Public
	*/
	
	self.on = event.on;
	

	/*
	* Init
	*/

	init();

	return self;
}

module.exports = ScrollDirection;