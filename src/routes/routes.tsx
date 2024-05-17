import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Loading from '../pages/loading/loading'

const HomePage= lazy(()=> import('../pages/Home/index'))
const Login = lazy(()=> import('../pages/Auth/Login'))
const SignUp = lazy(()=> import('../pages/Auth/signUp'))
const PageNotFound =lazy(()=> import('../pages/PageNotFound/PageNotFound'))
const cart =lazy(()=> import('../components/core/Cart/index'))

const RoutesPage:React.FC = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loading/>}>
          <Routes>
            <Route  path='/' Component={HomePage}></Route>
            <Route  path='/login' Component={Login}></Route>
            <Route  path='/signup' Component={SignUp}></Route>
            <Route path='/cart' Component={cart}></Route>
            <Route  path='*' Component={PageNotFound}></Route>
          </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default RoutesPage
