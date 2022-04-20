import React, {useCallback} from 'react';

import './RequirementsList.scss';
import {host} from "../../Environment";
import {useFetch} from "../../hooks/fetch.hooks";
import {RequirementItem} from "../../interfaces/interfaces";
import RequirementsItem from "./RequirementsItem/RequirementsItem";

const RequirementsList = () => {

    const { data, loading, error, setData } = useFetch<RequirementItem[]>(`${host}/Requirement/all`, useCallback(resp => resp.json(), []))

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
                    <RequirementsItem requirement={requirement} docStatus={requirement.id ? 'exist' : 'notDoc'} setData={setData}/>
                    {idx !== data.length - 1 && <hr/>}
                    </div>)
            })}
        </div>
    );
};

export default RequirementsList;