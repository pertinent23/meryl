const current = { context: 1, mode: 1, pile: [] };
const map = {};
const events = {
    dragStart: 'drag.detected',
    dropDetected: 'drop.detected',
    drop: 'drop.valided',
    drag: 'drag.move'
};

Simulation.events = events;

const fx = {
    addToWorkSpace( node ) {
        /** 
            * Add node in the
            * workSpace in position fixed 
        */
        return $( '.mainSpace' ).append( node );
    },
    createCurrentItem( node ) {
        /** 
            * Create an item we can 
            * easily manage
        */
        return $( {
            el: 'div',
            class: 'currentItem'
        }, { append: node } );
    }, 
    createCurrentCable() {
        return {
            port1: $( {
                el: 'div',
                class: 'currentRound d-none'
            } ),
            port2: $( {
                el: 'div',
                class: 'currentRound d-none'
            } ),
            bar: $( {
                el: 'div',
                class: 'currentBar d-none'
            } )
        };
    },
    initBaseToolsItem() {
        let node;
            ( node = utils.targeted = fx.addToWorkSpace(
                fx.createCurrentItem( utils.targeted ).css( {
                    left: utils.data.cx + 'px',
                    top: utils.data.cy + 'px'
                } )
            ) ).on( events.dropDetected, function ( e ) {
                const { x, y } = e.detail;
                    if ( utils.dropZoneVerifier( x, y ) ) {
                        const clone = node.clone();
                            clone.css( { position: 'relative', left: '0px', top: '0px' } );
                                utils.dropZone.append( clone );
                                    initEvent( utils.dropZone, events.drop, e.detail );
                            node.remove();
                        return clone;
                    } else {
                        return node.remove();
                    }
            } );
        return node;
    },
    initSimulationTools( node, detail ) {
        if ( detail.infos != 'cable' ) {
            let id, obj;
                node = utils.targeted = fx.addToWorkSpace(
                    fx.createCurrentItem( utils.targeted ).css( {
                        left: utils.data.cx + 'px',
                        top: utils.data.cy + 'px'
                    } )
                );
                id = Simulation.getComponentByName( node, detail.infos );
                obj = Simulation.getById( id ).setData( detail );
                        activeDragEvent( node, function () {
                            utils.detected = true;
                            utils.down = true;
                        }, function () {
                            const { x, y } = utils.data;
                                if ( !utils.dropZoneVerifier( x, y ) ) {
                                        obj.removeAll();
                                    return Simulation.remove( obj );
                                } else {
                                    obj.getData().x = utils.data.x;
                                    obj.getData().y = utils.data.y;
                                }
                        } );
                    utils.data.mx = utils.targeted.offsetWidth() / 2;
                    utils.data.my = utils.targeted.offsetHeight() / 2;
                    node.on( events.drag, function () {
                        obj.getData().x = utils.data.x;
                        obj.getData().y = utils.data.y;
                    } );
                return current.pile.push( id );
        } else {
            const context = this;
            let id, obj, first = true;
                node = this.createCurrentCable();
                id = Simulation.getComponentByName( node, detail.infos );
                obj = Simulation.getById( id );
                    const { port1, port2, bar } = node;
                        utils.show( port1 );
                        utils.targeted = context.addToWorkSpace( port1 ).css( {
                            left: utils.data.cx + 'px',
                            top: utils.data.cy + 'px'
                        } );
                        activeDragEvent( utils.targeted, null, function () {
                            const { x, y } = utils.data;
                                if ( utils.dropZoneVerifier( x, y ) && first ) {
                                    utils.show( port2 );
                                        utils.down = true;
                                        utils.detected = true;
                                            context.addToWorkSpace( bar );
                                            utils.show( bar );
                                            utils.targeted = context.addToWorkSpace( port2 ).css( {
                                                left: utils.data.x + 'px',
                                                top: utils.data.y + 'px'
                                            } );
                                        first = false;
                                    return activeDragEvent( utils.targeted, null, function () {
                                        const { x, y } = utils.data;
                                        if ( !utils.dropZoneVerifier( x, y ) )
                                            return obj.removeAll();
                                    }  );
                                }
                            return !utils.dropZoneVerifier( x, y ) ? obj.removeAll() : port1;
                        } );
                        const 
                            pos = { x1: 0, x2: 0, y1: 0, y2: 0, height: 0, rot: 0, xb: 0, yb: 0 },
                            mx = port1.offsetWidth() / 2, my = port1.offsetHeight() / 2,
                            calcAngular = () => {
                                if ( pos.x2 || pos.y2 ) {
                                    obj.getData().height = pos.height;
                                    pos.rot = ( Math.asin( Math.abs( pos.xb - pos.x2 - mx ) / pos.height ) * -180 ) / Math.PI;
                                    pos.rot = isNaN( pos.rot ) ? 0 : pos.rot;
                                    if ( pos.x2 < pos.xb || pos.y2 < pos.yb ) {
                                        if ( pos.x2 > pos.xb && pos.y2 < pos.yb ) 
                                            pos.rot = Math.abs( pos.rot ) + 180;
                                        else if ( pos.x2 < pos.xb && pos.y2 < pos.yb ) 
                                            pos.rot += 180;
                                        else 
                                            pos.rot = Math.abs( pos.rot );
                                    }
                                }
                            },
                            positionBar = () => {
                                calcAngular();
                                return bar.css( {
                                    left: pos.xb + 'px',
                                    top: pos.yb + 'px',
                                    height: pos.height + 'px',
                                    transformOrigin: `top`,
                                    transform: `rotate( ${pos.rot}deg )`
                                } );
                            }, 
                            onDragPart1 = () => {
                                pos.x1 = obj.getData().x1 = utils.data.x;
                                pos.y1 = obj.getData().y1 = utils.data.y;
                                    obj.getData().mx = mx;
                                    obj.getData().my = my;
                                    pos.xb = obj.getData().xb = pos.x1 + mx;
                                    pos.yb = obj.getData().yb = pos.y1 + my;
                                        if ( pos.x2 || pos.y2 )
                                            pos.height = Math.sqrt( Math.pow( pos.xb - pos.x2 - mx, 2 ) + Math.pow( pos.yb - pos.y2 - my, 2 ) );
                                return positionBar();
                            },
                            onDragPart2 = () => {
                                pos.x2 = obj.getData().x2 = utils.data.x;
                                pos.y2 = obj.getData().y2 = utils.data.y;
                                    pos.height = Math.sqrt( Math.pow( pos.xb - pos.x2 - mx, 2 ) + Math.pow( pos.yb - pos.y2 - my, 2 ) );
                                return positionBar();
                            };
                    port1.on( events.drag, onDragPart1 );
                port2.on( events.drag, onDragPart2 );
            return current.pile.push( id );
        }
    },
    prepareMainSpace() {
        /**
            * 
            * Add to workSpace 
            * Event to move on item
            * 
        */
        return $( document ).on( {
            mousemove( e ) {
                Simulation.cursor.x = e.pageX;
                Simulation.cursor.y = e.pageY;
                if ( utils.targeted && utils.down ) {
                    utils.data.mx = utils.targeted.offsetWidth() / 2;
                    utils.data.my = utils.targeted.offsetHeight() / 2;
                    if( !( 'mx' in utils.data ) ) {
                        const
                            x = e.screenX - utils.data.cx,
                            y = e.screenY - utils.data.cy;
                                utils.x = x + utils.data.rect.left;
                                utils.y = y + utils.data.rect.top;
                                    if ( $.isObject( utils.data ) ) {
                                        utils.data.x = utils.x;
                                        utils.data.y = utils.y;
                                    }
                    } else {
                        utils.data.x = e.pageX - utils.data.mx;
                        utils.data.y = e.pageY - utils.data.my;
                    }
                    return utils.targeted.css( {
                        left: `${ utils.data.x }px`,
                        top:  `${ utils.data.y }px`
                    } );
                }
            },
            touchmove( e ) {
                Simulation.cursor.x = e.touches[ 0 ].pageX;
                Simulation.cursor.y = e.touches[ 0 ].pageY;
                if ( utils.targeted && utils.down ) {
                    utils.data.mx = utils.targeted.offsetWidth() / 2;
                    utils.data.my = utils.targeted.offsetHeight() / 2;
                    if( !( 'mx' in utils.data ) ) {
                        const
                            x = e.touches[ 0 ].screenX - utils.data.cx,
                            y = e.touches[ 0 ].screenY - utils.data.cy;
                                utils.x = x + utils.data.rect.left;
                                utils.y = y + utils.data.rect.top;
                                    if ( $.isObject( utils.data ) ) {
                                        utils.data.x = utils.x;
                                        utils.data.y = utils.y;
                                    }
                    } else {
                        utils.data.x = e.touches[ 0 ].pageX - utils.data.mx;
                        utils.data.y = e.touches[ 0 ].pageY - utils.data.my;
                    }
                    return utils.targeted.css( {
                        left: `${ utils.data.x }px`,
                        top:  `${ utils.data.y }px`
                    } );
                }
            }
        } );
    },
    defineDropZone( obj ) {
        /**
            * 
            * Define object like
            * dropzone
            *  
        */
        const rect = obj.getBoundingClientRect();
            utils.dropZone = obj;
            utils.dropZoneVerifier = ( x, y ) => {
                if ( x > rect.left && x < rect.left + rect.width ) {
                    if ( y > rect.top && y < rect.top + rect.height )
                        return true;
                }
                return false;
            };
            obj.on( events.drop, function ( e ) {
                const { infos, src, name } = e.detail;
                    if ( current.context == 1 ) {
                        if ( infos in map )
                            map[ infos ].count++;
                        else map[ infos ] = {
                            src: src,
                            infos: infos,
                            name: name,
                            count: 1
                        };
                    } else if ( current.context == 2 ) {
                        /** 
                            *    
                            * If we are building
                            * our network
                            *  
                        */
                    }
                return map[ infos ];
            } );
        return obj;
    }
};

const createSimulationItem = ( src, dataInfos, alt, name ) => {
    /** 
        * 
        * To create a creation's item
        * ( image )
        *  
    */
    return $( {
        el: 'div',
        draggable: 'false',
        'data-infos': dataInfos || '#',
        'data-name': name,
        'data-src': src,
        class: 'simulationItems',
        content: {
            el: 'img',
            src: src,
            draggable: 'false',
            class: 'img simulationImg',
            alt: alt || name
        }
    } );
};

document.addEventListener( 'touchend', () => (
    utils.end()
) );

document.addEventListener( 'touchcancel', () => (
    utils.end()
) );

document.addEventListener( 'touchleave', () => (
    utils.end()
) );

document.body.addEventListener( 'mouseup', () => (
    utils.end()
) );

document.body.addEventListener( 'mouseleave', () => (
    utils.end()
) );

const activeDragEvent = ( node, detected, drop ) => {
    const data = {};
    const needed = {
        start() {
            utils.down = true;
            utils.detected = false;
            data.rect = this.getBoundingClientRect();
        },
        down() {
            if ( !utils.detected ) {
                utils.detected = true;
                utils.targeted = node;
                initEvent( node, events.dragStart, data );
            }
        }
    };
    try{
        data.src = node.last().attr( 'data-src' );
        data.name = node.last().attr( 'data-name' );
        data.infos = node.last().attr( 'data-infos' );
    } catch( e ) { data.src = data.name = data.infos = ''; }
    return node.on( {
        [ events.dragStart ]( e ) {
            if ( $.isFunction( detected ) )
                detected( e, node, e.detail );
        },
        [ events.dropDetected ]( e ) {
            if ( $.isFunction( drop ) )
                drop( e, node, e.detail );
        },
        mousedown( e ) {
            needed.start.call( this, e );
            data.cx = e.screenX;
            data.cy = e.screenY;
        },
        touchstart( e ) {
            needed.start.call( this, e );
            data.cx = e.touches[ 0 ].screenX;
            data.cy = e.touches[ 0 ].screenY;
        },
        touchleave: () => utils.end(),
        touchcancel: () => utils.end(),
        mousemove( e ) {
            if ( utils.down ) {
                needed.down();
                initEvent( node, events.drag, utils.data );
            }
        },
        touchmove( e ) {
            if ( utils.down ) {
                needed.down();
                initEvent( node, events.drag, utils.data );
            }
        }
    } );
};

const createItem = ( src, dataInfos, alt, name ) => {
    return $( {
        el: 'div',
        class: 'items',
        'data-toolip': name,
    }, { 
        append: createSimulationItem( 
            src, dataInfos, 
            alt, name 
        ) 
    } );
};

const utils = {
    list: [],
    down: false,
    detected: false,
    targeted: undefined,
    data: undefined,
    dropZone: undefined,
    dropZoneVerifier() {
        return;
    },
    url( src ) {
        return '/img/simulation'.concat( src );
    },
    name( key ) {
        const map = {
            computer: 'Ordinateur',
            router: 'Routeur',
            server: 'Seveur',
            switch: 'Switch',
            connector: 'Connecteur',
            paquet: 'Paquet',
            cable: 'Cable'
        };
        return map[ key ];
    },
    end() {
        const target = this.targeted;
            this.detected = false;
            this.down = false;
            this.targeted = undefined;
        if ( target ) 
            return initEvent( target, events.dropDetected, this.data );
    },
    show( node ) {
        return node.replaceClass( 'd-none', 'd-flex' );
    },
    hide( node ) {
        return node.replaceClass( 'd-flex', 'd-none' );
    },
    isEmpty( obj ) {
        for( let item in obj )
            return item = false;
        return true;
    },
    createPaquetNode() {
        const url = '/paquet.png';
        return fx.createCurrentItem(
            createSimulationItem(
                utils.url( url ),
                'paquet'
            )
        );
    },
    addToWorkSpace( node ) {
        return fx.addToWorkSpace(
            node
        );
    }
};

Simulation.utils = utils;

const createInitialToolsList = () => {
    $( function () {
        utils.list = [ ];
        const 
            container = $( '.itemContent' ).empty(),
            list = {
                computer: '/computer.png',
                router: '/router.png',
                server: '/server.png',
                switch: '/switch.png',
                connector: '/connector.png',
                cable: '/cable.png'
            };
            $.each( list, function ( key ) {
                const
                    src = this,
                    content = utils.name( key ),
                        item = createItem( utils.url( src ), key, content, content );
                        activeDragEvent( item, function ( e, node, detail ) {
                            utils.targeted = node.last( true ).clone();
                                utils.data = detail;
                                fx.initBaseToolsItem();
                            return e;
                        } );
                    utils.list.push( item );
                return  container.append( item );
            } );
        return window.Simulation.ScroolManager.init();
    } );
};

const initEvent = ( node, event, detail ) => (
    node.dispatchEvent(
        new CustomEvent( event, {
            detail: detail
        } )
    )
);

const createToolsListUsing = ( list ) => {
    utils.list = [];
    $( function () {
        const 
            container = $( '.itemContent' ).empty();
                $.each( list, function ( key ) {
                    const
                        data = this,
                        content = data.name,
                            item = createItem( data.src, data.infos, content, key );
                        utils.list.push( item );
                    return  container.append( item );
                } );
        return window.Simulation.ScroolManager.init();
    } );
};

const initFirstEngine = () => {
    $( 'body' ).css( 'overflow', 'hidden' );
    createInitialToolsList();
        fx.prepareMainSpace();
    return fx.defineDropZone(
        $( '.firstSelectionSpace' )
    );
};

const initSecondEngine = () => {
    const list = {};
            $.each( map, function ( key ) {
                list[ key ] = {};
                    list[ key ].name = this.name;
                    list[ key ].src = this.src;
                    list[ key ].infos = this.infos;
                return key;
            } );
        createToolsListUsing( list );
            for( const item of utils.list ) 
                activeDragEvent( item, function ( e, node, detail ) {
                    utils.targeted = node.last( true ).clone();
                        utils.data = detail;
                            fx.initSimulationTools( utils.targeted, utils.data );
                    return e;
                } );
    return fx.defineDropZone(
        $( '.secondSelectionSpace' )
    );
};

const InterfaceManager = {
    init() {
        this.activeButton();
        window.Simulation.ScroolManager.init();
    },
    activeButton() {
        const 
            button = $( '#finalButton' ),
            components = {
                begin: $( '.beginStape' ),
                first: $( '.firstStape' ),
                second: $( '.secondStape' )
            },
            state = { 
                begin: 'start',
                first: 'first',
                second: 'second'
            };
        return button.on( {
            click() {
                const myState = button.attr( 'data-btn' );
                    if ( myState == state.begin ) {
                        button.attr( 'data-btn', state.first ).text( 'Suivant' );
                            utils.hide( components.begin );
                            utils.show( components.first );
                        return initFirstEngine();
                    } else {
                        if ( myState == state.first ) {
                            if ( utils.isEmpty( map ) || !map.cable )
                                return console.log( 'error' );
                                button.attr( 'data-btn', state.second ).text( 'Tester' );
                                    utils.hide( components.first );
                                    utils.show( components.second );
                            initSecondEngine();
                        } else {
                            if ( myState == state.second ) {
                                Simulation.verify();
                            }
                        }
                    }
                return myState;
            }
        } );
    }
};

Digital( function () {
    InterfaceManager.init();
} );