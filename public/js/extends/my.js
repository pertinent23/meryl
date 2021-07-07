Digital( function () {
    const 
        user = getUser(),
        icon = $( '.myIcon' ),
        password = $( '.password' ),
        emailField = $( '.email' ),
        nameField = $( '.name' );
            icon.text( user.username[ 0 ].toUpperCase() );
            emailField.text( user.email );
            password.text( '*********' );
            nameField.text( user.username );
        $( '.modify' ).click( function () {
            let send = false;
            const 
                name = nameField.text(),
                email= emailField.text(),
                path = Axios.getUrl( `/user/${user.id}/` ),
                data = {};
                    if ( name != user.username ) {
                            send = true;
                        data.username = name;
                    }
                        
                    if ( email != user.email ){
                            send = true;
                        data.email = email;
                    }
                Axios.request = 'patch';
                console.log( data );
            return send ? fetch( path, {
                method: Axios.request.toLocaleLowerCase(),
                mode: 'cors',
                body: JSON.stringify( data ),
                headers: {
                    "Content-Type": "application/json"
                }
            } ).then( function ( response ) {
                return response.json();
            } ).then( function ( response ) {
                console.log( response );
            } ) : this;
        } );
    return user;
} );