import commonAPI from "./commonAPI"
import serverURL from "./serverURL"



//reg called by auth
export const registerAPI =async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)

}

//login called by auth
export const loginAPI =async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)

}

export const addProjectAPI =async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-project`,reqBody,reqHeader)
}

//get all projects for home
export const homeProjectAPI= async()=>{
    return await commonAPI("GET",`${serverURL}/home-projects`,"")
}

//getall projects for projects  component

export const allProjectsAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/all-projects?search=${searchKey}`,"",reqHeader)
}

//user-projects called by Dashboard

export const userProjectsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/user-projects`,"",reqHeader)
}

//delete project called by view
export const removeProjectAPI =async(pId,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/${pId}/remove-project`,{},reqHeader)
}

//edit project called by edit
export const editProjectAPI =async(pId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/${pId}/edit-project`,reqBody,reqHeader)
}

//edit profile clled by profie
export const editUserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/user/edit`,reqBody,reqHeader)

}