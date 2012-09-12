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
			$datapoints = null,
			$labelpoints = null,
			_cur_color_scheme = null,
			_datapoint_body_padding = 10,
			_img_sprite = 'img/sprite_infostory.png';
			
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init() {

			$obj = $('div.athletics.infostory[data-infostory-name="forbes_timeline"]');
			
			$datapoints = $obj.find('div.i_s_datapoints');
			$labelpoints = $obj.find('div.i_s_labelpoints');
			
			if ($obj.length != 1) return false;
			
			_init_controls();
			_init_label_points();
			_init_data_points();
			_init_bgs();
			_init_border();
			_init_credit();
			
			// basic styling
			$obj.css({
				'position' : 'relative',
				'width' : $obj.data('width'),
				'height' : $obj.data('height'),
				'overflow' : 'hidden',
				'font-size' : 0,
				'background-color' : '#ffffff'
			});
			
			$obj.find('.i_s_header').css({
				'width': '100%',
				'text-align': 'center',
				'padding-bottom': '12px',
				'border-bottom': '4px double #ccc'
			});
			
			$obj.find('.i_s_header span.i_s_timeline_label').css({
				'display':'inline-block',
				'font': 'normal 11px/14px Verdana, sans-serif',
				'text-transform': 'uppercase',
				'letter-spacing' : '1px',
				'color': '#fff',
				'padding': '3px 6px',
				'background' : '#000',
				'margin-bottom' : '5px'
			});
			
			$obj.find('.i_s_header span.i_s_forbes_logo').css({
				'position': 'absolute',
				'top': 0,
				'right': 0,
				'width' : '75px',
				'height': '20px',
				'background' : 'url("'+ _img_sprite +'") no-repeat 0 -80px'
			});
			
			$obj.find('.i_s_header h1').css({
				'font': 'normal 32px/36px Georgia, serif',
				'margin': '10px 0'
			});
			
			$obj.find('.i_s_header h4').css({
				'font': 'italic 16px/20px Georgia, serif',
				'color':'#666',
				'margin': '10px 0'
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
				'top' : '150px',
				'left' : '170px',
				'font-size' : '14px'
			});
			
			// general styling on controls
			$controls.find('div.i_s_option').css({
				'color' : '#666',
				'font-size' : '12px',
				'font-family' : 'Verdana',
				'font-weight' : 'normal',
				'text-decoration': 'underline',
				'cursor' : 'pointer'
			});
			
			$controls.find('div.i_s_option span.i_s_label').css({
				'padding' : '3px 10px',
				'display' : 'block'
			});
			
			$controls.find('span.i_s_downarrow').css({
				'display': 'none',
				'position' : 'absolute',
				'bottom' : '-5px',
				'left': '50%',
				'margin-left': '-6px',
				'background' : 'url("'+ _img_sprite +'") no-repeat -70px 0',
				'width' : '12px',
				'height' : '5px'
			});
			
			// position controls
			$controls.find('div.i_s_option').css({
				'float' : 'left',
				'margin-right' : '5px'
			});
			
			// attach events
			$controls.find('div.i_s_option').on('click',function(){
				var $this = $(this);

				if ($this.hasClass('i_s_active')) return false;

				_change_bg(
					$this.data('id')
				);
			});
	
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init_label_points() {
						
			$label_point = $labelpoints.find('span.i_s_labelpoint');
				
			$label_point.each(function(){
				
				//setting up variables for position
				var $this = $(this),
					type = $this.data('type'),
					pos_left = $this.data('x'),
					pos_top = $this.data('y');
				
				$this.css({
					'display':'inline-block',
					'font': 'normal 11px/14px Verdana, sans-serif',
					'text-align': 'center',
					'text-transform': 'uppercase',
					'letter-spacing' : '1px',
					'color': '#fff',
					'padding': '5px',
					'width': '40px',
					'background' : 'black',
					'position' : 'absolute',
					'top' : pos_top + 'px',
					'left' : pos_left + 'px'
				});
				
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
			});
			
			$datapoints.find('div.i_s_datapoint').each(function(){
				
				// setting variables for position and measurements
				var $this = $(this),
					point_html = '',
					$plotter = null,
					pos_left = $this.data('x'),
					pos_top = $this.data('y'),
					offset = $this.data('offset'),
					line_length = 15,
					line_width = 1,
					point_diameter = 10;
				
				// create point
				point_html += '<div class="i_s_point_plotter">';
				point_html +=	'<span class="i_s_point"></span>';
				point_html +=	'<div class="i_s_line_container">';
				point_html +=		'<div class="i_s_line i_s_left"></div>';
				point_html +=		'<div class="i_s_line i_s_center"></div>';
				point_html +=		'<div class="i_s_line i_s_right"></div>';
				point_html +=	'</div>';
				point_html += '</div>';
				
				//append plotter to each data point
				$this.append( point_html );

				// set pointer
				$plotter = $this.find('.i_s_point_plotter');
									
				//style and position point plotter
				$plotter.css({
					'position': 'absolute',
					'left': 0,
					'top': 0
				});

				$plotter.find('span.i_s_point').css({
					'width': point_diameter + 'px',
					'height': point_diameter + 'px',
					'border-radius': '50%',
					'background': '#000',
					'position': 'absolute',
					'left': 0,
					'top': 0
				});
				
				$plotter.find('.i_s_line_container').css({
					'position': 'absolute',
					'top': Math.floor(point_diameter/2) +'px',
					'left': point_diameter + 'px'
				});
				
				$plotter.find('.i_s_line').css({
					'height': line_width + 'px',
					'width': line_length + 'px',
					'background': '#000000',
					'position': 'absolute',
					'top': '0',
					'left': '0'
				});
				
				
				$plotter.find('.i_s_line.i_s_center').css({
					'left': line_length + 'px',
					'width': line_width + 'px',
					'height': Math.abs(offset) + 'px'
				});
				
				if (offset < 0) {
					$plotter.find('.i_s_line.i_s_center').css({
						'top': offset + line_width + 'px'
					});
				} else {
					$plotter.find('.i_s_line.i_s_center').css({
						'top': 0
					});
				}

				$plotter.find('.i_s_line.i_s_right').css({
					'left': line_length + 'px',
					'top': offset + 'px'
				});
			
				//set up basic styling for default view
				$this.css({
					'display':'block',
					'position': 'absolute',
					'left': pos_left + 'px',
					'top': pos_top + 'px',
					'width': '100%',
					'z-index':'1',
					'cursor': 'pointer'
				});
				
				$this.find('.i_s_body').css({
					'position': 'absolute',
					'padding' : _datapoint_body_padding + 'px',
					'left': (2 * line_length) + point_diameter + 'px',
					'top': offset - _datapoint_body_padding + 'px',
					'max-width':'480px',
					'z-index':'2'
				});
								
				$this.find('.i_s_body h3').css({
					'font': 'normal 16px/20px Georgia, serif',
					'margin': '5px 0 0'
				});
				
				$this.find('.i_s_body h5').css({
					'font': 'normal 11px/13px Verdana, arial, sans-serif',
					'text-transform':'uppercase',
					'color': '#999',
					'margin': 0
				});
				
				//make sure we're not showing the details of each point
				$this.find('.i_s_detail').css({
					'display':'none'
				});
				
				// attach mouseenter
				$this.off('mouseenter').on('mouseenter', function(){

					if ($this.hasClass('i_s_active')) return false;
					
					$this.find('.i_s_body').addClass('i_s_hovering');
					
					$this.find('.i_s_body.i_s_hovering').css({
						'background': '#fff',
						'-moz-box-shadow': '0 0 5px #666',
						'-webkit-box-shadow': '0 0 5px #666',
						'box-shadow': '0 0 5px #666',
						'z-index':'3',
						'cursor': 'pointer'
					});

					$plotter.find('.i_s_line, .i_s_point').css({
						'background': _cur_color_scheme
					});

				});
				
				//attach mouseleave
				$this.off('mouseleave').on('mouseleave', function(){

					$this.find('.i_s_body').removeClass('i_s_hovering');
					
					$this.find('.i_s_body').css({
						'background': 'none',
						'-moz-box-shadow': 'none',
						'-webkit-box-shadow': 'none',
						'box-shadow': 'none',
						'z-index':'3'
					});

					if (!$this.hasClass('i_s_active')) {
						$plotter.find('.i_s_line, .i_s_point').css({
							'background': '#000000'
						});
					}
					
				});

				// attach click event
				$this.off('click').on('click', function(){

					_launch_datapoint_details.call( this );

					$plotter.find('.i_s_line, .i_s_point').css({
						'background': _cur_color_scheme
					});

				});
				
			});

			// attach keyboard navigation

			// keyboard arrows
			$(document).keydown(function(e){
				
				if (e.keyCode == 37) { // left arrow
					_goto_prev_datapoint();
					return false;

				} else if (e.keyCode == 39) { // right arrow
					_goto_next_datapoint();
					return false;

				} else if (e.keyCode == 27) { // escape key
					_close_datapoint();
				}
			});
			
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _goto_next_datapoint() {

			var $cur = $datapoints.find('div.i_s_datapoint.i_s_active');

			if ($cur.length < 1) return false;

			var $next = $cur.next();

			if ($next.length < 1) return false;

			$next.trigger('click');

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _goto_prev_datapoint() {

			var $cur = $datapoints.find('div.i_s_datapoint.i_s_active');

			if ($cur.length < 1) return false;

			var $prev = $cur.prev();

			if ($prev.length < 1) return false;

			$prev.trigger('click');

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _launch_datapoint_details() {
						
			var $this = $(this),
				datapoint_content = $this.find('.i_s_body').html(),
				detail_window_html = '',
				$detail_window = $obj.find('.i_s_detail_window'),
				pos_left = $this.data('x'),
				pos_top = $this.data('y'),
				offset = $this.data('offset');

			// add datapoint content
			$detail_window.find('.i_s_detail_contents').html( datapoint_content );

			//style contents
			_style_detail_window();

			// attach click events to close_btn
			$detail_window.find('.i_s_close_btn').off('click').on('click', _close_datapoint );

			// mark all other datapoints as inactive
			$datapoints.find('div.i_s_datapoint').removeClass('i_s_active');

			// mark this datapoint as being active
			$this.addClass('i_s_active');

			if ( !$detail_window.hasClass('window_open') ) {
				_reveal_datapoint( $this, $detail_window );
			} else {
				_change_datapoint( $this, $detail_window );
			}

			// trigger mouseleave on all the datapoints
			$datapoints.find('div.i_s_datapoint').each(function(){
				$(this).trigger('mouseleave');
			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _close_datapoint() {

			var $detail_window = $obj.find('.i_s_detail_window');

			$detail_window
				.removeClass('window_open')
				.hide();

			$detail_window.find('.i_s_detail_contents').html('');

			// mark all other datapoints as inactive
			$datapoints.find('div.i_s_datapoint').removeClass('i_s_active');

			// trigger mouseleave on all the datapoints
			$datapoints.find('div.i_s_datapoint').each(function(){
				$(this).trigger('mouseleave');
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _get_expanded_datapoint_properties( $this, $detail_window ) {

			var obj = {},
				pos_top = $this.data('y'),
				pos_left = $this.data('x'),
				new_body_position = $this.find('.i_s_body').position(),
				new_content_height = $detail_window.find('.i_s_detail_contents').height(),
				container_height = $obj.height(),
				top_offset = 0;

			// determine height
			obj.height = new_content_height;

			// determine left
			obj.left = pos_left + new_body_position.left;

			// determine top
			obj.top = pos_top + new_body_position.top;

			// determine arrow top
			obj.arrow_top = 3;

			// determine destination top

			obj.dest_top = obj.top;

			top_offset = container_height - (obj.top + obj.height);

			if ( top_offset < 80 ) {
				obj.dest_top = obj.top + top_offset - 80;
				obj.arrow_top = (top_offset - 80 - 3) * -1;
			}

			return obj;

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _change_datapoint( $this, $detail_window ) {

			var properties = _get_expanded_datapoint_properties( $this, $detail_window );

			$detail_window.stop();

			//hide old contents
			$detail_window.find('.i_s_detail_contents').css({
				'opacity': 0
			});
			
			$detail_window
				.stop()
				.animate({
					'top' : properties.dest_top + 'px',
					'height' : properties.height + 'px'
				},
				{
					'duration' : 150,
					'complete' : function () {

						$detail_window.css('overflow','visible');
						_center_datapoint_vertically( $detail_window );

					}
				});
				
			//reveal new contents
			$detail_window.find('.i_s_detail_contents')
				.stop()
				.animate({
					'opacity' : 1
				},
				{
					'duration' : 150
				});

			$detail_window.find('.i_s_close_btn').show();

			$detail_window.find('span.i_s_arrow')
				.stop()
				.css('opacity', 0)
				.animate({
					'top' : properties.arrow_top + 'px'
				},{
					'duration' : 150,
					'complete' : function () {
						$detail_window.find('span.i_s_arrow')
							.stop()
							.animate({'opacity':1},{'duration':300});
					}
				});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _reveal_datapoint( $this, $detail_window ) {

			// find initial heights & positions
			var initial_height = $this.find('.i_s_body').height(),
				initial_width = $this.find('.i_s_body').width(),
				properties = _get_expanded_datapoint_properties( $this, $detail_window );

			$detail_window.stop();

			// position detail window
			$detail_window.css({
				'display': 'block',
				'width': initial_width + 'px',
				'height': initial_height + 'px',
				'top' : properties.top + 'px',
				'left' : properties.left + 'px'
			});

			properties = _get_expanded_datapoint_properties( $this, $detail_window );

			// animate window
			$detail_window
				.stop()
				.animate({
					'width' : '480px',
					'height' : properties.height + 'px',
					'top' : properties.dest_top
				},
				{
					'duration' : 150,
					'complete' : function () {

						$detail_window.addClass('window_open');
						$detail_window.find('.i_s_close_btn').css({
							'display': 'block'
						});

						_center_datapoint_vertically( $detail_window );
					}
				});

			$detail_window.find('span.i_s_arrow')
				.stop()
				.css('opacity',0)
				.animate({
					'top' : properties.arrow_top + 'px'
				},{
					'duration' : 150,
					'complete' : function () {
						$detail_window.find('span.i_s_arrow')
							.stop()
							.animate({'opacity':1},{'duration':300});
					}
				});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _center_datapoint_vertically( $jquery_obj ) {

			// vars
			var total_height = $jquery_obj.outerHeight(),
				window_height = $(window).height(),
				$header = $('header.global'),
				header_offset = 0,
				duration = 200,
				new_scrolltop = 0;
			
			// is there a header on the page?
			if ($header.length > 0) header_offset = $header.height() + 20;
			
			// vertically align?
			if (total_height < window_height) {
				
				// scroll page so that module will be vertically centered
				new_scrolltop = ($jquery_obj.offset().top - Math.round((window_height - total_height) / 2)) - header_offset;

			} else {
				
				// scroll page so that module begins at top of page
				new_scrolltop = $jquery_obj.offset().top - header_offset;
			}
			
			// animate scroll
			$('html,body').stop().animate(
				{
					'scrollTop' : new_scrolltop
				},
				{
					'duration' : duration
				}
			);

		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _style_detail_window() {
			
			var $detail_window = $obj.find('.i_s_detail_window');

			$detail_window.css({
				'z-index': 10,
				'position' : 'absolute',
				'background' : "#fff",
				'-moz-box-shadow': '0 0 5px #666',
				'-webkit-box-shadow': '0 0 5px #666',
				'box-shadow': '0 0 5px #666',
				'padding' : _datapoint_body_padding + 'px'
			});
			
			$detail_window.find('span.i_s_arrow').css({
				'width': '20px',
				'height': '26px',
				'position': 'absolute',
				'left': '-20px',
				'top': '2px',
				'background': 'url("'+ _img_sprite +'") no-repeat 3px 0px'
			});
			
			$detail_window.find('.i_s_detail_contents').css({
				'width' : '480px',
				'overflow': 'hidden'
			});
			
			$detail_window.find('.i_s_detail').css({
				'display': 'block',
				'width' : '480px',
				'overflow': 'hidden',
				'font': 'normal 15px/19px Georgia, serif'
			});
			
			$detail_window.find('.i_s_detail a').css({
				'color': '#0F2D5F'
			});
			
			$detail_window.find('h3').css({
				'font': 'bold 18px/22px Georgia, serif',
				'margin': '10px 0'
			});
			
			$detail_window.find('img').css({
				'float': 'right',
				'border': '3px solid #ededed',
				'margin': '0 0 10px 10px'
			});
			
			$detail_window.find('ul.i_s_related_links').css({
				'list-style-type':'none',
				'padding': '0',
				'margin-top': '20px'
			});
			
			$detail_window.find('ul.i_s_related_links li').css({
				'font': 'bold 13px/15px Georgia, serif',
				'margin': '10px 0'
			});
			
			$detail_window.find('ul.i_s_related_links li a').css({
				'text-decoration': 'none'
			});
			
			$detail_window.find('ul.i_s_related_links li a:hover').css({
				'text-decoration': 'underline'
			});
			
			$detail_window.find('ul.i_s_tweets').css({
				'display': 'block',
				'width': '100%',
				'background': '#ededed',
				'list-style-type': 'none',
				'padding': 0,
				'font': 'normal 12px/14px arial, sans-serif'
			});
			
			$detail_window.find('ul.i_s_tweets').css({
				'display': 'block',
				'width': '100%',
				'background': '#ededed'
			});

			// style close_btn
			$detail_window.find('.i_s_close_btn').css({
				'display': 'none',
				'position': 'absolute',
				'width': '28px',
				'height': '28px',
				'background': 'url("'+ _img_sprite +'") no-repeat 0 -40px',
				'top': 0,
				'right': 0,
				'-webkit-border-radius': '50%',
				'-moz-border-radius': '50%',
				'border-radius': '50%',
				'cursor':'pointer'
			});
			
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
				'top' : '220px',
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

			// set color scheme
			_cur_color_scheme = $target.data('color-scheme');
			
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
			$controls.find('div.i_s_option')
				.removeClass('i_s_active')
				.css({
					'background-color' : '#fff',
					'color': '#666',
					'font-weight': 'normal',
					'text-transform': 'none',
					'text-decoration' : 'underline'
				});
				
			$controls.find('span.i_s_downarrow').hide();
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _change_bg_control( id ) {
			
			_reset_bg_controls();

			_close_datapoint();
			
			var $target = $controls.find('div.i_s_option[data-id="'+ id +'"]');
			
			$target.css({
				'background-color' : _cur_color_scheme,
				'color': '#fff',
				'font-weight': 'bold',
				'font-size': '10px',
				'text-transform': 'uppercase',
				'text-decoration' : 'none',
				'position': 'relative',
				'-webkit-border-radius': '3px',
				'-moz-border-radius': '3px',
				'border-radius': '3px'
			});

			$target.addClass('i_s_active');
			
			// determine which image sprite to use
			$target.find('span.i_s_downarrow').css({
				'background' : 'url("'+ _img_sprite +'") no-repeat '+ $target.find('span.i_s_downarrow').data('sprite-x') +'px 0'
			});

			$target.find('span.i_s_downarrow').show();
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
				'font-size' : '11px',
				'line-height' : '18px',
				'color' : '#666666'
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
