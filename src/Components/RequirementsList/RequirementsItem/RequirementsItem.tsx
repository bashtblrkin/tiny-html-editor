import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import CustomCheckbox from "../../Controls/CustomCheckboxWithLabel/CustomCheckbox";
import ButtonImg from "../../Controls/Buttons/ButtonImg/ButtonImg";
import uploadImg from '../../../assets/img/upload_doc.svg';
import editImg from '../../../assets/img/edit_doc.svg';
import StatusRequirementItem from "../../Controls/StatusRequirementItem/StatusRequirementItem";
import {DocStatus, RequirementItem} from "../../../interfaces/interfaces";
import {host} from '../../../Environment'

import './RequirementsItem.scss';
import UploadFileBtn from "../../Controls/Buttons/UploadFileBtn/UploadFileBtn";
import {useNavigate} from "react-router-dom";


interface RequirementsItemProps {
    requirement: RequirementItem
    docStatus: DocStatus
    setData: Dispatch<SetStateAction<RequirementItem[] | undefined>>
}

const RequirementsItem: FC<RequirementsItemProps> = ({requirement, docStatus, setData}) => {

    const {id, name} = requirement

    const [progress, setProgress] = React.useState(10);
    const [statusDoc, setStatusDoc] = React.useState(docStatus)
    const [error, setError] = React.useState<string>('')

    const uploadFile = useCallback(async (formData: FormData) => {

        setStatusDoc('loading')
        let xhr = new XMLHttpRequest();

        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded/event.total) * 100)
                if (progress >= 100) {
                    setStatusDoc('treatment')
                }
                setProgress(progress)
            }
        };

        xhr.open("POST", `${host}/Requirement/upload`, true)
        xhr.responseType = 'json';
        xhr.send(formData)

        xhr.onload = function() {
            if (xhr.status !== 200) {
                setError(xhr.statusText)
            } else {
                setStatusDoc('ok')
                setData(prev => {
                    if (prev) {
                        console.log('saveData')
                        return [...prev, xhr.response]
                    } else {
                        return [xhr.response]
                    }
                })
            }
        };
        xhr.onerror = function() {
            setError(xhr.statusText)
        };

    }, [setData])

    const navigate = useNavigate()

    return (
        <div className="req-item">
            <div>
                <CustomCheckbox id={id} renderLabel={() => name}/>
            </div>
            <div className="req-item-group">
                <StatusRequirementItem status={statusDoc} progress={progress}/>
                <UploadFileBtn imgSrc={uploadImg} alt={'Загрузить'} onChange={uploadFile} id={id}/>
                <ButtonImg imgSrc={editImg} alt={'Изменить'} onClick={() => {navigate(`${id}`)}} status={statusDoc}/>
            </div>
        </div>
    );
};

export default RequirementsItem;