import React, {FC} from 'react';
import './TypesHistoryItem.scss';

interface TypesHistoryItemProps {
    title: string
    addType: () => void
}

const TypesHistoryItem: FC<TypesHistoryItemProps> = ({title, addType}) => {
    return (
        <div className="typed-history-item" onClick={addType}>
            {title}
        </div>
    );
};

export default TypesHistoryItem;