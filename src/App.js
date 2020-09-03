import React from 'react';
import GlobalStyle from "./theme";
import {BrowserRouter} from "react-router-dom";
import Container from "./components/Container";
import Navbar from "./components/Navbar";

const App = () => (
    <BrowserRouter>
        <GlobalStyle/>
        <Navbar/>
        <Container/>
    </BrowserRouter>
);

export default App;
