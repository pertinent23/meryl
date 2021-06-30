import Head from 'next/head';
import { Fragment } from 'react';
import Navigation from './@navigation';

export const page = 'account.home';
export default function AccountHome () {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/css/private/account.css"/>
                <link rel="stylesheet" href="/css/private/account.home.css"/>
            </Head>
            <div className="container-fuid d-flex flex-column account-container justify-content-center align-items-center py-0 px-0">
                <Navigation page={ page } href={ '/routes/account/simulation' }/>
                <div className="w-100 py-3 d-flex">
                    <div className="content-items container-fluid py-4 d-flex flex-column">
                        <div className="message d-block text-center py-3"> Toutes les options </div>
                        <div className="row py-4">
                            <div className="col">
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center p-3">
                                        <div className="card items border-0 py-3 pt-4 shadow">
                                            <img src="/img/private/img5.svg" alt="icon" className="card-img-top"/>
                                            <div className="card-body">
                                                <span className="card-title py-2 px-3 my-4 d-inline-block"> Simalation </span>
                                                <p className="card-text pb-3 px-4">
                                                    Créer vos simulations, testé lès, envoyer lès.
                                                    Tester vos éleves.
                                                </p>
                                                <div className="container-fluid d-flex justify-content-end">
                                                    <a href="/routes/account/simulation" className="btn btn-outline px-4 py-1"> Aller </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center p-3">
                                        <div className="card items border-0 py-3 pt-4 shadow">
                                            <img src="/img/private/img2.svg" alt="icon" className="card-img-top"/>
                                            <div className="card-body">
                                                <span className="card-title py-2 px-3 my-3 d-inline-block"> Classe </span>
                                                <p className="card-text pb-3 px-4">
                                                    Créer des classes et partager des informations aux participants,
                                                    de ces classes.
                                                </p>
                                                <div className="container-fluid d-flex justify-content-end">
                                                    <a href="/routes/account/class" className="btn btn-outline px-4 py-1"> Aller </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col d-flex justify-content-center align-items-center p-3">
                                        <div className="card items border-0 py-3 pt-4 shadow">
                                            <img src="/img/private/img9.svg" alt="icon" className="card-img-top"/>
                                            <div className="card-body">
                                                <span className="card-title py-2 px-3 my-4 d-inline-block"> Entrainement </span>
                                                <p className="card-text pb-3 px-4">
                                                    Entrainer vous avec des simulations créées par des proffeseurs.
                                                </p>
                                                <div className="container-fluid d-flex justify-content-end">
                                                    <a href="/routes/account/training" className="btn btn-outline px-4 py-1"> Aller </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center p-3">
                                        <div className="card items border-0 py-3 pt-4 shadow">
                                            <img src="/img/private/img11.svg" alt="icon" className="card-img-top"/>
                                            <div className="card-body">
                                                <span className="card-title py-2 px-3 my-4 d-inline-block"> Mon compte </span>
                                                <p className="card-text pb-3 px-4">
                                                    Modifier les informations de votre compte, ( nom, prénom, .... ).
                                                </p>
                                                <div className="container-fluid d-flex justify-content-end">
                                                    <a href="/routes/account/simulation/my" className="btn btn-outline px-4 py-1"> Aller </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};