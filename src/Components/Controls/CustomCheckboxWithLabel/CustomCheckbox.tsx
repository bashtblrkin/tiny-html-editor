import React, {Dispatch, FC, SetStateAction} from 'react';

import './CustomCheckbox.scss'
import {RequirementItem} from "../../../interfaces/interfaces";

interface CustomCheckboxProps {
    id: string;
    renderLabel: () => JSX.Element | string
    setData: Dispatch<SetStateAction<RequirementItem[] | undefined>>
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({id, renderLabel, setData}) => {

    const handleClick = () => {
        setData(prev => prev?.map(req => {
            if (req.id === id) {
                if (req.checked) {
                    return {
                        ...req,
                        checked: !req.checked
                    }
                } else {
                    return {
                        ...req,
                        checked: true
                    }
                }
            }
            return req
        }))
    }

    return (
        <>
            <input type="checkbox" className="custom-checkbox" id={id}/>
            <label htmlFor={id} onClick={handleClick}>{renderLabel()}</label>
        </>
    );
};

export default CustomCheckbox;