import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store/reducer'
import routes from './route/index'
import history from './route/history'
import 'minireset.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        {
          routes.map(route => {
            return (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            )
          })
        }
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);