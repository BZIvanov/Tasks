import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Home } from './components/pages';
import * as constants from './constants';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />]
      <Switch>
        <Route path={constants.ROOT_PATH} exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
