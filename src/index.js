import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
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
import i18n from './scripts/i18n';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ThemeProvider>
      <CSSReset />
        <CookiesProvider>
          <Provider store={createStoreWithMiddleware(reducers)}>
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
    </ThemeProvider>
  </I18nextProvider>,
  document.getElementById('root')
);
