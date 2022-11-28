import Row from 'react-bootstrap/Row';
import { capitalizeFirstLetter } from "../../utils/helpers"


import { truncateText } from '../../utils/helpers';
import { Rating } from '../Rating';
import { Link } from 'react-router-dom';

export const UserProjectCard = ({ itm }) => {
  return (
     <div
      key={itm._id}
      className="isotope-item col-md-6 mb-5 mobileapp frontend">
      <div className="card project-card">
        <Row>
          <div className="col-12 col-xl-5 card-img-holder">
            <img src={`${itm.image}`} className="card-img" alt="image" />
          </div>
          <div className="col-12 col-xl-7">
            <div className="card-body">
              <h5
                className="card-title"
              >
                <Link
                  to={`/project/${itm.slug}`}
                  className="theme-link"
                  state={{ id: itm._id }}
                >
                  {itm.title}
                </Link>
              </h5>
              <p className="card-text">{truncateText(itm.description, 20)}</p>
              <p className="card-text">
                {
                  itm.language.map((itm) => (
                    <>
                      {capitalizeFirstLetter(itm)}{' '}
                    </>
                  ))
                }
              </p>
              <div className="row">
                <div className="col-md-3">
                  <span className="btn btn-primary">Edit</span>
                </div>
                <div className="col-md-3">
                  <span className="btn btn-danger">Delete</span>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </div>
  )
}