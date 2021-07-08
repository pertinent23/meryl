function show( obj ) {
    return obj.replaceClass( 'd-none', 'd-flex' );
}

function hide( obj ) {
    return obj.replaceClass( 'd-flex', 'd-none' );
}

const ClassList = {
    created: [],
    added: [],
    main: null
};

const Tools = {
    class: null,
    icon: null,
    closeAddButton: null,
    closeClassButton: null,
    closeStatButton: null,
    closeMemberButton: null,
    stat: null,
    member: null,
    effectif: null,
    add: null,
    win: null,
    taux: null,
    indice: null,
    classNameField: null,
    memberButton: null,
    statButton: null,
    addButton: null,
    closeClass() {
        ClassList.main = null;
        return hide( this.class );
    },
    addPendingSimulation( list ) {
        const parent = $( "#contentSimulationToAdd" );
            parent.empty();
            for( const item of list ) {
                const 
                    node = createSimulation( item, 4 );
                parent.append( node );
            }
        return this;
    },
    addSimulation( simList ) {
        let both = [];
        if ( Digital.isObject( ClassList ) )
            ClassList.main.simList = simList;
        const parent = $( '.spaceSimulationListContent' );
            parent.empty();
            ClassList.nS = simList.length;
            for ( const sim of simList ) {
                const 
                    node = $( {
                        el: 'div',
                        class: both.length === 1 
                            ? 'py-3 px-3 col-12 col-md-6 d-flex justify-content-center align-items-center' 
                            : 'py-3 px-3 col d-flex justify-content-center align-items-center'
                    } );
                    node.append( createSimulation( sim, 3 ).css( { minWidth: '98%' } ) );
                    node.first( true ).removeClass( 'my-2' );
                    both.push( node );
                if ( both.length === 2 ) {
                    const 
                        row = $( { el: 'div', class: 'row' } );
                        row.append( both );
                    parent.append( row );
                    both = [];
                }
            }
            if( simList.length === 0 )
                parent.append( {
                    el: 'div',
                    class: 'py-5 text-center',
                    content: 'Aucune simulation pour le moment.'
                } );
            else {
                const 
                    row = $( { el: 'div', class: 'row' } );
                        row.append( both );
                        row.append( { el: 'div', class: 'col-12 col-md-6' } );
                parent.append( row );
            }
        return this;
    },
    createUser( data ) {
        const 
            node = $( {
                el: 'div',
                class: 'user container-fluid d-flex border justify-content-center align-items-center py-2 mt-2',
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
                class: 'user-action btn '.concat( ClassList.main.isAdmin ? '' : 'd-none' ),
                content: 'Supprimer'
            } );

            node.append( userData );
            button.click( function () {
                button.remove();
            } );
        return node;
    },
    addUser( list ) {
        const 
            parent = $( '#contentListOfMember' ).empty();
            ClassList.n = list.length;
                for ( const item of list )
                    parent.append(
                        Tools.createUser( item )
                    );
                if ( list.length === 0 ) 
                        parent.text( 'Aucun participant pour l\'instant' );
        return this;
    },
    openClass( name ) {
        const 
            obj = this,
            token = ClassList.main;
            ClassList.mainListSim = [];
            showLoader();
            token.isAdmin ? utils.show( this.addButton ) : utils.hide( this.addButton );
            const 
                path = Axios.getUrl( `/api/simul-classe/${token.id}/` );
                Axios.get( path )
                .then( function ( response ) {
                    if ( Digital.isArray( response ) )
                        Tools.addSimulation( response );
                            ClassList.mainListSim = response;
                        const path = Axios.getUrl( `/api/all-participant-classe/${token.id}/` );
                            Axios.get( path ).then( function ( response ) {
                                if ( Array.isArray( response ) )
                                    Tools.addUser( response );
                                return hideLoader();
                            } );
                    return this;
                } )
                .catch( function ( err ) {
                    return hideLoader();
                } );
                    this.setClassName( name );
                show( this.class );
                    this.memberButton.click( function () {
                        return obj.openMember();
                    } );
            this.statButton.click( function () {
                return obj.openStat();
            } );
            this.addButton.click( function () {
                return obj.openAdd();
            } );
        return this.closeClassButton.click( function () {
            return obj.closeClass();
        } );
    },
    openAdd() {
        this.closeMember();
            this.closeStat();
                this.closeAddButton.click( function () {
                    return Tools.closeAdd();
                } );
            showLoader();
        const 
            user = getUser(),
            path = Axios.getUrl( `/api/simul-create-by-user/${user.id}/` );
            Axios.get( path ).then( function ( response ) {
                if ( Digital.isArray( Tools.addPendingSimulation( response ) ) )
                    Tools.addPendingSimulation( response );
                return hideLoader();
            } );
        return show( this.add );
    },
    closeAdd() {
        return hide( this.add );
    },
    closeMember() {
        return hide( this.member );
    },
    closeStat() {
        return hide( this.stat );
    },
    setClassIcon( name = '' ) {
        this.icon.text( name );
    },
    openMember( ) {
        this.closeStat();
            this.closeAdd();
                this.closeMemberButton.click( function () {
                    return Tools.closeMember();
                } );
        return show( this.member );
    },
    statManager( data ) {
        $( '#classMember' ).text( `${ClassList.n} élève(s).` );
        const 
            win = $( '.win' ),
            taux = $( '.taux' );

        let nb = 0;
        const 
            tVal = Math.ceil( ( data.length / ClassList.nS ) * 100 ),
            realVal = ClassList.main.isAdmin ? tVal / ( ClassList.n || 1 ) : tVal;
            taux.css( { width: `${realVal}px` } ).text( `${realVal}%` );
            for( const item of data ) {
                if ( item.value > 10 )
                    nb++;
            }

        const
            tWin = Math.ceil( ( nb / ( data.length || 1 ) ) * 100 );
            win.css( { width: `${tWin}px` } ).text( `${tWin}%` );
        
        return this;
    },
    openStat() {
        showLoader();
        const obj = this;
            this.closeMember();
                this.closeAdd();
                    this.closeStatButton.click( function () {
                        return Tools.closeStat();
                    } );
            const 
                path = Axios.getUrl( `/api/get-note-classe/${ ClassList.main.id }/` );
        return Axios.get( path ).then( function ( response ) {
                Tools.statManager( response );
            hideLoader();
            return show( obj.stat );
        } );
    },
    setClassName( name = '' ) {
        this.classNameField.text( name );
        this.closeMember();
        this.closeStat();
        return this.setClassIcon( 
            name.substring( 0, 2 ) 
        );
    },
    open( name, desc, type ) {
        if( !type || type === 1 ) {
                this.openClass( name, desc );
            return this.openMember();
        } else {
                this.openClass( name, desc );
            return this.openStat();
        }
    }
};

Digital( function ( $ ) {
    const 
        nameField = $( '#class-name' ),
        descriptionField = $( '#class-description' );
            Digital.update( Tools, {
                class: $( '.api-class' ),
                icon: $( '#class-icon' ),
                classNameField: $( '#class-shown-name' ),
                closeClassButton: $( '#close-api-class' ),
                member: $( '.memberSpace' ),
                stat: $( '.statSpace' ),
                memberButton: $( '#openMember' ),
                statButton: $( '#openStat' ),
                closeStatButton: $( '#close-stat' ),
                closeMemberButton: $( '#close-member' ),
                addButton: $( '#addSimulation' ),
                closeAddButton: $( '#close-add' ),
                add: $( '.addSpace' )
            } );
        $( '.user-action' ).each( function ( index ) {
            return $( this ).click( function () {
                return $( '.user' ).n( index ).remove();
            } );
        } );
    $( "#create-class" ).click( function () {
        const 
            name = nameField.value(),
            description = descriptionField.value();
            if( !name || !description )
                return;
            showLoader();
            const 
                path = Axios.getUrl( '/api/classe/' ),
                user = getUser();
                Axios.request = 'post';
            fetch( path, {
                method: Axios.request.toLocaleLowerCase(),
                mode: 'cors',
                body: JSON.stringify( {
                    describe: description,
                    name: name,
                    user: user.id
                } ),
                headers: {
                    'Content-Type': 'application/json'
                }
            } ).then( function ( response ) {
                return response.json();
            } ).then( function ( response ) {
                console.log( response );
                ClassList.created.push( response );
                    emptyCreatedList();
                        createAllClass();
                    hideLoader();
                    ClassList.main = response;
                return Tools.open( name, description );
            } ).catch( function () {
                hideLoader();
            } );
    } );
} );

Digital( function ( $ ) {
    const
        psuedoField = $( '#class-id' ),
        passwordField = $( '#class-password' );
    return $( '#addUserInClass' ).click( function () {
        const 
            pseudo = psuedoField.value(),
            password = passwordField.value();
        if ( pseudo && password ) {
            showLoader();
            const 
                path = Axios.getUrl( '/api/login-classe/' ),
                token = getToken(),
                auth = 'Bearer '.concat( token.access_token );
                Axios.request = 'post';
            fetch( path, {
                method: Axios.request.toLocaleLowerCase(),
                mode: 'cors',
                body: JSON.stringify( {
                    pseudo: pseudo,
                    password: password
                } ),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth
                }
            } ).then( function ( response ) {
                return response.json();
            } ).then( function ( response ) {
                console.log( response );
                hideLoader();
                    ClassList.main = response;
                return Tools.open( response.name, response.describe );
            } ).catch( function () {
                hideLoader();
            } );
        }
    } );
} );