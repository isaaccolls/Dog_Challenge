import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../index.css";

const DogList = ({ onSelect }) => {
  const [breeds, setBreeds] = useState({});
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        setBreeds(data.message);
      })
      .catch((error) => {
        console.error("Error fetching breeds:", error);
        setError("Error fetching breeds. Please try again later.");
      });
  }, []);

  const handleCloseModal = () => {
    setError(null);
  };

  const handleSelect = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      if (name.includes("/")) {
        setSelectedBreeds((prevSelected) => [...prevSelected, name]);
      } else {
        setSelectedBreeds((prevSelected) => {
          const subBreeds = breeds[name];
          const newSelectedBreeds = prevSelected.filter(
            (breed) => !subBreeds.includes(breed)
          );
          return [...newSelectedBreeds, name];
        });
      }
    } else {
      setSelectedBreeds((prevSelected) => {
        if (name.includes("/")) {
          // deselecting a sub-breed
          return prevSelected.filter((breed) => breed !== name);
        } else {
          // deselecting a main breed, also remove its sub-breeds
          const subBreeds = breeds[name];
          const subBreedNames = subBreeds.map(
            (subBreed) => `${name}/${subBreed}`
          );
          return prevSelected.filter(
            (breed) => breed !== name && !subBreedNames.includes(breed)
          );
        }
      });
    }
  };

  const isSubBreed = (breed) => breed.includes("/");

  return (
    <div className="p-4">
      <h2>Choose Breeds!</h2>
      <div className="d-flex flex-wrap">
        {Object.keys(breeds).map((breed, index) => (
          <div key={index} className="p-2">
            <input
              type="checkbox"
              name={breed}
              checked={selectedBreeds.includes(breed)}
              onChange={handleSelect}
              className="form-check-input"
            />
            <label className={isSubBreed(breed) ? "sub-breed" : ""}>
              {breed}
            </label>
            {breeds[breed].length > 0 &&
              selectedBreeds.includes(breed) &&
              breeds[breed].map((subBreed, subIndex) => (
                <div key={subIndex} className="pl-4">
                  <input
                    type="checkbox"
                    name={`${breed}/${subBreed}`}
                    checked={selectedBreeds.includes(`${breed}/${subBreed}`)}
                    onChange={handleSelect}
                    className="form-check-input"
                  />
                  <label className="sub-breed">{subBreed}</label>
                </div>
              ))}
          </div>
        ))}
      </div>
      <button
        onClick={() => onSelect(selectedBreeds)}
        className="btn btn-primary"
      >
        Show Images
      </button>
      <Modal show={error !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DogList;
