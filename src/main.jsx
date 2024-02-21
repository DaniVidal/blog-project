import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { Posts } from './pages/Posts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/post/:slug">
          <Post />
        </Route>
        {/* <Route path="*">
          <Home />
        </Route> */}
        <Route exact path="/posts">
          <Posts />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
)