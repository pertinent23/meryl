const $ = Digital;
const Simulation = {
    focused: 0,
    name: '',
    description: '',
    utils: {},
    errors: [],
    cursor: { x: 0, y: 0 },
    cables: {},
    devices: {},
    events: {},
    map: {},
    id: 0,
    paquet: {
        width: 40,
        height: 40
    },
    clean() {
        for( let key in this.devices ) {
            const obj = this.devices[ key ];
                obj.removeAll();
        }
        PaquetObject.clean();
        return Digital.update( this, {
            focused: 0,
            name: ' ',
            description: ' ',
            errors: [],
            cables: { },
            devices: {},
            map: {},
            id: 0
        } );
    },
    generateId() {
        return ++this.id;
    },
    getById( id ) {
        return this.map[ id ];
    },
    getComputer( node ) {
        const 
            id = this.generateId(),
            obj = new Computer( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getServer( node ) {
        const 
            id = this.generateId(),
            obj = new Server( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getRouter( node ) {
        const 
            id = this.generateId(),
            obj = new Router( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getSwitch( node ) {
        const 
            id = this.generateId(),
            obj = new Switch( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getPhone( node ) {
        const 
            id = this.generateId(),
            obj = new Phone( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getPad( node ) {
        const 
            id = this.generateId(),
            obj = new Pad( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getCable( node ) {
        const 
            id = this.generateId(),
            obj = new Cable( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getConnector( node ) {
        const 
            id = this.generateId(),
            obj = new Connector( node, id );
                this.map[ id ] = obj;
        return id;
    },
    getComponentByName( node, name ) {
        return name.toLowerCase() === 'computer' ? this.getComputer( node ) :
            name.toLowerCase() === 'server' ? this.getServer( node ) :
            name.toLowerCase() === 'switch' ? this.getSwitch( node ) :
            name.toLowerCase() === 'cable' ? this.getCable( node ) :
            name.toLowerCase() === 'router' ? this.getRouter( node ) : 
            name.toLowerCase() === 'pad' ? this.getPad( node ) :
            name.toLowerCase() === 'phone' ? this.getPhone( node ) :
            this.getConnector( node ) 
    },
    remove( item ) {
        if ( item instanceof Components ) {
            const id = item.getId();
                item.remove();
            delete this.map[ id ];
        }
    },
    verify() {
        const 
            final = [],
            addFinal = function ( delay, item, subitem ) {
                return final.push( function () {
                    return setTimeout( function () {
                        if ( !item.removed && !subitem.removed && !this.current ) {
                            item.sendTo( subitem.getId() );
                            try{ 
                                return final.shift().call( {} ); 
                            } catch( e ) {}
                        }
                    }, delay );
                } );
            };
        Simulation.errors = [];
            for( let item in Simulation.map ) {
                const device = Simulation.map[ item ];
                if ( device instanceof Components ) {
                    const 
                        request = 'verify',
                        headers = ( new Headers() ).setSenders( device ),
                        paquet = new PaquetRequest( headers, request );
                            if ( !( device instanceof Cable ) )
                                device.turnel( paquet );
                }
            }
        let delay = 350;
            if ( Simulation.errors.length === 0 ) {
                for ( let key in Simulation.map ) {
                    const item = Simulation.map[ key ];
                    if( item instanceof Linker )
                        continue;
                            for( let subkey in Simulation.map ) {
                                const subitem = Simulation.map[ subkey ];
                                if ( subitem instanceof Linker || subitem.isSame( item ) )
                                    continue;
                                        addFinal( delay, item, subitem );
                                delay += 300;
                            }
                    delay += 50;
                }
            }
            try{ 
                final.shift().call( {} ); 
            } catch( e ) {}
        return Simulation.errors;
    },
    reportError( obj, error ) {
        if ( obj instanceof Components ) 
            this.errors.push( {
                id: obj.getId(),
                error: error
            } );
        return this;
    },
    generateNetwork( data ) {
        const items = [];
        const fx = Simulation.fx;
        const workSpace = data.workSpace;
        const actualSize = Simulation.utils.getDropZoneSize();
        const used = {
            rx( _ ) {
                let
                    base = _ - workSpace.x,
                    nbase = base + actualSize.x,
                    k = actualSize.with / workSpace.with,
                    r = nbase * k;
                return r;
            },
            ry( _ ) {
                let
                    base = _ - workSpace.y,
                    nbase = base + actualSize.y,
                    k = actualSize.height / workSpace.height,
                    r = nbase * k;
                return r;
            }
        };
            for( let id in data.map ) {
                id = parseInt( id );
                let node, obj;
                const 
                    item = data.map[ id ],
                    needed = item.data;
                    if ( item.type.toLowerCase() !== 'cable' ) {
                        const 
                            bitem = createSimulationItem( needed.src, needed.infos, Simulation.utils.name( needed.name ) );
                            node = fx.addToWorkSpace( fx.createCurrentItem( bitem ) );
                            node.css( {
                                left: `${ used.rx( needed.x ) }px`,
                                top: `${ used.ry( needed.y ) }px`
                            } );
                        obj = this.getById(
                            this.getComponentByName( node, needed.infos )
                        );
                    } else {
                        node = fx.createCurrentCable();
                            for( let key in node ) {
                                    Simulation.utils.show( node[ key ] );
                                fx.addToWorkSpace( node[ key ] );
                            }
                        obj = this.getById(
                            this.getComponentByName( node, 'cable' )
                        );
                    }
                obj.ports = item.connection;
                obj.setData( needed );
                obj.setId( id );
                items.push( obj );
                this.map[ id ] = obj;
            }
                for ( const item of items ) {
                    for ( let index = 0; index < item.ports.length; index++ ) {
                        const id = item.ports[ index ];
                        item.ports[ index ] = this.getById( id );
                    }
                    item.restructure();
                }
            for( let id in this.cables )
                this.cables[ id ].realignment();
        return Digital.update( this, {
            errors: [ ],
            name: data.name,
            description: data.description,
            id: data.maxId
        } );
    },
    saveNetWork() {
        const 
            result = {
                width: window.innerWidth,
                height: window.innerHeight,
                workSpace: Simulation.utils.getDropZoneSize()
            };
            result.maxId = this.id;
            result.map = {};
                for( let id in this.map ) {
                    const item =  this.map[ id ];
                        if ( item instanceof Components )
                            result.map[ id ] = item.toData();
                }
                result.name = Simulation.name;
                result.description = Simulation.description;
        return result;
    },
    getTree( sim ) {
        const 
            list = [],
            map = sim.map;
            for( let key in map ) {
                const 
                    part = {},
                    name = map[ key ].type;
                        part[ name ] = [];
                    for( const item of map[ key ].connection ) {
                        if ( map[ item ] )
                            part[ name ].push( map[ item ].type );
                    }
                list.push( part );
            }
        return list;
    },
    linear( obj ) {
        let result = '';
            for( let key in obj )
                result += key + obj[ key ].sort().toString();
        return result.toLowerCase();
    },
    compareObject( obj1, obj2 ) {
        const 
            l1 = this.linear( obj1 ),
            l2 = this.linear( obj2 );
        return l1 === l2;
    },
    getResult( fthree, length, rObj, given ) {
        let npart1, npart2, count1 = 0, count2 = 0;
        const result = {
            average: 0,
            note: ''
        };

        for( let key in given ) {
            const option = given[ key ];
                if ( key.toUpperCase() in rObj ) {
                    count1++;
                    option === rObj[ key.toUpperCase() ] ? count2++ : '';
                } else
                    count2--;
        }

        /** 
            * we have to give the first
            * note on twenty 
        */
        npart1 = Math.round( count2 <= 0 ? 0 : ( 45 / count1 ) * count2 );
        count1 = length;
        count2 = 0;
            count2 -= Math.abs( fthree.length - length );
                for ( let i = 0; i < fthree.length; i++ )
                    !fthree[ i ] ? count2++ : '';
                npart2 = Math.round( count2 <= 0 ? 0 : ( 55 / count1 ) * count2 );
                result.average = ( npart1 + npart2 ) / 5;
            result.note = count2 === count1 ? 'Objectif Atteint' : 'Objectif manqué';
        return result;
    },
    compare( sim1, sim2, count ) {
        let part1, part2;
        const 
            realCount = {},
            three1 = this.getTree( sim1 ),
            three2 = this.getTree( sim2 );
                for( let key in sim1.map ) {
                    const item = sim1.map[ key ].type;
                        if ( item in realCount )
                            realCount[ item ]++;
                        else realCount[ item ] = 1;
                } 
            for ( let i = 0; i < three1.length; i++ ) {
                part1 = three1[ i ];
                for ( let j = 0; j < three2.length; j++) {
                    part2 = three2[ j ];
                    if ( this.compareObject( part1, part2 ) ) {
                            delete three2[ j ];
                        break;
                    }
                }
            }
        return this.getResult( three2, three1.length, realCount, count );
    }
};

Array.prototype.clone = function () {
    const arr = [ ];
        for( const item of this ) 
            arr.push( item );
    return arr;
};

Simulation.ScroolManager = {};
Simulation.ComponentList = {};

class Components{
    /** 
        *
        * Ports is thes list of
        * linked components
        *  
    */
    requestSended = {};
    current = true;
    ports = [ ];
    limit = Infinity;
    id = '';
    data = {}
    errorFunction = () => ( '' );
    errors = [];

    constructor( node, id, type ) {
        this.type = type;
        this.id = id;
        this.node = node;
        this.loadData();
    }

    loadData() {
        const 
            node = this.node,
            id = this.getId(),
            obj = this;
                this.data.width = node.offsetWidth();
                this.data.height = node.offsetHeight();
                node.on( Simulation.events.dropDetected, function ( ) {
                    if ( obj.exist() ) {
                        /** 
                            * when the node will be 
                            * dropped 
                        */
                        const
                            x = obj.node.offsetLeft(),
                            y = obj.node.offsetTop();
                                obj.data.x = x;
                                obj.data.y = y;
                            node.on( Simulation.events.dragStart, function () {
                                if ( obj.exist )
                                    obj.empty();
                            } );
                        return this;
                    }
                } );
                node.attr( 'data-part-toolip', `${ Simulation.utils.name( this.getType().toLowerCase() ) } : ${this.getId()}` );
                    node.on( {
                        contextmenu( e ) {
                            if ( obj instanceof Linker )
                                return;
                            e.preventDefault();
                            const devices = [];
                                for( let oid in Simulation.devices ) {
                                    if ( Simulation.devices[ oid ] instanceof Linker )
                                        continue;
                                    if ( oid != id ) {
                                        const
                                            data =  `${ Simulation.utils.name( Simulation.getById( oid ).getType().toLowerCase() ) }: ${ Simulation.getById( oid ).getId() }`, 
                                            item = Simulation.InterfaceManager.createMoreOption(
                                                data
                                            ).click( function () {
                                                    obj.sendTo( parseInt( $( this ).attr( 'data-id' ) ) );
                                                return Simulation.InterfaceManager.closeMore();
                                            } ).attr( 'data-id', `${ oid }` );
                                        devices.push( item );
                                    }
                                }
                            Simulation.InterfaceManager.items( devices );
                        }
                    } );
            Simulation.devices[ id ] = obj; 
        return this;
    };

    verify( x, y ) {
        const 
            mx = this.getData().width / 2,
            my = this.getData().height / 2;
        if ( x >= this.getData().x - mx && x <= ( this.getData().x + this.getData().width + mx ) ) {
            if( y >= this.getData().y - my && y <= ( this.getData().y + this.getData().height + my ) )
                return true;
        }
        return false;
    };

    getId() {
        return this.id;
    }

    setId( id ) {
        this.id = id;
    }

    setData( data ) {
            for( let key in data )
                this.data[ key ] = data[ key ];
        return this;
    }

    getData() {
        return this.data;
    }

    isConnected( elt ) {
        return this.ports.indexOf( elt ) != -1;
    }

    /**
     * 
        * @param {Components} elt 
        * @returns
    */
    link( elt ) {
        /**
            *  
            * We use this
            * function to link two
            * components 
            * 
        */
        if ( this.limit === Infinity || this.getSize() < this.limit ) {
            if ( !this.isConnected( elt ) && elt instanceof Components ) {
                this.addDevice( elt );
                    elt.addDevice( this );
                return this;
            } else 
                elt.removed = true;
            return this;
        } else {
            if ( elt instanceof Cable )
                elt.removed = true;
            return this.errors.push(
                "Dépassement du nombre de connection possible"
            );
        }
    }

    getSize() {
        return this.ports.length;
    }

    getConnectedDevice() {
        return this.ports;
    }

    addDevice( elt ) {
        return this.ports.push( elt );
    }

    getType() {
        return this.type;
    }

    paquetManager() {
        return;
    }

    unlink( obj ) {
        const index = this.ports.indexOf( obj );
            if( this.ports.length === 0 )
                return this;
                    if ( index != -1 ) {
                                delete this.ports[ index ];
                            this.restructure();
                        obj.unlink( this );
                    }
        return this;
    }

    restructure() {
        const 
            arr = this.ports,
            result = [ ];
                for( const data of arr ) {
                    if ( data )
                        result.push( data );
                }
            this.ports = result;
        return this;
    }

    empty() {
        for( const cable of this.ports ) {
            if ( cable instanceof Components ) {
                this.unlink( cable );
            }
        }
    }

    getPorts() {
        return this.ports;
    }

    getNode() {
        return this.node;
    }

    removeAll() {
        try{
            this.getNode().remove();
        } catch ( e ) { }
            this.remove();
        this.removed = true;
        Simulation.remove( this );
    }

    remove() {
        this.current = false;
        delete Simulation.devices[ this.getId() ];
    }

    exist() {
        return this.current;
    }

    isSame( elt ) {
        if ( elt instanceof Components )
            return this.id === elt.getId();
        return false;
    }

    async turnel( paquet ) {
        if ( paquet instanceof Paquet ) {
            if ( paquet instanceof PaquetRequest ) {
                const entry =  paquet.getEntry();
                if ( paquet.request === 'find' ) {
                    if ( paquet.isDestination( this ) ) {
                        const myPaquet = paquet.clone();
                            myPaquet.request = 'back';
                            myPaquet.getHeaders().setSenders( this );
                            myPaquet.setMessage( paquet.way.clone() );
                            myPaquet.getMessage().push( this );
                            myPaquet.getHeaders().setDestination( 
                                paquet.getHeaders().getSenders().getId() 
                            );
                        return this.sendPaquet( myPaquet );
                    } else {
                        if( this instanceof Cable ) {
                            if ( this.removed ) {
                                try{
                                    paquet.remove();
                                } catch( e ) {}
                            }
                                    for( const item of this.ports ) {
                                        const obj = this;
                                        if ( !item.isSame( entry ) && !paquet.inWay( item ) )
                                            return paquet.move( function () {
                                                return item.turnel( paquet.clone().add( obj ).setEntry( obj ) );
                                            }, this );
                                    }
                        }
                        else {
                            for( const item of this.ports ) {
                                if ( !item.isSame( entry ) && !paquet.inWay( item ) )
                                    item.turnel( paquet.clone().add( this ).setEntry( this ) );
                            }
                        }
                    }
                } else if ( paquet.request === 'back' ) {
                    if ( paquet.isDestination( this ) ) {
                        return this.receive( paquet );
                    } else {
                        if ( this.removed )
                            return paquet.remove();
                                const focused = paquet.merge().getFocused();
                                    for( const item of this.ports ) {
                                        if ( item.isSame( focused ) )
                                            return item.turnel( paquet.setEntry( this ) );
                                    }
                    }
                } else if ( paquet.request === 'verify' ) {
                    if ( !paquet.inWay( this ) && !this.removed ) {
                        if ( paquet.getWay().length != 0 || !( this instanceof Connector ) ) {
                            paquet.add( this );
                            for ( const device of this.ports ) {
                                if ( device instanceof Components )
                                    device.turnel( paquet.clone() );
                            }
                        }
                        return this.check();
                    }
                }
            } else if ( paquet instanceof PaquetObject ) {
                if ( paquet.isDestination( this ) ) {
                    return this.receive( paquet );
                } else {
                    if ( this.removed )
                        return paquet.remove();
                    const focused = paquet.merge().getFocused();
                        for( const item of this.ports ) {
                            if ( item.isSame( focused ) ) {
                                if ( this instanceof Cable ) {
                                    if ( paquet instanceof PaquetObject ) {
                                        let data = {};
                                            const 
                                                obj = this,
                                                direc = this.ports.indexOf( focused ) === 1;
        
                                                if ( !direc ) {
                                                    data.x1 = this.getData().x2;
                                                    data.y1 = this.getData().y2;
                                                    data.x2 = this.getData().x1;
                                                    data.y2 = this.getData().y1;
                                                } else {
                                                    data.x1 = this.getData().x1;
                                                    data.y1 = this.getData().y1;
                                                    data.x2 = this.getData().x2;
                                                    data.y2 = this.getData().y2;
                                                }
                                            return paquet.move( data, function () {
                                                return item.turnel( paquet.setEntry( obj ) );
                                            } );
                                    } 
                                } else 
                                    return item.turnel( paquet.setEntry( this ) );
                            }
                        }
                }
            }
        }
    } 

    receive( paquet ) {
        if( paquet instanceof PaquetRequest ) {
            const id = paquet.getHeaders().getSenders().getId();
            if( paquet.request === 'back' && this.requestSended[ id ] ) {
                const
                    headers = new Headers( this, paquet.getHeaders().getSenders().getId() ), 
                    myPaquet = new PaquetObject( headers, '', paquet.clone().getMessage().reverse() );
                        myPaquet.merge();
                        myPaquet.show();
                    delete this.requestSended[ id ];
                return this.turnel( myPaquet );
            }
        } else if ( paquet instanceof PaquetObject )
            return paquet.remove();
    }

    sendPaquet( paquet ) {
        if( paquet instanceof PaquetRequest ) {
            if ( paquet.isWay() ) {
                const focused = paquet.merge().getFocused();
                    for( const cable of this.ports ) {
                        if ( cable.isSame( focused ) )
                            return cable.turnel( paquet.setEntry( this ) );
                    }
            } else {
                const entry = paquet.getEntry();
                    for( const cable of this.ports ) {
                        if ( !cable.isSame( entry ) )
                            cable.turnel( paquet.clone().setEntry( this ) );
                    }
            }
        }
    }

    sendTo( id ) {
        const 
            request = 'find',
            headers = ( new Headers() ).setSenders( this );
            headers.setDestination( id );
            const paquet = new PaquetRequest( headers, request );
                this.requestSended[ id ] = true;
        return this.turnel( paquet );
    }

    check() {
        /** 
            * 
            * Here we can
            * check our device 
            * 
        */
        if ( this.ports.length === 0 ) {
            Simulation.errors.push( {
                error: `Erreur: ( ${ this.getType().toLowerCase() } ${ this.getId() } ), connecté à aucun élément.`,
                node: this.node
            } );
        } 
        return true;
    }

    getType() {
        return this.type;
    }

    toData() {
        const 
            data = this.getData(),
            copy = { },
            connection = [ ];
            for( let key in data ) {
                const item = data[ key ];
                    if ( $.isNumber( item ) || $.isString( item ) )
                        copy[ key ] = item;
            }

            if ( !( this instanceof Cable ) ) {
                const 
                    rect = this.getNode().getBoundingClientRect();
                copy.y = rect.top;
                copy.x = rect.left;
            }

            for( const item of this.getPorts() ) {
                if ( item instanceof Components ) 
                    connection.push( item.getId() );
            }
        return {
            id: this.getId(),
            type: this.getType(),
            data: data,
            connection: connection
        };
    };

    isSameType( elt ) {
        if ( elt instanceof Components )
            return elt.getType() === this.getType();
        return false;
    }
};

class Headers{
    senders = '';
    destination = '';
    id = '';
    content = '';

    constructor( senders, destination ) {
        this.senders = senders;
        this.destination = destination;
    }

    getId() {
        return this.id;
    }

    isDestination( elt ) {
        if( elt instanceof Components ) 
            return elt.getId() === this.getDestination();
        return false;
    }

    getContent() {
        return this.content;
    }

    getDestination() {
        return this.destination;
    }

    getSenders() {
        return this.senders;
    }

    setSenders( obj ) {
        if ( obj instanceof Components )
            this.senders = obj;
        return this;
    }

    setDestination( id ) {
        this.destination =  id;
        return this;
    }

    isSender( elt ) {
        if ( elt instanceof Components ) 
            return elt.getId() == this.getSenders().getId();
        return false;
    }

    setId( val ) {
        this.id = val;
    }

    clone() {
        const headers = new Headers();
            headers.setDestination( this.destination );
            headers.setSenders( this.senders );
            headers.setId( this.id );
        return headers;
    }
}

class Paquet{
    width = window.Simulation.paquet.width;
    height = window.Simulation.paquet.height;
    headers = null;
    entry = null;

    constructor( headers, node ) {
        if ( headers instanceof Headers )
            this.headers = headers;
        this.node = node;
    }

    async move( p1, p2 ) {
        return { p1, p2 };
    }

    getHeaders() {
        return this.headers;
    }

    isSender( elt ) {
        if ( this.headers instanceof Headers )
            return this.headers.isSender( elt );
        return false;
    }

    isDestination( elt ) {
        if ( this.headers instanceof Headers )
            return this.headers.isDestination( elt );
        return false;
    }

    clone() {
        const paquet = new Paquet(
            this.headers.clone(),
            this.node
        );
        return paquet;
    }

    setEntry( elt ) {
            this.entry = elt;
        return this;
    }

    getEntry() {
        return this.entry;
    }

    isEntry( elt ) {
        if ( this.entry instanceof Components && elt instanceof Components )
            this.entry.isSame( elt );
        return false;
    }
}

class PaquetRequest extends Paquet{
    request = '';
    focused = null;
    way = [ ];
    message = [];
    
    constructor( headers, request ) {
        super( headers, '' );
        this.request = request;
    }

    add( elt ) {
        if ( elt instanceof Components )
            this.way.push( elt );
        return this;
    }

    async move( then, obj ) {
        let 
            time = window.innerWidth * ( 96 / 100 );
            time = time >= 700 ? 700 : time;
            time = ( obj.length() / time ) * 100;
        return new Promise( function ( resolve ) {
            return setTimeout( function () {
                resolve();
            }, time );
        } ).then( then );
    } 

    merge() {
            this.focused = this.way.pop();
        return this;
    }

    getFocused() {
        return this.focused;
    }

    setMessage( mes ) {
        this.message = mes;
    }

    getMessage() {
        return this.message;
    }

    getWay() {
        return this.way;
    }
    
    setWay( way ) {
        this.way = way;
    }

    isWay() {
        return this.way.length != 0;
    }

    inWay( elt ) {
        return this.way.indexOf( elt ) != -1;
    }

    clone() {
        const paquet = new PaquetRequest( this.headers.clone(), this.request );
            paquet.way = this.way.clone();
            paquet.focused = this.focused;
            paquet.entry = this.entry;
            paquet.setMessage( this.message.clone() );
        return paquet;
    }
}

class PaquetObject extends Paquet{
    node = '';
    removed = false;
    focused = null;
    path = [];

    constructor( headers, node, path ) {
        super( headers, node );
        this.path = path;
        this.load();
        PaquetObject.listPaquet.push( this );
    }

    load() {
        this.node = Simulation.utils.createPaquetNode();
        return Simulation.utils.addToWorkSpace( this.node ).css( {
            display: 'none'
        } ).addClass( 'paquet' );
    }

    show() {
        return this.node.css( {
            display: 'flex',
            positioh: 'fixed'
        } );
    }

    async move( { x1, y1, x2, y2 }, then ) {
        let finish = false;
        if( this.removed )
            return this;
        const 
            mx = this.node.offsetWidth() / 2,
            my = this.node.offsetHeight() / 2,
            node = this.node.css( {
                left: `${ x1 - mx }px`,
                top: `${ y1 - my }px`
            } );
        return Digital.animate( function ( x, y ) {
            return node.css( {
                left: `${ x }px`,
                top: `${ y }px`
            } );
        }, { 
            from: [ x1 - mx, y1 - my ], 
            to: [ x2 - mx, y2 - my ]  
        },{ 
            timing: 'ease-out', 
            duration: 1000,
            then: function () {
                if ( !finish ) {
                        finish = true;
                    return then.call( this, { } );
                }
            }
        } )
        .start();
    }

    isPath() {
        return this.path.length != 0;
    }

    merge() {
            this.focused = this.path.pop();
        return this;
    }

    getFocused() {
        return this.focused;
    }

    clone() {
        const paquet = new PaquetObject( this.headers.clone(), this.node, this.path );
            paquet.focused = this.focused;
            paquet.entry = this.entry;
        return paquet;
    }

    remove() {
        this.removed = true;
        try{
            return this.node.remove();
        } catch( e ) { }
    }
}

PaquetObject.listPaquet = [ ];
PaquetObject.clean = function () {
    for( const item of PaquetObject.listPaquet )
        item.remove();
    return this;
}

class Computer extends Components{
    limit = Infinity;
    type = 'COMPUTER';

    constructor( node, id, type = 'COMPUTER' ) {
        super( node, id, type );
    }
}

class Pad extends Components{
    limit = Infinity;
    type = 'PAD';

    constructor( node, id, type = 'PAD' ) {
        super( node, id, type );
    }
}

class Phone extends Components{
    limit = Infinity;
    type = 'PHONE';

    constructor( node, id, type = 'PHONE' ) {
        super( node, id, type );
    }
}

Computer.isComputer = function ( elt ) {
    if ( elt instanceof Computer )
        return true;
    return false;
};

Pad.isPad = function ( elt ) {
    if ( elt instanceof Pad )
        return true;
    return false;
};

Phone.isPhone = function ( elt ) {
    if ( elt instanceof Phone )
        return true;
    return false;
};

Components.isEndSystem = function ( elt ) {
    if ( Computer.isComputer( elt ) || Pad.isPad( elt ) || Phone.isPhone( elt ) )
        return true;
    return false;
};

Components.isHostSystem = ( elt ) => ( 
    elt instanceof Host 
);

class Linker extends Components{
    limit = Infinity;

    constructor( node, id, type ) {
        super( node, id, type );
    }

    async turnel( paquet ) {
        return super.turnel( paquet );
    }
}

class Connector extends Linker{
    limit = 3;
    constructor( node, id, type = 'CONNECTOR' ) {
        super( node, id, type );
    }

    findHost() {
        const result = [ ];
            for( const cable of this.ports ) {
                for ( const item of cable.getPorts() ) {
                    if ( Components.isHostSystem( item ) ) {
                            result.push( cable );
                        break;
                    }
                }
            }
        return result;
    }

    check() {
        super.check();
        /** 
            * 
            * Now we can check how
            * connector
            *  
        */
        if ( this.ports.length === 1 )
            return Simulation.errors.push( {
                error: `Erreur: ( ${ this.getType().toLowerCase() } ${ this.getId() } )`
                + ' Un connecteur doit être relier à plus d\'un équipement.',
                node: this.getNode().bar
            } );
        return this;
    }
}

class Cable extends Linker{
    removed = false;
    limit = 2;
    line = { a: 0, b: 0, pos: {} }

    constructor( node, id, type = 'CABLE' ) {
        super( node, id, type );
    }

    length() {
        return this.getData().height;
    }

    loadData() {
        const 
            node = this.node,
            id = this.getId(),
            obj = this;
                node.port1.on( Simulation.events.dropDetected, function ( ) {
                    const
                        x1 = obj.node.port1.offsetLeft(),
                        y1 = obj.node.port1.offsetTop();
                            obj.data.x1 = x1 - obj.data.mx;
                            obj.data.y1 = y1 - obj.data.my;
                    if ( obj.exist() ) {
                        /** 
                            * when the node will be 
                            * dropped 
                        */
                        let link; 
                        for( let item in Simulation.devices ) {
                            const needed = Simulation.devices[ item ];
                            if ( needed instanceof Components ) {
                                if ( needed.verify( x1, y1 ) ) {
                                        link = needed.link( obj );
                                    break;
                                }
                            }
                        }

                        if ( !link )
                            obj.removed = true;
                    }
                } );
                node.port2.on( Simulation.events.dropDetected, function ( ) {
                    const
                        x2 = obj.node.port2.offsetLeft(),
                        y2 = obj.node.port2.offsetTop();
                            obj.data.x2 = x2 - obj.data.mx;
                            obj.data.y2 = y2 - obj.data.my;
                    if ( obj.exist() ) {
                        /** 
                            * when the node will be 
                            * dropped 
                        */
                        let link; 
                        for( let item in Simulation.devices ) {
                            const needed = Simulation.devices[ item ];
                            if ( needed instanceof Components ) {
                                if ( needed.verify( Simulation.cursor.x, Simulation.cursor.y ) && !obj.removed ) {
                                        link = needed.link( obj );
                                    break;
                                }
                            }
                        }
                        if ( !link || obj.removed )
                            return obj.removeAll();
                        obj.realignment();
                    }
                } );
            Simulation.cables[ id ] = obj; 
        return this;
    }

    buildLine() {
        const 
            [ comP1, comP2 ] = this.ports;
            if( comP1 && comP2 ) {
                const
                    rect1 = comP1.getNode().getBoundingClientRect(),
                    rect2 = comP2.getNode().getBoundingClientRect(),
                    x1 = rect1.x + ( rect1.width / 2 ),
                    x2 = rect2.x + ( rect2.width / 2 ),
                    y1 = rect1.y + ( rect1.height / 2 ),
                    y2 = rect2.y + ( rect2.height / 2 );
                        this.line.a = ( y1 - y2 ) / ( x1 - x2 );
                        this.line.b =  y1 - ( this.line.a * x1 );
                        this.line.pos = { x1, y1, x2, y2 };
                return 1;
            }
        return 0;
    }

    getOnLine( x ) {
        return ( this.line.a * x ) + this.line.b;
    }

    calcAngular() {
        const 
            pos = this.getData(),
            mx = pos.mx, my = pos.my;
            this.data.my = my;
        if ( pos.x2 || pos.y2 ) {
            pos.height = Math.sqrt( Math.pow( pos.xb - pos.x2 - mx, 2 ) + Math.pow( pos.yb - pos.y2 - my, 2 ) );
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

            this.getData().height = pos.height;
            this.getData().rot = pos.rot;
        }
    }

    realignment() {
        if ( this.buildLine() ) {
            let
                a1 = this.line.pos.x1, 
                a2 = this.line.pos.x2,
                b1 = this.getOnLine( a1 ) - this.data.my,
                b2 = this.getOnLine( a2 ) - this.data.my;
                a1 -= this.data.mx;
                a2 -= this.data.mx;
                    this.getNode().port1.css( {
                        left: `${ a1 }px`,
                        top: `${ b1 }px`,
                        zIndex: 100
                    } );
                    this.getNode().port2.css( {
                        left: `${ a2 }px`,
                        top: `${ b2 }px`,
                        zIndex: 100
                    } );
                this.data.x1 = a1;
                this.data.x2 = a2;
                this.data.y1 = b1;
                this.data.y2 = b2;
                this.data.xb = a1;
                this.data.yb = b1;
                this.calcAngular();
                this.getNode().bar.css( {
                    zIndex: 100,
                    left: this.data.xb + 'px',
                    top: this.data.yb + 'px',
                    height: this.data.height + 'px',
                    transformOrigin: `top`,
                    transform: `rotate( ${ this.data.rot }deg )`
                } )
            return this;
        }
    }

    removeAll() {
        try{
            this.getNode().port1.remove();
        } catch( e ) { }
        try{
            this.getNode().port2.remove();
        } catch( e ) {}
        try{
            this.getNode().bar.remove();
        } catch( e ) {}
            this.remove();
        return Simulation.remove( this );
    }

    check() {
        /**
            * 
            * Here we can now check
            * our cable
            *  
        */
        const [ component_1, component_2 ] = this.ports;
            if ( component_1.isSameType( component_2 ) ) {
                if ( Computer.isComputer( component_1 ) ) {
                    return Simulation.errors.push( {
                        error: `Erreur: ( ${ this.getType().toLowerCase() } ${ this.getId() } ) 02 ordinateurs ne peuvent être directement connectés`,
                        node: this.getNode().bar
                    } );
                } else {
                    if ( Phone.isPhone( component_1 ) ) {
                        return Simulation.errors.push( {
                            error: `Erreur: ( ${ this.getType().toLowerCase() } ${ this.getId() } ) 02 téléphones portables ne peuvent être directement connectés`,
                            node: this.getNode().bar
                        } );
                    } else if ( Pad.isPad( component_1 ) ) {
                        return Simulation.errors.push( {
                            error: `Erreur: ( ${ this.getType().toLowerCase() } ${ this.getId() } ) 02 tablets ne peuvent être directement connectés`,
                            node: this.getNode().bar
                        } );
                    }
                }
            } else {
                if ( Components.isEndSystem( component_1 ) || Components.isEndSystem( component_2 ) ) {
                    if ( component_1 instanceof Router || component_2 instanceof Router  ) {
                        return Simulation.errors.push( {
                            error: `Erreur: ( ${ this.getType().toLowerCase() } ${ this.getId() } ) un routeur ne peut être directement connecté à un end system.`,
                            node: this.getNode().bar
                        } );
                    } 
                }
            }
        return this;
    }

    unlink( obj ) {
        super.unlink( obj );
            this.empty();
                this.removeAll();
        return this;
    }

    remove() {
        try{
            this.current = false;
            delete Simulation.cables[ this.getId() ];
        } catch( e ) { }
    }
}

class Host extends Components{
    limit = Infinity;

    constructor( node, id, type = 'HOST' ) {
        super( node, id, type );
    }

    async turnel( paquet ) {
        super.turnel( paquet );
    }

    receive( paquet ){
        return super.receive( paquet );
    }

    check() {
            super.check();
        return this;
    }
}

class Server extends Host{
    constructor( node, id, type = 'SERVER' ) {
        super( node, id, type );
    }

    check() {
            super.check();
        return this;
    }
}

class Switch extends Host{
    constructor( node, id, type = 'SWITCH' ) {
        super( node, id, type );
    }

    check() {
            super.check();
        return this;
    }
}

class Router extends Host{
    constructor( node, id, type = 'ROUTER' ) {
        super( node, id, type );
    }

    check() {
            super.check();
        return this;
    }
}


Simulation.ComponentList.Router = Router;
Simulation.ComponentList.Switch = Switch;
Simulation.ComponentList.Server = Server;
Simulation.ComponentList.Host = Host;
Simulation.ComponentList.Cable = Cable;
Simulation.ComponentList.Linker = Linker;
Simulation.ComponentList.Connector = Connector;
Simulation.ComponentList.Paquet = Paquet;
Simulation.ComponentList.PaquetRequest = PaquetRequest;
Simulation.ComponentList.Headers = Headers;
Simulation.ComponentList.Pad = Pad;
Simulation.ComponentList.Phone = Phone;
window.Simulation = Simulation;