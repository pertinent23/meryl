const Axios = {
    baseUrl: "https://networkschool-api-2021.herokuapp.com",
    method: '',
    request: "",
    url: '',
    needed: '',
    client_id: 'roosvelt',
    client_secret: 'roosvelt12345',
    grant_type: 'password',
    getUrl( url ) {
        return this.baseUrl.concat( url );
    }
};

Axios.test = {
    client_id: Axios.client_id,
    client_secret: Axios.client_secret,
    grant_type: Axios.grant_type,
    username: 'delano@gmail.com',
    password: 'delano12345'
}

window.hideLoader = function () {
    const 
        loader = $( "#loader" ),
        page = $( ".main-container" );
    return $( document ).ready( function () {
        loader.hide();
        return page.show();
    } );
};

function getToken() {
    try{
        const val = JSON.parse(
            Digital.getStorage( 'jwtu' )
        );
        if ( !val )
            throw "Jwtu";
        return val;
    } catch( e ) {
        window.location = '/routes/connection/';
    }
};

function getUser() {
    try{
        const val =  JSON.parse(
            Digital.getStorage( 'user' )
        );
        if ( !val )
            throw "User";
        return val;
    } catch( e ) {
        window.location = '/routes/connection/';
    }
};

function saveUser( user ) {
    return Digital.setStorage( 'user', JSON.stringify(
        user
    ) );
};

Axios.get = function ( url ) {
    const 
        path = url,
        token = getToken(),
        auth = 'Bearer '.concat( token.access_token );
        Axios.request = 'get';
    return fetch( path, {
        method: Axios.request.toLocaleLowerCase(),
        mode: 'cors',
        headers: {
            Authorization: auth
        }
    } ).then( function ( response ) {
        return response.json();
    } );
};

Axios.post = function ( url, body ) {
    const 
        path = url;
        Axios.request = 'post';
    return fetch( path, {
        method: Axios.request,
        mode: 'cors',
        body: JSON.stringify( body ),
        headers: {
            'Content-Type': 'application/json'
        }
    } ).then( function ( response ) {
        return response.json();
    } );
};

window.showLoader = function () {
    const 
        loader = $( "#loader" ),
        page = $( ".main-container" );
    return $( document ).ready( function () {
        loader.show();
        return page.hide();
    } );
};

Digital( function ( $ ) {
    window.hideLoader();
} );