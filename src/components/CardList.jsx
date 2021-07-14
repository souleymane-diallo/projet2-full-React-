import { Card, Button } from 'react-bootstrap';
import DayJS from 'react-dayjs';
const CardList = (props) => {
  return (
    <>
      {props.datas.map((data, index) => (
        <div className="my-2" key={index}>
          {console.log(data.record.fields)}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.record.fields.cover_url} />
            <Card.Body>
              <Card.Title>{data.record.fields.title}</Card.Title>
              <p>{data.record.fields.date_start}</p>
              <Card.Text>{data.record.fields.lead_text}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
};

export default CardList;
