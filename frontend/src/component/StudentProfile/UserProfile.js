import { useEffect } from "react"

import { Meta } from "../Meta"
import { useStudentProfile } from "../../Hooks/useStudentProfile"
import { useUserContext } from "../../Hooks/useUserContext"
import { useTokenContext } from "../../Hooks/useTokenContext"
import { ProfileHeader } from "./UserProfileHeader"
import { UserProjects } from "./UserProjects"

export const UserProfile = () => {

  const { studentProfile, isLoading, error } = useStudentProfile();
  const { user } = useUserContext();
  const { isAuthorized } = useTokenContext()

  console.log(isAuthorized)

  useEffect(() => {
   // if(isAuthorized)
    studentProfile();
  }, [])

  if(isLoading){
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }else if(error){
    return (
      <div>
         <p>{error}</p>
      </div>
    )
  }

  if(user){
    return (
      <>
        <Meta
          title={`${user.name}`}
          description={`${user.description}`}
          url={window.location.href}
        />
        <div className="my-3">
          <ProfileHeader
            name={user.name}
            email={user.email}
            img={user.image}
            description={user.description}
          /> 
        </div>
        <div className="my-3">
          <UserProjects
            name={user.name}
            projects={user.projects} 
          />
        </div>
      </>
    )
  }
  
}