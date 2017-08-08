import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home.js';
import About from './Components/About/About.js';

// const routes = [
//   { path: '/',
//     component: Home
//   },
//   { path: '/about',
//     component: About,
//   }
// ]

// // wrap <Route> and use this everywhere instead, then when
// // sub routes are added to any route it'll work
// const RouteWithSubRoutes = (route) => (
//   <Route path={route.path} render={props => (
//     // pass the sub-routes down to keep nesting
//     <route.component {...props} routes={route.routes}/>
//   )}/>
// )

// export { routes }
// export { RouteWithSubRoutes }

const routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
    </Switch>    
)
    
export default routes;
    