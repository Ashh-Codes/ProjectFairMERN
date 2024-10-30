import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import projectimg from'../assets/projectimg.webp'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectAPI } from '../Services/allAPI'



const Home = () => {
  const [allHomeProjects,setallHomeProjects] =useState([])

  const navigate = useNavigate()
  const handleProject=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("Please login")
    }
  }

  useEffect(()=>{
    getAllHomeProjects()
  },[])
  console.log(allHomeProjects);
  
  const getAllHomeProjects =async()=>{
    try {
      const result = await homeProjectAPI()
      if(result.status==200){
        setallHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <div>
      <div style={{minHeight:'100vh'}}   className="d-flex justify-content-center align-items-center rounded shadow w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{fontSize:'70px'}}><i className='fa-brands fa-docker'></i>Project Fair</h1>
              <p style={{textAlign:'justify'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates deleniti iusto dignissimos quos? Similique, eos saepe sit debitis sunt quas, unde laboriosam praesentium architecto cumque esse, eveniet fuga quo voluptates?</p>

              {
                sessionStorage.getItem("token")?
                <Link  to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                :
                <Link  to={'/login'} className='btn btn-warning'>Start to Explore</Link>
              }
            </div>
            <div className="col-lg-6">
              <img className='img-fluid' src={projectimg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee>
          <div className="d-flex">
           {
            allHomeProjects?.length>0 &&
            allHomeProjects?.map(project=>(
              <div key={project?._id} className="me-5">
              <ProjectCard displayData ={project}/>
            </div>
            ))
           }
          </div>
        </marquee>
        <button onClick={handleProject} className='btn btn-link mt-5'>Click here to view more projects...</button>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <h1>Our Testimonials</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
          <Card style={{ width: '18rem' }}>
       
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} className='img-fluid rounded-circle' src="https://www.pngmart.com/files/22/User-Avatar-Profile-Transparent-Background.png" alt="" />
                <span>Rahul MP</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex align-items-center justify-content-center mb-2'>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                </div>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. quae modi ab repellat quod voluptatum incidunt eveniet dicta. Harum, rem nesciunt.</p>
              </Card.Text>
       
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
       
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} className='img-fluid rounded-circle' src="https://cdn1.iconfinder.com/data/icons/people-avatar-flat-2/128/1-12-512.png" alt="" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex align-items-center justify-content-center mb-2'>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                </div>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. quae modi ab repellat quod voluptatum incidunt eveniet dicta. Harum, rem nesciunt.</p>
              </Card.Text>
       
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
       
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} className='img-fluid rounded-circle' src="https://www.pngmart.com/files/22/User-Avatar-Profile-Transparent-Background.png" alt="" />
                <span>Ashitha Raj</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex align-items-center justify-content-center mb-2'>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                 
                </div>
                <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. quae modi ab repellat quod voluptatum incidunt eveniet dicta. Harum, rem nesciunt.</p>
              </Card.Text>
       
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
