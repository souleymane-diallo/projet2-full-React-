import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRef, useState } from 'react';
import CardEvent from '../components/CardEvent';

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

  return (
    <div className="container">
      <div className="wrapper">
        <h2 className="my-4 text-center">
          Lister de futurs événements à Paris{' '}
        </h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="Rechercher un événement"
                ref={inputRef}
              />
            </Col>
            <Col>
              <Button variant="outline-primary" type="submit">
                Rechercher
              </Button>
            </Col>
          </Row>
        </Form>
        <hr />
        {records && (
          <>
            <h3 className="text-center">Résultats de la recherche</h3>
            <section className="d-flex flex-wrap">
              {records.length === 0 ? (
                <p className="text-center">
                  Aucun resultat pour cette recherche...
                </p>
              ) : (
                records.map((record) => <CardEvent record={record} />)
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Recherche;
