import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import View from '../components/View'



const Dashboard = () => {
  const [username,setusername]= useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      setusername(JSON.parse(sessionStorage.getItem("user")).username)
    }
    else{
      setusername("")
    }
  },[])
  return (
    <>
    <Header insideDashbord={true}/>
    <div style={{marginTop:'100px'}} className="container-fluid">
      <div className="row mt-3">
        <div className="col-lg-8 ">
          <h1> Welcome <span className='text-warning'>{username?.split(" ")[0]}</span>,</h1>
          <div><View/></div>
        </div>
        <div className="col-lg-4">
          <Profile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
