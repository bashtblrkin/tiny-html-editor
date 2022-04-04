import React, {FC} from 'react';
import './TypesHistoryItem.scss';

interface TypesHistoryItemProps {
    title: string
}

const TypesHistoryItem: FC<TypesHistoryItemProps> = ({title}) => {
    return (
        <div className="typed-history-item">
            {title}
        </div>
    );
};

export default TypesHistoryItem;