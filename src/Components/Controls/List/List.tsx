import React, {FC, useEffect} from 'react';
import {ListItems} from "../../../interfaces/interfaces";
import DefaultListItem from "./DefaultListItem/DefaultListItem";
import ExpandListItem from "./ExpandListItem/ExpandListItem";

interface ListProps {
    items: ListItems
    expanded: boolean
    handleClick: (type: string) => () => void
}

const List: FC<ListProps> = ({items, expanded, handleClick}) => {

    let list = Object.keys(items).map((key, i) => {
        if (typeof items[key] === 'string') {
            return <DefaultListItem type={key} key={key} handleClick={handleClick} valueForLabel={items[key] as string}/>
        }
        if (typeof items[key] === 'object') {
            return <ExpandListItem nameGroup={key} key={key} expanded={expanded}>
                <List items={items[key] as ListItems} expanded={expanded} handleClick={handleClick}/>
            </ExpandListItem>
        }
        return null
    })

    return (
        <>
            {list}
        </>
    );
};

export default List;