import { useState, useEffect } from "react";
import "./favorite-button.css";

export default function FavoriteButton({
  id,
  shortName,
  extraName,
  rating,
  image,
  onFavoriteChange,
  size = "medium",
  showAnimation = true,
  className = "",
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check on load if this item is in the favorite localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const itemExists = favorites.some((item) => item.id === id);
    setIsFavorite(itemExists);
  }, [id]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const itemExists = favorites.some((item) => item.id === id);

    if (itemExists) {
      favorites = favorites.filter((item) => item.id !== id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(false);
      onFavoriteChange && onFavoriteChange(false, id);
    } else {
      favorites.push({
        id,
        shortName,
        extraName,
        rating,
        image,
      });
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      onFavoriteChange && onFavoriteChange(true, id);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "favorite-btn-small";
      case "large":
        return "favorite-btn-large";
      default:
        return "favorite-btn-medium";
    }
  };

  return (
    <button
      className={`favorite-btn ${getSizeClass()} ${
        isFavorite ? "favorited" : ""
      } ${showAnimation ? "animated" : ""} ${className}`}
      onClick={handleFavoriteClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="heart-icon">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="currentColor"
          strokeWidth="2"
          fill={isFavorite ? "currentColor" : "none"}
        />
      </svg>
    </button>
  );
}
