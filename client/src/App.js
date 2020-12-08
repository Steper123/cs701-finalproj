/* styling and react components */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Button, Row} from "reactstrap";

/*components called from app*/
import LoginScreen from "./components/LoginScreen";
import TeamList from "./components/TeamList";
import TeamPage from "./components/TeamPage";

/*css and graphics*/
import classes from './App.css';
import bbLogo from './assets/images/baseball.png';

const Header = styled.h1`
  background-color: green;
  text-align: center;
  padding: 1rem;
  color: white;
`;

const App = () => {
  /*hooks*/
  const [currUser, setUser] = React.useState(null);
  const [access, setAccess] = React.useState(null);
  const [signinError, setError] = React.useState("");

  const [mode, setMode] = React.useState("Home");
  const [selectedTeam, setTeam] = React.useState(null);
  const [desiredAccess, setDesired] = React.useState(null);

  useEffect(() => {
    /*Finds if a user is signed in already, returning their accesses if so*/
      const fetchUser = () => {
        fetch("/api/users")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedUsers) => {
            const checkedSignedIn = fetchedUsers.filter(user => user.signedIn ===1);
            if (checkedSignedIn.length !==0) {
              setUser(checkedSignedIn[0]);
              const myID = checkedSignedIn[0].id;
              return myID;
            }
          }).then((thatID) => {
            /*calls for the teamaccess of a signed-in user*/
            if (thatID !==null) {
              fetch(`/api/teamaccess`)
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  }
                  throw new Error(response.statusText);
                })
                .then((fetchedAccesses) => {
                  /*Finds the accesses that connect to the given user*/
                    const filteredAccess = fetchedAccesses.filter(point => point.userId ===thatID);
                    setAccess(filteredAccess);
                  })
                .catch((err) => console.error(err)); // eslint-disable-line no-console
            }
          })
          .catch((err) => console.error(err)); // eslint-disable-line no-console
      };
      fetchUser();
}, [currUser]);


  const handleSignInReturn = (username, password) => {
    //Puts user into the database with 1 in the signed in field
    fetch("/api/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((fetchedUsers) => {
        const checkedSignedIn = fetchedUsers.filter(user => user.username ===username && user.password ===password);
        if (checkedSignedIn.length !==0) {

          const newPerson = {
            id: checkedSignedIn[0].id,
            username: checkedSignedIn[0].username,
            password: checkedSignedIn[0].password,
            signedIn: 1
          }

          //Same person as found, just adding as signed-in
          const updatedPerson = {...checkedSignedIn[0], ...newPerson};

          fetch(`/api/users/${updatedPerson.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedPerson),
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json"
            })
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);

            })
            .then((finished) => {
              setUser(finished);
              setError("");

            })
            .catch(err => {
              console.error(err);
            });
        }
        else {
          /*error return if person is not found*/
          setError("Your username/password combination do not match the ones found in our database");
        }
      })
      .catch((err) => console.error(err)); // eslint-disable-line no-console

  };

  const handleSignOutReturn = () => {
    /*sets signedIn field to 0 if person is signing out*/
    const updatedPerson = {...currUser, signedIn: 0};

    fetch(`/api/users/${currUser.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPerson),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);

      })
      .then((finished) => {
        setUser(null);
        setMode("Home");

      })
      .catch(err => {
        console.error(err);
      });


  }

  const handleAccountCreation = (personCredentials) =>
    {
      /*uses a post to make an account when create account is pressed*/
      fetch("/api/users")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((fetchedUsers) => {
          const checkedSignedIn = fetchedUsers.filter(user => user.username ===personCredentials.username);
          if (checkedSignedIn.length !== 0) {
            setError("Someone with this username already exists! Either sign-in to your other account or try a new username");
          }
          else {
            fetch("/api/users", {
              method: "POST",
              body: JSON.stringify(personCredentials),
              headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json"
              })
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error(response.statusText);
              })
              .then(receivedPerson => {
                setUser(receivedPerson);
              })
              .catch(err => {
                console.error(err);
              });
          }
        })
        .catch((err) => console.error(err));  // eslint-disable-line no-console
    };

  const teamDataReturn = (team, returnedAccess) => {
    //a team being returned from the access list is passed as selected, meaning the user
    //wants to advance to the team page.
    setTeam(team);
    setDesired(returnedAccess);
    setMode("Team");
  };

  const baseballImage = (
    <div>
      <img src={bbLogo} alt="BBLogo" class="center" />
    </div>
  );

  if (currUser ===null && mode ==="Home") {
    return (
      <div>
        <Row>
          {baseballImage}
        </Row>
        <Row>
          <Header>Voice-Activated Baseball Scoring</Header>
        </Row>
        <Container>
          <LoginScreen signIn={handleSignInReturn} createAccount={handleAccountCreation} errorMessage={signinError}></LoginScreen>
        </Container>
      </div>
    );
  }

  else if (currUser !==null && mode ==="Home") {
    return (
      <div>
        <Header>Voice-Activated Baseball Scoring</Header>
        <div className={classes.Message}>Thanks for signing-in! Please select one of your teams below to get started.</div>
        <TeamList access={access} dataReturn={teamDataReturn}></TeamList>
        <div className={classes.ButtonContainer}>
          <Button onClick={handleSignOutReturn}>Sign Out!</Button>
        </div>
      </div>
    );
  }

  else {
    return (
      <div>
        <Header>Voice-Activated Baseball Scoring</Header>
        <TeamPage team={selectedTeam} access={desiredAccess} returnHome={() => setMode("Home")}></TeamPage>
      </div>
    );
  }


};

export default App;
