import React,{useContext, useEffect, useState} from 'react'
import { Modal,Button} from 'react-bootstrap'
import uploadimage from '../assets/uploadimage.png'
import serverURL from '../Services/serverURL'
import { editResponseContext } from '../context/ConextShare'
import { editProjectAPI } from '../Services/allAPI'


const Edit = ({project}) => {
  const {editResponse,setEditResponse}=useContext(editResponseContext)
  const [projectData,setprojectData] = useState({
    id:project?._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImg:''
  })
  useEffect(()=>{
    if(projectData.projectImg.type=="image/png" || projectData.projectImg.type=="image/jpg"|| projectData.projectImg.type=="image/jpeg"){
      setimagefilestatus(true)
      setpreview(URL.createObjectURL(projectData.projectImg))
    }
    else{
      setimagefilestatus(false)
      setpreview("")
      setprojectData({...projectData,projectImg:""})
    }
  },[projectData.projectImg])
  const [preview,setpreview] = useState("")
  const [imagefilestatus,setimagefilestatus] =useState(false)
    const [show, setShow] = useState(false);

    const handleUpdateProject =async()=>{
      const {id,title,language,overview,github,website} =projectData
      if(title&&language&&overview&&github&&website){
        const reqBody = new  FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project?.projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader ={
          //values from postman header
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        try {
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("Project edited successfully")
            handleClose()
            setEditResponse(result)

          }else{
            console.log(result);
            
          }
          
        } catch (err) {
          console.log(err);
          
          
        }

      }
    }
      else{
        alert('Please fill form completely')
      }
    }

    const handleClose = () => {
      setShow(false);
      setprojectData({
        id:project?._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImg:''
      })
    }
    const handleShow = () => {
      setShow(true);
      setprojectData({
        id:project?._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectImg:''
      })
    }
    return (
     <>
     <button onClick={handleShow} className='btn '><i className='fa-solid fa-edit'></i></button>
     <Modal size='lg' centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row align-items-center">
                <div className="col-lg-4">
                    <label >
                        <input onChange={e=>setprojectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
                        <img height={'200px'} className='img-fluid' src={preview?preview:`${serverURL}/uploads/${project?.projectImg}`} alt="" />
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
            <Button onClick={handleUpdateProject} variant="primary" >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
     </>
    )
}

export default Edit
