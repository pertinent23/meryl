import { Fragment } from 'react';

const baseUrl = "/routes/account";
const ListMap = {
    'account.home': {
        href: '',
        text: 'Accueil'
    },
    'account.simulation': {
        href: '/simulation',
        text: 'Simulation'
    },
    'account.class': {
        href: '/class',
        text: 'Classe'
    },
    'account.training': {
        href: '/training',
        text: 'Entrainement'
    }
};

const generate = function ( page ) {
    const result = [ ];
        for( let key in ListMap ) {
            const item = ListMap[ key ];
                if( page === key ) {
                    result.push(
                        <li className="nav-item d-flex flex-row flex-md-column-reverse justify-content-center align-items-start py-0" data-active="true" key={ key }>
                            <span className="nav-ind d-block"></span>
                            <a href={ baseUrl.concat( item.href ) } className="nav-link d-flex pl-3 px-md-4 pb-md-2 flex-column justify-content-center align-items-start py-3 pt-4 mt-md-2 py-md-4"> { item.text } </a>
                        </li>
                    ); 
                } else {
                    result.push(
                        <li className="nav-item d-flex flex-row flex-md-column-reverse justify-content-center align-items-start py-0" key={ key }>
                            <span className="nav-ind d-block"></span>
                            <a href={ baseUrl.concat( item.href ) } className="nav-link d-flex pl-3 px-md-4 pb-md-2 flex-column justify-content-center align-items-start py-3 pt-4 mt-md-2 py-md-4"> { item.text } </a>
                        </li>
                    );
                }      
        }
    return result;
};

export default function Navigation( { page, title, description, href, onClick, show, img } ) {
    return (
        <Fragment>
            <div 
                className="container-fluid content-navbar px-0 pt-3 bg-danger mt-0" 
                style={{ backgroundImage: img ? `url(${img})` : `url( "/img/private/server2.jpg" )` }}
            >
                <div className="navbar navbar-expand-md container-fluid d-flex py-3 px-0 py-md-0" id="navbar">
                    <a href="#" className="nav-brand ml-3 px-3 px-md-4 d-md-none"> Menu </a>
                    <div className="d-flex d-md-none flex-column justify-content-center align-items-center rounded navbar-toggler mr-3" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" id="menu-button">
                        <span className="items item1 d-block"></span>
                        <span className="items item3 d-block mt-1"></span>
                        <span className="items item2 d-block mt-1"></span>
                    </div>
                    <div className="collapse navbar-collapse position-relative px-0 py-4 py-md-0" id="navigation">
                        <ul className="navbar-nav d-flex flex-column flex-md-row py-3 py-md-0 pl-md-3">
                            { generate( page ) }
                        </ul>
                    </div>
                </div>
                <div className="jumbotron">
                    <div className="jumb-title py-3"> { title || 'Bienvenue !!' } </div>
                    <p className="jumb-text">
                        { description || "Utiliser l'application pour créer des simultations, créer des classes, partager vos simulations a vos élèves, évaluer vos élèves." }
                    </p>
                    <div className="current-user container-fluid py-1" style={{fontWeight:600, fontSize:"1.2m", color: "#FFFFFF"}}>
                        <div className="pl-3 py-2" id="current-user-name"></div>
                        <div className="pl-3 py-2" id="current-user-email"></div>
                    </div>
                    {
                        show != false ? 
                        <a 
                            href={ href || '#' } 
                            className="btn px-4 py-2 mt-5 button"
                            onClick={ onClick || function () {
                                //Empty fonction
                            } }> 
                                Commencer 
                        </a> : <div className="mb-5 pb-5"></div>
                    }
                </div>
            </div>
        </Fragment>
    );
};