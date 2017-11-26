(function(){
	CSSColouringBook = {
		canvas : document.querySelector( '#canvas' ),
		processChange: function( event ) {
			var value = event.target.value;
			// Highlight the elements, if there are some.
			if ( ( value.startsWith( '.' ) || value.startsWith( '#' ) ) && value.length > 1 ) {
				this.removePreviousHighlight();
				this.highlight( value, event );
			} else {
				this.removePreviousHighlight();
			}
			// If selecting in terms of an exercise, evaluate the output.
			var exercise = event.target.getAttribute( 'data-exercise-form-for' );
			if ( null !== exercise ) {
				var tasks = document.querySelectorAll( '#' + exercise + ' .task' );
				if ( 0 !== tasks.length ) {
					for ( var i = 0; i < tasks.length; i++ ) {
						var task = tasks[i],
						    taskType = task.getAttribute( 'data-exercise-type' ),
						    failed = false;
						if ( 'select' === taskType ) {
							var highlighted = this.canvas.querySelectorAll( '.highlight' );
							var expectedSolution = this.canvas.querySelectorAll( task.getAttribute( 'data-exercise-solution' ) );
							if ( 0 !== highlighted.length && 0 !== expectedSolution.length && highlighted.length === expectedSolution.length ) {
								for ( var j = 0; j < highlighted.length; j++ ) {
									if ( -1 === Array.prototype.indexOf.call( expectedSolution, highlighted[j] ) ) {
										failed = true;
									}
								}
								if ( false === failed ) {
									task.classList.add( 'success' );
								}
							}
						}
					}
				}
			}
			
		},
		highlight: function( selector, event ) {
			try {
				var elements = this.canvas.querySelectorAll( selector );
			} catch ( e ) {
				console.log( e );
				event.target.parentElement.classList.add( 'invalid-selector' );
				return;
			}
			event.target.parentElement.classList.remove( 'invalid-selector' );
			if ( 0 !== elements.length ) {
				for ( var i = 0; i < elements.length; i++ ) {
					elements[i].classList.add( 'highlight' );
				}
			}
			
		},
		removePreviousHighlight: function() {
			var elements = this.canvas.querySelectorAll( '#canvas .highlight' );
			if ( 0 !== elements.length ) {
				for ( var i = 0; i < elements.length; i++ ) {
					elements[i].classList.remove( 'highlight' );
				}
			}
		},
		init: function() {
			var that = this,
			    elements = document.querySelectorAll('.css-rules');

			if ( 0 !== elements.length ) {
				for ( var i = 0; i < elements.length; i++ ) {
					elements[i].addEventListener( 'change', function( event ) { that.processChange( event ); } );
					elements[i].addEventListener( 'input', function( event ) { that.processChange( event ); } );
					elements[i].addEventListener( 'paste', function( event ) { that.processChange( event ); } );
				}
			}
				
		}
	}
	document.addEventListener( 'DOMContentLoaded', function(event) {
		CSSColouringBook.init();
	} );
})();
