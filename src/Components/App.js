import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom'
import { RouteTransition } from 'react-router-transition';
import spring from 'react-motion/lib/spring'
import Home from './Home/Home.js';
import Resume from './Resume/Resume.js';
import Photography from './Photography/Photography.js';
import './App.css';

const popConfig = {stiffness: 360, damping: 25};

const App = () => (
  <home className="App">
    <NavHeader />
    <Route render={({location, history, match}) => {
      return (
        <RouteTransition  
          pathname={location.pathname} 
          atEnter={{ scale: 0.8, opacity: 0,}}
          atLeave={{ scale: spring(0.8, popConfig), opacity: spring(0, popConfig)}}
          atActive={{ scale: spring(1), opacity: 1}}
          mapStyles={styles => ({opacity: styles.opacity, transform: `scale(${styles.scale})`, })}     
          className="transition-anim"
        >  
          <Switch key = {location.key} location={location} className="temp">
            <Route exact path="/" component={Home} />
            <Route exact path="/resume" component={Resume} />
            <Route exact path="/photography" component={Photography} />
          </Switch>  
      </RouteTransition>
      );
    }} />
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
      <li><NavLink 
        to='/'
        className="nav"
        exact activeClassName="selected"
      >home</NavLink></li>
      <li><NavLink 
        to='/photography'
        className="nav"
        activeClassName="selected"
      >photography</NavLink></li>
      <li><NavLink 
        to='/resume'
        className="nav"
        activeClassName="selected"
      >resume</NavLink></li>
    </ul>
    <routes />
  </nav>
)

export default App;