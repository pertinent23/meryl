const 
    Utils = {
        createUser( data ) {
            const 
                node = $( {
                    el: 'div',
                    class: 'user container-fluid d-flex border justify-content-center align-items-center py-2 mt-2 shadow rounded',
                    content: {
                        el: 'div',
                        class: 'icon d-flex justify-content-center align-items-center',
                        content: data.username[ 0 ]
                    }
                } ),
                userData = $( {
                    el: 'div',
                    class: 'user-data flex-column d-flex flex-column pl-3',
                    content: ' '
                } );
                userData.append( {
                    el: 'div',
                    class: 'user-name',
                    content: data.username
                } );
                
                const button = userData.append( {
                    el: 'div',
                    class: 'user-options d-flex justify-content-end w-100',
                    content: ''
                } )
                .append( {
                    el: 'button',
                    class: 'user-action btn',
                    content: 'Envoyer'
                } );
    
                node.append( userData );
                button.click( function () {
                    const MySimulation = Utils.sim;
                    const 
                        path = Axios.getUrl( `/api/simulation/` );
                        Axios.request = 'post';
                        MySimulation.key = 'received';
                    showLoader();
                    return fetch( path, {
                        method: Axios.request,
                        mode: 'cors',
                        body: JSON.stringify( {
                            content: MySimulation,
                            creator: data.id
                        } ),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    } ).then( function ( response ) {
                        return response.json();
                    } ).then( function ( response ) {
                            Utils.close();
                        return hideLoader();
                    } ).catch( function ( err ) {
                        return hideLoader();
                    } );
                } );
            return node;
        },
        addUser( user ) {
            const 
                node = this.createUser( user );
            return $( '#user-list' ).append( node );
        },
        close() {
            return $( '.sendSimulation' ).replaceClass( 'd-flex', 'd-none' );
        },
        open() {
            return $( '.sendSimulation' ).replaceClass( 'd-none', 'd-flex' );
        },
        init() {
            this.getAllUser().then( function () {
                return Utils.open();
            } );

            return $( '#close-sendApi' ).click( function () {
                return Utils.close();
            } );
        },
        getAllUser() {
            const 
                user = getUser(),
                path = Axios.getUrl( `/user/` );
            return Axios.get( path ).then( function ( response ) {
                $( '#user-list' ).empty();
                if ( Digital.isArray( response ) ) {
                    for( const el of response ) {
                        if ( el.id !== user.id ) 
                            Utils.addUser( el );
                    }

                    if ( response.length === 0 ) 
                    $   ( '#user-list' ).text( 'Aucun utilisateur pour le moment' );
                }
            } );
        }
    };

Digital( function () {
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