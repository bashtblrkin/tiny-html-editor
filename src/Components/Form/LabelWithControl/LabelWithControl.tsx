import React, {CSSProperties, FC} from 'react';

import './LabelWithControl.scss'

interface LabelWithControlProps {
    label: string
    style?: CSSProperties
}

const LabelWithControl: FC<LabelWithControlProps> = ({label, style, children}) => {

    return (
        <>
            <p style={style} className="control-label">{label}</p>
            {children}
        </>
    );
};

export default LabelWithControl;