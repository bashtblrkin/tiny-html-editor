import React from 'react';
import {Outlet} from 'react-router-dom'
import Menu from '../Components/Menu/Menu'

import './StylePage.scss';

const Layout = () => {
    return (
        <div className="wrapper">
            <Menu />
            <Outlet />
        </div>
    );
};

export default Layout;