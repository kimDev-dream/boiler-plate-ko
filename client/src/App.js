import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>

        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
        */}
        <Switch>
          {/* exact 의 기능 -> Router가  부분적으로만 닮아도  같은거라고 인식해버림, 
          정확하게 일치하는 컴포넌트로 이동시켜 주기 위함. */}
          <Route exact path="/" component={ Auth(LandingPage, null )  } />
          <Route exact path="/login" component={ Auth(LoginPage, false) } />
          <Route exact path="/register" component={ Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

