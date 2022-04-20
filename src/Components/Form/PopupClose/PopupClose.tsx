import React, {CSSProperties, FC} from 'react';

import close from '../../../assets/img/Close.png'

import './PopupClose.scss';

interface PopupCloseProps {
    onClose: () => void
    style?: CSSProperties
}

const PopupClose: FC<PopupCloseProps> = ({onClose, style}) => {
    return (
        <img src={close} alt="Закрыть" onClick={onClose} className="popup-close" style={style}/>
    );
};

export default PopupClose;