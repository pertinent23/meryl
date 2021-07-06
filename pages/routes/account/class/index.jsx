import Head from 'next/head';
import { Fragment } from 'react';
import Navigation from './../@navigation';
import ApiClass from './../@apiClass';
import ApiSimulation from './../@apiSimulation';

export const page = 'account.class';
export default function Class () {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/css/private/account.css"/>
                <link rel="stylesheet" href="/css/private/account.simulation.css"/>
            </Head>
            <div className="container-fuid d-flex flex-column account-container justify-content-center align-items-center py-0 px-0">
                <Navigation 
                    page={ page }
                    title={ 'Bienvenue dans classe !! ' }
                    description={ 'Créer des classes, pour partager vos travaux avec les participants et évaluer leur niveaux.' }
                    href={ "#" }
                    show={ false }
                    img={ '/img/home/class.jpeg' }
                />
                <div className="container-fluid py-3 px-0 px-sm-2">
                    <div className="row">
                        <div className="col">
                            <div className="message d-block text-center py-3 pt-5"> Toutes mes classes </div>
                            <div className="container-fluid px-1 px-md-2">
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
                                                        Participant
                                                </div>
                                            </div>
                                        </div>
                                        <div className="collapse show" id="collapse-1" data-parent="#accordion" data-labbeledby="head-1">
                                            <div className="card-body py-0 px-0">
                                                <div className="card-content d-flex flex-column px-1 px-md-2">
                                                    <div className="card simulation-card class-card px-3 py-2 shadow border-0 my-2 pr-0">
                                                        <div className="card-head">
                                                            Nom de la classe
                                                        </div>
                                                        <div className="card-body px-0">
                                                            <div className="description">
                                                                Une petite description de la classe
                                                            </div>
                                                            <div className="container-fluid d-flex justify-content-end pt-4 pr-1">
                                                                <a href="#" className="btn px-4 py-2 open-class openClassButton" data-class="name" data-id="id"> Ouvrir </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card simulation-card class-card px-3 py-2 shadow border-0 my-2 pr-0">
                                                        <div className="card-head">
                                                            Nom de la classe
                                                        </div>
                                                        <div className="card-body px-0">
                                                            <div className="description">
                                                                Une petite description de la classe
                                                            </div>
                                                            <div className="container-fluid d-flex justify-content-end pt-4 pr-1">
                                                                <a href="#" className="btn px-4 py-2 open-class openClassButton" data-class="name" data-id="id"> Ouvrir </a>
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
                                                        Propriétaire
                                                </div>
                                            </div>
                                        </div>
                                        <div className="collapse" id="collapse-2" data-parent="#accordion" data-labbeledby="head-2">
                                            <div className="card-body py-0 px-0">
                                                <div className="card-content d-flex flex-column px-1 px-md-2">
                                                    <div className="card simulation-card class-card px-3 py-2 shadow border-0 my-2 pr-0">
                                                        <div className="card-head">
                                                            Nom de la classe
                                                        </div>
                                                        <div className="card-body px-0">
                                                            <div className="description">
                                                                Une petite description de la classe
                                                            </div>
                                                            <div className="container-fluid d-flex justify-content-end pt-4 pr-1">
                                                                <a href="#" className="btn my-2 btn-outline px-3 py-2 mr-3 stat-class" data-class="name" data-id="id"> Statisque </a>
                                                                <a href="#" className="btn my-2 btn-outline px-3 py-2 mr-3 members-class" data-class="name" data-id="id"> Participants </a>
                                                                <a href="#" className="btn my-2 px-3 py-2 open-class openClassButton" data-class="name" data-id="id"> Ouvrir </a>
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
                        <div className="col-12 col-md-5 col-lg-4 d-flex flex-column">
                            <div className="container-fluid pt-4 px-1 px-md-3 px-md-0">
                                <div className="box-add py-3 pt-5 px-2 rounded shadow" id="adding-box">
                                    <div className="title text-center"> Ajouter une classe </div>
                                    <div className="form d-flex flex-column align-items-center py-5">
                                        <input className="my-2" type="text" name="class-id" id="class-id" placeholder="Id: "/>
                                        <input className="my-2" type="password" name="class-password" id="class-password" placeholder="Mot de passe: "/>
                                        <div className="container-fluid d-flex justify-content-end pt-5">
                                            <div id="#" className="btn px-4 py-2"> Ajouter </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid py-3 px-1 px-md-3 px-md-0">
                                <div className="simulation-creation-box creation-box d-flex flex-column pt-5 pb-3">
                                    <div className="title text-center"> Créer une classe </div>
                                    <div className="form d-flex flex-column align-items-center py-4">
                                        <input type="text" name="class-name" id="class-name" placeholder="Nom de la classe: " className="my-3" />
                                        <textarea name="class-description" id="class-description" placeholder="Description: " className="my-3" cols="35" rows="5"></textarea>
                                        <div className="container-fluid d-flex justify-content-end pt-5">
                                            <div id="create-class" className="btn px-5 py-2"> Créer </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ApiSimulation />
                <ApiClass />
            </div>
        </Fragment>
    );
};