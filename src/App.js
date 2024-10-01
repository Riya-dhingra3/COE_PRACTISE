import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [shrink, setShrink] = useState(false);
  const handleScroll = () => {
    const currentScrollY = window.pageYOffset;
    if (currentScrollY > 200) {
      setShrink(true);
    }
    if (currentScrollY < 200) {
      setShrink(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div>
      {/* Header that shrinks on scroll */}
      <div>
        <h1
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            fontSize: shrink ? "30px" : "50px",
            zIndex: 2,
            transition: "font-size 0.3s ease",
          }}
        >
          Header
        </h1>
      </div>

      <div
        style={{
          backgroundImage:
            "url('https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630')",
          height: "300px",
          backgroundSize:"100%",
          position: "sticky",
          backgroundRepeat:"no-repeat",
          top: "-200px",
        }}
      ></div>

      {/* Content below to enable scrolling */}
      <div style={{ height: "100vh" }}>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
        <p>Scroll down to see the header shrink!</p>
      </div>
    </div>
  );
}
