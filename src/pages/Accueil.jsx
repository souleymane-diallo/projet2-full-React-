import { useEffect, useState } from 'react';
import DATA from '../_data/que-faire-a-paris-.json';
import { Card } from 'react-bootstrap';

function Accueil(props) {
  const FavoritesComponent = props.favoriteComponent;
  const [record, setRecord] = useState(null);

  useEffect(() => {
    setRecord(DATA[0]);
  }, []);
  return (
    <div className="container">
      <h2 className="my-5">Bienvenue sur Paris Event</h2>
      <p>
        L'application qui permet de rechercher en direct les prochains
        événements Parisiens
      </p>
      <hr />

      <h3>Actualité</h3>
      <p>Le dernier publier</p>
      {record && (
        <Card className="image-container" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={record.fields.cover_url} />
          <Card.Body>
            <Card.Title>{record.fields.title}</Card.Title>
            <p>{record.fields.date_start}</p>
            <Card.Text>{record.fields.lead_text}</Card.Text>
          </Card.Body>
          <div className="overlay">
            <FavoritesComponent />
          </div>
        </Card>
      )}
    </div>
  );
}

export default Accueil;
