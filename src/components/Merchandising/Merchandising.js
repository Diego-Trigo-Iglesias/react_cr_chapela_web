import React, { useState } from "react";
import products from "../Data/Products";
import "./Merchandising.css";

const Merchandising = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [addedMessages, setAddedMessages] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [userName, setUserName] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 0;
    if (product.sizes.length > 0 && !product.selectedSize) {
      alert("Por favor, selecciona una talla.");
      return;
    }

    if (quantity > 0) {
      const productWithQuantity = { ...product, quantity };
      setSelectedProducts((prev) => [...prev, productWithQuantity]);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
      setAddedMessages((prev) => ({ ...prev, [product.id]: `Añadido ${product.name} al carrito.` }));

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
    const totalPrice = selectedProducts.reduce((sum, product) => sum + product.quantity * product.price, 0).toFixed(2);

    // Obtenemos los datos de los productos y los datos del usuario
    const purchaseSummary = {
      userName,
      contactInfo,
      products: selectedProducts.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price.toFixed(2),
        total: (product.quantity * product.price).toFixed(2),
      })),
      totalPrice,
    };

    // Crear el cuerpo del correo con los detalles de la compra
    const productDetails = purchaseSummary.products.map(
      (product) => `Producto: ${product.name}, Cantidad: ${product.quantity}, Precio: ${product.price} €, Total: ${product.total} €`
    ).join("%0D%0A");

    const mailtoLink = `mailto:crchapela@hotmail.com?subject=Resumen de Compra&body=Nombre: ${userName}%0D%0AContacto: ${contactInfo}%0D%0A${productDetails}%0D%0ATotal de la compra: ${purchaseSummary.totalPrice} €`;

    window.location.href = mailtoLink;

    // Reiniciar el formulario y el carrito
    setSelectedProducts([]);
    setShowSummary(false);
    setQuantities({});
    setUserName("");
    setContactInfo("");
  };

  const handleCancelPurchase = () => {
    setShowSummary(false);
    setSelectedProducts([]);
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
                      product.selectedSize = selectedSize;
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
                value={quantities[product.id] || 0}
                onChange={(e) =>
                  setQuantities((prev) => ({ ...prev, [product.id]: Number(e.target.value) }))
                }
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={() => handleAddToCart(product)}>
              Agregar al carrito
            </button>
            {addedMessages[product.id] && (
              <p className="added-message">{addedMessages[product.id]}</p>
            )}
          </div>
        ))}
      </div>
      <button className="buy-button" onClick={handleBuy}>
        Finalizar compra
      </button>

      {showSummary && (
        <div className="summary">
          <h2>Resumen de compra</h2>
          <p>Introduce tus datos y nos encargaremos de todo luego.</p>
          <ul>
            {selectedProducts.map((product, index) => (
              <li key={index}>
                {product.name} - {product.quantity} x {product.price} €
              </li>
            ))}
          </ul>
          <div className="user-info">
            <label>
              Nombre de referencia:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </label>
            <label>
              Teléfono o email de contacto:
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="summary-buttons">
            <button onClick={handleConfirmPurchase}>Confirmar</button>
            <button onClick={handleCancelPurchase}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Merchandising;
