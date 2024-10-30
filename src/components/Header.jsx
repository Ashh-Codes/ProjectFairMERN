import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../context/AuthContext'



const Header = ({insideDashbord}) => {
  const {isAuthorised,setisAuthorised} =useContext(tokenAuthContext)
  const navigate =useNavigate()
  const handleLogout=()=>{
    sessionStorage.clear()
    setisAuthorised(false)
    navigate('/')
  }
  return (
    <Navbar style={{zIndex:'1'}} className="positon-fixed w-100 top-0 rounded border">
    <Container>
      <Navbar.Brand href="#home">
       <Link className='fw-bolder' style={{textDecoration:'none',color:'white'}} to={'/'}><i className='fa-brands fa-docker'></i>Project Fair</Link>
      </Navbar.Brand>
      {
        insideDashbord &&
            <div className='ms-auto'>
                <button onClick={handleLogout} className='btn btn-link fw-bolder'>Logout <i className='fa-solid fa-right-from-bracket'></i></button>

            </div>
      }
    </Container>
  </Navbar>
  )
}

export default Header
