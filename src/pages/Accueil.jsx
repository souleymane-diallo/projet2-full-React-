import { useEffect, useState } from 'react';
import CardEvent from '../components/CardEvent';

function Accueil() {
  const [recordData, setRecord] = useState(null);

  useEffect(() => {
    fetch(
      'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?order_by=date_start%20desc&rows=1'
    )
      .then((res) => res.json())
      .then((result) => {
        setRecord(result.records[0]);
        console.log('accueil', result.records[0]);
      });
  }, []);

  return (
    <div className="container">
      <div className="wrapper text-center">
        <h2 className="my-3 text-center">Bienvenue sur Paris Event</h2>
        <p className="text-center">
          L'application qui permet de rechercher en direct les prochains
          événements Parisiens
        </p>
        <hr />

        <h3>Actualité</h3>
        <p>Le dernier événement publier : </p>

        <CardEvent recordData={recordData} />
      </div>
    </div>
  );
}

export default Accueil;
