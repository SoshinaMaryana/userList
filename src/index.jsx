import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './services/Store';
import reportWebVitals from './reportWebVitals';
import initStore from './services/Store/initStore';

initStore();
ReactDOM.render(
    <React.StrictMode>
        <Store.Provider>
            <App/>
        </Store.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
