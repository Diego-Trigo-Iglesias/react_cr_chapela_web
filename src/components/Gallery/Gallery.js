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
  const [visibleImages, setVisibleImages] = useState(5); // Cantidad inicial de imágenes visibles
  const [isLoading, setIsLoading] = useState(true); // Inicia con true para mostrar el GIF al cargar la página

  const fetchImages = useCallback(async () => {
    setIsLoading(true); // Activa el loading cada vez que se haga una nueva búsqueda
    const imageNames = imageList[selectedLeague];
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
    setIsLoading(false); // Desactiva el loading una vez que las imágenes están cargadas
  }, [selectedLeague]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Carga más imágenes y activa el estado de loading
  useEffect(() => {
    if (visibleImages < imageUrls.length) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleImages((prevVisible) => prevVisible + 5);
        setIsLoading(false);
      }, 1000); // Ajusta el tiempo según tus necesidades
    }
  }, [visibleImages, imageUrls]);

  const openImage = (url) => {
    setSelectedImage(url);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleFilterChange = (event) => {
    setSelectedLeague(event.target.value);
    setVisibleImages(5); // Reinicia la cantidad de imágenes visibles al cambiar de liga
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

      {isLoading ? (
        <div className="loading-container">
          <img src="/loading.gif" alt="Cargando..." className="loading-gif" />
        </div>
      ) : (
        <div className="gallery">
          {imageUrls.slice(0, visibleImages).map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt={`Imagen ${index + 1}`} 
              className="thumbnail" 
              loading="lazy"
              onClick={() => openImage(url)}
            />
          ))}
        </div>
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
