import React, {FC} from 'react';

import './ButtonWithIcon.scss';

interface ButtonWithIconProps {
    icon: string
    alt: string
    title: string
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({icon, alt, title}) => {

    return (
        <div className="button-with-icon">
            <img src={icon} alt={alt}/>
            <p>{title}</p>
        </div>
    );
};

export default ButtonWithIcon;