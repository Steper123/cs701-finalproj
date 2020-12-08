//styling and react components
import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import classes from './LoginScreen.module.css';

//returns the name and password input to the app home page
const LoginScreen = ({ signIn, createAccount, errorMessage }) => {

  const [name, setName] = React.useState("");
  const [pword, setPWord] = React.useState("");

  const Title = styled.h2`
    background-color: white;
    text-align: center;
    padding: 1rem;
    color: black;
  `;

  const signInButton = (
    <Button
      style={{ backgroundColor: "#0000ff", display: "flex", justifyContent: "center"}}
      onClick={() => {
        signIn(name, pword);
      }}
      >Sign In!</Button>
  );

  const createAccountButton = (
    <Button
      style={{ backgroundColor: "#0000ff", display: "flex", justifyContent: "center"}}
      onClick={() => {
        createAccount(constructNewPerson());
      }}
      >Create Account!</Button>
  );

  const constructNewPerson = () => ({
    username: name,
    password: pword
  });

  if (errorMessage === "") {
    return (
      <div>
        <Title>Welcome to VABS!</Title>
        <div className={classes.Message}>...voice-activated baseball scorer, that is. Please sign-in with a defined account in order to use the service. If you do not have an account, use the create account button below after filling out the two-fields!</div>
        <div className={classes.MessageContainer}>
          <div className={classes.MessageContainer}>
              <label>Username: </label>
              <input value={name} onChange={event => setName(event.target.value)}></input>
          </div>
          <div className={classes.MessageContainer}>
              <label>Password: </label>
              <input value={pword} type="password" onChange={event => setPWord(event.target.value)}></input>
          </div>
        </div>
        <div className={classes.ButtonContainer}>>
          <div className={classes.ButtonContainer}>
              {signInButton}
          </div>
          <div className={classes.ButtonContainer}>
              {createAccountButton}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Title>Welcome to VABS!</Title>
      <div className={classes.Message}>...voice-activated baseball scorer, that is. Please sign-in with a defined account in order to use the service. If you do not have an account, use the create account button below after filling out the two-fields!</div>
      <strong className={classes.Error}>{errorMessage}</strong>
      <div className={classes.MessageContainer}>
        <div className={classes.MessageContainer}>
            <label>Username: </label>
            <input value={name} onChange={event => setName(event.target.value)}></input>
        </div>
        <div className={classes.MessageContainer}>
            <label>Password: </label>
            <input value={pword} type="password" onChange={event => setPWord(event.target.value)}></input>
        </div>
      </div>
      <div className={classes.ButtonContainer}>>
        <div className={classes.ButtonContainer}>
            {signInButton}
        </div>
        <div className={classes.ButtonContainer}>
            {createAccountButton}
        </div>
      </div>
    </div>
  );



}

export default LoginScreen;
