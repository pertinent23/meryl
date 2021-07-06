const $ = Digital;

function getData() {
    const result = {};
        $( ':email, :password, :text' ).each( function () {
            const node = $( this );
            return result[ node.name() ] = node.value();
        } );
    return result;
}

function setError( err ) {
    return $( "#form-error" ).text( err );
};

Digital( function () {
    const 
        submit = $( '#submit' ),
        go = $( '#second' );
    submit.click( function () {
        const 
            data = getData(),
            path = Axios.getUrl( Axios.url );
            window.showLoader();
            if ( Axios.needed === 'registration' ) {
                data.username = data.name;
                data.password1 = data.password2 = data.password;
                delete data.name;
            } else {
                data.client_id = Axios.client_id;
                data.client_secret = Axios.client_secret;
                data.grant_type = Axios.grant_type;
                data.username = data.email;
                delete data.email;
            }
            console.log( Axios.test );
            fetch( path, {
                method: Axios.request.toLocaleLowerCase(),
                mode: 'cors',
                body: JSON.stringify( Axios.test ),
                headers: {
                    "Content-Type": "application/json"
                }
            } ).then( function ( response ) {
                return response.json();
            } ).then( function ( response ) {
                console.log( response );
                window.hideLoader();
                if( !( 'id' in response ) ) {
                    if ( 'email' in response && response.email[ 0 ] === 'new user with this email_address already exists.' ) {
                        return setError( "Email déjà utilisé." );
                    } else {
                        return setError( "Probleme lors de la création du compte." );
                    }
                }
                setError( ' ' );
                if ( Axios.needed === 'registration' )
                    $.setStorage( 'user', JSON.stringify(
                        response
                    ) );
                window.location = go.attr( 'data-url' );
            } ).catch( function () {
                return window.hideLoader();
            } );
    } );

    go.click( function () {
        window.location = go.attr( 'data-url' );
    } );
} );