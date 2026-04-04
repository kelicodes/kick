import { Link } from "react-router-dom";
import './Card.css';

const Card = ({ id, name, price, image }) => {
  return (
    <Link to={`/product/${id}`} className="card-link">
      <div className="card">

        <div className="card-img-wrap">
          <img src={image} alt={name} />
          <div className="card-overlay">
            <span className="card-cta">View product</span>
          </div>
        </div>

        <div className="card-info">
          <p className="card-name">{name}</p>
          <p className="card-price">Ksh {Number(price).toLocaleString()}</p>
        </div>

      </div>
    </Link>
  );
};

export default Card;