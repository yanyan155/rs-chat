import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent';
import wsAPI from './wsAPI';

wsAPI.init();

ReactDOM.render(<AppComponent />, document.getElementById('root'));
