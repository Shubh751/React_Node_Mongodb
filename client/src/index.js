import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import store from './store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
        <Provider store={store}>
            <Login/>
        </Provider>, 
        document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
