import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdCall, MdEmail } from 'react-icons/md';
import './EventDetails.css';
// import DayJs from 'react-dayjs';
// import DATA from '../_data/que-faire-a-paris-.json';

function EventDetails(props) {
  const params = useParams();
  const id = params.id;

  const [event, setEvent] = useState(null);
  useEffect(() => {
    fetch(
      `https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`
    )
      .then((res) => res.json())
      .then((result) => {
        setEvent(result);
      });
    // setEvent(DATA.filter((d) => d.recordid === id)[0]);
  }, [id]);

  return (
    <div className="container">
      {/* <pre>{JSON.stringify(event, null, 2)}</pre> */}
      {event && (
        <>
          <div className="wrapper">
            <div className="wrapperTitle">
              <h2 className="eventTitle my-3">{event.record.fields.title}</h2>
              <p className="eventName mb-2">
                {event.record.fields.contact_name}
              </p>
              <hr />
            </div>
            <div className=" row d-flex">
              <div className="col-12 col-lg-8  wrapperCover">
                <div className="coverEven">
                  <img
                    src={event.record.fields.cover_url}
                    alt={event.record.fields.cover_alt}
                  />
                </div>

                <div className="descriptionEven">
                  <h3>{event.record.fields.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: event.record.fields.description,
                    }}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-4 wrapperDetail">
                <h3>Date : </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: event.record.fields.date_description,
                  }}
                />
                <h3>Prix : </h3>
                <p>{event.record.fields.price_detail}</p>
                <h3>S'y rendre :</h3>
                <p>{event.record.fields.address_street}</p>
                <p>
                  {event.record.fields.address_city}{' '}
                  {event.record.fields.address_zipcode}
                </p>
                <h3>En transports :</h3>
                <p>{event.record.fields.transport}</p>
                <h3>Plus infos :</h3>
                <p>
                  <MdCall />
                  <Link className="Link">
                    {event.record.fields.access_phone}
                  </Link>
                </p>
                <p>
                  <MdEmail />
                  <Link className="Link">
                    {event.record.fields.access_mail}
                  </Link>
                </p>
                <p>
                  <Link className="Link">
                    {event.record.fields.contact_facebook}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EventDetails;
