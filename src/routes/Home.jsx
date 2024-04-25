import React from 'react'
import SummerPlayImg from '../assets/hopprep.png'
import WaterPlayImg from '../assets/dino_badmadrass.png'
import BeachPlayImg from '../assets/strandkit_beige.png'
import UvTentImg from '../assets/uvtält_beige.png'
import Products from '../components/Products'


import '../styles/home.css'

function Home() {
  return (
    <div>
      <section className='category-container'>
        <div className="category">
          <img src={SummerPlayImg} alt="sommarlek" className='category-img' />
          <p className="category-text">Sommarlek</p>
        </div>
        <div className="category">
          <img src={WaterPlayImg} alt="sommarlek" className='category-img' />
          <p className="category-text">Vattenlek</p>
        </div>
        <div className="category">
          <img src={BeachPlayImg} alt="sommarlek" className='category-img' />
          <p className="category-text">Strandlek</p>
        </div>
        <div className="category">
          <img src={UvTentImg} alt="sommarlek" className='category-img' />
          <p className="category-text">UV-tält</p>
        </div>
      </section>

      <section>
        <div className="product-container"></div>
        <Products />
      </section>
    </div>
  )
}

export default Home

