const $ = Digital;
const Simulation = {
    utils: {},
    errors: [],
    cursor: { x: 0, y: 0 },
    cables: { },
    devices: { },
    events: { },
    map: { },
    id: 0,
    paquet: {
        width: 40,
        height: 40
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
        this.getConnector( node ); 
    },
    remove( item ) {
        if ( item instanceof Components ) {
            const id = item.getId();
                item.remove();
            delete this.map[ id ];
        }
    },
    verify() {
        Simulation.errors = [];
        for( let item in Simulation.map ) {
            const device = Simulation.map[ item ];
            if ( device instanceof Components ) {
                const 
                    request = 'verify',
                    headers = ( new Headers() ).setSenders( device ),
                    paquet = new PaquetRequest( headers, request );
                        if ( device instanceof Host )
                            device.turnel( paquet );
            }
        }

        Simulation.getById( 1 ).sendTo( 2 );
        $.setStorage( 'save', JSON.stringify(
            this.saveNetWork()
        ) );
    },
    reportError( obj, error ) {
        if ( obj instanceof Components ) 
            this.errors.push( {
                id: obj.getId(),
                error: error
            } );
        return this;
    },
    generateNetwork() {

    },
    saveNetWork() {
        const result = { };
            result.width = window.innerWidth;
            result.height = window.innerHeight;
            result.maxId = this.id;
            result.map = {};
                for( let id in this.map ) {
                    const item =  this.map[ id ];
                        if ( item instanceof Components )
                            result.map[ id ] = item.toData();
                }
        return result;
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
            }
            return this;
        } else return this.errors.push(
            "Dépassement du nombre de connection possible"
        );
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
                            obj.unlink( this );
                        this.restructure();
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
            if ( cable instanceof Cable ) {
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
        this.getNode().remove();
            this.remove();
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
                        const focused = paquet.merge().getFocused();
                            for( const item of this.ports ) {
                                if ( item.isSame( focused ) )
                                    return item.turnel( paquet.setEntry( this ) );
                            }
                    }
                } else if ( paquet.request === 'verify' ) {
                    this.check();
                }
            } else if ( paquet instanceof PaquetObject ) {
                if ( paquet.isDestination( this ) ) {
                    return this.receive( paquet );
                } else {
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
        console.log( 'ici' );
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

    move( then, obj ) {
        return Digital.setTime( function () {
            return then.call( this, { } );
        }, obj.length() / 700 );
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
    focused = null;
    path = [];

    constructor( headers, node, path ) {
        super( headers, node );
        this.path = path;
        this.load();
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

    move( { x1, y1, x2, y2 }, then ) {
        let finish = false;
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
        return this.node.remove();
    }
}

class Computer extends Components{
    limit = Infinity;
    type = 'COMPUTER';

    constructor( node, id, type = 'COMPUTER' ) {
        super( node, id, type );
    }
}

class Linker extends Components{
    limit = Infinity;

    constructor( node, id, type ) {
        super( node, id, type );
    }

    async turnel( paquet ) {
        return super.turnel( paquet );
    }

    check() {
        super.check();
        console.log( 'check cable: ', this.getId()  );
    }
}

class Connector extends Linker{
    limit = 3;
    constructor( node, id, type = 'CONNECTOR' ) {
        super( node, id, type );
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
        console.log( 'host', paquet );
    }

    check() {
        return;
    }
}

class Server extends Host{
    constructor( node, id, type = 'SERVER' ) {
        super( node, id, type );
    }

    check() {
        return true;
    }
}

class Switch extends Host{
    constructor( node, id, type = 'SWITCH' ) {
        super( node, id, type );
    }

    check() {
        return true;
    }
}

class Router extends Host{
    constructor( node, id, type = 'ROUTER' ) {
        super( node, id, type );
    }

    check() {
        return true;
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
window.Simulation = Simulation;