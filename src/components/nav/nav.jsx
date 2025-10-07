import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import "./nav.css";
import commentIcon from "../../assets/comment.svg";
import heartIcon from "../../assets/heart.svg";
import homeIcon from "../../assets/home.svg";
import plusIcon from "../../assets/plus.svg";
import userIcon from "../../assets/user.svg";

const navItems = [
  { id: "home", icon: homeIcon, path: "/" },
  { id: "profile", icon: userIcon, path: "/profile" },
  { id: "add", icon: plusIcon, path: "/add" },
  { id: "menu", icon: commentIcon, path: "/menu" },
  { id: "favorites", icon: heartIcon, path: "/favorites" },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

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
            <img
              src={item.icon}
              alt={item.id}
              className={`icon-item ${index === activeIndex ? "active" : ""}`}
            />
          </div>
        ))}

        <div className="bullet" style={{ "--bullet-index": activeIndex + 1 }}>
          <div className="bullet-inside">
            <img
              src={navItems[activeIndex].icon}
              alt={navItems[activeIndex].id}
              className="bullet-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
