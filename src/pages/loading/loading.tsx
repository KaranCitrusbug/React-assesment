import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import './style.css'

const Loading:React.FC = () => {
  const [showSpin, setShowSpin] = useState(true);

  useEffect(()=>{
    const intervalId = setInterval(() => {
      setShowSpin((prevShowSpin) => !prevShowSpin);
    }, 1000)
    
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className='loading'>
     {showSpin  && <Spin size='large'/>}
    </div>
  )
}

export default Loading
