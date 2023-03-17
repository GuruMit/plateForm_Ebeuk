import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Test from '../../test/test'
import InteractiveList from '../../test/test'
import AnnonceList from '../annonceList/anonceList'
import Mbody from './mainBody/mainbody'
import Mheader from './mainHeader/mheader'

const Main = () => {
  return (
    <>
    
    <div style={{height:"1000vh"}}>
        <Mheader/>
        <Container fluid style={{background:"#eee"}}>
            <AnnonceList/>
        </Container>
      
        <Mbody/>
    </div>
    
    </>
  )
}

export default Main