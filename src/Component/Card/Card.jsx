import "./Card.css";

const Card = ({ name, price, image }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-info">
        <p className="card-name">{name}</p>
        <p className="card-price">${price}</p>
      </div>
    </div>
  );
};

export default Card;
