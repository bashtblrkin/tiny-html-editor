import React, {FC, useEffect, useMemo, useState} from 'react';
import cn from 'classnames';
import './ExpandListItem.scss';
import {useSearchedType} from "../../../../hooks/useSearchedType";

interface ExpandListItemProps {
    nameGroup: string
    expanded: boolean
    paddingTitle?: number
}

const ExpandListItem: FC<ExpandListItemProps> = ({nameGroup, expanded, children, paddingTitle}) => {

    const [open, setOpen] = useState(false)
    const [checkIsSearch, convertTypeIfSearched] = useSearchedType(nameGroup)

    const handleClick = () => {
        setOpen(prev => !prev)
    }

    useEffect(() => {
            setOpen(expanded)
    }, [expanded])

    return (
        <>
            <div className={cn("expand-list-item", {"open": open, "close": !open}, {"searched": checkIsSearch})} onClick={handleClick}>
                <p style={{marginLeft: paddingTitle}}>{convertTypeIfSearched}</p>
            </div>
            <div>
                {open && children}
            </div>
        </>
    );
};

export default ExpandListItem;