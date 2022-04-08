import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import RequirementsPage from './Pages/ RequirementsPage';
import EditorPage from "./Pages/EditorPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="requirements" element={<RequirementsPage />}/>
                <Route path="editor" element={<EditorPage />}/>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
