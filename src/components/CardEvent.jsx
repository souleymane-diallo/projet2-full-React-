import { Card } from 'react-bootstrap';
import { useState } from 'react';
import DayJS from 'react-dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function CardEvent(props) {
  const [save, setSave] = useState(false);
  const record = props.record;
  /**
   *  Ajouter un Evenement en favoris
   */
  const handleAddFavoriteEvent = (data) => {
    setSave(true);
    // pusher un event dans le localStorage
    if (localStorage.getItem('Eventfavorites')) {
      const saveEvent = JSON.parse(localStorage.getItem('Eventfavorites'));
      saveEvent.push(record);
    } else {
      localStorage.setItem('Eventfavorites', JSON.stringify([data]));
    }
  };
  /**
   * rettirer un event du favoris
   */
  const handleDeleteFavoriteEvent = (data) => {
    const saveEvent = JSON.parse(localStorage.getItem('Eventfavorites'));
    const deleteEvent = saveEvent.filter(
      (record) => record.id !== data.record.id
    );
    localStorage.setItem('Eventfavorites', JSON.stringify([deleteEvent]));
    setSave(false);
  };
  return (
    <>
      <Card
        className="image-container"
        style={{ width: '18rem' }}
        key={record.record.id}
      >
        <Card.Img
          variant="top"
          src={record.record.fields.cover_url}
          alt={record.record.fields.cover_alt}
        />
        {save ? (
          <FontAwesomeIcon
            icon={faCoffee}
            className="icon-heart-solid"
            onClick={() => handleAddFavoriteEvent(record)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCoffee}
            onClick={() => handleDeleteFavoriteEvent(record)}
          />
        )}
        <Card.Body>
          <Card.Title>{record.record.fields.title}</Card.Title>
          <Card.Text>
            <DayJS format="DD/MM/YYYY à hh:mm:ss">
              {record.record.fields.date_start}
            </DayJS>
          </Card.Text>
          <Card.Text>{record.record.fields.lead_text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Link
            href={`event/${record.record.id}`}
            style={{ textDecoration: 'none' }}
          >
            {' '}
            En savoir plus...
          </Card.Link>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardEvent;
