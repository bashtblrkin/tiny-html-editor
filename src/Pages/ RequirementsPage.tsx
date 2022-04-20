import React from 'react';
import Search from "../Components/Controls/Search/Search";
import ButtonWithIcon from "../Components/Controls/Buttons/ButtonWithIcon/ButtonWithIcon";
import RequirementsList from "../Components/RequirementsList/RequirementsList";
import addIcon from '../assets/img/add-icon.png';
import delIcon from '../assets/img/del-icon.png';
import {useModal} from "../hooks/useModal";
import Modal from "../Components/Modal/Modal";
import PopupTitle from "../Components/Form/PopupTitle/PopupTitle";
import PopupClose from "../Components/Form/PopupClose/PopupClose";
import LabelWithControl from "../Components/Form/LabelWithControl/LabelWithControl";
import Input from "../Components/Controls/Input/Input";
import CheckboxWithlabel from "../Components/Form/CheckboxWithlabel/CheckboxWithlabel";
import MyMuiSelect from "../Components/Controls/MyMuiSelect/MyMuiSelect";
import {MuiCustomMenuItem} from "../shared/MySelectedComponents";
import Button from "../Components/Controls/Buttons/Button/Button";
import {ReqFormInputs} from '../interfaces/interfaces';
import {SubmitHandler, useForm} from "react-hook-form";
import {host} from "../Environment";

const RequirementsPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ReqFormInputs>();
    const [open, openModal, closeModal] = useModal(false)

    const onSubmit: SubmitHandler<ReqFormInputs> = data => {
            
        fetch(`${host}/Requirement/Create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    };

    return (
        <>
            <div className="req-wrap">
                <Search/>
                <ButtonWithIcon icon={addIcon} title={'Добавить требование'} alt={'Добавить'} handleClick={openModal}/>
                <ButtonWithIcon icon={delIcon} title={'Удалить требование'} alt={'Удалить'}/>
                <RequirementsList />
            </div>
            <Modal open={open} hanleClose={closeModal}>
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
            </Modal>
        </>
    );
};

export default RequirementsPage;