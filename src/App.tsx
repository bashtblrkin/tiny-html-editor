import React, {useState} from 'react';
import {HTMLEditor} from "./Components";
import {ListItems} from "./interfaces/interfaces";
import ThreeView from "./Components/ThreeView/ThreeView";

function App() {

    const [viewObj, setViewObj] = useState<ListItems>()

    return (
        <>
            <HTMLEditor setViewObj={setViewObj}/>
            {viewObj && <div style={{padding: '20px 10px'}}>
                <ThreeView items={viewObj}/>
            </div>}

        </>
    );
}

export default App;
