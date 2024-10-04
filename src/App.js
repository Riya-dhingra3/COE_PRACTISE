// import React, { useState, useEffect, useRef } from "react";

// export default function App() {
//   const [shrink, setShrink] = useState(false);
//   const handleScroll = () => {
//     const currentScrollY = window.pageYOffset;
//     if (currentScrollY > 200) {
//       setShrink(true);
//     }
//     if (currentScrollY < 200) {
//       setShrink(false);
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   });

//   return (
//     <div>
//       {/* Header that shrinks on scroll */}
//       <div>
//         <h1
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             fontSize: shrink ? "30px" : "50px",
//             zIndex: 2,
//             transition: "font-size 0.3s ease",
//           }}
//         >
//           Header
//         </h1>
//       </div>

//       <div
//         style={{
//           backgroundImage:
//             "url('https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630')",
//           height: "300px",
//           backgroundSize:"100%",
//           position: "sticky",
//           backgroundRepeat:"no-repeat",
//           top: "-200px",
//         }}
//       ></div>

//       {/* Content below to enable scrolling */}
//       <div style={{ height: "100vh" }}>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//         <p>Scroll down to see the header shrink!</p>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import Header from "./components/header";
// import "./App.css"

// export default function App(){
//   return(
//     <div>
//       <Header />
//     </div>
//   )
// }



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

// List of continents for the first dropdown
const CONTINENTS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function App() {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [dropdown, setDropdown] = useState({
    continent: false,
    state: false,
    city: false,
  });

  const continentRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();

  // Close the dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (continentRef.current && !continentRef.current.contains(event.target)) {
        setDropdown((prev) => ({ ...prev, continent: false }));
      }
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setDropdown((prev) => ({ ...prev, state: false }));
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setDropdown((prev) => ({ ...prev, city: false }));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch states when a continent is selected
  useEffect(() => {
    if (selectedContinent) {
      fetchStates(selectedContinent);
      setDropdown({ state: true, continent: false, city: false });
      setSelectedState(''); // Reset state when continent changes
      setSelectedCity(''); // Reset city when continent changes
    }
  }, [selectedContinent]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
      setDropdown({ city: true, state: false });
      setSelectedCity(''); // Reset city when state changes
    }
  }, [selectedState]);

  // Fetch states based on the selected continent
  const fetchStates = async (continent) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/region/${continent.toLowerCase()}`);
      const uniqueStates = [...new Set(response.data.map((country) => country.subregion))];
      setStates(uniqueStates.filter((state) => state)); // Ensure no empty states
    } catch (error) {
      console.error('Error fetching states: ', error);
    }
  };

  // Dummy function to fetch cities based on the state
  const fetchCities = (state) => {
    const cityData = {
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      Texas: ['Houston', 'Austin', 'Dallas'],
      Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
      Quebec: ['Montreal', 'Quebec City', 'Laval'],
    };

    if (cityData[state]) {
      setCities(cityData[state]);
    } else {
      setCities([]);
    }
  };

  return (
    <div className="container">
      <h1>Select Location</h1>

      {/* Continent Dropdown */}
      <div className="dropdown" ref={continentRef}>
        <button
          className="dropdown-btn"
          onClick={() => setDropdown((prev) => ({ ...prev, continent: !prev.continent }))}
        >
          {selectedContinent || 'Select Continent'}
        </button>
        {dropdown.continent && (
          <ul className="dropdown-content show">
            {CONTINENTS.map((continent) => (
              <li
                key={continent}
                onClick={() => {
                  setSelectedContinent(continent);
                  setDropdown((prev) => ({ ...prev, continent: false }));
                }}
              >
                {continent}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* State Dropdown */}
      {states.length > 0 && (
        <div className="dropdown" ref={stateRef}>
          <button
            className="dropdown-btn"
            onClick={() => setDropdown((prev) => ({ ...prev, state: !prev.state }))}
          >
            {selectedState || 'Select State'}
          </button>
          {dropdown.state && (
            <ul className="dropdown-content show">
              {states.map((state, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedState(state);
                    setDropdown((prev) => ({ ...prev, state: false }));
                  }}
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* City Dropdown */}
      {cities.length > 0 && (
        <div className="dropdown" ref={cityRef}>
          <button
            className="dropdown-btn"
            onClick={() => setDropdown((prev) => ({ ...prev, city: !prev.city }))}
          >
            {selectedCity || 'Select City'}
          </button>
          {dropdown.city && (
            <ul className="dropdown-content show">
              {cities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedCity(city);
                    setDropdown((prev) => ({ ...prev, city: false }));
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
