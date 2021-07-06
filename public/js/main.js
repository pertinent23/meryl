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
    username: 'kencoorp@gmail.com',
    password: 'kennel12345'
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