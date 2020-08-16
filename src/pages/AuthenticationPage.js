import React, {useState} from 'react';
import backgroundImage from '../assets/loginSignUpBackground.png';
import quickChatLogo from '../assets/yumChatLogo.png';
import {theme} from '../model/cssTheme'
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";

const LoginCanvas = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage}),
    linear-gradient(36deg, rgba(217,42,46,0.7) 12%, rgba(240,209,169,0.7) 79%);
  background-size: cover;
`;

const AuthBoxContainer = styled(Box)`
  width: 350px;
  height: 350px;
`

const LogoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const YumChatLogo = styled.img`
  -webkit-filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0,0.5));
  margin-bottom: 20px;
  height: 200px;
`

let bannerOverHangPercentage = 110;
const WelcomeBanner = styled(Box)`
  background-color: ${theme.colors.primary};
  display: flex;
  width: ${bannerOverHangPercentage}%;
  left: -${(bannerOverHangPercentage / 2) - 50}%;
  top: 15px;
  height: 50px;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadii.small};
  box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.24);
`

const WelcomeText = styled.h1`
  //line-height: 44px;
  font-size: 30px;
  color: white;
  //padding-bottom: 1px;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
`

const FormFieldContainer = styled(Box)`
  padding: 10px;
  //background-color: blueviolet;
  width: 100%;
`;

const AuthFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  //background-color: azure;
`;

const ProceedButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: gray;
`;

const ProceedButton = styled(Button)`
  &&{
  position: absolute;
  width: 213px;
  color: white;
  background-color: ${theme.colors.primary};
  &:hover{
    background-color: ${theme.colors.accentOne};
    box-shadow: ${theme.misc.buttonHoverBoxShadow};
  }}
`;

const LoginSignUpSwitchContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 10px;
  font-size: 12px;
  //background-color: gray;
`;

const AuthenticationPage = () => {
    const initialFormData = {
        username: "",
        email: "",
        password: "",
        usernameErrorText: "",
        emailErrorText: "",
        passwordErrorText: "",
    };

    const [isLoginActive, switchAuthForm] = useState(true);
    const [formData, updateFormData] = useState({...initialFormData});

    const changeAuthMode = () => {
        switchAuthForm(!isLoginActive);
        updateFormData({...initialFormData})
    }

    const updateFieldValue = (e, textLocation) => {
        console.log(e.target.value);
        console.log(textLocation);
        updateFormData({...formData, [textLocation]: e.target.value});
        console.log(formData);
        // e.target.value
    }

    const doAuthenticate = (e) => {
        console.log("FORM SUBMISSION ATTEMPTED!");
        e.preventDefault();
        //todo do validate
        //todo check which form, call on like that
    }

    return (
        <LoginCanvas>
            <LogoContainer>
                <YumChatLogo src={quickChatLogo} alt=""/>
            </LogoContainer>
            <Paper elevation={4}>
                <div style={{height: "50px", width: "100%", position: "relative"}}>
                    <Slide in={isLoginActive} direction="right">
                        <WelcomeBanner>
                            <WelcomeText>Log Back Into YumChat!</WelcomeText>
                        </WelcomeBanner>
                    </Slide>
                    <Grow in={!isLoginActive} direction="right">
                        <WelcomeBanner>
                            <WelcomeText>Sign Up For YumChat!</WelcomeText>
                        </WelcomeBanner>
                    </Grow>
                    {/*<WelcomeBanner>*/}
                    {/*    <WelcomeText>Sign Up For YumChat!</WelcomeText>*/}
                    {/*</WelcomeBanner>*/}
                </div>
                <AuthBoxContainer>
                    <AuthFormContainer>
                        <FormControl>
                            <FormFieldContainer>
                                <Grow in={!isLoginActive} direction="top">
                                    <TextField value={switchAuthForm["username"]} id="usernameInput" label="Username"
                                               variant="outlined" required
                                               onChange={(e) => {
                                                   updateFieldValue(e, "username");
                                               }}/>
                                </Grow>
                            </FormFieldContainer>
                            <FormFieldContainer>
                                <TextField value={switchAuthForm["email"]} id="emailInput" label="Email"
                                           variant="outlined" required
                                           onChange={(e) => {
                                               updateFieldValue(e, "email");
                                           }}/>
                            </FormFieldContainer>
                            <FormFieldContainer>
                                <TextField value={switchAuthForm["password"]} id="passwordInput" label="Password"
                                           variant="outlined" required
                                           onChange={(e) => {
                                               updateFieldValue(e, "password");
                                           }}/>
                            </FormFieldContainer>
                            <ProceedButtonContainer>
                                <Grow in={!isLoginActive} direction="left">
                                    <ProceedButton variant="contained"
                                                   disableElevation onClick={(e) => doAuthenticate(e)}>
                                        Sign Up
                                    </ProceedButton>
                                </Grow>
                                <Slide in={isLoginActive} direction="right">
                                    <ProceedButton variant="contained"
                                                   disableElevation onClick={(e) => doAuthenticate(e)}>
                                        Log In
                                    </ProceedButton>
                                </Slide>
                            </ProceedButtonContainer>
                        </FormControl>
                        <LoginSignUpSwitchContainer>
                            <Slide in={isLoginActive} direction="right" style={{position: "absolute"}}>
                                <div>
                                    Don't have account yet? &nbsp;
                                    <Link onClick={() => changeAuthMode()}>
                                        Sign Up!
                                    </Link>
                                </div>
                            </Slide>
                            <Grow in={!isLoginActive} direction="right" style={{position: "absolute"}}>
                                <div>
                                    Already have an account? &nbsp;
                                    <Link onClick={() => changeAuthMode()}>
                                        Sign In!
                                    </Link>
                                </div>
                            </Grow>
                        </LoginSignUpSwitchContainer>
                    </AuthFormContainer>
                </AuthBoxContainer>
            </Paper>
        </LoginCanvas>
    );
};

export default AuthenticationPage;