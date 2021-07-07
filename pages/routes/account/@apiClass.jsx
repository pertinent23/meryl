import { Fragment } from 'react';

export default function Api () {
    return (
        <Fragment>
            <div className="api api-class d-none flex-column">
                <div className="container-fluid start d-flex align-items-center border-bottom">
                    <div className="icon mr-3 px-3" id="class-icon"> NC </div>
                    <div className="name" id="class-shown-name"> Nom de la classe </div>
                    <div className="_icon d-flex justify-content-center align-items-center" id="close-api-class">
                        <div className="items item1"></div>
                        <div className="items item2"></div>
                    </div>
                </div>
                <div className="end d-flex flex-column">
                    <div className="contentSpace d-flex flex-column flex-md-row-reverse overflow-hidden">
                        <div className="contentSpaceItem d-none flex-column dataSpaceItem memberSpace h-100 overflow-hidden">
                            <div className="spaceHead d-flex justify-content-center flex-row-reverse align-items-center">
                                <div className="d-block text-center spaceTitle"> Membre de la classe </div>
                                <div className="_icon d-flex justify-content-center align-items-center" id="close-member">
                                    <div className="items item1"></div>
                                    <div className="items item2"></div>
                                </div>
                            </div>
                            <div className="spaceList d-block h-100 overflow-auto">
                                <div className="spaceListContent p-2 d-block" id="contentListOfMember">
                                    {/*<div className="user container-fluid d-flex border justify-content-center align-items-center py-2 mt-2">
                                        <div className="icon d-flex justify-content-center align-items-center"> N1 </div>
                                        <div className="user-data flex-column d-flex flex-column pl-3">
                                            <div className="user-name"> Nom1 </div>
                                            <div className="user-options d-flex justify-content-end w-100">
                                                <button className="user-action btn"> Supprimer </button>
                                            </div>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                        </div>
                        <div className="contentSpaceItem d-flex flex-column dataSpaceItem statSpace h-100 overflow-hidden">
                            <div className="spaceHead d-flex justify-content-center flex-row-reverse align-items-center">
                                <div className="d-block text-center spaceTitle"> Statistiques </div>
                                <div className="_icon d-flex justify-content-center align-items-center" id="close-stat">
                                    <div className="items item1"></div>
                                    <div className="items item2"></div>
                                </div>
                            </div>
                            <div className="spaceList d-block h-100 overflow-auto">
                                <div className="spaceListContent p-2 d-block">
                                    <div className="py-2">
                                        <span className="data-title"> Effectif: </span>
                                        <span className="data-val pl-3"> 95 élèves </span>
                                    </div>
                                    <div className="py-2">
                                        <span className="data-title"> Pourcentage de réussite: </span>
                                        <span className="progression my-2 ml-4">
                                            <span className="progression-bar win"> 80% </span>
                                        </span>
                                    </div>
                                    <div className="py-2">
                                        <span className="data-title"> Taux de participation: </span>
                                        <span className="progression my-2 ml-4">
                                            <span className="progression-bar taux"> 45% </span>
                                        </span>
                                    </div>
                                    <div className="py-2">
                                        <span className="data-title"> Indice de progression: </span>
                                        <span className="progression my-2 ml-4">
                                            <span className="progression-bar indice"> 2% </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contentSpaceItem d-flex flex-column dataSpaceItem addSpace h-100 overflow-hidden">
                            <div className="spaceHead d-flex justify-content-center flex-row-reverse align-items-center">
                                <div className="d-block text-center spaceTitle"> Ajouter une simulation </div>
                                <div className="_icon d-flex justify-content-center align-items-center" id="close-add">
                                    <div className="items item1"></div>
                                    <div className="items item2"></div>
                                </div>
                            </div>
                            <div className="spaceList d-block h-100 overflow-auto">
                                <div className="spaceListContent p-2 d-block" id="contentSimulationToAdd">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="contentSpaceItem d-flex flex-column listSpaceItem overflow-hidden">
                            <div className="spaceSimulationList d-block h-100 overflow-auto">
                                <div className="spaceSimulationListContent px-2" style={{ fontWeight: 600, fontSize: '1.1em' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="buttonSpace d-flex justify-content-end align-items-center pr-3 border-top">
                        <div className="addSimulation d-flex justify-content-center align-items-center mr-3 shadow" id="addSimulation">
                            <div className="items item1"></div>
                            <div className="items item2"></div>
                        </div>
                        <button className="btn member mr-3" id="openMember"> Membres </button>
                        <button className="btn-outline statistic py-1" id="openStat"> Statistiques </button>
                    </div>
                </div>
            </div>
            <script src="/js/private/class.manager.js"></script>
        </Fragment>
    );
};