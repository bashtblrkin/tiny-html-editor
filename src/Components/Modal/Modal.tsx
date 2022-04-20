import React, {FC} from 'react';
import Dialog from '@mui/material/Dialog';

interface ModalProps {
    open: boolean
    hanleClose: () => void
}

const Modal: FC<ModalProps> = ({open, hanleClose, children}) => {
    return (
        <Dialog open={open} onClose={hanleClose} sx={{
            padding: '20px 20px'
        }} maxWidth={'md'}>
            {children}
        </Dialog>
    );
};

export default Modal;