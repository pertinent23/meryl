import { TITLE } from './@root';
export default function Menu () {
    return (
        <div className="container-fluid d-flex flex-row align-items-center px-md-3 px-lg-4 pb-3 my-0" id="menu">
            <div className="content-menu-data d-flex flex-row py-2 justify-content-center justify-content-lg-start">
                <div className="content-icon d-flex">
                    <img src="/img/iconf.png" alt="icon" className="img d-block"/>
                </div>
                <div className="content-name d-flex align-items-center ml-1 pt-4">
                    <span>
                        <a href="/"> { TITLE } </a>
                    </span>
                </div>
            </div>
            <div className="content-button flex-column justify-content-center d-none d-md-flex">
                <input type="button" value="Connection" id="menu-action" className="d-block mt-3"/>
            </div>
        </div>
    );
};