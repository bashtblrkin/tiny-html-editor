import React, {FC} from 'react';

import './CustomCheckbox.scss'

interface CustomCheckboxProps {
    id: string;
    renderLabel: () => JSX.Element | string
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({id, renderLabel}) => {

    return (
        <>
            <input type="checkbox" className="custom-checkbox" id={id} />
            <label htmlFor={id}>{renderLabel()}</label>
        </>
    );
};

export default CustomCheckbox;