import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import GamesPage from './containers/GamesPage';
import ModsPage from './containers/ModsPage';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.GAMES} component={GamesPage} />
      <Route exact path={routes.MODS} component={ModsPage} />
    </Switch>
  </App>
);
