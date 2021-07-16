import { Form, Button, Card } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import DayJS from 'react-dayjs';
// import DATA from '../_data/que-faire-a-paris-.json';

function Recherche() {
  const inputRef = useRef();
  const [records, setRecords] = useState(null);
  const [favorites, setFavorites] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = inputRef.current.value;
    fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?search=${searchValue}`
    )
      .then((res) => res.json())
      .then((result) => {
        setRecords(result.records);
      });
  }
  useEffect(() => {
    const eventFavorites = JSON.parse(
      localStorage.getItem('paris-event-app-favorites')
    );
    if (eventFavorites) {
      setFavorites(eventFavorites);
    }
  }, []);

  const saveTolacalStorage = (items) => {
    localStorage.setItem('paris-event-app-favorites', JSON.stringify(items));
  };

  const AddFavoriteEvent = (event) => {
    const newFavoriteList = [...favorites, event];
    setFavorites(newFavoriteList);
    saveTolacalStorage(newFavoriteList);
  };

  const removeFavoriteEvent = (event) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.record.fields.id !== event.record.fields.id
    );
    setFavorites(newFavoriteList);
    saveTolacalStorage(newFavoriteList);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h2 className="my-4">Lister de futurs événements à Paris </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="w-75 my-4"
            type="text"
            placeholder="Rechercher un événement"
            ref={inputRef}
          />
          <Button variant="primary" className="px-5" type="submit">
            Rechercher
          </Button>
        </Form>

        <hr />

        {records && (
          <>
            <h3>Résultats de la recherche</h3>
            <section className="d-flex flex-wrap">
              {records.length === 0 ? (
                <p>Aucun resultat pour cette recherche...</p>
              ) : (
                records.map((record) => (
                  <Link
                    class="Link"
                    to={`event/${record.record.id}`}
                    key={record.record.id}
                  >
                    <Card
                      className="image-container"
                      style={{ width: '18rem' }}
                    >
                      <Card.Img
                        variant="top"
                        src={record.record.fields.cover_url}
                      />
                      <Card.Body>
                        <Card.Title>{record.record.fields.title}</Card.Title>
                        <p>{record.record.fields.date_start}</p>
                        <Card.Text>{record.record.fields.lead_text}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                ))
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Recherche;
