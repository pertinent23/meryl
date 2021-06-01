import Head from 'next/head';
import { Fragment } from 'react';
import Navigation from './../@navigation';

export const page = 'account.training';
export default function Training () {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/css/private/account.css"/>
                <link rel="stylesheet" href="/css/private/account.simulation.css"/>
            </Head>
            <div className="container-fuid d-flex flex-column account-container justify-content-center align-items-center py-0 px-0">
                <Navigation 
                    page={ page }
                    title={ 'Bienvenue dans entrainement !! ' }
                    description={ 'Exercez-vous avec des simulations créées par des professeurs, les resultats de ces simulations ne seront pas pris en compte quelque soit l issue.' }
                    href={ "#" }
                />
                <div className="container-fluid py-3">
                    <div className="row training-row">
                        <div className="col training-col d-flex flex-column align-items-center py-3">
                            <div className="card simulation-card px-3 py-2 shadow border-0 my-2 w-100">
                                <div className="card-head">
                                    Nom de la simulation
                                </div>
                                <div className="card-body">
                                    <div className="description">
                                        Une petite description de la simulation
                                    </div>
                                    <div className="container-fluid d-flex justify-content-end pt-4">
                                        <a href="#" className="btn px-3 py-2"> Commencer </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card simulation-card px-3 py-2 shadow border-0 my-2 w-100">
                                <div className="card-head">
                                    Nom de la simulation
                                </div>
                                <div className="card-body">
                                    <div className="description">
                                        Une petite description de la simulation
                                    </div>
                                    <div className="container-fluid d-flex justify-content-end pt-4">
                                        <a href="#" className="btn px-3 py-2"> Commencer </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 training-col d-flex flex-column align-items-center py-3">
                            <div className="card simulation-card px-3 py-2 shadow border-0 my-2 w-100">
                                <div className="card-head">
                                    Nom de la simulation
                                </div>
                                <div className="card-body">
                                    <div className="description">
                                        Une petite description de la simulation
                                    </div>
                                    <div className="container-fluid d-flex justify-content-end pt-4">
                                        <a href="#" className="btn px-3 py-2"> Commencer </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card simulation-card px-3 py-2 shadow border-0 my-2 w-100">
                                <div className="card-head">
                                    Nom de la simulation
                                </div>
                                <div className="card-body">
                                    <div className="description">
                                        Une petite description de la simulation
                                    </div>
                                    <div className="container-fluid d-flex justify-content-end pt-4">
                                        <a href="#" className="btn px-3 py-2"> Commencer </a>
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