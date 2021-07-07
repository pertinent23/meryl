import Head from 'next/head';
import { Fragment } from 'react';
import Navigation from './../@navigation';

export const page = 'account.my';
export default function MyAccount () {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/css/private/account.css"/>
                <link rel="stylesheet" href="/css/private/account.my.css"/>
            </Head>
            <div className="container-fuid d-flex flex-column account-container justify-content-center align-items-center py-0 px-0">
                <Navigation 
                    page={ page }
                    title={ 'Bienvenue dans gestion du compte !! ' }
                    description={ 'Modifier votre compte et vos informations personnelles.' }
                    show={ false }
                    img={ '/img/home/account.jpg' }
                />
                <div className="container py-3">
                    <div className="py-2 text-center">
                        <div className="myIcon d-inline-block rounded-circle my-3"> N </div>
                    </div>
                    <div className="py-5">
                        <div className="py-3 d-flex justify-content-center align-items-center">
                            <div className="label px-3"> Nom: </div>
                            <div className="data name" contentEditable="true"></div>
                        </div>
                        <div className="py-3 d-flex justify-content-center align-items-center">
                            <div className="label px-3"> Email: </div>
                            <div className="data email" contentEditable="true"></div>
                        </div>
                        <div className="py-3 d-flex justify-content-center align-items-center">
                            <div className="label px-3"> Mot de passe: </div>
                            <div className="data password" contentEditable="true"></div>
                        </div>
                    </div>
                    <div className="content-button p-5 d-flex justify-content-end">
                        <button className="modify btn"> Modifier </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

MyAccount.scripts = [
    '/js/extends/account.js',
    '/js/extends/my.js'
];