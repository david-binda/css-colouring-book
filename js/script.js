(function(){
	CSSColouringBook = {
		canvas : document.querySelector( '#canvas' ),
		processChange: function( event ) {
			var value = event.target.value;
			console.log( event );
			if ( ( value.startsWith( '.' ) || value.startsWith( '#' ) ) && value.length > 1 ) {
				this.removePreviousHighlight();
				this.highlight( value );
			} else {
				this.removePreviousHighlight();
			}
		},
		highlight: function( selector ) {
			var elements = this.canvas.querySelectorAll( selector );
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
