import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Editor as TinyMCEEditor} from 'tinymce';
import {ListItems} from '../../../interfaces/interfaces';
import List from "../List/List";
import SearchInput from "../SearchInput/SearchInput";
import {pasteNewContent} from "../../../services/dom.service";
import {validateDataHistory} from "../../../services/saveData.service";

interface AutocompleteTypeProps {
    editor: TinyMCEEditor | null
    setOpenDropDown: Dispatch<SetStateAction<boolean>>
    addHistoryItem: Dispatch<SetStateAction<{ title: string, func: () => void }[]>>
}

const initialState: ListItems = {
    'Подкарантинный объект': 'Подкарантинный объект',
    'Упаковка': {
        'Маркировка': 'Маркировка',
        'Условия': 'Условия',
        'Требования': {
            'Требования к экспорту': 'Экспорт',
            'Требования к импорту': 'Импорт'
        }
    }
}

const AutocompleteType: FC<AutocompleteTypeProps> = ({editor, setOpenDropDown, addHistoryItem}) => {

    const [listItems, setListItems] = useState<ListItems>(initialState)
    const [expanded, setExpanded] = useState(false)

    const handleClick = (type: string) => () => {
        if (editor) {
            pasteNewContent(editor, type, setOpenDropDown)
            addHistoryItem((prev) =>
                validateDataHistory(prev, type, () => pasteNewContent(editor, type, setOpenDropDown))
            )
        }
    }

    return (
        <div style={{width: '100%'}}>
            <SearchInput items={initialState} setItems={setListItems} setExpanded={setExpanded}/>
            <List items={listItems} expanded={expanded} handleClick={handleClick}/>
        </div>
    );
};

export default AutocompleteType;