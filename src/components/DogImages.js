import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../index.css";

const DogImages = ({ selectedBreeds }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      const requests = selectedBreeds.map((breed) =>
        fetch(`https://dog.ceo/api/breed/${breed}/images`).then((response) =>
          response.json()
        )
      );
      try {
        const responses = await Promise.all(requests);
        const images = responses.flatMap((response) => response.message);
        setImages(images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Error fetching images. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [selectedBreeds]);

  const handleCloseModal = () => {
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="dog-images-container p-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {images.length ? (
        <div className="dog-images-container p-4">
          <h2>Images</h2>
          <div>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Dog ${index}`}
                className="dog-image rounded m-1"
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
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
    </>
  );
};

export default DogImages;
