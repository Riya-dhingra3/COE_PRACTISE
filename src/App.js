import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure to include your styles

const StickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Track scroll event to toggle sticky class
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Set sticky class when scroll position is greater than 50px
      if (scrollTop > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // aman

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Sticky Header */}
      <header className={`sticky-header ${isSticky ? "sticky" : ""}`}>
        <h1>Sticky Header</h1>
      </header>

      {/* Content */}
      <div className="content">
        <p>Scroll down to see the sticky header in action!</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
    </div>
  );
};

export default StickyHeader;
