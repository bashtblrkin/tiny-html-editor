import React, {FC} from 'react';

import './ButtonWithIcon.scss';

interface ButtonWithIconProps {
    icon: string
    alt: string
    title: string
    handleClick?: () => void
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({icon, alt, title, handleClick}) => {

    return (
        <div className="button-with-icon" onClick={handleClick}>
            <img src={icon} alt={alt}/>
            <p>{title}</p>
        </div>
    );
};

export default ButtonWithIcon;