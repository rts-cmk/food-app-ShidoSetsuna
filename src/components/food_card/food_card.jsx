import "./food_card.css";
import FavoriteButton from "../favorite-button/favorite-button.jsx";

export default function FoodCard({
  id,
  image,
  shortName,
  extraName,
  rating,
  onClick,
  onFavoriteChange,
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

        <FavoriteButton
          id={id}
          shortName={shortName}
          extraName={extraName}
          rating={rating}
          image={image}
          onFavoriteChange={onFavoriteChange}
          size="medium"
          showAnimation={true}
        />
      </div>
    </div>
  );
}
