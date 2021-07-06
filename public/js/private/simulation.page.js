const inits = {
    showButton() {
        return $( '.showSimulationButton' ).each( function () {
            const node = $( this );
            return node.click( function () {
                const 
                    save = JSON.parse( $.getStorage( 'save' ) );
                InterfaceManager.openInterFace( save, true );
            } );
        } );
    },
    startButton() {
        return $( '.startSimulationButton' ).each( function () {
            const node = $( this );
            return node.click( function () {
                const 
                    save = JSON.parse( $.getStorage( 'save' ) );
                InterfaceManager.openInterFace( save, false );
            } );
        } );
    }
};

Digital( function ( $ ) {
    const 
        nameField = $( '#simulation-creation-name' ),
        descriptionField = $( '#simulation-description' ),
        errorField = $( '#simulation-creation-error' ),
        creationButton = $( '#create-simulation' );
    return creationButton.on( 'click', function () {
        const 
            name = nameField.value(),
            description = descriptionField.value();
            errorField.empty();
        if ( name && name.length >= 5 && description && description.length >= 15 ) {
            if ( InterfaceManager )
                InterfaceManager.openInterFace( name, description );
        } else {
            errorField.text( 
                "Le nom de la simulation doit avoir aumoins 5 caratères et la description 15." 
            );
        }
    } );
} );

Digital( function ( $ ) {
        inits.showButton();
    return inits.startButton();
} );