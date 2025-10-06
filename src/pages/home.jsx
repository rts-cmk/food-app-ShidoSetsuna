import "../style/main.css";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Search from "../components/search/search.jsx";
import placeholder from "../assets/user_placeholder.jpg";
import FoodCard from "../components/food_card/food_card.jsx";

function Home() {
  const navigate = useNavigate();
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch burger data on component mount
  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBurgers(data.burgers || []);
      } catch (err) {
        console.error("Error fetching burgers:", err);
        setError("Failed to load burgers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  // Handle card click to navigate to details page
  const handleCardClick = (burgerId) => {
    navigate(`/info/${burgerId}`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-top">
          <div className="header-text">
            <h1 className="app-title">Foodgo</h1>
            <p className="app-subtitle">Order your favourite food!</p>
          </div>
          <Link to="/profile" className="profile-link">
            <img src={placeholder} alt="Profile" className="profile-image" />
          </Link>
        </div>

        <div className="search-section">
          <Search />
        </div>
      </header>

      <main className="home-main">
        {loading && (
          <div className="loading-state">
            <p>Loading delicious burgers...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="burgers-grid">
            {burgers.map((burger) => (
              <FoodCard
                key={burger.id}
                image={burger.img}
                shortName={burger.shortName}
                extraName={burger.extraName}
                rating={burger.rating}
                onClick={() => handleCardClick(burger.id)}
              />
            ))}
          </div>
        )}

        {!loading && !error && burgers.length === 0 && (
          <div className="empty-state">
            <p>No burgers available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
