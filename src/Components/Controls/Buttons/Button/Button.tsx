import React, {CSSProperties, FC} from 'react';
import cn from 'classnames';

import './Button.scss';

interface ButtonProps {
    type: 'submit' | 'button' | 'reset' | undefined
    color: 'primary' | 'abort'
    onClick: () => void
    title: string
    style?: CSSProperties
}

const Button: FC<ButtonProps> = ({type, color, onClick, title, style}) => {

    return (
        <button type={type} onClick={onClick} style={style} className={cn('btn', {'primary': color === 'primary'}, {'abort': color === 'abort'})}>{title}</button>
    );
};

export default Button;