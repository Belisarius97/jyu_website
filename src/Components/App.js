import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { RouteTransition } from 'react-router-transition';
import spring from 'react-motion/lib/spring'
import Home from './Home/Home.js';
import About from './About/About.js';
import Photography from './Photography/Photography.js';
import './App.css';

const App = () => (
  <home className="App">
    <NavHeader />
    <Route render={({location, history, match}) => {
      return (
        <RouteTransition  
          pathname={location.pathname} 
          atEnter={{ scale: 0.8, opacity: 0,}}
          atLeave={{ scale: spring(0.8, 330, 15), opacity: spring(0, 330, 15)}}
          atActive={{ scale: spring(1), opacity: 1}}
          mapStyles={styles => ({opacity: styles.opacity, transform: `scale(${styles.scale})`, })}          
        >
          <Switch key = {location.key} location={location}>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/photography" component={Photography} />
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
      <li><Link to='/'>home</Link></li>
      <li><Link to='/photography'>photography</Link></li>
      <li><Link to='/about'>about</Link></li>
    </ul>
    <routes />
  </nav>
)

export default App;