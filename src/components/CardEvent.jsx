import { Card } from 'react-bootstrap';
import './CardEvent.css';
import DayJS from 'react-dayjs';
import ButtonFavoris from './ButtonFavoris';

function CardEvent(props) {
  const recordDataCard = props.recordData;
  console.log('recordDataCard', recordDataCard);
  /**
   *  Ajouter un Evenement en favoris
   */

  return (
    <>
      {recordDataCard && (
        <Card
          className="image-container shadow"
          style={{ width: '18rem' }}
          key={recordDataCard.record.id}
        >
          <ButtonFavoris recordDataCard={recordDataCard} />
          <Card.Img
            variant="top"
            src={recordDataCard.record.fields.cover_url}
            alt={recordDataCard.record.fields.cover_alt}
          />

          <Card.Body>
            <Card.Title>{recordDataCard.record.fields.title}</Card.Title>
            <Card.Text>
              <DayJS format="DD/MM/YYYY à hh:mm:ss">
                {recordDataCard.record.fields.date_start}
              </DayJS>
            </Card.Text>
            <Card.Text>{recordDataCard.record.fields.lead_text}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Card.Link
              href={`event/${recordDataCard.record.id}`}
              style={{ textDecoration: 'none' }}
            >
              {' '}
              En savoir plus...
            </Card.Link>
          </Card.Footer>
        </Card>
      )}
    </>
  );
}

export default CardEvent;
