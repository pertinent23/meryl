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
                <div className="api create d-flex flex-column">
                    <div className="container-fluid start d-flex align-items-center border-bottom">
                        <div className="name" id="simulation-id"> Nom de la simulation </div>
                        <div className="_icon d-flex justify-content-center align-items-center">
                            <div className="items item1"></div>
                            <div className="items item2"></div>
                        </div>
                    </div>
                    <div className="end d-flex">
                        <div className="container-fluid d-flex flex-column px-0 flex-sm-row">
                            <div className="workSpace d-flex flex-column">
                                <div className="container-fluid mainSpace px-0 d-flex flex-column">
                                    <div className="Stape beginStape d-flex flex-column">
                                        <div className="descriptionSpace p-3"></div>
                                        <div className="contentSelectionSpace d-flex justify-content-center align-items-center">
                                            <div className="selectionSpace beginSelectionSpace shadow d-flex justify-content-center align-items-center rounded" id="selectionSpace">
                                                <span className="px-2 px-sm-3 px-md-4 text-center api-text">
                                                    Dans un premier temps, choisir tous les élements
                                                    dont vous aurez besoin pour votre simultation,
                                                    dans un second temps vous devrez assembler votre Simulation
                                                    puis la tester.
                                                    <hr className="api-bar" />
                                                </span>
                                                <div className="content d-flex justify-content-center align-items-center rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Stape firstStape d-none flex-column">
                                        <div className="descriptionSpace p-3">
                                            Choisir chaque élement que vous aurez besoin
                                            pour votre simulation, le nombre de fois que vous
                                            en aurez besoin.
                                        </div>
                                        <div className="contentSelectionSpace d-flex justify-content-center align-items-center">
                                            <div className="selectionSpace firstSelectionSpace shadow d-flex justify-content-center align-items-center rounded" id="selectionSpace">
                                                <div className="content d-flex justify-content-center align-items-center rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Stape secondStape d-none flex-column">
                                        <div className="descriptionSpace p-3">
                                            User les éléments que vous avez choisit pour
                                            créer vos simulations.
                                        </div>
                                        <div className="contentSelectionSpace d-flex justify-content-center align-items-center">
                                            <div className="selectionSpace secondSelectionSpace shadow d-flex justify-content-center align-items-center rounded" id="selectionSpace">
                                                <div className="content d-flex justify-content-center align-items-center rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-fluid finalSpace d-flex justify-content-end py-2">
                                    <button className="btn next" id="finalButton" data-btn="start"> Commencer </button>
                                </div>
                            </div>
                            <div className="dataSpace d-flex flex-sm-column justify-content-center align-items-center p-0">
                                <div className="move move-left d-flex justify-content-center align-items-center">
                                    <div className="moveContent d-flex justify-content-center align-items-center">
                                        <div className="items item1"></div>
                                        <div className="items item2"></div>
                                    </div>
                                </div>
                                <div className="itemList d-block">
                                    <div className="itemContent d-flex flex-sm-column align-items-center">
                                        { /*<div className="items">
                                            <div className="simulationItems" draggable="false" data-infos="#">
                                                <img src="/img/simulation/computer.png" className="img simulationImg" alt="img" draggable="false" />
                                            </div>
                                        </div>*/ }
                                    </div>
                                </div>
                                <div className="move move-right d-flex justify-content-center align-items-center">
                                    <div className="moveContent d-flex justify-content-center align-items-center">
                                        <div className="items item1"></div>
                                        <div className="items item2"></div>
                                    </div>
                                </div>
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
                            <div className="message d-block d-md-none text-center py-3"> Gestion </div>
                            <div className="container-fluid py-4 px-1 px-md-0">
                                <div className="simulation-creation-box creation-box d-flex flex-column pt-5 pb-3">
                                    <div className="title text-center"> Créer une simulation </div>
                                    <div className="form d-flex flex-column align-items-center py-4">
                                        <input type="text" name="simulation-name" id="simulation-name" placeholder="Nom de la simulation: " className="my-3" />
                                        <textarea name="simulation-description" id="simulation-description" placeholder="Description: " className="my-3" cols="35" rows="5"></textarea>
                                        <div className="container-fluid d-flex justify-content-end pt-5">
                                            <div id="create-simulation" className="btn px-5 py-2"> Créer </div>
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

Simulation.scripts = [
    '/js/private/simulation.js',
    '/js/private/simulation.scrool.js',
    '/js/private/simulation.components.js',
];