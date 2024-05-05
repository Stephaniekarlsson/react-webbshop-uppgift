import React from 'react';
import SummerPlayImg from '../assets/hopprep.png';
import WaterPlayImg from '../assets/dino_badmadrass.png';
import BeachPlayImg from '../assets/strandkit_beige.png';
import UvTentImg from '../assets/uvtält_beige.png';
import Products from '../components/Products';
import { useState } from 'react';
import '../styles/home.css';
import NewProductForm from '../components/NewProductForm';
import { useStore } from '../data/store';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { showProductForm, setShowProductForm } = useStore();
  const [productToEdit, setProductToEdit] = useState(null);
  const { isLoggedIn } = useStore()
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const addProduct = () => {
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setShowProductForm(true); 
  };

  return (
    <section>
      {showProductForm ? (
        <NewProductForm productToEdit={productToEdit} setProductToEdit={setProductToEdit}/>
      ) : (
        <div>
          <section className='category-container'>
            <div className="category" onClick={() => handleCategoryClick('all')}>
              <img src={SummerPlayImg} alt="sommarlek" className='category-img' />
              <p className="category-text">Sommarlek</p>
            </div>
            <div className="category">
              <img src={WaterPlayImg} alt="vattenlek" className='category-img' onClick={() => handleCategoryClick('vattenlek')} />
              <p className="category-text">Vattenlek</p>
            </div>
            <div className="category" onClick={() => handleCategoryClick('strandlek')}>
              <img src={BeachPlayImg} alt="strandlek" className='category-img' />
              <p className="category-text">Strandlek</p>
            </div>
            <div className="category" onClick={() => handleCategoryClick('uvtält')}>
              <img src={UvTentImg} alt="uvtält" className='category-img' />
              <p className="category-text">UV-tält</p>
            </div>
          </section>

          <section>
            {isLoggedIn && (
            <div className="add-product-container">
              <button className="add-product-btn" onClick={addProduct}>Lägg till en produkt</button>
            </div>
            )}
            <div className="product-container">
              <Products selectedCategory={selectedCategory} onEdit={handleEditProduct}/>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export default Home;
