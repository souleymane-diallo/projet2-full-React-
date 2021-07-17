import { Form, Button, Card } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DayJS from 'react-dayjs';

function Recherche() {
  const inputRef = useRef();
  const [records, setRecords] = useState(null);

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

  // ajout d'un événement en favoris dans localStorage
  const [favorites, setFavorites] = useState(null);
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

  const addFavoriteEvent = (event) => {
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
                    className="Link"
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
                        <p>
                          <DayJS format="DD / MM / YYYY à hh : mm : ss">
                            {record.record.fields.date_start}
                          </DayJS>
                        </p>
                        <Card.Text
                          dangerouslySetInnerHTML={{
                            __html: record.record.fields.description.substring(
                              0,
                              120
                            ),
                          }}
                        />
                      </Card.Body>
                      <div className="p-3" onClick={addFavoriteEvent}>
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
