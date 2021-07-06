import { Fragment } from 'react';

export default function Api () {
    return (
        <Fragment>
            <div className="api api-create d-none flex-column">
                <div className="container-fluid start d-flex align-items-center border-bottom">
                    <div className="name" id="simulation-name"></div>
                    <div className="_icon d-flex justify-content-center align-items-center" id="close-api">
                        <div className="items item1"></div>
                        <div className="items item2"></div>
                    </div>
                </div>
                <div className="end d-flex">
                    <div className="api-more d-none justify-content-center align-items-center more-error">
                        <div className="api-more-content border-left border-right d-flex flex-column">
                            <div className="container-fluid start d-flex align-items-center border-bottom">
                                <div className="name" id="api-more-text"></div>
                                <div className="_icon d-flex justify-content-center align-items-center" id="close-more">
                                    <div className="items item1"></div>
                                    <div className="items item2"></div>
                                </div>
                            </div>
                            <div className="end d-block overflow-auto">
                                <div className="container-fluid content-more-option">
                                    {/*<div className="more-option shadow d-flex py-4 pl-4 mt-3 rounded">
                                        <span> option </span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        en aurez besoin de lui.
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
                                <button className="btn btn-outline ml-3 save d-none" id="saveButton"> Sauvegarder </button>
                            </div>
                        </div>
                        <div className="dataSpace d-none flex-sm-column justify-content-center align-items-center p-0">
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
            <script src="/js/private/simulation.js"></script>
            <script src="/js/private/simulation.scrool.js"></script>
            <script src="/js/private/simulation.components.js"></script>
            <script src="/js/private/simulation.page.js"></script>
        </Fragment>
    );
};