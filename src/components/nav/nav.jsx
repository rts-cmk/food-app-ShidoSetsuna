import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import "./nav.css";

const navItems = [
  { id: "home", icon: "🏠", path: "/" },
  { id: "profile", icon: "👤", path: "/profile" },
  { id: "add", icon: "+", path: "/add" },
  { id: "menu", icon: "☰", path: "/menu" },
  { id: "favorites", icon: "❤️", path: "/favorites" },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Find current active index based on current path
  const getCurrentIndex = () => {
    const currentItem = navItems.find(
      (item) => item.path === location.pathname
    );
    return currentItem ? navItems.indexOf(currentItem) : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getCurrentIndex());

  const handleNavClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  return (
    <div className="parent-navbar">
      <div className="navbar">
        {navItems.map((item, index) => (
          <div
            key={item.id}
            className="nav-item"
            data-index={index + 1}
            onClick={() => handleNavClick(index, item.path)}>
            <span
              className={`icon-item ${index === activeIndex ? "active" : ""}`}>
              {item.icon}
            </span>
          </div>
        ))}

        {/* The bullet (floating circle) */}
        <div className="bullet" style={{ "--bullet-index": activeIndex + 1 }}>
          <div className="bullet-inside">
            <span className="bullet-icon">{navItems[activeIndex].icon}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
