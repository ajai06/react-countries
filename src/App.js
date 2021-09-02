
import React, { Suspense } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes/routes';

import { RootContext } from './context/rootContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <RootContext>
      <BrowserRouter>
        <Suspense fallback={<div>Loading....</div>}>

          <Switch>
            {
              routes.map(route => (
                <Route key={route.path} exact path={route.path} component={route.component} />
              ))
            }
            <Redirect exact from="/" to="/home" push />

          </Switch>
        </Suspense>
      </BrowserRouter>
    </RootContext>
  );

}

export default App;
