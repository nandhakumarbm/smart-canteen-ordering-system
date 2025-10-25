import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes/AppRoutes';

const AppWrapper = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
