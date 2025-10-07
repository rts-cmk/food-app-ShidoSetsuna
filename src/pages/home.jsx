import "../style/main.css";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Search from "../components/search/search.jsx";
import placeholder from "../assets/user_placeholder.jpg";
import FoodCard from "../components/food_card/food_card.jsx";

function Home() {
  const navigate = useNavigate();
  const [allBurgers, setAllBurgers] = useState([]);
  const [filteredBurgers, setFilteredBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch burger data
  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const burgersData = data.burgers || [];
        setAllBurgers(burgersData);
        setFilteredBurgers(burgersData);
      } catch (err) {
        console.error("Error fetching burgers:", err);
        setError("Failed to load burgers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  const handleCardClick = (burgerId) => {
    navigate(`/info/${burgerId}`);
  };

  const handleSearch = (query) => {
    if (!query || query.trim() === "") {
      setFilteredBurgers(allBurgers);
      return;
    }

    const filtered = allBurgers.filter(
      (burger) =>
        burger.shortName.toLowerCase().includes(query.toLowerCase()) ||
        burger.fullName.toLowerCase().includes(query.toLowerCase()) ||
        burger.extraName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBurgers(filtered);
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
          <Search onSearch={handleSearch} />
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
            {filteredBurgers.map((burger) => (
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

        {!loading &&
          !error &&
          filteredBurgers.length === 0 &&
          allBurgers.length > 0 && (
            <div className="empty-state">
              <p>
                No burgers found matching your search. Try a different keyword!
              </p>
            </div>
          )}

        {!loading && !error && allBurgers.length === 0 && (
          <div className="empty-state">
            <p>{`No burgers available at the moment. :(((((((((`}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
