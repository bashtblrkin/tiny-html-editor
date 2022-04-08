import React from 'react';
import Search from "../Components/Search/Search";
import ButtonWithIcon from "../Components/Buttons/ButtonWithIcon/ButtonWithIcon";
import RequirementsList from "../Components/RequirementsList/RequirementsList";
import addIcon from '../assets/img/add-icon.png';
import delIcon from '../assets/img/del-icon.png';

const RequirementsPage = () => {
    return (
        <div className="req-wrap">
            <Search/>
            <ButtonWithIcon icon={addIcon} title={'Добавить требование'} alt={'Добавить'}/>
            <ButtonWithIcon icon={delIcon} title={'Удалить требование'} alt={'Удалить'}/>
            <RequirementsList/>
        </div>
    );
};

export default RequirementsPage;