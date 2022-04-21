import React, {Dispatch, FC, memo, SetStateAction, useEffect} from 'react';

import './RequirementsList.scss';
import {RequirementItem} from "../../interfaces/interfaces";
import RequirementsItem from "./RequirementsItem/RequirementsItem";

interface RequirementsListProps {
    data: RequirementItem[] | undefined
    loading: boolean
    error: string
    setData: Dispatch<SetStateAction<RequirementItem[] | undefined>>
}

const RequirementsList: FC<RequirementsListProps> = ({data,loading,error,setData}) => {

    if (loading) {
        return (
            <div className="req-list">
                Загрузка...
            </div>
        )
    }

    if (error) {
        return (
            <div className="req-list">
                Ошибка. Повторите попытку позже.
            </div>
        )
    }



    return (
        <div className="req-list">
            {data && data.map((requirement, idx) => {
                return (<div key={requirement.id}>
                    <RequirementsItem requirement={requirement} docStatus={requirement.state} setData={setData}/>
                    {idx !== data.length - 1 && <hr/>}
                    </div>)
            })}
        </div>
    );
};

export default memo(RequirementsList);