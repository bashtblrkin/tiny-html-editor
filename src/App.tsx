import React, {useCallback, useEffect, useState} from 'react';
import {HTMLEditor} from "./Components";
import {ListItems} from "./interfaces/interfaces";
import ThreeView from "./Components/ThreeView/ThreeView";

function App() {

    const [viewObj, setViewObj] = useState<ListItems>()

    const handleSetView = useCallback((items: ListItems | undefined) => {
        setViewObj(items)
    }, [])

    return (
        <>
            <HTMLEditor setViewObj={handleSetView}/>
            {viewObj && <div style={{padding: '20px 10px'}}>
                <ThreeView items={viewObj}/>
            </div>}
        </>
    );
}

export default App;
