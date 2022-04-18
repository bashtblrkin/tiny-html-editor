import {useState} from "react";

export const useModal = (state: boolean): [open: boolean, openModal: () => void, closeModal: () => void] => {

    const [open, setOpen] = useState(state)

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    return [open, openModal, closeModal]
}