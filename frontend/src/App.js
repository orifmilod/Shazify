import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';

import theme from './Theme';
import { ThemeProvider } from 'styled-components';
import './App.css';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Login} />
            <ProtectedRoute path='/home' render={Home} />
            <Redirect to='/' />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}