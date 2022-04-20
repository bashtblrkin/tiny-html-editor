import React, {CSSProperties, FC} from 'react';

import './PopupTitle.scss'

interface PopupTitleProps {
    title: string
    style?: CSSProperties
}

const PopupTitle: FC<PopupTitleProps> = ({title, style}) => {
    return (
        <h2 style={style} className="popup-title">
            {title}
        </h2>
    );
};

export default PopupTitle;