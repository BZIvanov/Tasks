import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Summary, Daily, Category, Detailed } from './components/pages';
import { Header } from './components/organisms';
import * as constants from './constants';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Switch>
        <Route path={constants.ROOT_PATH} exact component={Summary} />
        <Route path={constants.WEBSITE_DAILY_PATH} component={Daily} />
        <Route path={constants.WEBSITE_CATEGORIES_PATH} component={Category} />
        <Route path={constants.INVALID_ENTITIES_PATH} component={Detailed} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
