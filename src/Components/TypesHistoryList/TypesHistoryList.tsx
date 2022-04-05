import React, {FC, useEffect} from 'react';
import './TypesHistoryList.scss';
import TypesHistoryItem from "./TypesHistoryItem/TypesHistoryItem";

interface TypesHistoryListProps {
    history: {
        title: string,
        func: () => void
    }[]
    deleteLastElem: () => void
}

const TypesHistoryList: FC<TypesHistoryListProps> = ({history, deleteLastElem}) => {

    useEffect(() => {
        const containerForHistory = document.querySelector('.typed-history-list')
        //Проверка на переполнение контейнера, если переполнен, удалить лишние элементы
        if (containerForHistory) {
            if (containerForHistory.clientWidth < containerForHistory.scrollWidth) {
                deleteLastElem()
            }
        }
    }, [deleteLastElem, history.length])

    return (
            <div className="history">
                <p>История:</p>
                <div className="typed-history-list">
                    {history.map((item) =>
                        <TypesHistoryItem key={item.title} title={item.title} addType={item.func}/>
                    )}
                </div>
            </div>
    );

};

export default React.memo(TypesHistoryList);