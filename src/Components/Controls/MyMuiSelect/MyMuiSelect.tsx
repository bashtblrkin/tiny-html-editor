import React, {ChangeEvent, CSSProperties, FC} from 'react';
import {MuiCustomInput} from "../../../shared/MySelectedComponents";
import {Select, SelectChangeEvent} from "@mui/material";

interface SelectProps {
    style?: CSSProperties
}

const MyMuiSelect: FC<SelectProps> = ({style, children}) => {

    const [agree, setAgree] = React.useState('10');

    const handleChange = (event: SelectChangeEvent) => {
        setAgree(event.target.value);
    };

    return (
        <Select
            style={style}
            onChange={handleChange}
            value={agree}
            variant={'outlined'}
            input={<MuiCustomInput />}
        >
            {children}
        </Select>
    );
};

export default MyMuiSelect;