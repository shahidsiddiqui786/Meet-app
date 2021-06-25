import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import join from './components/Join/Join';
import chat from './components/Chat/Chat';
import { ThemeProvider } from './components/Provider/ThemeContext';

const App = () => (
    <Router>
        <ThemeProvider>
            <Route path="/" exact component={join} />
            <Route path="/chat" component={chat} />
        </ThemeProvider> 
    </Router>
);

export default App;