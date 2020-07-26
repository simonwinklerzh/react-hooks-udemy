import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  withRouter,
  RouteComponentProps
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

interface iCourseSectionNavigationEntry {
  link: string;
  title: string;
  subTitle?: string;
  text: { __html: string; };
  navLinkText: string;
}

const CourseSectionNavigationEntry: React.FC<RouteComponentProps & iCourseSectionNavigationEntry> = (props) => {
  const isActive = props.link === props.location.pathname;
  return (
    <Card
      className={`coursesectionnavigationentry ${ isActive ? 'coursesectionnavigationentry--active' : '' }`}
      style={{ opacity: isActive ? '1': '0.9' }}>
      {/* Add a small triangle on the bottom center of the active entry */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .coursesectionnavigationentry:not(.coursesectionnavigationentry--active):hover {
          opacity: 0.95 !important;
        }
        .coursesectionnavigationentry--active::after {
          content: '';
          display: block;
          width: 15px;
          height: 15px;
          margin-left: -7.5px;
          margin-bottom: -7.5px;
          bottom: 0;
          left: 50%;
          position: absolute;
          transform: rotate(45deg);
          background-color: white;
        }
        `
      }}></style>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        { props.subTitle
          ? <Card.Subtitle className="mb-2 text-muted">{props.subTitle}</Card.Subtitle>
          : null
        }
        <Card.Text>
          <span dangerouslySetInnerHTML={props.text}></span>
        </Card.Text>
        <NavLink activeStyle={{ display: 'none' }} to={props.link}>Show result</NavLink>
      </Card.Body>
    </Card>
  );
};

const CourseSectionNavigationEntryWithRouter = withRouter(CourseSectionNavigationEntry);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="layout__nav-container">
        <Container fluid>
          <CardGroup>
            <Card bg="dark" text="light">
              <Card.Body>
                <Card.Title>Course: React Hooks on Udemy</Card.Title>
                <Card.Text>
                  I took the course <b>React Hooks</b> on Udemy. Here are my results for some of the courses sections.
                </Card.Text>
              </Card.Body>
            </Card>
            <CourseSectionNavigationEntryWithRouter
              link="/section-4"
              title="Section 4"
              subTitle="Search on Hacker News"
              text={{
                __html: '<small><b>Course description:</b><br />Data Fetching with Hooks / Replacing Class Lifecycle Methods (useEffect, useRef)</small>'
              }}
              navLinkText="Show Result" />
            <CourseSectionNavigationEntryWithRouter
              link="/section-x"
              title="Section 5"
              subTitle="Building a complete CRUD App"
              text={{
                __html: '<small><b>Course description:</b><br />Building a Complete CRUD App with React Hooks / Replacing Redux</small>'
              }}
              navLinkText="Show Result" />
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
