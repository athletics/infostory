/*
 *		Athletics Infostory js module:
 *			infostory.js
 *
 *		desc:
 *
 *		requires:
 *			jQuery
 */

var athletics = (function( app, $ ) {
	
	/* define new module */
	app.infostory = (function($){
		
		// private vars
		var _initialized = false,
			$obj = null,
			$bgs = null,
			$controls = null,
			$border = null,
			$credit = null;
			
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init() {

			$obj = $('div.athletics.infostory[data-infostory-name="demo"]');
			
			if ($obj.length != 1) return false;
			
			_init_controls();
			_init_data_points();
			_init_bgs();
			_init_border();
			_init_credit();
			
			// basic styling
			$obj.css({
				'position' : 'relative',
				'width' : $obj.data('width'),
				'height' : $obj.data('height'),
				'font-size' : 0
			});
			
			$obj.show();
			
			_initialized = true;

		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init_border() {
			
			if (!$obj.data('use-border')) return false;
			
			$border = $obj.find('div.i_s_border');
			
			$border.css({
				'border' : '1px solid #ccc',
				'width' : $obj.data('width') - 2,
				'height' : $obj.data('height') - 2,
				'position' : 'absolute',
				'top' : 0,
				'left' : 0,
				'z-index' : 2
			});
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init_controls() {
			
			$controls = $obj.find('div.i_s_controls');
			
			// basic styling
			$controls.css({
				'position' : 'absolute',
				'z-index' : 4,
				'top' : 20,
				'left' : 20,
				'font-size' : '14px'
			});
			
			// general styling on controls
			$controls.find('div.i_s_option').css({
				'color' : '#ffffff',
				'font-size' : '12px',
				'font-family' : 'Arial',
				'font-weight' : 'bold',
				'cursor' : 'pointer'
			});
			
			$controls.find('div.i_s_option span.i_s_label').css({
				'padding' : '3px 10px',
				'display' : 'block'
			});
			
			// position controls
			$controls.find('div.i_s_option').css({
				'float' : 'left',
				'margin-right' : '5px'
			});
			
			// attach events
			$controls.find('div.i_s_option').on('click',function(){
				var $this = $(this);
				_change_bg(
					$this.data('id')
				);
			});
			
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init_data_points() {
			
			$datapoints = $obj.find('div.i_s_datapoints');
			
			//styling for datapoint set
			$datapoints.css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'z-index': 3 
			})
			
			$datapoints.find('div.i_s_datapoint').each(function(){
				
				var $this = $(this);
				
				//set up basic styling for default view
				$this.css({
					'display':'block',
					'width': '500px',
					'position':'absolute',
					'top': $this.data('y') + 'px',
					'left': $this.data('x') + 'px',
					'padding' : '5px'
				});
				
				$this.find('h3').css({
					'font': 'normal 16px/20px Georgia, serif',
					'margin': '5px 0'
				})
				
				$this.find('span.i_s_date').css({
					'font': 'normal 11px/13px Verdana, arial, sans-serif',
					'text-transform':'uppercase',
					'color': '#999',
				})
				
				//don't show the details of each point yet
				$this.find('.i_s_detail').css({
					'display':'none'
				});
				
				//attach mouseenter
				$this.unbind('mouseenter').bind('mouseenter', function(){
					
					//add background color and shadow
					$this.css({
						'background': '#fff',
						'-moz-box-shadow': '0 0 5px #666',
						'-webkit-box-shadow': '0 0 5px #666',
						'box-shadow': '0 0 5px #666',
						'cursor': 'pointer'
					});
					
					
				});
				
				//attach mouseleave
				$this.unbind('mouseleave').bind('mouseleave', function(){
					
					//remove background color and shadow
					$this.css({
						'background': 'none',
						'-moz-box-shadow': 'none',
						'-webkit-box-shadow': 'none',
						'box-shadow': 'none'
					});
				})
				
			})
			
		
		
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init_bgs() {
			
			$bgs = $obj.find('div.i_s_backgrounds');
			
			$bgs.find('span.i_s_bg').each(function(){

				var $this = $(this),
					bg_html = '';
				
				if (!$this.hasClass('i_s_bg_initialized')) {
					
					bg_html += '<img src="'+ $this.data('img-src') +'" alt="">';
					
					$this
						.html( bg_html )
						.addClass('i_s_bg_initialized');
				}
			});
			
			// add styling
			$bgs.css({
				'position' : 'absolute',
				'z-index' : 1,
				'top' : '70px',
				'left' : 0
			});
			
			$bgs.find('span.i_s_bg').css({
				'position' : 'absolute',
				'top' : 0,
				'left' : 0
			});
			
			// reveal default bg
			_change_bg(
				$bgs.find('span.i_s_bg.i_s_default').data('id')
			);
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _change_bg( id ) {
			
			$bgs.find('span.i_s_bg')
				.show()
				.stop()
				.animate({
					'opacity' : 0
				},{
					'duration' : 300
				});
			
			var $target = $bgs.find('span.i_s_bg[data-id="'+ id +'"]');
			
			$target
				.show()
				.stop()
				.css('opacity',0)
				.animate({
					'opacity' : 1
				},{
					'duration' : 300
				});
			
			_change_bg_control( id );
			
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _reset_bg_controls() {
			$controls.find('div.i_s_option').css({
				'background-color' : 'black'
			});
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _change_bg_control( id ) {
			
			_reset_bg_controls();
			
			var $target = $controls.find('div.i_s_option[data-id="'+ id +'"]');
			
			$target.css({
				'background-color' : 'blue'
			});
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init_credit() {
			
			$credit = $obj.find('div.i_s_credit');
			
			$credit.css({
				'width' : $obj.data('width'),
				'height' : 30,
				'background-color' : '#cccccc',
				'position' : 'absolute',
				'left' : 0,
				'bottom' : 0,
				'z-index' : 3,
				'text-align' : 'right',
				'font-family' : 'Helvetica Neue, Helvetica, Arial',
				'font-size' : '12px',
				'line-height' : '18px'
			});
			
			$credit.find('span.i_s_copy').css({
				'display' : 'block',
				'padding-top' : '5px',
				'padding-right' : '10px'
			});
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		return {
			init : _init
		};
		
	}($));
	
	return app; /* return augmented app object */
	
}( athletics || {}, jQuery )); /* import app if exists, or create new; import jQuery */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

jQuery(document).ready(function(){
	athletics.infostory.init();
});
