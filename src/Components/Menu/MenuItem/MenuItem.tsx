import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import './MenuItem.scss';

interface MenuItemProps {
    icon: string;
    title: string
    href: string
}

const MenuItem: FC<MenuItemProps> = ({icon, title, href}) => {

    return (
        <NavLink to={href} className="menu-item">
            <img src={icon} alt="Картинка меню"/>
            <p>{title}</p>
        </NavLink>
    );
};

export default MenuItem;