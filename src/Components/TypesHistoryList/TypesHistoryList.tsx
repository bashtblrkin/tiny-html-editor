import React, {FC, useEffect} from 'react';
import './TypesHistoryList.scss';
import TypesHistoryItem from "./TypesHistoryItem/TypesHistoryItem";

interface TypesHistoryListProps {
    history: Set<{
        title: string,
        func: () => void
    }>
}

const TypesHistoryList: FC<TypesHistoryListProps> = ({history}) => {

    return (
        <div className="typed-history-list">
            {Array.from(history).map((item) =>
                <TypesHistoryItem title={item.title} key={item.title}/>
            )}
        </div>
    );

};

export default React.memo(TypesHistoryList);