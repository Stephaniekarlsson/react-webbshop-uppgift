import React, { useState, useEffect } from "react";
import "../styles/newProductForm.css";
import { addProduct, updateProduct } from "../data/crud";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useStore } from "../data/store";

function NewProductForm({ productToEdit, setProductToEdit }) {
  const { setShowProductForm } = useStore();
  const [productData, setProductData] = useState({
    image: productToEdit ? productToEdit.image : "",
    name: productToEdit ? productToEdit.name : "",
    price: productToEdit ? productToEdit.price : "",
    description: productToEdit ? productToEdit.description : "",
    category: productToEdit ? productToEdit.category : "",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    productToEdit ? productToEdit.image : ""
  );
  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!productToEdit) {
      setImageUrl("");
      setEditMode(false); 
    } else {
      setEditMode(true); 
    }
  }, [productToEdit]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setShowProductForm(false); 
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUploaded(false); 
    }
  };

  const handleImageUpload = () => {
    if (image) {
      const storageRef = ref(getStorage(), `img/${image.name}`);
      uploadBytes(storageRef, image)
        .then(() => {
          getDownloadURL(ref(storageRef)).then((url) => {
            setImageUrl(url);
            setImageUploaded(true);
          });
        })
        .catch((error) => {
          setError("Error uploading image: " + error.message);
        });
    } else {
      setError("Ingen bild vald");
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

    if (!productData.name || !productData.price || !productData.category) {
      setError("Vänligen fyll i alla obligatoriska fält.");
      return;
    }

    const price = parseFloat(productData.price);
    if (isNaN(price) || price <= 0) {
      setError("Vänligen ange ett giltigt pris.");
      return;
    }

    if (!editMode && !imageUploaded) {
      setError("Vänligen ladda upp bilden");
      return;
    }

    try {
      if (productToEdit && productToEdit.key) {
        await updateProduct(productToEdit.key, {
          ...productData,
          image: imageUrl,
        });
      } else {
        await addProduct({ ...productData, image: imageUrl });
      }
      setShowProductForm(false);
      setProductToEdit(null);
    } catch (error) {
      setError("Något gick fel vid uppladning av produkt, testa igen senare " + error.message);
    }
  };


  const handleCancel = () => {
    setProductData({
      image: productToEdit ? productToEdit.image : "",
      name: productToEdit ? productToEdit.name : "",
      price: productToEdit ? productToEdit.price : "",
      description: productToEdit ? productToEdit.description : "",
      category: productToEdit ? productToEdit.category : "",
    });
    setShowProductForm(false);
    setProductToEdit(null)
    setError("");
    
  };

  

  return (
    <div>
      <form noValidate className="product-form-container" onSubmit={handleSubmit}>
        <div>
          <label>Produktens bild*</label>
          <input
            className="product-form-input img-input"
            type="file"
            placeholder="Bildlänk"
            name="image"
            onChange={handleImageChange}
          />
          <button
            className="img-upload-btn"
            type="button"
            onClick={handleImageUpload}
          >
            Ladda upp bild
          </button>
        </div>

        <div>
          <label>Produktens namn*</label>
          <input
            className="product-form-input name-input"
            type="text"
            placeholder="Ex. Pool - Blå"
            name="name"
            onChange={handleInputChange}
            value={productData.name}
            required
          />
        </div>

        <div>
          <label>Produktens pris*</label>
          <input
            className="product-form-input price-input"
            type="text"
            placeholder="Ex. 299"
            name="price"
            onChange={handleInputChange}
            value={productData.price}
            required
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
            value={productData.description}
          />
        </div>

        <div>
          <label>Produktens kategori*</label>
          <input
            className="product-form-input category-input"
            type="text"
            placeholder="Ex. uvtält"
            name="category"
            onChange={handleInputChange}
            value={productData.category}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
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
