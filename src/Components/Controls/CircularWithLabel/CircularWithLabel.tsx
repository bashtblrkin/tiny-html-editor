import React from 'react';

import './CircularWithLabel.scss'
import {MyMuiCircularProgress} from "../../../shared/MyProgressComponent";

const CircularWithLabel = () => {
    return (
        <div className="circle-wrap">
            <p className={"item-info-text"}>Ожидание</p><MyMuiCircularProgress size={20}/>
        </div>
    );
};

export default CircularWithLabel;