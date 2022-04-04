import React, {FC} from 'react';
import {ListItems} from "../../interfaces/interfaces";
import AccordionList from "./AccordionList/AccordionList";

interface ThreeViewProps {
    items: ListItems
}

const ThreeView: FC<ThreeViewProps> = ({items}) => {

    const three = Object.keys(items).map((key, i) => {
        if (typeof items[key] === 'string') {
            return <AccordionList title={key} detail={items[key] as string} key={key}/>
        }
        if (typeof items[key] === 'object') {
            return <AccordionList title={key} detail={<ThreeView items={items[key] as ListItems}/>} key={key}/>
        }
    })

    return (
        <div>
            {three}
        </div>
    );
};

export default ThreeView;