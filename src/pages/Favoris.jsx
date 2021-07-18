import React, { useState, useEffect } from 'react';
import CardEvent from '../components/CardEvent';

function Favoris() {
  const [favorisEvent, setFavorisEvent] = useState([]);

  /**
   * Afficher un évenement dans la page favoris
   */
  useEffect(() => {
    setFavorisEvent(JSON.parse(localStorage.getItem('Eventfavorites')));
    // console.log(favorisEvent);
  }, []);

  return (
    <section className="container">
      <div className="wrapper">
        <h2 className="my-3">Evénement Sauvegardés</h2>
        {favorisEvent && favorisEvent.length === 0 ? (
          <p>Aucun événement n'a été Sauvegardé</p>
        ) : (
          favorisEvent.map((favori) => <CardEvent recordData={favori} />)
        )}
      </div>
    </section>
  );
}

export default Favoris;
