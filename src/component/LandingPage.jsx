import React from 'react'
import Hero from './Hero'
import PopularCategories from './PopularCategories'
import ShoppingEasy from './ShoppingEasy'
import FeaturedCollections from './FeaturedCollections'
import LoadingUI from './LoadingUI'

const LandingPage = () => {
  return (
    <div>
      <Hero/>
      <PopularCategories/>
      {/* <ShoppingEasy/> */}
      <FeaturedCollections/>
      {/* <LoadingUI/> */}
    </div>
  )
}

export default LandingPage
