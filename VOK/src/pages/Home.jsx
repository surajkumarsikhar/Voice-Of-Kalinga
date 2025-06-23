import React from 'react'
import Video from '../components/Video'
import Ourvision from '../components/Ourvision'
import Portfolio from '../components/Portfolio'
import Icube from '../components/Icube'
import BlogPreviewSection from '../components/BlogPreviewSection'
import SEO from '../components/SEO'
import WhatWeSeek from '../components/WhatWeSeek'

const Home = () => {
  return (
    <div className='bg-black'>
      <SEO
        title="Voice of Kalinga – Stories from the Streets of Odisha"
        description="Discover powerful, emotional stories from the heart of Odisha. Unheard voices, now heard."
        url="https://voice-of-kalinga-site.vercel.app/"
        image="https://voice-of-kalinga-site.vercel.app/home-og.jpg"
      />
      <Video/>
      <Ourvision/>
      <Portfolio/>
      <Icube/>
      <BlogPreviewSection/>
      <WhatWeSeek/>
    </div>
  )
}

export default Home
