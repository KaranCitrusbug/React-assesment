import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { VerifyToken } from '../../../services/AuthService'
import { ToastSuccess } from '../../../utils/ToastMessage'

const AuthToken :React.FC = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    const verifyTokenEmail = async ()=>{
        try{
             await VerifyToken(token)
            ToastSuccess("Email verify successfully");
            navigate('/login')            
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        verifyTokenEmail()
    })
  return (
    <></>
  )
}

export default AuthToken
