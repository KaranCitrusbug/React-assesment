import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Loading from '../pages/loading/loading'

const HomePage= lazy(()=> import('../pages/Home/index'))
const Login = lazy(()=> import('../pages/Auth/Login'))
const SignUp = lazy(()=> import('../pages/Auth/signUp'))
const PageNotFound =lazy(()=> import('../pages/PageNotFound/PageNotFound'))
const Cart =lazy(()=> import('../components/core/Cart/index'))
const AddProduct =lazy(()=> import('../pages/Admin/Index'))
const Blogs =lazy(()=>import("../pages/Feedback/Index"))

const RoutesPage:React.FC = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loading/>}>
          <Routes>
            <Route  path='/' Component={HomePage}></Route>
            <Route  path='/login' Component={Login}></Route>
            <Route  path='/signup' Component={SignUp}></Route>
            <Route path='/cart' Component={Cart}></Route>
            <Route path='/blog' Component={Blogs}></Route>
            <Route  path='*' Component={PageNotFound}></Route>
            <Route path='/admin/add-product' Component={AddProduct}></Route>
          </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default RoutesPage
