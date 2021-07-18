import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EventDetails.css';
import ButtonFavoris from '../../components/ButtonFavoris';

function EventDetails() {
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
  }, [id]);

  return (
    <div className="container">
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
                      __html: event.record.fields.description.substring(0, 400),
                    }}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-4 wrapperDetail">
                <ButtonFavoris recordDataCard={event} />

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
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-telephone"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                  </span>
                  <Link className="Link">
                    {event.record.fields.access_phone}
                  </Link>
                </p>
                <p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                    </svg>
                  </span>
                  <Link className="Link">
                    {event.record.fields.access_mail}
                  </Link>
                </p>
                <p>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-facebook"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </span>
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
