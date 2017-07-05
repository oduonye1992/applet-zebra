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
/*
let handler = window.PaystackPop.setup({
    key: 'pk_test_86d32aa1nV4l1da7120ce530f0b221c3cb97cbcc',
    email: 'adegoke.taofeek@gmail.com',
    amount: 100,
    ref: Math.floor((Math.random() * 10000) + 10000001),
    metadata: {
        custom_fields: []
    },
    callback: function(response){
        alert('success. transaction ref is ' + response.reference);
    },
    onClose: function(){
        alert('window closed');
    }
});
handler.openIframe();*/

ReactDOM.render(<MainPage />, document.getElementById('root'));

//ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();
