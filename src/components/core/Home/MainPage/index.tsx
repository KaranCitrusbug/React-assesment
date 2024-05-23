import React from 'react'
import MainHeader from '../Header/Index'

import CarouselComponent from '../Carousel/index'
import DisplayProduct from "../DisplayProduct/Index"

const index:React.FC = () => {
  return (
    <MainHeader>
     <CarouselComponent/>
     <DisplayProduct/>
    </MainHeader>
  )
}

export default index
