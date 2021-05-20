export default function Menu () {
    return (
        <div className="container-fluid d-flex flex-row align-items-center px-md-3 px-lg-4" id="menu">
            <div className="content-menu-data d-flex flex-row py-2 pb-4">
                <div className="content-icon d-flex">
                    <img src="/img/iconf.png" alt="icon" className="img d-block"/>
                </div>
                <div className="content-name d-flex align-items-center ml-1 pt-4">
                    <span> Great Learning </span>
                </div>
            </div>
            <div className="content-button flex-column justify-content-center d-none d-md-flex">
                <input type="button" value="Connection" id="menu-action" className="d-block"/>
            </div>
        </div>
    );
};