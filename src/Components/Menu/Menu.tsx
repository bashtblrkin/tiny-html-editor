import React from 'react';
import './Menu.scss'
import logo from '../../assets/img/logo.png'
import reqIcon from '../../assets/img/req-icon.png';
import referencIcon from '../../assets/img/ref-icon.png'
import MenuItem from "./MenuItem/MenuItem";

const Menu = () => {
    return (
        <div className="menu">
            <div className="logo-wrapper">
                <img src={logo} alt="Логотип" className="logo-img"/>
                <p className="logo-text">ФГБУ «Всероссийский центр карантина растений»</p>
            </div>
            <MenuItem icon={reqIcon} title={'Требования'} href={'requirements'}/>
            <MenuItem icon={referencIcon} title={'Cправочники'} href={'references'}/>
        </div>
    );
};

export default Menu;