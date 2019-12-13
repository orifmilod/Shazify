import React from 'react';
import ProtectedRoute from './routes/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

import theme from './Theme';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from 'styled-components';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

export default function App() {
  toast.configure();

  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className='App'>
            <Switch>
              <Route exact path='/' component={Login} />
              <ProtectedRoute path='/home' render={Home} />

              <Redirect to='/' />
            </Switch>
          </div>
        </ThemeProvider>
      </Provider>
    </Router>
  );
}
