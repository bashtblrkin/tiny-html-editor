import {styled} from "@mui/material/styles";
import InputBase from '@mui/material/InputBase';
import {MenuItemProps, MenuItem} from '@mui/material'

export const MuiCustomInput = styled(InputBase)(() => ({
    '& .MuiInputBase-input': {
        background: 'transparent',
        outline: 'none',
        border: '1px solid #C4C4C4',
        padding: '5px 0px 5px 15px',
        borderRadius: '10px',
        height: '27px',
        fontFamily: ['MontserratMedium'],
        fontSize: '16px',
        color: '#05396B',
        transition: 'border-color 0.2s ease',
        '&:focus': {
            borderColor: '#8DE4AF',
            borderRadius: '10px',
        }
    }
}))

export const MuiCustomMenuItem = styled((props: MenuItemProps) => (
    <MenuItem  {...props}/>
))`
    :hover {
      background-color: #EDF5E1
    }
  &.Mui-selected {
    background-color: #8DE4AF;
    &:hover {
      background-color: #EDF5E1
    }
    &:focus {
      background-color: #8DE4AF;
    }
  }
`;