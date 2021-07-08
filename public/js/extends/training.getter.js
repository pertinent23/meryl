const ClassList = {};
Digital( function () {
    ClassList.mode = 6;
    const
        path = Axios.getUrl( '/api/all-not-my-simulation/' ); 
        showLoader();
    return Axios.get( path ).then( function ( response ) {
        let both = [];
        const parent = $( '#contentAll' );
            parent.empty();
            for ( const sim of response ) {
                if ( !( 'name' in sim.content ) )
                    continue;
                const 
                    node = $( {
                        el: 'div',
                        class: both.length === 1 
                            ? 'py-3 px-3 col-12 col-md-6 d-flex justify-content-center align-items-center' 
                            : 'py-3 px-3 col d-flex justify-content-center align-items-center'
                    } );
                    node.append( createSimulation( sim, 6 ).css( { minWidth: '98%' } ) );
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
            if( response.length === 0 )
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
        return hideLoader();
    } );
} );