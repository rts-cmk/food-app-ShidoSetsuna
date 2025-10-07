import { useState, useEffect } from "react";
import "./food_card.css";

export default function FoodCard({
  id,
  image,
  shortName,
  extraName,
  rating,
  onClick,
  onFavoriteChange,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  //Check onload if this item is in the favorite localstorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const itemExists = favorites.some((item) => item.id === id);
    setIsFavorite(itemExists);
  }, [id]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Use id instead of key for comparison
    const itemExists = favorites.some((item) => item.id === id);

    if (itemExists) {
      alert(`${shortName} removed from favorites!`);
      favorites = favorites.filter((item) => item.id !== id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(false);
      onFavoriteChange && onFavoriteChange(); // Notify parent component
      return;
    }

    // Store the burger data with id
    favorites.push({
      id,
      shortName,
      extraName,
      rating,
      image, // Also store image for display in favorites page
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${shortName} added to favorites!`);
    setIsFavorite(true);
    onFavoriteChange && onFavoriteChange(); // Notify parent component
  };

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

        <button
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={handleFavoriteClick}>
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
