import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App_course_section_4 from './course-sections/section-4/App';
import App_course_section_x from './course-sections/section-x/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    	<nav style={{border: '1px solid black'}}>
        <ul>
          <li style={{border: '1px solid grey'}}>
            <p><b>Course section title:</b></p>
            <p>Abschnitt 4:Data Fetching with Hooks / Replacing
Class Lifecycle Methods (useEffect, useRef)</p>
            <p><b>Course section result:</b></p>
            <Link to="/section-4">Section 4</Link>
          </li>
          <li style={{border: '1px solid grey'}}>
            <Link to="/section-x">Section X</Link>
          </li>
        </ul>
    	</nav>
      <Switch>
        <Route path="/section-4">
          <App_course_section_4 />
        </Route>
        <Route path="/section-x">
          <App_course_section_x />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
