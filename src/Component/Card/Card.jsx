import { Link } from "react-router-dom";

const Card = ({ id, name, price, image }) => {
  return (
    <Link to={`/product/${id}`} className="card-link">
      <div className="card">
        
        {/* IMAGE */}
        <div className="card-img">
          <img src={image} alt={name} />
        </div>

        {/* INFO */}
        <div className="card-info">
          <p className="card-name">{name}</p>
          <p className="card-price">ksh{price}</p>
        </div>

      </div>
    </Link>
  );
};

export default Card;
