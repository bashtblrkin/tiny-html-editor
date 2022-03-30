import React, {ChangeEvent, Dispatch, FC, SetStateAction} from 'react';
import {ListItems} from "../../../interfaces/interfaces";
import './SearchInput.scss';

interface SearchInputProps {
    items: ListItems
    setItems: Dispatch<SetStateAction<ListItems>>
    setExpanded: Dispatch<SetStateAction<boolean>>
}

const SearchInput: FC<SearchInputProps> = ({items, setItems, setExpanded}) => {

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            setExpanded(true)
            setItems(filterItems(event.target.value.toLowerCase(), items))
        } else {
            setItems(items)
            setExpanded(false)
        }
    }

    const filterItems = (strSearch: string, items: ListItems): ListItems => {
        let newItems: ListItems = {}
        for (const [key, value] of Object.entries(items)) {
            const keyLowerCase = key.toLowerCase()
            if (typeof value === 'string' && keyLowerCase.startsWith(strSearch)) {
                newItems = {
                    ...newItems,
                    ['s_' + [key]]: value //Если элемент попал в поиск то ставим префикс "s_" для того, чтобы отобразить его другим цветом
                }
            }

            if (typeof value === 'object' && keyLowerCase.startsWith(strSearch)) {
                const newSubItems = filterItems(strSearch, value)
                newItems = {
                    ...newItems,
                    ['s_' + [key]]: newSubItems
                }
            } else if (typeof value === 'object') {
                const newSubItems = filterItems(strSearch, value)
                if (Object.keys(newSubItems).length !== 0) {
                    newItems = {
                        ...newItems,
                        [key]: newSubItems
                    }
                }
            }

        }
        return newItems
    }

    return (
        <input className="search-input" onChange={handleChangeInput} />
    );
};

export default SearchInput;