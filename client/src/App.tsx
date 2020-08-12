import React from 'react';
import './App.css';
import AdminPanel from './components/AdminPanel';
import Container from 'react-bootstrap/Container';
import Game from './components/Game';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Container>
        <Switch>
          <Route path='/' exact  component={Game} />
          <Route path='/dashboard' component={AdminPanel} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
