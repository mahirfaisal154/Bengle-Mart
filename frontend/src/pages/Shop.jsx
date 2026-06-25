import React from 'react'
import Hero from '../component/Hero/Hero'
import Popular from '../component/popular/Popular'
import Offers from  '../component/offers/Offers'
import NewCollections from '../component/NewCollections/NewCollections'
import NewsLetter from '../component/NewsLetter/NewsLetter'
const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
