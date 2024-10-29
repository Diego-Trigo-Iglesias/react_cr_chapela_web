import React, { useState } from "react";
import products from "../Data/Products"; 
import "./Merchandising.css";

const Merchandising = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({}); // Objeto para guardar las cantidades por ID de producto
  const [addedMessages, setAddedMessages] = useState({}); // Objeto para guardar mensajes de añadido por ID de producto
  const [showSummary, setShowSummary] = useState(false);

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0; // Usa la cantidad actual o 0 por defecto
    if (product.sizes.length > 0 && !product.selectedSize) {
      alert("Por favor, selecciona una talla.");
      return;
    }

    if (quantity > 0) {
      const productWithQuantity = { ...product, quantity };
      setSelectedProducts((prev) => [...prev, productWithQuantity]);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 })); // Resetea la cantidad para este producto
      setAddedMessages((prev) => ({ ...prev, [product.id]: `Añadido ${product.name} al carrito.` }));

      // Elimina el mensaje después de 3 segundos
      setTimeout(() => {
        setAddedMessages((prev) => ({ ...prev, [product.id]: "" }));
      }, 3000);
    } else {
      alert("Por favor, selecciona una cantidad mayor que 0.");
    }
  };

  const handleBuy = () => {
    if (selectedProducts.length > 0) {
      setShowSummary(true);
    }
  };

  const handleConfirmPurchase = () => {
    console.log("Productos seleccionados:", selectedProducts);
    // **********************************TODO: Implementar lógica de cobro aquí************************************************************
    setSelectedProducts([]); // Restablecer el carrito
    setShowSummary(false);
    setQuantities({}); // Restablecer cantidades
  };

  const handleCancelPurchase = () => {
    setShowSummary(false);
    setSelectedProducts([]); // Restablecer productos seleccionados
    setQuantities({}); // Restablecer cantidades
  };

  return (
    <div className="merchandising">
      <h1>Merchandising</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Precio: {product.price} €</p>
            <div>
              {product.sizes.length > 0 && (
                <>
                  <label htmlFor={`size-${product.id}`}>Talla:</label>
                  <select 
                    id={`size-${product.id}`} 
                    onChange={(e) => {
                      const selectedSize = e.target.value;
                      product.selectedSize = selectedSize; // Guarda el tamaño seleccionado en el objeto del producto
                    }} 
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selecciona una talla
                    </option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <div>
              <label htmlFor={`quantity-${product.id}`}>Cantidad:</label>
              <select 
                id={`quantity-${product.id}`} 
                value={quantities[product.id] || 0} // Usa 0 por defecto
                onChange={(e) => setQuantities((prev) => ({ ...prev, [product.id]: Number(e.target.value) }))}
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index} value={index}>
                    {index} {/* Cambia a 0 por defecto */}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={() => handleAddToCart(product)}>
              Agregar al carrito
            </button>
            {addedMessages[product.id] && <p className="added-message">{addedMessages[product.id]}</p>}
          </div>
        ))}
      </div>
      <button className="buy-button" onClick={handleBuy}>
        Finalizar compra
      </button>

      {showSummary && (
        <div className="summary">
          <h2>Resumen de compra</h2>
          <ul>
            {selectedProducts.map((product, index) => (
              <li key={index}>
                {product.name} - {product.quantity} x {product.price} €
              </li>
            ))}
          </ul>
          <button onClick={handleConfirmPurchase}>Confirmar</button>
          <button onClick={handleCancelPurchase}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Merchandising;
