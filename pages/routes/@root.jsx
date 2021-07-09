import Head from 'next/head';
import { Fragment } from 'react';
import { element, string } from 'prop-types';
import Menu from './@menu';
import Loader from './@loader';

export const TITLE = 'GreatNet Simulator';
export default function Root( { children, page } ) {
    return (
        <Fragment>
            <Head>
                <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="theme-color" content="#3D489F"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" type="text/css" href="/libs/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="/css/main.css" />
                <link rel="icon" href="/img/iconf.png" type="image/png" />
                <title> { TITLE } </title>
                <script src="/libs/jquery-3.3.1.slim.min.js"></script>
                <script src="/libs/popper.min.js"></script>
                <script src="/libs/digital-v2.0.0.min.js"></script>
            </Head>
            <Loader />
            <div className="container-fluid main-container p-0">
                <div className="container-fluid part menu-part p-0">
                    <Menu page={ page } />
                </div>
                <div className="container-fuild part content-part d-flex flex-column">
                    { children }
                </div>
            </div>
            <script src="/js/main.js"></script>
            <script src="/libs/bootstrap.bundle.min.js"></script>
        </Fragment>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            data: { }
        }
    };
};

Root.propTypes = {
    children: element,
    page: string
};