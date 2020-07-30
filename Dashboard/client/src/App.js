import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Home } from './components/pages';
import { Details } from './components/organisms';
import { Header } from './components/organisms';
import * as constants from './constants';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Switch>
        <Route path={constants.ROOT_PATH} exact component={Home} />
        <Route
          path={constants.INVALID_ENTITIES_PATH}
          exact
          component={Details}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
