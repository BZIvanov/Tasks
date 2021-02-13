import React, { useReducer } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Signup, Signin, AddMovie } from './components/pages';
import { Header, Signout } from './components/organisms';
import { GlobalStyles, PrivateRoute } from './components/atoms';
import { UserContext } from './context/user-context';
import { reducer, initialState } from './context/user-reducer';

const App = () => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={{ user, dispatch }}>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/movie/add" component={AddMovie} />
          <Route path="/signout" component={Signout} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
