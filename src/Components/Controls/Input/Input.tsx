import {ReqFormInputs} from "../../../interfaces/interfaces";
import {UseFormRegister} from "react-hook-form";
import React, {CSSProperties, FC} from 'react';
import './Input.scss'

interface InputProps {
    style?: CSSProperties
    formProps?: {
        label: keyof ReqFormInputs
        register: UseFormRegister<ReqFormInputs>
        required: boolean;
    }
}

const Input: FC<InputProps> = ({style, formProps}) => {

    if (formProps) {
        const {required, label, register} = formProps

        return <input type="text" style={style} className="control-input" {...register(label, {required})}/>
    }

    return (
        <input type="text" style={style} className="control-input"/>
    );
};

export default Input;