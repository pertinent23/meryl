function addClass( node, type ) {
    return $( type ? '.my-class' : '.my-other-class' ).append( 
        node 
    );
};

function createClass( name, describe, type, token ) {
    const buttons = [];
        if ( type ) {
            const 
                stat = $( {
                    el: 'a',
                    class: 'btn my-2 btn-outline px-3 py-2 mr-3 stat-class',
                    content: 'Statisque'
                } ),
                member = $( {
                    el: 'a',
                    class: 'btn my-2 btn-outline px-3 py-2 mr-3 members-class',
                    content: 'Participants'
                } );
            buttons.push( stat.click( function () {
                ClassList.main = token;
                    Tools.open( token.name, token.description );
                return Tools.openStat();
            } ) );
            buttons.push( member.click( function () {
                ClassList.main = token;
                    Tools.open( token.name, token.description );
                return Tools.openMember();
            } ) );
        }
        const open = $( {
            el: 'a',
            class: 'btn my-2 px-3 py-2 open-class openClassButton',
            content: 'Ouvrir'
        } ).click( function () {
            ClassList.main = token;
                Tools.open( token.name, token.description );
            return Tools.closeMember();
        } );
        buttons.push( open );
    const node = $( {
        el: 'div',
        class: 'card simulation-card class-card px-3 py-2 shadow border-0 my-2 pr-0',
        content: ' '
    } )

    node.append( {
        el: 'div',
        class: 'card-head',
        content: name
    } );

    node.append( {
        el: 'div',
        class: 'card-body px-0',
        content: ''
    } )
    .append( {
        el: 'div',
        class: 'description',
        contenteditable: true,
        content: describe
    } )
    .parent()
    .append( {
        el: 'div',
        class: 'container-fluid d-flex justify-content-end pt-4 pr-1'
    } ).append( buttons );
    return node;
};

function emptyCreatedList() {
    return $( '.my-class' ).empty();
};

function emptyAddedList() {
    return $( '.my-other-class' ).empty();  
};

function createAllClass() {
    if( ClassList.created.length != 0 )
        emptyCreatedList();
    for( const createdClass of ClassList.created ) {
        createdClass.describe = `Id: ${createdClass.pseudo} \n Password: ${createdClass.password}`;
        createdClass.isAdmin = true;
        addClass(
            createClass( createdClass.name, createdClass.describe, true, createdClass ),
            true,
        );
    }

    if( ClassList.added.length != 0 )
        emptyAddedList(); 
    for( const addedClass of ClassList.added ) {
        addedClass.isAdmin = false;
        addClass(
            createClass( addedClass.name, addedClass.describe, false, addedClass ),
            false,
        );
    }
};

Digital( function ( $ ) {
    showLoader();
    const 
        user = getUser(),
        path = Axios.getUrl( `/api/user-created-class/${user.id}/` ),
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
        if( Digital.isArray( response ) )
            ClassList.created = response;
            const 
                path = Axios.getUrl( `/api/all-class-user-particip/${user.id}/` );
            fetch( path, {
                method: Axios.request.toLocaleLowerCase(),
                mode: 'cors',
                headers: {
                    Authorization: auth
                }
            } ).then( function ( response ) {
                return response.json();
            } ).then( function ( response ) {
                if( Digital.isArray( response ) )
                    ClassList.added = response;
                        createAllClass();
                return hideLoader();
            } );
        return createAllClass();
    } ).catch( function ( err ) {
        hideLoader();
    } );
} );