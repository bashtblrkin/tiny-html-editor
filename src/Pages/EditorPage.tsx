import React, {useCallback, useState} from 'react';
import ThreeView from "../Components/ThreeView/ThreeView";
import {ListItems} from "../interfaces/interfaces";
import {HTMLEditor} from "../Components";

const EditorPage = () => {

    const [viewObj, setViewObj] = useState<ListItems>()

    const handleSetView = useCallback((items: ListItems | undefined) => {
        setViewObj(items)
    }, [])

    return (
        <div>
            <HTMLEditor setViewObj={handleSetView}/>
            {viewObj && <div style={{padding: '20px 10px'}}>
                <ThreeView items={viewObj}/>
            </div>}
        </div>
    );
};

export default EditorPage;