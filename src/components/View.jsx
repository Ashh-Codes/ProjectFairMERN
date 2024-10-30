import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { removeProjectAPI, userProjectsAPI } from '../Services/allAPI'
import { addResponseContext, editResponseContext } from '../context/ConextShare'



const View = () => {
    const {addResponse,setAddResponse}=useContext(addResponseContext)
    const {editResponse,setEditResponse}=useContext(editResponseContext)
    const [userProject,setUserProject]=useState([])

    useEffect(()=>{
        getUserprojects()
    },[addResponse,editResponse])
    console.log(userProject);
    
    const getUserprojects=async()=>{
        const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        //values from postman header
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try {
        const result = await userProjectsAPI(reqHeader)
        console.log(result);
        if(result.status==200){
          setUserProject(result.data)
        }
        else{
          console.log(result.response.data);
          
        }
        

      } catch (err) {
        console.log(err);
        
        
      }
    }
    }

    const handleDeleteProject = async(pId)=>{
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader ={
          //values from postman header
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        try {
          const result =await removeProjectAPI(pId,reqHeader)
          if(result.status==200){
            getUserprojects()
          }else{
            console.log(result);
            
          }
          
  
        } catch (err) {
          console.log(err);
          
          
        }
      }

    }
  return (
   <>
   <div className="d-flex justify-content-between mt-2">
    <h2 className='text-warning'>All Projects</h2>
    <div><Add/></div>
   </div>
    <div className="mt-2">
        {
         userProject.length>0?
         userProject?.map(project=>(
            <div key={project?._id} className="border rounded p-2 mb-3 d-flex justify-content-between">
       <h3>{project?.title}</h3>
       <div className="d-flex align-items-center">
          <div><Edit project={project}/></div>
        <div className='btn'>
            <a href={project?.github} target='_blank'><i className='fa-brands fa-github'></i></a>
        </div>
        <button onClick={()=>handleDeleteProject(project?._id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
    </div>
    </div>
         ))
         :
         <div className="fw-bolder text-danger">
            No projects added!!!
         </div>
        }

    </div>
   </>
  )
}

export default View
