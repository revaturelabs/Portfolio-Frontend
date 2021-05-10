import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import ProjectCard from './component/ProjectCard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProjectCard />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
