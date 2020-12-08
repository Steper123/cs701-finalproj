//react component
import React from "react";

//components called from this base section
import ButtonArea from "./ButtonArea";
import AddDeletePerson from "./AddDeletePerson";
import EventHolder from "./EventHolder";
import StatsSection from "./StatsSection";

//css
import classes from "./TeamPage.module.css";



const TeamPage = ({ team, access, returnHome }) => {
  const [teamMode, setTeamMode] = React.useState("Home");

  const teamLogo = (
    <div>
      <img src={require(`../assets/images/${team.name.toLowerCase()}.png`)} alt="MyLogo" class="center" />
    </div>
  );

  const typeChecker = (num) => {
    if (num == 3) {
      return "Fan";
    }
    else if (num == 2) {
      return "Scorer";
    }
    else if (num == 1) {
      return "Admin/Coach"
    }
  }

  if (teamMode == "Home") {
    return (
      <div>
        <strong className={classes.AccessLevel}>Access level: {typeChecker(access.type)}</strong>
        <ButtonArea access={access} team={team} returnHome={returnHome} setTeamState={setTeamMode}></ButtonArea>
        {teamLogo}
      </div>
    );
  }
  else if (teamMode == "Game") {
    return (
      <div>
        <EventHolder team={team} back={() => setTeamMode("Home")} userId={access.userId}></EventHolder>
      </div>
    );
  }
  else if (teamMode == "Stat") {
    return (
      <div>
        <StatsSection team={team} back={() => setTeamMode("Home")}></StatsSection>
      </div>
    );
  }
  else {
    return (
      <div>
        <AddDeletePerson team={team} type={teamMode} back={() => setTeamMode("Home")} returnHome={returnHome}></AddDeletePerson>
      </div>
    );
  }




};

export default TeamPage;
