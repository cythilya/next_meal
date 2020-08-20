import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import promise from 'redux-promise';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { CookiesProvider } from 'react-cookie';
import './styles/index.scss';
import Index from './containers/index';
import Store from './containers/store';
import Fav from './containers/fav';
import Tag from './containers/tag';
import reducers from './reducers';

// dev start
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
const enhancer = composeEnhancers(applyMiddleware(promise));
const store = createStore(reducers, enhancer);
// dev end

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
      <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/tag/:keyword" component={Tag} />
                <Route path="/store/:id" component={Store} />
                <Route path="/fav/" component={Fav} />
                <Route path="/" component={Index} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
