import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Accueil from './pages/Accueil';
import Recherche from './pages/Recherche';
import Favoris from './pages/Favoris';
import Header from './components/Header/Header';
import EventDetails from './pages/EventDetails/EventDetails';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/">
          <Accueil />
        </Route>
        <Route path="/recherche">
          <Recherche />
        </Route>
        <Route path="/favoris">
          <Favoris />
        </Route>
        <Route path="/event/:id">
          <EventDetails />
        </Route>
      </Router>
    </>
  );
}

export default App;
