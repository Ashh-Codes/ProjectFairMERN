import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uploadimage from '../assets/uploadimage.png'
import { addProjectAPI } from '../Services/allAPI';
import { addResponseContext } from '../context/ConextShare';



const Add = () => {
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const [preview,setpreview] = useState(uploadimage)
  const [imagefilestatus,setimagefilestatus] =useState(false)
  const [projectData,setprojectData] = useState({
    title:'',language:'',overview:'',github:'',website:'',projectImg:''
  })
  console.log(projectData);
  
  useEffect(()=>{
    if(projectData.projectImg.type=="image/png" || projectData.projectImg.type=="image/jpg"|| projectData.projectImg.type=="image/jpeg"){
      setimagefilestatus(true)
      setpreview(URL.createObjectURL(projectData.projectImg))
    }
    else{
      setimagefilestatus(false)
      setpreview(uploadimage)
      setprojectData({...projectData,projectImg:""})
    }
  },[projectData.projectImg])
    const [show, setShow] = useState(false);

  const handleClose = () =>{
    setShow(false);
    setprojectData({title:'',language:'',overview:'',github:'',website:'',projectImg:''})
  }
    
  const handleShow = () => setShow(true);

  const handlesaveProject =async()=>{
    const {title,language,overview,github,website,projectImg} =projectData
    if(title&&language&&overview&&github&&website&&projectImg){
     
      //create reqbody as  form data since we are passing file to backend(change in post man aswell) 
      const reqBody = new  FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader ={
          //values from postman header
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //api call
        try {
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
           // alert("Project added successfully")
            //share to context
            setAddResponse(result)
          }
          else{
            alert(result.response.data)
          }
          
        } catch (err) {
          console.log(err);
          
        }
      }

    }else{
      alert("Please fill form completely")
    }
  }
  return (
   <>
   <button onClick={handleShow} className='btn btn-primary'><i className='fa-solid fa-plus'></i>New Project</button>
   <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
                <div className="col-lg-4">
                    <label >
                        <input onChange={e=>setprojectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
                        <img height={'200px'} className='img-fluid' src={preview} alt="" />
                    </label>
                    {
                      !imagefilestatus &&
                      <div className="text-warning fw-bolder my-2">Upload only the following types(jpg,png,jpeg) here!!!</div>

                    }
               </div>
                <div className="col-lg-8">
                    <div className="mb-2">
                        <input value={projectData.title}  onChange={e=>setprojectData({...projectData,title:e.target.value})} type="text" placeholder='Project title' className='form-control'/>
                    </div>
                    <div className="mb-2">
                        <input value={projectData.language}  onChange={e=>setprojectData({...projectData,language:e.target.value})} type="text" placeholder='Languages used in Project' className='form-control'/>
                    </div>
                    <div className="mb-2">
                        <input value={projectData.overview}  onChange={e=>setprojectData({...projectData,overview:e.target.value})} type="text" placeholder='Project overview' className='form-control'/>
                    </div>
                    <div className="mb-2">
                        <input value={projectData.github}  onChange={e=>setprojectData({...projectData,github:e.target.value})} type="text" placeholder='Project github link' className='form-control'/>
                    </div>
                    <div className="mb-2">
                        <input value={projectData.website}  onChange={e=>setprojectData({...projectData,website:e.target.value})} type="text" placeholder='Project website link' className='form-control'/>
                    </div>
                </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handlesaveProject} variant="primary" >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default Add
