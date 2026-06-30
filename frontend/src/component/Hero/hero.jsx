import React from 'react'
import './Hero.css'
import arrowicon from '../Assets/arrow.png'
import hero_image from '../Assets/target_hero.png'
const Hero = () => {
  return (
    <div className='hero'>
    <div className="hero-left">
  <h2>NEW ARRIVALS ONLY</h2>
  <div>
    <div className='hero-hand-icon'>
    <p>new</p>
    </div>
    <p> collection</p>
    <p>for everyone</p>   

  </div>
  <div className="hero-latest-btn" onClick={() => document.getElementById('new-collections').scrollIntoView({ behavior: 'smooth' })}>
    <div>Latest Collection</div>
    <img src={arrowicon} alt="" />
  </div>


    </div>
    <div className="hero-right">
    <img src={hero_image} alt="" />


    </div>
    
      
    </div>
  )
}

export default Hero
