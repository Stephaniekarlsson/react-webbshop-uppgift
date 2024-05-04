import React, { useState } from "react";
import "../styles/newProductForm.css";
import { addProduct } from "../data/crud";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function NewProductForm({ setShowProductForm }) {
  const [productData, setProductData] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Länken till den uppladdade bilden

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("Selected image:", e.target.files[0]); // Lägg till denna rad för att kontrollera den valda bilden
    }
  };
  
  const handleImageUpload = () => {
    if (image) {
      console.log("Uploading image:", image); // Lägg till denna rad för att kontrollera bilden som ska laddas upp
      const storageRef = ref(getStorage(), `img/${image.name}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
      });
    } else {
      console.error("No image selected");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input field name:", name); // Logga namnet på fältet
    console.log("Input field value:", value); // Logga värdet på fältet
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("Product data:", productData);
  console.log("Image URL:", imageUrl);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindra att sidan uppdateras vid submit
  
    // Kontrollera om namnfältet är tomt eller undefined
    if (!productData.name) {
      console.error("Product name is empty or undefined");
      return; // Avbryt funktionen om namnfältet är tomt eller undefined
    }
  
    try {
      // Lägg till produkten i Firestore
      await addProduct({ productData, image: imageUrl });
      setShowProductForm(false); // Dölj formuläret efter att produkten har lagts till
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
            // onChange={handleImageChange}
          />
          {/* <button type="button" onClick={handleImageUpload}>Ladda upp bild</button> */}
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


// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read, write: if false;
//       }
//     }
//   }