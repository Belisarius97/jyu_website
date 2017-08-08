import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App.js';
// import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
    document.getElementById('root')
    );
registerServiceWorker();

    // <div>
    //   <h1> Look a placeholder </h1>
    //     <ul className="navlist">
    //       <li><Link to='/'>home</Link></li>
    //       <li>photography</li>
    //       <li><Link to='/about'>about</Link></li>
    //     </ul>
    //     <switch>
    //       <Route exact path='/' component={Home}/>
    //       <Route path='/about' component={About}/>
    //     </switch>
    //   </div>
