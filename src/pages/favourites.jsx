import "../style/main.css";
import "../style/favourites.css";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import FoodCard from "../components/food_card/food_card.jsx";

function Favourites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    const handleStorageChange = (e) => {
      if (e.key === "favorites") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleCardClick = (burgerId) => {
    navigate(`/info/${burgerId}`);
  };

  const handleFavoriteRemoved = () => {
    const updatedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-container">
      <header className="favorites-header">
        <Link to="/" className="back-button">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.1666 12.25H11.9081L14.7536 9.40448C15.0819 9.07635 15.2664 8.63123 15.2665 8.16706C15.2666 7.7029 15.0823 7.2577 14.7542 6.9294C14.426 6.60111 13.9809 6.41661 13.5167 6.4165C13.0526 6.41639 12.6074 6.60068 12.2791 6.92882L8.09542 11.1125C7.33098 11.879 6.9017 12.9174 6.9017 14C6.9017 15.0826 7.33098 16.1209 8.09542 16.8875L12.2791 21.0712C12.6074 21.3993 13.0526 21.5836 13.5167 21.5835C13.9809 21.5834 14.426 21.3989 14.7542 21.0706C15.0823 20.7423 15.2666 20.2971 15.2665 19.8329C15.2664 19.3687 15.0819 18.9236 14.7536 18.5955L11.9081 15.75H22.1666C22.6307 15.75 23.0758 15.5656 23.404 15.2374C23.7322 14.9092 23.9166 14.4641 23.9166 14C23.9166 13.5359 23.7322 13.0907 23.404 12.7625C23.0758 12.4344 22.6307 12.25 22.1666 12.25Z"
              fill="#3C2F2F"
            />
          </svg>
        </Link>

        <h1 className="page-title">My Favorites</h1>

        <div className="header-spacer"></div>
      </header>

      <main className="favorites-main">
        {loading && (
          <div className="loading-state">
            <p>Loading your favorites...</p>
          </div>
        )}

        {!loading && favorites.length === 0 && (
          <div className="empty-favorites">
            <div className="empty-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#ccc"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <h2>No favorites yet</h2>
            <p>Start adding items to your favorites to see them here!</p>
            <Link to="/" className="browse-button">
              Browse Menu
            </Link>
          </div>
        )}

        {!loading && favorites.length > 0 && (
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <FoodCard
                key={`fav-${favorite.id}`}
                id={favorite.id}
                image={favorite.image}
                shortName={favorite.shortName}
                extraName={favorite.extraName}
                rating={favorite.rating}
                onClick={() => handleCardClick(favorite.id)}
                onFavoriteChange={handleFavoriteRemoved}
              />
            ))}
          </div>
        )}

        {!loading && favorites.length > 0 && (
          <div className="favorites-footer">
            <p>
              You have {favorites.length} favorite
              {favorites.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Favourites;
