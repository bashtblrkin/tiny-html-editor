import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {Editor as TinyMCEEditor} from 'tinymce';
import {ListItems} from '../../../interfaces/interfaces';
import List from "../List/List";
import SearchInput from "../SearchInput/SearchInput";

interface AutocompleteTypeProps {
    editor: TinyMCEEditor | null
    setOpenDropDown: Dispatch<SetStateAction<boolean>>
    addHistoryItem: Dispatch<SetStateAction<Set<{ title: string, func: () => void }>>>
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
            const node = editor.selection.getContent()
            const styleForSpan = `
                display: inline;
                position: absolute;
                right: 0;
                top: -15px;
                text-indent: 0;
                font-size: 12px;
                font-weight: 300;           
                white-space: nowrap;
            `
            const innerHTML = `${node}<span style="${styleForSpan}" class="__typed_span__">${type}</span>`
            editor.selection.setNode(editor.dom.create('div', {
                style: `position: relative;
                    display: inline;
                    border: 2px solid #cce2fa;
                    padding: 2px;
                    border-radius: 3px;`,
                class: "__typed__"
            }, innerHTML))
            setOpenDropDown(false)
            addHistoryItem(prev => new Set(prev).add({
                title: type,
                func: () => {console.log('Work')}
            }))
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