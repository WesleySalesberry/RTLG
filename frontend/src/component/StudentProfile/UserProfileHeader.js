import { useDeleteUser } from "../../Hooks/useDelete"

export const ProfileHeader = ({name, img, description }) => {
	const { deleteUser, isLoading, error } = useDeleteUser()



  return (
    <div className="card">
      <div className="row gx-lg-5 justify-content-center my-3 mx-3">
        <div className="col-12 col-md-auto text-center">
				  <img className="rounded mx-auto" src={img} alt=""/>
			  </div>
				<div className="col text-center text-md-start">
					<div className="lead">Hello, my name is</div>
					<h2 className="mt-0 display-4 font-weight-bold">{name}</h2>
					<div className="mb-3">{ description }</div>
					<div className="row">
						<div className="col-md-4">
							<a className="btn btn-secondary font-weight-bold theme-btn-cta" href="contact.html">Update Profile</a>
						</div>
						<div className="col-md-4">
							<a className="btn btn-secondary font-weight-bold theme-btn-cta" href="contact.html">Add A Project</a>
						</div>
						<div className="col-md-4">
							<span 
								className="btn btn-danger font-weight-bold theme-btn-cta"
								onClick={() => deleteUser()} 
							>
								Delete Account
							</span>
						</div>
					</div>
				</div>
		  </div>
    </div>
  )
}