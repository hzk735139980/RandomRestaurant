import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import 'weui';
import 'react-weui/build/packages/react-weui.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
