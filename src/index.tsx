import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './index.css';
import App from './App';
import * as signalR from '@microsoft/signalr'
import {ConnectionContext} from "./Context/context";
import {host} from "./Environment";

let serverConnectionID = ''

let connection = new signalR.HubConnectionBuilder()
    .withUrl(`${host}/requirements/access`)
    .build();

connection.start()
    .then(() => {
        console.log('connected')
        console.log('MyConnectionID', connection?.connectionId)
        connection.invoke('GetConnectionId')
            .then((id) => {
                console.log('ServerConnectionID', id)
                serverConnectionID = id
            })
    })

const Main = () => {

    return (
        <React.StrictMode>
            <BrowserRouter>
                <ConnectionContext.Provider value={{connection: connection, connID: serverConnectionID}}>
                    <App/>
                </ConnectionContext.Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
