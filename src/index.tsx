import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from '@/App';
import appHistory from '@/core/history/AppHistory';
import Routes from '@/core/routes/AppRoutes';
import store from '@/core/stores';

ReactDOM.render(
  <Provider store={store}>
    <Router history={appHistory}>
      <App>
        <Routes />
      </App>
    </Router>
  </Provider>,
  document.getElementById('app')
);
