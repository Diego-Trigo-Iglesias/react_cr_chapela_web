import React, { useState, useEffect, useCallback } from "react";
import { storage } from '../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import imageList from '../Data/ImageList.json';
import './Gallery.css';

const Gallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('femenina');

  const fetchImages = useCallback(async () => {
    const imageNames = imageList[selectedLeague]; // Obtén las imágenes de la liga seleccionada
    const urls = [];

    try {
      for (const name of imageNames) {
        const imageRef = ref(storage, `/${selectedLeague}/${name}`);
        const url = await getDownloadURL(imageRef);
        urls.push(url);
      }
      setImageUrls(urls);
      setError('');
    } catch (err) {
      console.error(err);
      setError("Error al cargar las imágenes.");
    }
  }, [selectedLeague]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const openImage = (url) => {
    setSelectedImage(url);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleFilterChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  return (
    <div>
      <h1>Galería</h1>
      {error && <p>Error: {error}</p>}

      <div className="filter">
        <label htmlFor="league">Selecciona una liga: </label>
        <select id="league" value={selectedLeague} onChange={handleFilterChange}>
          <option value="femenina">Femenina</option>
          <option value="ligab">Liga B</option>
          <option value="ligaa">Liga A</option>
        </select>
      </div>

      {imageUrls.length > 0 ? (
        <div className="gallery">
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Imagen ${index + 1}`} className="thumbnail"
              onClick={() => openImage(url)}
            />
          ))}
        </div>
      ) : (
        <p>Cargando imágenes...</p>
      )}

      {selectedImage && (
        <div className="modal" onClick={closeImage}>
          <img src={selectedImage} alt="Imagen grande" className="large-image" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
