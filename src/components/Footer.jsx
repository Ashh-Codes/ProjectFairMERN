import React from 'react'
import { Button,Modal ,Form,FloatingLabel} from 'react-bootstrap'

const Footer = () => {
  return (
    <div>
      <div style={{height:'300px'}} className='container p-4  mt-5 w-100 shadow'>
        <div className="d-flex row justify-content-center">
           <div className="col-md-5">
            <h5>Introduction</h5>
            <p className='mt-4'>Project Fair  app is to store your Projects that you want to save according to your taste and skills accordings for best experience and easy access.</p>

           </div>
           <div className="col-md-2"> <h5>Links</h5>
           <div className='d-flex flex-column justify-content-center'>
           <a className='text-decoration-none text-white' href="">Home</a>
           <a className='text-decoration-none text-white' href="">Category</a>
           <a className='text-decoration-none text-white' href="">Register</a>
           <a className='text-decoration-none text-white' href="">Projects</a>
           </div>
           </div>
           <div className="col-md-2"> <h5>Guids</h5>
           <div className='d-flex flex-column justify-content-center'>
           <a className='text-decoration-none text-white' href="">React</a>
           <a className='text-decoration-none text-white' href="">React Bootstrap</a>
           <a className='text-decoration-none text-white' href="">Router</a>
           </div>
           </div>
           <div className="col-md-3"><h5>Contact Us</h5>
           <div className='d-flex row'>
           <div className='col-md-8'>
           <FloatingLabel 
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
        
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
           </div>
            <div className="col-md-4">
            <button style={{height:'55px'}} className='btn btn-info ms-2'><i class="fa-solid fa-arrow-right"></i></button>

            </div>
           </div>
           <div className='d-flex justify-content-between'>
           <i class="fa-brands fa-facebook"></i>
           <i class="fa-brands fa-instagram"></i>
           <i class="fa-brands fa-twitter"></i>
           <i class="fa-brands fa-linkedin"></i>
           <i class="fa-brands fa-github"></i>
           </div>
           </div>
           
        </div>

        <div className='text-center mt-5'>copyright @copy;  May 2024 @reg; Project Fair</div>
      
    </div>
    </div>
  )
}

export default Footer
