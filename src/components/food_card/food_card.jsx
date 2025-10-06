import "./food_card.css";

export default function FoodCard({
  image,
  shortName,
  extraName,
  rating,
  onClick,
}) {
  return (
    <div className="food-card" onClick={onClick}>
      <div className="food-image-container">
        <img src={image} alt={shortName} className="food-image" />
      </div>

      <div className="food-content">
        <div className="food-text">
          <h3 className="food-name">{shortName}</h3>
          <p className="food-subtitle">{extraName}</p>

          <div className="food-rating">
            <div className="rating-container">
              <span className="star-icon">★</span>
              <span className="rating-value">{rating}</span>
            </div>
          </div>
        </div>

        <button className="favorite-btn" onClick={(e) => e.stopPropagation()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="heart-icon">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
