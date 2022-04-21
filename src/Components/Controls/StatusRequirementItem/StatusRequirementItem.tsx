import React, {FC, useState} from 'react';
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";
import CircularWithLabel from "../CircularWithLabel/CircularWithLabel";
import {DocStatus} from "../../../interfaces/interfaces";
import {useNavigate} from "react-router-dom";

interface StatusRequirementItemProps {
    status: DocStatus
    progress: number
}

const StatusRequirementItem: FC<StatusRequirementItemProps> = ({status, progress}) => {

    const [succesText, setSuccesText] = useState('Документ сохранён')
    const navigation = useNavigate()

    if (status === 'Treatment') {
        return (
            <CircularWithLabel />
        )
    }

    if (status === 'SuccessFetch') {
        if (succesText) {
            setTimeout(() => {setSuccesText('')}, 1000 )
            return (
                <p className={"item-info-text success"}>{succesText}</p>
            )
        }
    }

    if (status === 'Loading') {
        return (
            <ProgressWithLabel value={progress}/>
        )
    }

    if (status === 'NotDoc') {
        return (
            <p className={"item-info-text"}>Документ отсутствует</p>
        )
    }

    if (status === 'Busy') {
        return (
            <p className={"item-info-text"}>Документ на данный момент занят</p>
        )
    }

    return (
        <>

        </>
    );
};

export default StatusRequirementItem;