import React, { useState, useEffect } from "react";
import "../styles/newProductForm.css";
import { addProduct, updateProduct } from "../data/crud";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewProductForm({ setShowProductForm, productToEdit, setProductToEdit }) {
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

  useEffect(() => {
    if (!productToEdit) {
      setImageUrl(""); // Återställ imageUrl till en tom sträng om productToEdit är falskt (null eller undefined)
    }
  }, [productToEdit]);

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
      if (productToEdit && productToEdit.key) {
        //
        await updateProduct(productToEdit.key, {
          ...productData,
          image: imageUrl,
        });
      } else {
        await addProduct({ ...productData, image: imageUrl });
      }
      setShowProductForm(false);
      setProductToEdit(null)

    } catch (error) {
      console.error("Error adding/updating product:", error);
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
          <button
            className="img-upload-btn"
            type="button"
            onClick={handleImageUpload}
          >
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
            value={productData.name}
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
            value={productData.price}
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
          <label>Produktens kategori</label>
          <input
            className="product-form-input category-input"
            type="text"
            placeholder="Ex. sommarlek"
            name="category"
            onChange={handleInputChange}
            value={productData.category}
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
