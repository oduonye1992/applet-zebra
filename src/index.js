import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainPage from './tabs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from "react-tap-event-plugin";
import Promise from 'promise-polyfill';

require('onsenui/css/onsenui.css');
injectTapEventPlugin();
if (!window.Promise) {
    window.Promise = Promise;
}


ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();
