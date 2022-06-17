import React from 'react'
import image from '../assets/logo.jpeg'

export function Cabecera() {
  return (
    <div className='menu-container'>
      <div className='logo'><img src={image}></img></div>
    </div>
  )
}
