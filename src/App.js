import React, { useState } from "react";
import DogList from "./components/DogList";
import DogImages from "./components/DogImages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const App = () => {
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleSelectBreeds = (selectedBreeds) => {
    setSelectedBreeds(selectedBreeds);
  };

  const handleScroll = () => {
    const topOffset = window.pageYOffset || document.documentElement.scrollTop;
    setShowScrollButton(topOffset > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="container-fluid" data-testid="app-component">
      <div className="row">
        <div className="col">
          <DogList onSelect={handleSelectBreeds} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DogImages selectedBreeds={selectedBreeds} />
        </div>
      </div>
      {showScrollButton && (
        <button className="btn btn-primary btn-scroll" onClick={scrollToTop}>
          <i className="bi bi-arrow-up-circle"></i>
        </button>
      )}
    </div>
  );
};

export default App;
