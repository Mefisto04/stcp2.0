import { useState } from "react";
import { Link } from "./Link";

export function Burger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`burger ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
      </button>
      {isOpen && (
        <div className="burger-menu">
          <Link href="#home" text="Home" />
          <Link href="#leaderboard" text="Leaderboard" />
          <Link href="#about" text="About" />
        </div>
      )}
    </>
  );
}
