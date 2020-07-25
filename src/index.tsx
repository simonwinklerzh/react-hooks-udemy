import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {
  Card,
  CardGroup,
  Container
 } from 'react-bootstrap';
import AppCourseSection4 from './course-sections/section-4/App';
import AppCourseSectionX from './course-sections/section-x/App';
import * as serviceWorker from './serviceWorker';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="layout__nav-container">
        <Container fluid>
          <CardGroup>
            <Card bg="light">
              <Card.Body>
                <Card.Title>Section 4</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Section title:</Card.Subtitle>
                <Card.Text>
                  <small>Abschnitt 4: Data Fetching with Hooks / Replacing Class Lifecycle Methods (useEffect, useRef)</small>
                </Card.Text>
                <Link to="/section-4">Show result</Link>
              </Card.Body>
            </Card>
            <Card bg="light">
              <Card.Body>
                <Card.Title>Section 5</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Section title:</Card.Subtitle>
                <Card.Text>
                  <small>Abschnitt 5: Building a Complete CRUD App with React Hooks / Replacing Redux</small>
                </Card.Text>
                <Link to="/section-x">Show result</Link>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container>
      </div>
      <Switch>
        <Route path="/section-4">
          <AppCourseSection4 />
        </Route>
        <Route path="/section-x">
          <AppCourseSectionX />
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
