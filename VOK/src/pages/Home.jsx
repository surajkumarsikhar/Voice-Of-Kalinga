import React from 'react'
import Video from '../components/Video'
import Ourvision from '../components/Ourvision'
import Portfolio from '../components/Portfolio'
import Icube from '../components/Icube'
import BlogPreviewSection from '../components/BlogPreviewSection'
import Handles from '../components/Handles'
import WhatWeSeek from '../components/WhatWeSeek'

const Home = () => {
  return (
    <div className='bg-black'>
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
