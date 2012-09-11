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
			$credit = null,
			$datapoints = null;
			
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init() {

			$obj = $('div.athletics.infostory[data-infostory-name="demo"]');
			
			$datapoints = $obj.find('div.i_s_datapoints');
			
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
						
			//styling for datapoint set
			$datapoints.css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'z-index': 3,
				'width': '100%'
			})
			
			$datapoints.find('div.i_s_datapoint').each(function(){
				
				// setting variables for position and measurements
				var $this = $(this),
					point_html ='',
					pos_left = $this.data('x'),
					pos_top = $this.data('y'),
					offset = $this.data('offset'),
					line_length = 15,
					line_width = 1,
					point_diameter = 10,
					body_padding = 10;
				
				if (!$this.hasClass('.i_s_point_initialized')) {
					
					point_html += '<div class="i_s_point_plotter">' +
						'<span class="i_s_point"></span>' +
						'<div class="i_s_line_container">' +
							'<div class="i_s_line i_s_left"></div>' + 
							'<div class="i_s_line i_s_center"></div>' + 
							'<div class="i_s_line i_s_right"></div>' +
						'</div>' +
					'</div>';
					
					//append plotter to each data point
					$this.append(point_html).addClass('.i_s_point_initialized');
										
					//style and position point plotter
					$this.find('.i_s_point_plotter').css({
						'position': 'absolute',
						'left': 0,
						'top': 0,
					});

					$this.find('.i_s_point_plotter span.i_s_point').css({
						'width': point_diameter + 'px',
						'height': point_diameter + 'px',
						'background': '#000',
						'position': 'absolute',
						'left': 0,
						'top': 0,
					})
					
					$this.find('.i_s_point_plotter .i_s_line_container').css({
						'position': 'absolute',
						'top': Math.floor(point_diameter/2) +'px',
						'left': point_diameter + 'px'
					})
					
					$this.find('.i_s_point_plotter .i_s_line').css({
						'height': line_width + 'px',
						'width': line_length + 'px',
						'background': '#000',
						'position': 'absolute',
						'top': '0',
						'left': '0'
					});
					
					
					$this.find('.i_s_point_plotter .i_s_line.i_s_center').css({
						'left': line_length + 'px',
						'width': line_width + 'px',
						'height': Math.abs(offset) + 'px',
					});
					
					if (offset < 0) {
						$this.find('.i_s_point_plotter .i_s_line.i_s_center').css({
							'top': offset + line_width + 'px'
						});
					} else {
						$this.find('.i_s_point_plotter .i_s_line.i_s_center').css({
							'top': 0
						});
					}

					$this.find('.i_s_point_plotter .i_s_line.i_s_right').css({
						'left': line_length + 'px',
						'top': offset + 'px'
					});
				
				};
				
				
				//set up basic styling for default view
				$this.css({
					'display':'block',
					'position': 'absolute',
					'left': pos_left + 'px',
					'top': pos_top + 'px',
					'width': '100%',
					'z-index':'1'
				});
				
				$this.find('.i_s_body').css({
					'position': 'absolute',
					'padding' : body_padding + 'px',
					'left': 2*line_length + point_diameter + 'px',
					'top': offset - body_padding + 'px',
					'max-width':'480px',
					'z-index':'2'
				})
								
				$this.find('.i_s_body h3').css({
					'font': 'normal 16px/20px Georgia, serif',
					'margin': '5px 0 0'
				})
				
				$this.find('.i_s_body h5').css({
					'font': 'normal 11px/13px Verdana, arial, sans-serif',
					'text-transform':'uppercase',
					'color': '#999',
					'margin': 0
				})
				
				//make sure we're not showing the details of each point
				$this.find('.i_s_detail').css({
					'display':'none'
				});
				
				
				// attach mouseenter
				$this.unbind('mouseenter').bind('mouseenter', function(){
					
					$this.find('.i_s_body').addClass('i_s_hovering');
					
					$this.find('.i_s_body.i_s_hovering').css({
						'background': '#fff',
						'-moz-box-shadow': '0 0 5px #666',
						'-webkit-box-shadow': '0 0 5px #666',
						'box-shadow': '0 0 5px #666',
						'z-index':'3',
						'cursor': 'pointer'
					})
					
					// attach click events
					
					$this.unbind('click').bind('click', function(){
						
						_launch_datapoint_details( $this, pos_left, pos_top, body_padding );
						
					})
					
				});
				
				//attach mouseleave
				$this.unbind('mouseleave').bind('mouseleave', function(){
					
					$this.find('.i_s_body').removeClass('i_s_hovering');
					
					$this.find('.i_s_body').css({
						'background': 'none',
						'-moz-box-shadow': 'none',
						'-webkit-box-shadow': 'none',
						'box-shadow': 'none',
						'z-index':'3'
					})
				
				});
				
			});
					
		};
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _launch_datapoint_details( $this, pos_left, pos_top, body_padding ) {
						
			var datapoint_content = $this.find('.i_s_body').html(),
				detail_window_html = '',
				$detail_window = $obj.find('.i_s_detail_window');
				
			//setting up basic detail_window styling 
			$detail_window.css({
				'z-index': 10,
				'position' : 'absolute',
				'background' : "#fff",
				'-moz-box-shadow': '0 0 5px #666',
				'-webkit-box-shadow': '0 0 5px #666',
				'box-shadow': '0 0 5px #666',
				'padding': body_padding + 'px'
			})
				
			// is the detail window already open?
			if ( !$detail_window.hasClass('window_open') ) {
				
				// no, populate and position it
				
				// add datapoint content
				$detail_window.find('.i_s_detail_contents').html(datapoint_content);

				// find initial heights & positions
				var initial_height = $this.find('.i_s_body').height(),
					initial_width = $this.find('.i_s_body').width(),
					body_position = $this.find('.i_s_body').position();

				// position detail window
				$detail_window.css({
					'display': 'block',
					'width': initial_width + 'px',
					'height': initial_height + 'px',
					'top' : pos_top + body_position.top + 'px',
					'left' : pos_left + body_position.left + 'px',
				})
				
				//style contents
				_style_detail_window();

				// find height of content
				var content_height = $detail_window.find('.i_s_detail_contents').height();
				
				//animate window
				$detail_window.stop().animate({
					'width' : '480px'
					,'height' : content_height + 'px'
					}
					,200
					,function () {
						$detail_window.addClass('window_open');
						$detail_window.find('.i_s_close_btn').css({
							'display': 'block'
						})
					});
					
				// style close_btn
				$detail_window.find('.i_s_close_btn').css({
					'display': 'none',
					'position': 'absolute',
					'width': '28px',
					'height': '28px',
					'background': 'url("img/sprite_close_btn.png") no-repeat 0 0',
					'top': 0,
					'right': 0,
					'-webkit-border-radius': '28px',
					'-moz-border-radius': '28px',
					'border-radius': '28px',
					'cursor':'pointer'
				})
				
				// attach click events to close_btn
				$detail_window.find('.i_s_close_btn').unbind('click').bind('click', function(){
					$detail_window.removeClass('window_open');
					$detail_window.css({
						'display': 'none'
					})
					$detail_window.find('.i_s_detail_contents').html("");
				})
					
			} else {
				
				//window is already open, we need to switch the content and move the position
				
				//hide old contents
				$detail_window.find('.i_s_detail_contents').css({
					'opacity': 0
				})
				
				//replace with new contents
				$detail_window.find('.i_s_detail_contents').html(datapoint_content);
				
				//style contents
				_style_detail_window();
			
				//move position and animate height
				var new_body_position = $this.find('.i_s_body').position();
				var new_content_height = $detail_window.find('.i_s_detail_contents').height();
				
				$detail_window.stop().animate({
					'top' : pos_top + new_body_position.top + 'px'
					,'height' : new_content_height + 'px'
					},{
					'duration' : 300
					});
					
				//reveal new contents

				$detail_window.find('.i_s_detail_contents').animate({
					'opacity' : 1
				}, 300)
				
			}
						
			/*if ( $detail_window.length < 1 ) {
				// no, let's make it
				
				detail_window_html += '<div class="i_s_detail_window">' +
					'<span class="i_s_arrow"></span>' +
					'<div class="i_s_detail_contents"></div>'
				'</div>';
				
				$obj.append(detail_window_html);
				
				$detail_window = $obj.find('.i_s_detail_window');
			}*/
			
			
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _style_detail_window() {
			
			var $detail_window = $obj.find('.i_s_detail_window');
			
			$detail_window.css({
				'padding': '10px'
			})
			
			$detail_window.find('.i_s_detail_contents').css({
				'width' : '480px',
				'overflow': 'hidden',
			})
			
			$detail_window.find('.i_s_detail').css({
				'display': 'block',
				'width' : '480px',
				'overflow': 'hidden',
				'font': 'normal 15px/19px Georgia, serif'
			})
			
			
			$detail_window.find('.i_s_detail a').css({
				'color': '#0F2D5F',
			})
			
			$detail_window.find('h3').css({
				'font': 'bold 18px/22px Georgia, serif',
				'margin': '10px 0'
			});
			
			$detail_window.find('img').css({
				'float': 'right',
				'border': '3px solid #ededed',
				'margin': '0 0 10px 10px'
			})
			
			$detail_window.find('ul.i_s_related_links').css({
				'list-style-type':'none',
				'padding': '0',
				'margin-top': '20px'
			})
			
			$detail_window.find('ul.i_s_related_links li').css({
				'font': 'bold 13px/15px Georgia, serif',
				'margin': '10px 0'
			})
			
			$detail_window.find('ul.i_s_related_links li a').css({
				'text-decoration': 'none'
			})
			
			$detail_window.find('ul.i_s_related_links li a:hover').css({
				'text-decoration': 'underline'
			})
			
			//TEMPORARILY hide tweets
			$detail_window.find('ul.i_s_tweets').css({
				'display': 'none'
			})
			
			
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/*function _reset_datapoint_styling() {
			
			$datapoints.find('div.i_s_datapoint').each(function(){
				
				var $this = $(this);
				
				//set up basic styling for default view
				$this.css({
					'display':'block',
					'width': '480px',
					'position':'absolute',
					'top': $this.data('y') + 'px',
					'left': $this.data('x') + 'px',
					'padding' : '10px',
					'background': 'none',
					'-moz-box-shadow': 'none',
					'-webkit-box-shadow': 'none',
					'box-shadow': 'none',
					'z-index': 3
				});
				
				$this.find('h3').css({
					'font': 'normal 16px/20px Georgia, serif',
					'margin': '5px 0 0'
				})
				
				$this.find('h5').css({
					'font': 'normal 11px/13px Verdana, arial, sans-serif',
					'text-transform':'uppercase',
					'color': '#999',
					'margin': 0
				})
				
				//don't show the details of each point yet
				$this.find('.i_s_detail').css({
					'display':'none'
				});
			
			});
			
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/*function _reveal_datapoint_details( $this ) {
						
			$this.css({
				'width': '480px',
				'z-index' : 10,
			});
			
			$this.find('.i_s_detail').css({
				'display': 'block',
				'font': 'normal 15px/19px Georgia, serif'
			});
			
			$this.find('.i_s_detail a').css({
				'color': '#0F2D5F',
			})
			
			$this.find('h3').css({
				'font': 'bold 18px/22px Georgia, serif',
				'margin': '10px 0'
			});
			
			$this.find('img').css({
				'float': 'right',
				'border': '3px solid #ededed',
				'margin': '0 0 10px 10px'
			})
			
			$this.find('ul.i_s_related_links').css({
				'list-style-type':'none',
				'padding': '0',
				'margin-top': '20px'
			})
			
			$this.find('ul.i_s_related_links li').css({
				'font': 'bold 13px/15px Georgia, serif',
				'margin': '10px 0'
			})
			
			$this.find('ul.i_s_related_links li a').css({
				'text-decoration': 'none'
			})
			
			$this.find('ul.i_s_related_links li a:hover').css({
				'text-decoration': 'underline'
			})
			
			//TEMPORARILY hide tweets
			$this.find('ul.i_s_tweets').css({
				'display': 'none'
			})
			
		};
		
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
				'background-color' : '#fff',
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
			
			$credit.find('span.i_s_copy a').css({
				'color':'#666'
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
