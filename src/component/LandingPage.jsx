import React from 'react'
import Hero from './Hero'
import PopularCategories from './PopularCategories'
import ShoppingEasy from './ShoppingEasy'
import FeaturedCollections from './FeaturedCollections'
import LoadingUI from './LoadingUI'
import PopularCategories2 from './PopularCategories2'
import FeaturedCollections2 from './FeaturedCollections2'

const LandingPage = () => {
  return (
    <div>
      <Hero/>
      <PopularCategories/>
      
      {/* <ShoppingEasy/> */}
      <FeaturedCollections/>
      <PopularCategories2/>
      <FeaturedCollections2/>
      {/* <LoadingUI/> */}
    </div>
  )
}

export default LandingPage
