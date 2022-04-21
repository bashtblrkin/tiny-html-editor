import React, {FC} from 'react';
import cn from 'classnames';
import './ButtonImg.scss';
import {DocStatus} from "../../../../interfaces/interfaces";

interface ButtonImgProps {
    imgSrc: string;
    alt: string;
    onClick: () => void
    status?: DocStatus
}

const ButtonImg: FC<ButtonImgProps> = ({imgSrc, alt, status, onClick}) => {

    const handleClick = () => {
        if (status && status !== 'SuccessFetch' && status !== 'Exist') return
        onClick()
    }

    return (
        <img src={imgSrc} alt={alt} className={cn('button-img', {disabled: status !== 'SuccessFetch' && status !== 'Exist'})} onClick={handleClick}/>
    );
};

export default ButtonImg;