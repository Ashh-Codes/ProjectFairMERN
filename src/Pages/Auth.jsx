import React, { useContext, useState } from 'react'
import icon1 from '../assets/icon1.jpg'


import { FloatingLabel,Form,Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPI'
import { tokenAuthContext } from '../context/AuthContext'



const Auth = ({insideRegister}) => {
  const {isAuthorised,setisAuthorised} =useContext(tokenAuthContext)

  const [isloading,setisloading] =useState(false)
  const navigate =useNavigate()
  const [userData,setUserData] = useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userData);
  const handleRegister =async(e)=>{
    e.preventDefault()
    if(userData.username&& userData.email&&userData.password){
      //api call
      try {
        const result = await registerAPI(userData)
        console.log(result);
        if(result.status==200){
          alert(`Welcome ${result?.data?.username},please login to explore more`)
          setUserData({username:"",email:"",password:""})
          navigate('/login')

        }else{

          if(result.response.status == 406){
            alert(result.response.data)
            setUserData({username:"",email:"",password:""})
          }
        }
        
        
      } catch (err) {
        console.log(err);
        
        
      }

    }
    else{
      alert("please fill the form completetly")
    }
  }

  const handleLogin =async(e)=>{
    e.preventDefault()
    if(userData.email&&userData.password){
      //api call
      try {
        const result = await loginAPI(userData)
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setisAuthorised(true)
          setisloading(true)
          setTimeout(() => {
            setUserData({username:"",email:"",password:""})
          navigate('/')
          setisloading(false)
          }, 2000);
          
        }
        else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }
        
      } catch (err) {
        console.log(err);
        
        
      }
    }


  }

  return (
    <div>
      <div style={{width:'100%',minHeight:'100vh'}} className="d-flex justify-content-center align-items-center">
        <div className="container w-75">
          <div className="card shadow p-2">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img className='w-100' src={icon1} alt="" />
              </div>
              <div className="col-lg-6">
                <h1 className='fw-bolder mt-2'><i className='fa-brands fa-docker'></i>Project Fair</h1>
                <h5 className='fw-bolder mt-2'>
                  Sign {insideRegister?"Up":"In"} to your account
                </h5>
                {
                  insideRegister&&
                  <FloatingLabel controlId="floatingInputusrname" label="Username" className="mb-3">
                  <Form.Control value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} type="text" placeholder="username" />
                </FloatingLabel>
                }

                          <FloatingLabel controlId="floatingInputemail" label="Email address" className="mb-3" >
                            <Form.Control value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} type="email" placeholder="name@example.com" />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} type="password" placeholder="Password" />
                          </FloatingLabel>
                          {
                            insideRegister?
                            <div className="mb-3 mt-2">
                                <button onClick={handleRegister} className="btn btn-primary mb-2">Register</button>
                                <p>Already have an account?Click here to <Link to={'/login'}>Login</Link></p>
                            </div>
                            :
                            <div className="mb-3 mt-2">
                              <button onClick={handleLogin} className="btn btn-primary mb-2 me-2">Login</button>
                              {isloading &&
                                <Spinner animation="border" variant="light" />

                              }
                              <p>New  user?Click here to <Link to={'/register'}>Register</Link></p>
                            </div>
                          }
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth