import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';

export const page = 'home';
export default function Home () {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/css/private/home.css"/>
            </Head>
            <div className="container-fuid d-flex flex-column home-container justify-content-center align-items-center py-4">
                <div className="row d-flex flex-column flex-lg-row-reverse pres py-2 px-lg-3">
                    <div className="col pres-item d-flex justify-content-center align-items-center">
                        <div className="content-img w-100 px-2 py-3 d-flex justify-content-center overflow-hidden">
                            <img src="/img/private/img1.svg" alt="icon" className="d-block img home-img"/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pres-item d-flex justify-content-center align-items-center">
                        <span className="content-text d-block py-4 px-3 px-lg-5"> 
                            Créer une classe, créer une simulation et ajouter là dans la classe,
                            pour apprendre le fonctionnement des réseaux informatiques à l
                            vos élèves.
                        </span>
                    </div>
                </div>
                <div className="content-start-button d-flex position-relative py-3 pl-4 w-100">
                    <Link href="/routes/connection">
                        <a>
                            <input type="button" value="Commencer" id="start" className="d-block"/>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="container-fuid d-flex flex-column info-container justify-content-center align-items-center py-4 px-0">
                <div className="row container-fluid d-flex flex-column flex-lg-row pres py-3 px-lg-3 py-lg-5">
                    <div className="col pres-item d-flex justify-content-center align-items-center">
                        <div className="info-option container d-flex flex-column">
                            <div className="info-option-img-container d-flex justify-content-center py-4">
                                <img src="/img/private/img2.svg" alt="icon" className="img info-option-img"/>
                            </div>
                            <div className="info-option-description d-flex justify-content-center py-3">
                                <span className="info-option-text px-2 d-block py-4">
                                    Créer des classes et évaluez vos élèves
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 pres-item d-flex justify-content-center align-items-center">
                        <div className="info-option container d-flex flex-column">
                            <div className="info-option-img-container d-flex justify-content-center py-4">
                                <img src="/img/private/img5.svg" alt="icon" className="img info-option-img"/>
                            </div>
                            <div className="info-option-description d-flex justify-content-center py-3">
                                <span className="info-option-text px-2 d-block py-4">
                                    Créer des simulations et partagez les.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fuid d-flex flex-column footer justify-content-center align-items-center py-4 pl-4">
                <span> copyright { ( new Date() ).getFullYear() } </span>
            </div>
        </Fragment>
    );
};