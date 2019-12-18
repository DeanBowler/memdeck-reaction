import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

if (process.env.REACT_APP_LOGROCKET_KEY) {
  LogRocket.init(`${process.env.REACT_APP_LOGROCKET_KEY}/memdeck-reaction`);
  setupLogRocketReact(LogRocket);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
