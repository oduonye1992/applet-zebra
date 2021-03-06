import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainPage from './tabs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from "react-tap-event-plugin";
import Promise from 'promise-polyfill';
import Settings from './config/settings';

require('onsenui/css/onsenui.css');
injectTapEventPlugin();
if (!window.Promise) {
    window.Promise = Promise;
}
document.addEventListener('deviceReady', ()=>{

});
ReactDOM.render(<MainPage />, document.getElementById('root'));

// ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();
