import React from 'react'
import BlogPage from '../../components/core/Blog/Index'
import MainHeader from '../../components/core/Home/Header/Index'

const Index :React.FC= () => {
  return (
    <MainHeader>
        <BlogPage/>
    </MainHeader>
  )
}

export default Index
