import React, {ChangeEvent, FC} from 'react';

import './UploadFileBtn.scss'

interface UploadFileBtnProps {
    id: string
    imgSrc: string;
    alt: string;
    onChange: (formData: FormData) => void
}

const UploadFileBtn: FC<UploadFileBtnProps> = ({id,imgSrc, alt, onChange}) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        const formData = new FormData()
        if (!event.target.files) return

        let file = event.target.files[0];
        formData.append("docx", file)
        formData.entries()
        onChange(formData)
    }


    return (
        <>
            <label htmlFor={id+'upload'} >
                <input id={id+'upload'} type="file" onChange={handleChange} accept=".doc, .docx"/>
                <img src={imgSrc} alt={alt} className="button-img"/>
            </label>
        </>
    );
};

export default UploadFileBtn;