import React from 'react'
import NavBar from '../Nav/navbar'
import ImageSlider from './backgroundslider/bgslider'
import Slider from './slider/slider'
import { Container } from 'react-bootstrap'




const Header = () => (
    <>

        <div>
        <ImageSlider/>
        <Slider/>
        </div>


    </>
)

export default Header