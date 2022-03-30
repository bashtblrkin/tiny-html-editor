import React, {FC} from 'react';
import {ClickAwayListener} from "@mui/material";

interface DropDownWrapperProps {
    position: { x: number, y: number }
    open: boolean
    renderComponent: JSX.Element | undefined
    handleClickAway: () => void
}

const DropDownWrapper: FC<DropDownWrapperProps> = ({position, open, renderComponent, handleClickAway}) => {

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div role="presentation">
                {open && <div style={{
                    width: 300,
                    border: '1px solid #cce2fa',
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                    borderRadius: '5px',
                    zIndex: 10
                }}>
                    {renderComponent && renderComponent}
                </div>}
            </div>
        </ClickAwayListener>
    );
};

export default DropDownWrapper;