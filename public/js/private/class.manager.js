function show( obj ) {
    return obj.replaceClass( 'd-none', 'd-flex' );
}

function hide( obj ) {
    return obj.replaceClass( 'd-flex', 'd-none' );
}

const Tools = {
    class: null,
    icon: null,
    closeClassButton: null,
    closeStatButton: null,
    closeMemberButton: null,
    stat: null,
    member: null,
    effectif: null,
    win: null,
    taux: null,
    indice: null,
    classNameField: null,
    memberButton: null,
    statButton: null,
    closeClass() {
        return hide( this.class );
    },
    openClass( name, desc ) {
        const 
            obj = this;
                    this.setClassName( name );
                show( this.class );
                    this.memberButton.click( function () {
                        return obj.openMember();
                    } );
            this.statButton.click( function () {
                return obj.openStat();
            } );
        return this.closeClassButton.click( function () {
            return obj.closeClass();
        } );
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
        this.closeMemberButton.click( function () {
            return Tools.closeMember();
        } );
        return show( this.member );
    },
    openStat() {
        this.closeMember();
        this.closeStatButton.click( function () {
            return Tools.closeStat();
        } );
        return show( this.stat );
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
                closeMemberButton: $( '#close-member' )
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
        return Tools.open( name, description );
    } );
} );