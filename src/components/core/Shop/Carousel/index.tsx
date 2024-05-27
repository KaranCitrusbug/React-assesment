import React from 'react'

import { Carousel } from 'react-responsive-carousel'
import images from '../../../../assets/AllImages'

import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import './style.css'

const Index : React.FC= () => {
    const carouselImage = [images.Carousel2,images.Carousel1,images.Carousel3]
  return (
    <Carousel
    showArrows={true}
      showStatus={false}
      showIndicators={true}
      infiniteLoop={true}
      showThumbs={false}
      autoPlay={true}
      interval={4000}
      className='mt-3'
      >
        {
            carouselImage.map((img, index) => {
                return (
                    <div key={index}>
                        <img src={img}  alt='carousel Image' className='img-fluid carousel-img'/>
                    </div>
                )
            })
        }
    </Carousel>
  )
}

export default Index
