import React, {CSSProperties, FC} from 'react';

import './CheckboxWithlabel.scss';

interface CheckboxWithlabelProps {
    id: string
    label: string
    style?: CSSProperties
}

const CheckboxWithlabel: FC<CheckboxWithlabelProps> = ({id, label, style}) => {

    return (
        <>
            <input type="checkbox" className="form-custom-checkbox" id={id} />
            <label htmlFor={id} style={style}>{label}</label>
        </>
    );
};

export default CheckboxWithlabel;