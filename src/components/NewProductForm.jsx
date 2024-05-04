import React, { useState, useEffect } from "react";
import "../styles/newProductForm.css";
import { addProduct, updateProduct } from "../data/crud";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewProductForm({ setShowProductForm, productToEdit }) {
  const [productData, setProductData] = useState({
    image: productToEdit ? productToEdit.image : "",
    name: productToEdit ? productToEdit.name : "",
    price: productToEdit ? productToEdit.price : "",
    description: productToEdit ? productToEdit.description : "",
    category: productToEdit ? productToEdit.category : "",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    if (image) {
      const storageRef = ref(getStorage(), `img/${image.name}`);
      uploadBytes(storageRef, image)
        .then(() => {
          getDownloadURL(ref(storageRef)).then((url) => {
            setImageUrl(url);
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      console.error("No image selected");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit && productToEdit.key) { // Kontroll för att säkerställa att productToEdit och dess key är definierade
        await updateProduct(productToEdit.key, { // Använd productToEdit.key här istället för att det är vad du loggade och verifierade som korrekt
          ...productData,
          image: imageUrl,
        });
      } else {
        await addProduct({ ...productData, image: imageUrl });
      }
      setShowProductForm(false);
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const handleCancel = () => {
    // Återställ formuläret till ursprungstillståndet
    setProductData({
      image: productToEdit ? productToEdit.image : "",
      name: productToEdit ? productToEdit.name : "",
      price: productToEdit ? productToEdit.price : "",
      description: productToEdit ? productToEdit.description : "",
      category: productToEdit ? productToEdit.category : "",
    });
    setShowProductForm(false);
  };

  return (
    <div>
      <form className="product-form-container" onSubmit={handleSubmit}>
        <div>
          <label>Produktens bild</label>
          <input
            className="product-form-input img-input"
            type="file"
            placeholder="Bildlänk"
            name="image"
            onChange={handleImageChange}
          />
          <button type="button" onClick={handleImageUpload}>
            Ladda upp bild
          </button>
        </div>

        <div>
          <label>Produktens namn</label>
          <input
            className="product-form-input name-input"
            type="text"
            placeholder="Ex. Pool - Blå"
            name="name"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Produktens pris</label>
          <input
            className="product-form-input price-input"
            type="text"
            placeholder="Ex. 299"
            name="price"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Produktens beskrivning</label>
          <input
            className="product-form-input description-input"
            type="text"
            placeholder="Information om produkten"
            name="description"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Produktens kategori</label>
          <input
            className="product-form-input category-input"
            type="text"
            placeholder="Ex. sommarlek"
            name="category"
            onChange={handleInputChange}
          />
        </div>
        {productToEdit ? (
          <div>
            <button type="submit">Spara ändringar</button>
            <button type="button" onClick={handleCancel}>
              Avbryt
            </button>
          </div>
        ) : (
            <div>
            <button type="submit"> Lägg till</button>
            <button type="button" onClick={handleCancel}>
              Avbryt
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default NewProductForm;
