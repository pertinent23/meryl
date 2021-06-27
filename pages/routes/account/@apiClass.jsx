import { Fragment } from 'react';

export default function Api () {
    return (
        <Fragment>
            <div className="api api-class d-flex flex-column">
                <div className="container-fluid start d-flex align-items-center border-bottom">
                    <div className="icon mr-3" id="class-icon"> NC </div>
                    <div className="name" id="class-name"> Nom de la classe </div>
                    <div className="_icon d-none justify-content-center align-items-center" id="close-api-class">
                        <div className="items item1"></div>
                        <div className="items item2"></div>
                    </div>
                </div>
                <div className="end d-flex flex-column">
                    <div className="container-fluid d-flex flex-column px-0 flex-sm-row end-content">
                        <div className="workSpace d-block overflow-auto">
                            <div className="container-fluid workSpace-content">
                                <div className="row">
                                    <div className="col">
                                        <div className="card simulation-card px-3 py-2 shadow border-0 my-2 pr-0 w-100">
                                            <div className="card-head">
                                                Nom de la simulation
                                            </div>
                                            <div className="card-body px-0">
                                                <div className="description">
                                                    Une petite description de la simulation
                                                </div>
                                                <div className="container-fluid d-flex justify-content-end pt-4 pr-1">
                                                    <button className="btn-outline mr-3 px-3 py-2 showSimulationButton" data-id=""> Visualiser </button>
                                                    <button className="btn px-3 py-2 startSimulationButton" data-id=""> Commencer </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="card simulation-card px-3 py-2 shadow border-0 my-2 pr-0 w-100">
                                            <div className="card-head">
                                                Nom de la simulation
                                            </div>
                                            <div className="card-body px-0">
                                                <div className="description">
                                                    Une petite description de la simulation
                                                </div>
                                                <div className="container-fluid d-flex justify-content-end pt-4 pr-1">
                                                    <button className="btn-outline mr-3 px-3 py-2 showSimulationButton" data-id=""> Visualiser </button>
                                                    <button className="btn px-3 py-2 startSimulationButton" data-id=""> Commencer </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="memberList d-flex flex-column">
                            <div className="memHead d-flex">
                                <div className="name d-flex align-items-center pl-3"> Liste des membres: </div>
                                <div className="_icon d-flex justify-content-center align-items-center" id="close-member-list">
                                    <div className="items item1"></div>
                                    <div className="items item2"></div>
                                </div>
                            </div>
                            <div className="membItems-container d-flex overflow-hidden">
                                <div className="list w-100 d-block overflow-auto">
                                    <div className="list-group">
                                        <div className="list-group-item border-top-0 member-item d-flex align-items-center">
                                            <div className="item-icon"> N1 </div>
                                            <span className="ml-2"> Nom 1 </span>
                                        </div>
                                        <div className="list-group-item border-top-0 member-item d-flex align-items-center">
                                            <div className="item-icon"> N2 </div>
                                            <span className="ml-2"> Nom 2 </span>
                                        </div>
                                        <div className="list-group-item border-top-0 member-item d-flex align-items-center">
                                            <div className="item-icon"> N3 </div>
                                            <span className="ml-2"> Nom 3 </span>
                                        </div>
                                        <div className="list-group-item border-top-0 member-item d-flex align-items-center">
                                            <div className="item-icon"> N4 </div>
                                            <span className="ml-2"> Nom 4 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid content-api-class-button py-2 d-flex justify-content-end">
                        <button type="button" className="btn statistic rounded mr-3"> Statistique </button>
                        <button type="button" className="btn member rounded"> Membre </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};