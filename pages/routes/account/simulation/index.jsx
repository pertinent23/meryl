import Head from 'next/head';
import { Fragment } from 'react';
import Navigation from './../@navigation';
import SimulationApi from '../@apiSimulation';

export const page = 'account.simulation';
export default function Simulation () {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/css/private/account.css"/>
                <link rel="stylesheet" href="/css/private/account.simulation.css"/>
            </Head>
            <div className="container-fuid d-flex flex-column account-container justify-content-center align-items-center py-0 px-0">
                <Navigation 
                    page={ page }
                    title={ 'Bienvenue dans simulation !! ' }
                    description={ 'Créer des simulations, travailler avec des simulations que vous avez déjà créées ou archivées et partager lès.' }
                    href={ "#" }
                    show={ false }
                    img={ '/img/home/simulation.jpeg' }
                />
                <div className="sendSimulation d-none position-fixed w-100 h-100 justify-content-center">
                    <div className="sendSimContent d-flex flex-column">
                        <div className="container-fluid start d-flex align-items-center border-bottom">
                            <div className="name"> Liste des utilisateurs </div>
                            <div className="_icon d-flex justify-content-center align-items-center" id="close-sendApi">
                                <div className="items item1"></div>
                                <div className="items item2"></div>
                            </div>
                        </div>
                        <div className="end d-block overflow-auto">
                            <div className="container-fluid pt-2 pb-4 px-1 px-md-2" id="user-list">
                                {/*<div className="user container-fluid d-flex border justify-content-center align-items-center py-2 mt-2 shadow rounded">
                                    <div className="icon d-flex justify-content-center align-items-center"> N1 </div>
                                    <div className="user-data flex-column d-flex flex-column pl-3">
                                        <div className="user-name"> Nom1 </div>
                                        <div className="user-options d-flex justify-content-end w-100">
                                            <button className="user-action btn"> Envoyer </button>
                                        </div>
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-3 px-0 px-sm-2">
                    <div className="row">
                        <div className="col">
                            <div className="message d-block text-center py-3"> Toutes mes simulations </div>
                            <div className="container-fluid px-1 px-sm-2">
                                <div className="accordion my-4" id="accordion">
                                    <div className="card">
                                        <div className="card-heard" id="head-3">
                                            <div className="head-content d-flex">
                                                <div 
                                                    className="head-data" 
                                                    type="button" 
                                                    data-toggle="collapse" 
                                                    data-target="#collapse-3" 
                                                    data-expanded="false" 
                                                    data-controls="collapse-3">
                                                        Liste des simulations crées
                                                </div>
                                            </div>
                                        </div>
                                        <div className="collapse show" id="collapse-3" data-parent="#accordion" data-labbeledby="head-3">
                                            <div className="card-body py-0 px-0">
                                                <div className="card-content d-flex flex-column px-1 px-md-2" id="content-all-sim"> Aucune </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card my-3">
                                        <div className="card-heard" id="head-1">
                                            <div className="head-content d-flex">
                                                <div 
                                                    className="head-data" 
                                                    type="button" 
                                                    data-toggle="collapse" 
                                                    data-target="#collapse-1" 
                                                    data-expanded="true" 
                                                    data-controls="collapse-1">
                                                        Simulations archivées
                                                </div>
                                            </div>
                                        </div>
                                        <div className="collapse show" id="collapse-1" data-parent="#accordion" data-labbeledby="head-1">
                                            <div className="card-body py-0 px-0">
                                                <div className="card-content d-flex flex-column px-0 px-1 px-md-2" id="archived-sim"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card my-3">
                                        <div className="card-heard" id="head-2">
                                            <div className="head-content d-flex">
                                                <div 
                                                    className="head-data" 
                                                    type="button" 
                                                    data-toggle="collapse" 
                                                    data-target="#collapse-2" 
                                                    data-expanded="false" 
                                                    data-controls="collapse-2">
                                                        Simulations recues
                                                </div>
                                            </div>
                                        </div>
                                        <div className="collapse show" id="collapse-2" data-parent="#accordion" data-labbeledby="head-2">
                                            <div className="card-body py-0 px-0">
                                                <div className="card-content d-flex flex-column px-1 px-md-2" id="received-sim"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-4">
                            <div className="message d-block d-md-none text-center py-3"> Gestion </div>
                            <div className="container-fluid py-4 px-1 px-md-0">
                                <center>
                                    <div className="simulation-creation-box creation-box d-flex flex-column pt-5 pb-3 mt-2">
                                        <div className="title text-center"> Créer une simulation </div>
                                        <div className="form d-flex flex-column align-items-center py-4">
                                            <input type="text" name="simulation-creation-name" id="simulation-creation-name" placeholder="Nom de la simulation: " className="my-3" />
                                            <textarea name="simulation-description" id="simulation-description" placeholder="Description: " className="my-3" cols="35" rows="5"></textarea>
                                            <div className="container-fluid text-danger text-center" id="simulation-creation-error"></div>
                                            <div className="container-fluid d-flex justify-content-end pt-5">
                                                <div id="create-simulation" className="btn px-5 py-2"> Créer </div>
                                            </div>
                                        </div>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                <SimulationApi />
            </div>
        </Fragment>
    );
};

Simulation.scripts = [
    '/js/extends/sim.getter.js',
    '/js/style.js'
];