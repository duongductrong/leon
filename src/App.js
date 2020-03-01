import React from 'react';
import RootRouter from './Router/RootRouter';
import UserInterface from './components/layouts/commons/UserInterface';

//test
import {
  BrowserRouter as Router
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="App">
            <UserInterface>
              <RootRouter />
            </UserInterface>
          </div>
        </Router>
    );
  }
}

export default App;