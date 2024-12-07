import React from 'react'
import bosta_logo from './bosta_logo.png'
import './styles.css'

/**
 * @file Bosta.tsx
 * @description This file defines the `Bosta` component, which renders the header 
 * section of the Bosta website. The header contains the company's logo, navigation 
 * links for different sections of the site.
 * @component
 * **Bosta**: The main header of the Bosta website, including logo, navigation links, 
 *   and user options like tracking and login.
 * @dependencies
 * React: Provides the framework for defining the component.
 * bosta_logo.png: The image file used for the company logo.
 * styles.css: Defines the styles for the header, logo, and navigation links.
 */


const Bosta: React.FC = () => {
  return (
    <header className='bosta__header'>
    <div className='bosta__logo'>
        <img src={bosta_logo} alt="Bosta Logo" className="bosta__logo--image" />
        <span>بوسطة</span>
    </div>

    <nav className="bosta__nav--center">
        <a className="bosta__header--link" href="/">
          الرئيسية
        </a>
        <a className="bosta__header--link" href="/">
          اللأسعار
        </a>
        <a className="bosta__header--link" href="/">
          كلم المبيعات
        </a>
      </nav>

      
      <nav className="bosta__nav--left">
        <a className="bosta__header--link" href="/tracking">
          تتبع شحنتك
        </a>
        <a className="bosta__header--link" href="/login">
          تسجيل الدخول
        </a>
      </nav>
    
    </header>
  )
}

export default Bosta
