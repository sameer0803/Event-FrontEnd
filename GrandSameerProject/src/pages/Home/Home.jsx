// import React from 'react'
import CasesSection from '../../components/Main/CasesSection'
import Hero from '../../components/Main/Hero'
import MainFile from '../../components/Main/MainFile'
import MainFooter from '../../components/Main/MainFooter'
import MainGallery from '../../components/Main/MainGallery'
import MainGalleryA from '../../components/Main/MainGalleryA'


const Home = () => {
  return (
    <div>
      <MainFile />
      <Hero />
      <MainFooter />
      <MainGalleryA />
      <MainGallery />
      <CasesSection />
      
    </div>
  )
}

export default Home