import React from 'react';
import GlobalStyle from "./theme";
import {BrowserRouter} from "react-router-dom";
import Container from "./components/Container";

const App = () => (
    <BrowserRouter>
        <GlobalStyle/>
        <Container/>
    </BrowserRouter>
);

export default App;
