import "../style/main.css";
import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";

function Info() {
  const { id } = useParams();
  const [burger, setBurger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spiciness, setSpiciness] = useState(1);
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
        <Link to="/" className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="black"
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

        <section className="burger-details-section">
          <div className="burger-info">
            <h2 className="burger-title">{burger.fullName}</h2>

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
              <article className="spiciness-section">
                <h3 className="section-title">Spicy</h3>
                <div className="spiciness-slider">
                  <div className="slider-container">
                    <div className="slider-track">
                      <div
                        className="slider-fill"
                        style={{
                          width: `${((spiciness - 1) / 3) * 100}%`,
                          backgroundColor:
                            spiciness === 1
                              ? "#de6f35"
                              : spiciness === 2
                              ? "#09a247"
                              : spiciness === 3
                              ? "#ff9800"
                              : "#e53e3e",
                        }}></div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={spiciness}
                      onChange={(e) => setSpiciness(parseInt(e.target.value))}
                      className="spicy-range"
                    />
                  </div>
                  <div className="spicy-labels">
                    <span className="spicy-label">Mild</span>
                    <span className="spicy-label">Hot</span>
                  </div>
                </div>
              </article>

              <article className="quantity-section">
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
              </article>
            </div>
          </div>
        </section>

        <div className="action-buttons">
          <span className="price-text">
            ${(burger.price * quantity).toFixed(2)}
          </span>
          <button className="add-to-cart-btn">ORDER NOW</button>
        </div>
      </main>
    </div>
  );
}

export default Info;
