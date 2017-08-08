import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import Home from './Home/Home.js';
import About from './About/About.js';
import Photography from './Photography/Photography.js';
import './App.css';

const App = () => (
  <home className="App">
    <NavHeader />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/photography" component={Photography} />
    </Switch>  
  </home>
)

const NavHeader = () => (
  <header>
    <div className="Nav-header">
      <h1 className="Title">Jonathon Yu</h1>
      <NavList />
    </div>
  </header>
)

const NavList = () => (
  <nav>
    <ul className="Nav-list">
      <li><Link to='/'>home</Link></li>
      <li><Link to='/photography'>photography</Link></li>
      <li><Link to='/about'>about</Link></li>
    </ul>
    <routes />
  </nav>
)

export default App;