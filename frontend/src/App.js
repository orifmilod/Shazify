import React from 'react'
import { toast } from 'react-toastify'
import ProtectedRoute from './routes/ProtectedRoute'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'

import theme from './Theme'
import { ThemeProvider } from 'styled-components'

import store from './store'
import { Provider } from 'react-redux'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  toast.configure()

  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute path="/home" render={Home} />

              <Redirect to="/" />
            </Switch>
          </div>
        </ThemeProvider>
      </Provider>
    </Router>
  )
}
