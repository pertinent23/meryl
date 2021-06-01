import Head from 'next/head';
import { Fragment } from 'react';
import Navigation from './../@navigation';

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
                />
                <div className="container-fluid py-3 px-0 px-sm-2">
                    <div className="row">
                        <div className="col">
                            <div className="container-fluid px-1 px-sm-2">
                                <div className="accordion my-4" id="accordion">
                                    <div className="card">
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
                                                <div className="card-content d-flex flex-column px-0 px-1 px-md-2">
                                                    <div className="card simulation-card px-3 py-2 shadow border-0 my-2 pr-0">
                                                        <div className="card-head">
                                                            Nom de la simulation
                                                        </div>
                                                        <div className="card-body px-0">
                                                            <div className="description">
                                                                Une petite description de la simulation
                                                            </div>
                                                            <div className="container-fluid d-flex justify-content-end pt-4 pr-1">
                                                                <a href="#" className="btn px-3 py-2"> Commencer </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card simulation-card px-3 py-2 shadow border-0 my-2 pr-0">
                                                        <div className="card-head">
                                                            Nom de la simulation
                                                        </div>
                                                        <div className="card-body px-0">
                                                            <div className="description">
                                                                Une petite description de la simulation
                                                            </div>
                                                            <div className="container-fluid d-flex justify-content-end pt-4 pr-1">
                                                                <a href="#" className="btn px-3 py-2"> Commencer </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                        <div className="collapse" id="collapse-2" data-parent="#accordion" data-labbeledby="head-2">
                                            <div className="card-body py-0 px-0">
                                                <div className="card-content d-flex flex-column px-1 px-md-2"> Aucune </div>
                                            </div>
                                        </div>
                                    </div>
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
                                                        Simulations crées
                                                </div>
                                            </div>
                                        </div>
                                        <div className="collapse" id="collapse-3" data-parent="#accordion" data-labbeledby="head-3">
                                            <div className="card-body py-0 px-0">
                                                <div className="card-content d-flex flex-column px-1 px-md-2"> Aucune </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-4">
                            <div className="container-fluid py-4 px-1 px-md-0">
                                <div className="simulation-creation-box creation-box d-flex flex-column pt-5 pb-3">
                                    <div className="title text-center"> Créer une simulation </div>
                                    <div className="form d-flex flex-column align-items-center py-4">
                                        <input type="text" name="simulation-name" id="simulation-name" placeholder="Nom de la simulation: " className="my-3" />
                                        <textarea name="simulation-description" id="simulation-description" placeholder="Description: " className="my-3" cols="35" rows="5"></textarea>
                                        <div className="container-fluid d-flex justify-content-end pt-5">
                                            <div id="#" className="btn px-5 py-2"> Créer </div>
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