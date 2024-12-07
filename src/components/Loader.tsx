import React from 'react'
import './LoaderStyles.css'

/**
 * @file Loader.tsx
 * @description The Loader component renders a loading animation while the shipment details are retrived.
 * @dependencies
 * React: Provides the framework for defining the component.
 * LoaderStyles.css: Defines the styles for the loader component.
 */

const Loader = () => {
  return (
    <div className='loader-container'>
    <div className='loader'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
    </div>
    </div>
  )
}

export default Loader
