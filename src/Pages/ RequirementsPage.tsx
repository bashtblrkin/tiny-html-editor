import React, {useCallback, useContext, useEffect, useState} from 'react';
import Search from "../Components/Controls/Search/Search";
import ButtonWithIcon from "../Components/Controls/Buttons/ButtonWithIcon/ButtonWithIcon";
import RequirementsList from "../Components/RequirementsList/RequirementsList";
import addIcon from '../assets/img/add-icon.png';
import delIcon from '../assets/img/del-icon.png';
import {useModal} from "../hooks/useModal";
import Modal from "../Components/Modal/Modal";
import AddRequirementForm from "../Components/Form/AddRequirementForm";
import {useFetch} from "../hooks/fetch.hooks";
import {DocStatus, RequirementItem} from "../interfaces/interfaces";
import {host} from "../Environment";
import {ConnectionContext} from "../Context/context";

const RequirementsPage = () => {

    const [open, openModal, closeModal] = useModal(false)

    const {connection} = useContext(ConnectionContext)
    const {data, loading, error, setData} = useFetch<RequirementItem[]>(`${host}/Requirement/all`, useCallback(resp => resp.json(), []))
    const [userName, setUserName] = useState('')

    useEffect(() => {
            connection?.on('AccessDocument', (state: DocStatus, id: string) => {
                setData(prev => prev?.map((req) => {
                    if (req.id === id) {
                        console.log(id)
                        return {
                            ...req,
                            state
                        }
                    }
                    return req
                }))
            })
        return () => {
            connection?.off('AccessDocument')
        }
    }, [setData, connection])

    useEffect(() => {
        fetch(`${host}/Authorization/username`)
            .then(res => res.json())
            .then(user => setUserName(user.name))
            .catch(err => console.log(err))
    }, [])

    const handleDeleteClicked = () => {

        const deleteArr = data?.filter((req) => {
            if (req.checked) {
                return req.id
            }
            return false
        })
        fetch(`${host}/Requirement/delete`, {
            method: 'POST',
            body: JSON.stringify(deleteArr?.map((req) => req.id)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(length => setData(prev => prev?.filter(req => !req.checked)))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="req-wrap">
                <Search />
                <ButtonWithIcon icon={addIcon} title={'Добавить требование'} alt={'Добавить'} handleClick={openModal}/>
                <ButtonWithIcon icon={delIcon} title={'Удалить требование'} alt={'Удалить'} handleClick={handleDeleteClicked}/>
                <p className="control-label">Вы авторизованы как: {userName}</p>
                <RequirementsList data={data} setData={setData} loading={loading} error={error}/>
            </div>
            <Modal open={open} hanleClose={closeModal}>
                <AddRequirementForm closeModal={closeModal} setData={setData}/>
            </Modal>
        </>
    );
};

export default RequirementsPage;