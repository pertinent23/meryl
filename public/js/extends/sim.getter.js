Digital( function ( $ ) {
    showLoader();
    const 
        user = getUser(),
        path = Axios.getUrl( `/api/simul-create-by-user/${user.id}/` ),
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
        emptyList();
        if ( Digital.isArray( response ) ) {
            for ( const simulation of response )
                pileSimulation( simulation, 2 );
        }
        return hideLoader();
    } ).catch( function ( err ) {
        return hideLoader();
    } );
} );