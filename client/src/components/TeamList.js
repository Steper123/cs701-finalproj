//react component
import React from "react";

//called component
import TeamAccessHolder from "./TeamAccessHolder"

const TeamList = ({ access, dataReturn }) => {
  if (access != null) {
    const teamsMapped = access.map(point => <TeamAccessHolder teamaccess={point} dataReturn={dataReturn}></TeamAccessHolder>);
    return (
      <ul>
        {teamsMapped}
      </ul>
    );

  }
  else {
    return (<div></div>)
  }


};

export default TeamList;
