Digital( function ( $ ) {
    const 
        path = Axios.getUrl( '/user/current_user/' ),
        token = getToken(),
        auth = 'Bearer '.concat( token.access_token );
        Axios.request = 'get';
    fetch( path, {
        method: Axios.request.toLocaleLowerCase(),
        mode: 'cors',
        headers: {
            Authorization: auth
        }
    } ).then( function ( response ) {
        return response.json();
    } ).then( function ( response ) {
        saveUser( response );
    } );
} );