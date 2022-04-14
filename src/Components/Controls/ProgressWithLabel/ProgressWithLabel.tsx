import React, {FC} from 'react';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import {MyLinearProgressComponent} from "../../../shared/MyProgressComponent";

import './ProgressWithLabel.scss'

interface ProgressWithLabelProps extends LinearProgressProps {
    value: number
}

const ProgressWithLabel: FC<ProgressWithLabelProps> = (props) => {

    return (
        <div className="loader-wrap">
            <p className="item-info-text">Загрузка на сервер</p>
            <div className="loader">
                <MyLinearProgressComponent variant="determinate"  {...props}/>
            </div>
            <p className="item-info-text">{Math.round(props.value)}%</p>
        </div>
    );
};

export default ProgressWithLabel;
