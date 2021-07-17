import { useEffect, useState } from 'react';
// import DATA from '../_data/que-faire-a-paris-.json';
import { Card } from 'react-bootstrap';
// import Moment from 'moment';
import DayJS from 'react-dayjs';
import { Link } from 'react-router-dom';

function Accueil() {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetch(
      'https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?sort=-date_start&rows=1'
    )
      .then((res) => res.json())
      .then((result) => {
        setRecord(result.records[0]);
      });
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <h2 className="my-3">Bienvenue sur Paris Event</h2>
        <p>
          L'application qui permet de rechercher en direct les prochains
          événements Parisiens
        </p>
        <hr />

        <h3>Actualité</h3>
        <p>Le dernier événement publier : </p>
        {/* <pre>{JSON.stringify(record, null, 2)}</pre> */}
        {record && (
          <Link className="Link" to={`event/${record.record.id}`}>
            <Card
              className="image-container"
              style={{ width: '18rem' }}
              to={`event/${record.record.id}`}
            >
              <Card.Img variant="top" src={record.record.fields.cover_url} />
              <Card.Body>
                <Card.Title>{record.record.fields.title}</Card.Title>
                <p>
                  <DayJS format="DD / MM / YYYY à hh : mm : ss">
                    {record.record.fields.date_start}
                  </DayJS>
                </p>
                <Card.Text>{record.record.fields.lead_text}</Card.Text>
              </Card.Body>
              <div className="p-3">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-heart-fill"
                  fill="red"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </div>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Accueil;
