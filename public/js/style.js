Digital( function () {
    $( '#menu' ).remove();
    $( '#navbar' ).css( {
        height: ( $( '#navbar' ).offsetHeight() + 100 ) + 'px'
    } )
    $( '.main-container' ).css( 'border-top', 'none' );
} );