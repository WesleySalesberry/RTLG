export const ProjectChallenges = ({ challenges, actions }) => {
  return (
    <>
      <div className="section-row">
        <h3 className="section-title">Challenges &amp; Requirements</h3>
        <p>{ challenges }</p>
      </div>
      <div className="section-row">
        <h3 className="section-title">Actions &amp; Outcomes</h3>
	      <p>{actions}</p>
      </div>
    </>
  )
}