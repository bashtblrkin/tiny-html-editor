import React, {FC} from 'react';

import './InputWithLabel.scss';

interface InputWithLabelProps {
    label: string;
}

const InputWithLabel: FC<InputWithLabelProps> = ({label}) => {

    return (
        <div className="input-with-label">
            <p>{label}</p>
            <input type="text"/>
        </div>
    );
};

export default InputWithLabel;