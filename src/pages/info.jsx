import "../style/main.css";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";

function Info() {
  const { id } = useParams();
  const [burger, setBurger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spiciness, setSpiciness] = useState(1); // 1 = Mild, 2 = Medium, 3 = Hot
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBurger = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const foundBurger = data.burgers.find((b) => b.id === parseInt(id));

        if (!foundBurger) {
          throw new Error("Burger not found");
        }

        setBurger(foundBurger);
      } catch (err) {
        console.error("Error fetching burger:", err);
        setError("Failed to load burger details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBurger();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="info-container">
        <div className="loading-state">
          <p>Loading burger details...</p>
        </div>
      </div>
    );
  }

  if (error || !burger) {
    return (
      <div className="info-container">
        <div className="error-state">
          <p>{error || "Burger not found"}</p>
          <Link to="/" className="back-button">
            ← Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="info-container">
      <header className="info-header">
        <Link to="/" className="back-button">
          ←
        </Link>
        <Link to="/" className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </Link>
      </header>

      <main className="info-main">
        <div className="burger-image-section">
          <img
            src={burger.img}
            alt={burger.fullName}
            className="burger-detail-image"
          />
        </div>

        <div className="burger-details-section">
          <div className="burger-info">
            <h2 className="burger-title">
              {burger.shortName} {burger.extraName}
            </h2>

            <div className="rating-price-row">
              <div className="rating-display">
                <span className="star-icon-info">★</span>
                <span className="rating-text">{burger.rating}</span>
                <span className="delivery-text"> - 24 mins</span>
              </div>
            </div>

            <div className="description-section">
              <p className="burger-description">{burger.description}</p>
            </div>

            <div className="customization-section">
              {/* Spiciness Slider */}
              <div className="spiciness-section">
                <h3 className="section-title">Spicy</h3>
                <div className="spiciness-slider">
                  <div className="slider-container">
                    <div className="slider-track">
                      <div
                        className="slider-fill"
                        style={{
                          width: `${((spiciness - 1) / 2) * 100}%`,
                          backgroundColor:
                            spiciness === 1
                              ? "#e0e0e0"
                              : spiciness === 2
                              ? "#ff9800"
                              : "#e53e3e",
                        }}></div>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        value={spiciness}
                        onChange={(e) => setSpiciness(parseInt(e.target.value))}
                        className="spicy-range"
                      />
                    </div>
                  </div>
                  <div className="spicy-labels">
                    <span className="spicy-label">Mild</span>
                    <span className="spicy-label">Hot</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-section">
                <h3 className="section-title">Portion</h3>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn minus"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}>
                    −
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    className="quantity-btn plus"
                    onClick={() => setQuantity(quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <span className="price-text">${burger.price}</span>
          <button className="add-to-cart-btn">ORDER NOW</button>
        </div>
      </main>
    </div>
  );
}

export default Info;
