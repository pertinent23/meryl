import Head from 'next/head';
import { Fragment } from 'react';

export const page = 'connection';
export default function Connection () {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="/css/private/connection.css"/>
            </Head>
            <div className="container-fuid d-flex flex-column box-container justify-content-center align-items-center px-0">
                <div className="box d-flex justify-content-center p-0 m-0 border-0">
                    <div className="row d-flex justify-content-center w-100 border-0">
                        <div className="col col-icon box-col d-none border-0 d-lg-flex flex-column justify-content-center align-items-center">
                            <img src="/img/iconf.png" alt="icon" className="img box-icon"/>
                            <div className="box-img-text mt-4">
                                <a href="/"> GreatNet Simulator </a>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-form box-col d-flex flex-column px-0 py-3">
                            <div className="box-title d-flex flex-column pt-4 pl-4">
                                <span className="box-title-upper"> Je me connecte . </span>
                                <span className="box-title-lower"> Maintenant </span>
                            </div>
                            <div className="content-input d-flex flex-column align-items-center justify-content-center py-3">
                                <input type="email" placeholder="Email: " name="email" id="email" className="d-block box-button rounded pl-3"/>
                                <input type="password" placeholder="Mot de passe: " name="password" id="password" className="d-block box-button rounded mt-5 pl-3"/>
                            </div>
                            <div className="content-buttons d-flex justify-content-end pr-4 px-4 pt-4">
                                <a href="/routes/account"><input type="button" value="Connection" className="button-type-1 button mr-4" id="submit"/></a>
                                <a href="/routes/inscription"><input type="button" value="Inscription" className="button-type-2 button" id="second"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};