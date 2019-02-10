import './App.css';

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import palette from './palette';
import AppRoutes from './AppRoutes';

const Header = styled.header`
    padding: 1rem;

    user-select: none;
`;

const HeaderTitle = styled.div`
    font-size: 1.3rem;
    color: ${palette.white};
    font-weight: bold;
    opacity: 0.7;
    transition: opacity 300ms ease-in-out;

    :hover {
        opacity: 0.9;
    }
`;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header>
                    <HeaderTitle>Memdeck Reaction</HeaderTitle>
                </Header>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
