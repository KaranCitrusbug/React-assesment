import React from 'react'
import MainHeader from  "../Home/Header/Index"
import CarouselComponent from "./Carousel/index"
import DisplayProduct from './DisplayProduct/Index'
import Footer from '../Home/Footer/Index'


const Index : React.FC = () => {
  return (
    <>
    <MainHeader>
        <CarouselComponent/>
        <DisplayProduct/>
    </MainHeader>
        <Footer/>
    </>
  )
}

export default Index