import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-thunk';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { CookiesProvider } from 'react-cookie';
import './styles/index.scss';
import App from './containers/index';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
      <CookiesProvider>
        <Provider store={createStoreWithMiddleware(reducers)}>
          <BrowserRouter>
            <div>
              <Switch>
                <Route path="/tag/:keyword" component={App} />
                <Route path="/store/:id" component={App} />
                <Route path="/fav/" component={App} />
                <Route path="/" component={App} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
  </ThemeProvider>,
  document.getElementById('root')
);


