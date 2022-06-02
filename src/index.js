import React from 'react';
import * as ReactDOMCLient from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import 'antd/dist/antd.css';

import store from './app/store';

const root = ReactDOMCLient.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
)