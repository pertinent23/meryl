if ( Object.isExtensible( window.Simulation ) ) {
    window.Simulation.ScroolManager = {};
    const exchangePoint = 576;
    const getData = () => {
        const result = {
            height: window.innerHeight,
            width: window.innerWidth,
            buttons: {},
            items: { 
                //Content size of each items
            }
        };
            if ( result.width >= 650 ) {
                result.items.width = 80;
                result.items.height = 80;
                result.buttons.width = 50;
                result.buttons.height = 50;
            } else {
                result.items.width = 50;
                result.items.height = 50;
                if ( result.width < exchangePoint ) {
                    result.buttons.width = 40;
                    result.buttons.height = 50;
                } else {
                    result.buttons.width = 50;
                    result.buttons.height = 50;
                }
            }
        return result;
    };

    const build = ( data, elt ) => {
        let axes, saxes, by, nbr = elt.items.length;
        const 
            hide = ( elt ) => ( elt.replaceClass( 'd-flex', 'd-none' ) ),
            show = ( elt ) => ( elt.replaceClass( 'd-none', 'd-flex' ) );
        const ScrollData = {
            first: 0, //represent the beginning point
            contentLength: 0,
            containerLength: 0,
            barLength: 0
        };
            if ( data.width >= exchangePoint ) {
                axes = 'height';
                saxes = 'width';
                by = 'top';
            } else { 
                axes = 'width';
                saxes = 'height';
                by = 'left';
            }

            ScrollData.barLength = parseFloat( elt.container.css( axes ).toInt() );
            ScrollData.contentLength = nbr * ( data.items[ axes ] + 5 );
            ScrollData.containerLength = ScrollData.barLength - ( data.buttons[ axes ] - 2 );
            const 
                overflow = ScrollData.containerLength - ScrollData.contentLength;
                if( overflow < 0 ) {
                    Digital(
                        [ 
                            elt.buttons.first, 
                            elt.buttons.second 
                        ]
                    ).replaceClass( 'd-none', 'd-flex' );
                    let change = 0;
                    const 
                        steps = ScrollData.containerLength / 2.3;
                            elt.buttons.second.click( function () {
                                const 
                                    abs = Math.abs( overflow );
                                        show( elt.buttons.first.first( true ) );
                                        change = ( ( ScrollData.first + steps ) > abs ) ? abs - ScrollData.first : steps;
                                        ScrollData.first += change;
                                            if ( change != 0 )
                                                elt.content.css( by, ( -1 * ScrollData.first ) + 'px' );
                                if( ScrollData.first == abs )
                                    return hide( elt.buttons.second.first( true ) );
                            } );
        
                            elt.buttons.first.click( function () {
                                const 
                                    abs = 0;
                                        show( elt.buttons.second.first( true ) );
                                        change = ( ( ScrollData.first - steps ) < abs ) ? abs + ScrollData.first : steps;
                                        ScrollData.first -= change;
                                            if ( change != 0 )
                                                elt.content.css( by, ( -1 * ScrollData.first ) + 'px' );
                                if( ScrollData.first == abs )
                                    return hide( elt.buttons.first.first( true ) );
                            } );
                            elt.content.css( by, '0px' );
                        show( elt.buttons.second.first( true ) );
                    hide( elt.buttons.first.first( true ) );
                } else {
                    Digital(
                        [ 
                            elt.buttons.first, 
                            elt.buttons.second 
                        ]
                    ).replaceClass( 'd-flex', 'd-none' );
                }
        return data;
    };

    window.Simulation.ScroolManager.getData = getData;
    window.Simulation.ScroolManager.build = build;
    window.Simulation.ScroolManager.init = function () {
        return Digital( function ( $ ) {
            const 
                data = getData(),
                elts = {
                    buttons: {
                        first: $( '.move-left' ),
                        second: $( '.move-right' )
                    },
                    container: $( '.itemList' ),
                    content: $( '.itemContent' ),
                    items: $( '.itemContent .items' ),
                    bar: $( '.dataSpace' )
                };
            return build( data, elts );
        } );
    };
}