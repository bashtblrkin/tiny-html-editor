import React, {FC, useMemo} from 'react';
import './DefaultListItem.scss';
import cn from "classnames";
import {useSearchedType} from "../../../../hooks/useSearchedType";

interface DefaultListItemProps {
    type: string
    handleClick: (type: string) => () => void
    valueForLabel: string
    paddingTitle?: number
}

const DefaultListItem: FC<DefaultListItemProps> = ({type, handleClick, valueForLabel, paddingTitle}) => {

    const [checkIsSearch, convertTypeIfSearched] = useSearchedType(type)

    return (
        <div className={cn("default-list-item", {"searched": checkIsSearch})} onClick={handleClick(valueForLabel)}>
            <p style={{marginLeft: paddingTitle}}>{convertTypeIfSearched}</p>
        </div>
    );

};

export default DefaultListItem;