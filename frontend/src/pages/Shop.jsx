import React from 'react'
import Hero from '../component/Hero/Hero'
import Popular from '../component/popular/Popular'
import Offers from  '../component/offers/Offers'
import NewCollections from '../component/NewCollections/NewCollections'
import NewsLetter from '../component/NewsLetter/NewsLetter'
import Footer from '../component/Footer/Footer'
const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default Shop
