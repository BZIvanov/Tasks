import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Summary, Detailed } from './components/pages';
import { Header } from './components/organisms';
import * as constants from './constants';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Switch>
        <Route path={constants.ROOT_PATH} exact component={Summary} />
        <Route
          path={constants.INVALID_ENTITIES_PATH}
          exact
          component={Detailed}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
