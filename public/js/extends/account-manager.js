Digital( function ( $ ) {
    const user = getUser();
        $( "#current-user-name" ).text( user.username );
        $( "#current-user-email" ).text( user.email );
    return this;
} );