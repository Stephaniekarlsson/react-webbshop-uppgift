import React, { useState } from "react";
import "../styles/newProductForm.css";
import { addProduct } from "../data/crud";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewProductForm({ setShowProductForm }) {
  const [productData, setProductData] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    category: "",
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
      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(ref(storageRef)).then((url) => {
          setImageUrl(url);
        });
      }).catch((error) => {
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
      await addProduct({ ...productData, image: imageUrl });
      setShowProductForm(false); 
    } catch (error) {
      console.error("Error adding product:", error);
      // Hantera fel här, till exempel visa ett felmeddelande för användaren
    }
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
          <button type="button" onClick={handleImageUpload}>Ladda upp bild</button>
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
        <button type="submit">Lägg till</button>
      </form>
    </div>
  );
}

export default NewProductForm;
