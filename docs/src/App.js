import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Basic from './examples/basic';
// import Fancy from './examples/extra';
// import Provider from './examples/provider';
// import Unmet from './examples/unmet';

const examples = {
  Basic,
  // Provider,
  // Unmet
};

const App = () => (
  <Router>
    <div>
      <Route exact path="/" render={() => <h1>React Layout Core Examples!</h1>} />
      <ul>
        {Object.keys(examples).map(name => (
          <li key={name}><Link to={`/${name}`}>{name}</Link></li>
        ))}
      </ul>
      {Object.keys(examples).map(name => (
        <Route
          key={`route-${name}`}
          exact
          path={`/${name}`}
          component={examples[name]}
        />
      ))}
    </div>
  </Router>
);

export default App;