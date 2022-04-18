import React, {useState} from 'react';
import Search from "../Components/Controls/Search/Search";
import ButtonWithIcon from "../Components/Controls/Buttons/ButtonWithIcon/ButtonWithIcon";
import RequirementsList from "../Components/RequirementsList/RequirementsList";
import addIcon from '../assets/img/add-icon.png';
import delIcon from '../assets/img/del-icon.png';
import {useModal} from "../hooks/useModal";
import Modal from "../Components/Modal/Modal";
import Form from "../Components/Form/Form";
import AddRequirementContentForm from "../Components/Form/AddRequirementContentForm/AddRequirementContentForm";

const RequirementsPage = () => {

    const [open, openModal, closeModal] = useModal(false)

    return (
        <>
            <div className="req-wrap">
                <Search/>
                <ButtonWithIcon icon={addIcon} title={'Добавить требование'} alt={'Добавить'} handleClick={openModal}/>
                <ButtonWithIcon icon={delIcon} title={'Удалить требование'} alt={'Удалить'}/>
                <RequirementsList />
            </div>
            <Modal open={open} hanleClose={closeModal}>
                <Form>
                    <AddRequirementContentForm />
                </Form>
            </Modal>
        </>
    );
};

export default RequirementsPage;