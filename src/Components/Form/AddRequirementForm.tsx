import React, {Dispatch, FC, SetStateAction} from 'react';
import PopupTitle from "./PopupTitle/PopupTitle";
import PopupClose from "./PopupClose/PopupClose";
import LabelWithControl from "./LabelWithControl/LabelWithControl";
import Input from "../Controls/Input/Input";
import CheckboxWithlabel from "./CheckboxWithlabel/CheckboxWithlabel";
import MyMuiSelect from "../Controls/MyMuiSelect/MyMuiSelect";
import {MuiCustomMenuItem} from "../../shared/MySelectedComponents";
import Button from "../Controls/Buttons/Button/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {ReqFormInputs, RequirementItem} from "../../interfaces/interfaces";
import {host} from "../../Environment";

interface AddRequirementFormProps {
    closeModal: () => void
    setData: Dispatch<SetStateAction<RequirementItem[] | undefined>>
}

const AddRequirementForm: FC<AddRequirementFormProps> = ({closeModal, setData}) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ReqFormInputs>();

    const onSubmit: SubmitHandler<ReqFormInputs> = data => {

        fetch(`${host}/Requirement/Create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(reqId => setData(prev => {
                closeModal()
                if (prev) {
                    return [{
                        id: reqId,
                        name: data.nameRequirement,
                        state: 'NotDoc'
                    }, ...prev]
                } else {
                    return [{
                        id: reqId,
                        name: data.nameRequirement,
                        state: 'NotDoc'
                    }]
                }
            }))
            .catch(err => console.log(err))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{padding: '20px 20px'}}>
            <div className="req-form-wrap">
                <PopupTitle title="Добавить требование" style={{gridArea: '1 / 1 / 2 / 9'}}/>
                <PopupClose onClose={closeModal} style={{justifySelf: 'end'}}/>
                <LabelWithControl label="№ п.п" style={{gridColumn: '1 / 2', gridRow: '2 / 3'}}>
                    <Input style={{gridColumn: '2 / 4'}} formProps={{register, required: true, label: 'nameRequirement'}}/>
                </LabelWithControl>
                <CheckboxWithlabel id="relevance" label="Актуальность" style={{gridArea: '3 / 1 / 4 / 3'}}/>
                <LabelWithControl label="Разрешить" style={{gridColumn: '1 / 2', gridRow: '4 / 5'}}>
                    <MyMuiSelect style={{gridColumn: '2 / 4', gridRow: '4 / 5'}}>
                        <MuiCustomMenuItem value={10}>Да</MuiCustomMenuItem>
                        <MuiCustomMenuItem value={20}>Нет</MuiCustomMenuItem>
                    </MyMuiSelect>
                </LabelWithControl>
                <LabelWithControl label="Документ" style={{gridColumn: '1 / 2', gridRow: '5 / 6'}}>
                    <Input style={{gridColumn: '2 / 6', gridRow: '5 / 6'}}/>
                </LabelWithControl>
                <LabelWithControl label="№" style={{gridColumn: '6 / 7', gridRow: '5 / 6'}}>
                    <Input style={{gridColumn: '7 / 8', gridRow: '5 / 6'}}/>
                </LabelWithControl>
                <LabelWithControl label="Дата" style={{gridColumn: '1 / 2', gridRow: '6 / 7'}}>
                    <Input style={{gridColumn: '2 / 6', gridRow: '6 / 7'}}/>
                </LabelWithControl>
                <LabelWithControl label="Период действия c" style={{gridColumn: '1 / 3', gridRow: '7 / 8'}}>
                    <Input style={{gridColumn: '3 / 5', gridRow: '7 / 8'}}/>
                </LabelWithControl>
                <LabelWithControl label="по" style={{gridColumn: '6 / 7', gridRow: '7 / 8'}}>
                    <Input style={{gridColumn: '7 / 9', gridRow: '7 / 8'}}/>
                </LabelWithControl>
                <LabelWithControl label="Месяцев" style={{gridColumn: '1 / 2', gridRow: '8 / 9'}}>
                    <Input style={{gridColumn: '2 / 4', gridRow: '8 / 9'}}/>
                </LabelWithControl>
                <LabelWithControl label="Импортёр" style={{gridColumn: '1 / 2', gridRow: '9 / 10'}}>
                    <Input style={{gridColumn: '2 / 6', gridRow: '9 / 10'}}/>
                </LabelWithControl>
                <Button type='submit' title='Добавить' onClick={() => console.log('Сохранил')} color='primary'
                        style={{gridColumn: '1 / 3', gridRow: '10 / 11'}}/>
                <Button type='button' title='Отмена' onClick={closeModal} color='abort'
                        style={{gridColumn: '3 / 5', gridRow: '10 / 11'}}/>
            </div>
        </form>
    );
};

export default AddRequirementForm;