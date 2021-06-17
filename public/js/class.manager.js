Digital( function () {
    $( '.open-class' ).each( function () {
        const node = $( this );
        node.click( function () {
            const
                baseUrl = "/routes/account/class/open/", 
                id = node.attr( 'data-id' ),
                name = node.attr( 'data-class' );
            window.location = baseUrl.concat( name ).concat( '/'.concat( id ) );
        } );
    } );
} );