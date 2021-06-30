Digital( function ( $ ) {
    const 
        loader = $( "#loader" ),
        page = $( ".main-container" );
    return $( document ).ready( function () {
        loader.hide();
        return page.show();
    } );
} );