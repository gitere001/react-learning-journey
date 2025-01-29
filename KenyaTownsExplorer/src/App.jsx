/*** imports ***/
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import "./App.css";

function App() {
  /*** states ***/
  const [selectedCity, setSelectedCity] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCityDetailsVisible, setIsCityDetailsVisible] = useState(false);
  const [kenyaCities, setKenyaCities] = useState([]);

/*** effects ***/
  useEffect(() => {
    fetch("../data.json")
      .then((response) => response.json())
      .then((data) => setKenyaCities(data))
      .catch((error) => console.error("Error loading the data:", error));
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsCityDetailsVisible(false);
      setSelectedCity({});
      setFilteredCities(
        kenyaCities
          .filter((city) =>
            city.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .slice(0, 6)
      );
    } else {
      setFilteredCities([]);
    }
  }, [searchQuery]);

/*** functions ***/
  function handleSearchInput(e) {
    let query = e.target.value.trim();
    setSearchQuery(query);
    if (query === "") {
      setFilteredCities([]);
    }
    if (isCityDetailsVisible) {
      query = "";
    }
  }

  function closeCityDetails() {
    setIsCityDetailsVisible(false);
    setSelectedCity({});
  }

  function handleCitySelection(cityName) {
    const city = kenyaCities.find(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );
    if (city) {
      console.log(city);
      setSearchQuery("");
      setFilteredCities([]);
      setIsCityDetailsVisible(true);
      setSelectedCity(city);
    }
  }

/*** rendering ***/
  const citySuggestionsList = filteredCities.map((city, index) => {
    return (
      <div
        onClick={() => handleCitySelection(city.name)}
        key={index}
        className="autocomplete-result"
      >
        <h4>{city.name}</h4>
        <p>{city.region}</p>
      </div>
    );
  });

  return (
    <>
      <article className="introduction">
        <h1>Kenyan Cities Explorer</h1>
        <p>
          Search major Kenyan cities by name. Click a suggestion for detailed city info.
        </p>
      </article>
      <section className="search">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search City..."
          onChange={(e) => handleSearchInput(e)}
        />
        <Search className="search-icon" />
      </section>
      <section className="autocomplete">
        {filteredCities.length > 0 &&
          !isCityDetailsVisible &&
          citySuggestionsList}
      </section>
      {isCityDetailsVisible && Object.keys(selectedCity).length > 0 && (
        <section className="search-result">
          <X onClick={closeCityDetails} className="x" />
          <h1>{selectedCity.name}</h1>
          <p>{selectedCity.region}</p>

          <p>{selectedCity.description}</p>
          <h4>Key Features</h4>
          <div className="features">
            {selectedCity.features.map((feature, index) => {
              return <span key={index}>{feature}</span>;
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default App;
