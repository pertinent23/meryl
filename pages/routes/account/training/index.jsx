import Head from 'next/head';
import { Fragment } from 'react';
import Navigation from './../@navigation';
import ApiSimulation from './../@apiSimulation';

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
                    show={ false }
                    img={ '/img/home/training.jpeg' }
                />
                <div className="container-fluid py-3" id="contentAll"></div>
            </div>
            <ApiSimulation />
        </Fragment>
    );
};

Training.scripts = [
    '/js/extends/training.getter.js',
    '/js/extends/account-manager.js',
    '/js/style.js',
]; 