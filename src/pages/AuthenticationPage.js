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
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import {doesUserExist, getUserByUid, updateUserInfo} from "../services/firestore";
import {auth} from "../services/firebase";
import {useDispatch} from "react-redux";
import {actions} from "../model/redux";
import context from "react-router/modules/RouterContext";

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
  height: 400px;
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
  font-size: 30px;
  color: white;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
`

const FormFieldContainer = styled(Box)`
  padding: 10px;
  width: 100%;
`;

const AuthFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
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

const AuthenticationPage = (props) => {
    const dispatch = useDispatch();
    const initialFormData = {
        username: "",
        email: "",
        password: "",
        usernameErrorText: "",
        emailErrorText: "",
        passwordErrorText: "",
    };


    const [isLoginActive, switchAuthForm] = useState(true);
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
    const [toastErrorMessage, setToastErrorMessage] = useState("");
    const [formData, setFormData] = useState({...initialFormData});
    const [isLoading, setLoading] = useState(false);

    const changeAuthMode = () => {
        if (isLoading) return;
        switchAuthForm(!isLoginActive);
        setFormData({...initialFormData})
    }

    const updateFieldValue = (e, textLocation) => {
        setFormData({...formData, [textLocation]: e.target.value});
    }

    const validate = () => {
        console.log("Validating")
        let isValid = true;
        let formAfterValidation = {...formData};
        formAfterValidation["usernameErrorText"] = "";
        formAfterValidation["emailErrorText"] = "";
        formAfterValidation["passwordErrorText"] = "";

        if (!isLoginActive) {
            if (formData["username"].length <= 2) {
                formAfterValidation["usernameErrorText"] = "Minimum Of 3 Characters Required";
                isValid = false;
            }
        }

        let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!regexEmail.test(formData["email"])) {
            console.log("Inocrrect email")
            formAfterValidation["emailErrorText"] = "Invalid Email"
            isValid = false;
        }

        if (formData["password"].length <= 5) {
            console.log("invalid password");
            formAfterValidation["passwordErrorText"] = "Minimum Of 6 Characters Required"
            isValid = false;
        }

        setFormData({...formAfterValidation});
        return isValid;
    }

    const doAuthenticate = async (e) => {
        if (isLoading) return;
        if (!validate()) return;
        if (e && e.preventDefault) e.preventDefault();
        setIsErrorDisplayed(false);
        setLoading(true);

        //Sign up
        if (!isLoginActive) {
            //If the user is signing up, check if the username is taken
            let isUserNameInUse = await doesUserExist(formData["username"])
            if (isUserNameInUse) {
                setFormData({...formData, "usernameErrorText": "Username Already In Use"});
                setLoading(false);
                return;
            }

            try {
                let res = await auth().createUserWithEmailAndPassword(formData["email"], formData["password"])
                //todo update redux, and move to the different screen
                //The auth response doesn't add the user's uid or username to their firestore entry
                let uid = res.user.uid;
                await updateUserInfo(formData["email"], {"uid": uid, "username": formData["username"]});
                //todo update redux again
            } catch (e) {
                setToastErrorMessage(e.message);
                setIsErrorDisplayed(true);
            }
        } else {
            //Log in
            try {
                let res = await auth().signInWithEmailAndPassword(formData["email"], formData["password"])
                let userDocument = await getUserByUid(res.user.uid);

                const setReduxUser = actions.user.create.assign;
                const setReduxSignInStatus = actions.isUserLoggedIn.create.on;
                dispatch(setReduxSignInStatus());
                dispatch(setReduxUser(userDocument));
                props.history.push('/home');

                console.log(res);
            } catch (e) {
                setToastErrorMessage(e.message);
                setIsErrorDisplayed(true);
            }
        }
    }

    return (
        <LoginCanvas>
            <Snackbar open={isErrorDisplayed} autoHideDuration={6000} onClose={() => setIsErrorDisplayed(false)}>
                <Alert elevation={6} severity="error" variant="filled">
                    {toastErrorMessage}
                </Alert>
            </Snackbar>
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
                </div>
                <AuthBoxContainer>
                    <AuthFormContainer>
                        <FormControl>
                            <FormFieldContainer>
                                <Grow in={!isLoginActive} direction="top">
                                    <TextField value={formData["username"]} id="usernameInput" label="Username"
                                               variant="outlined" required error={formData["usernameErrorText"] !== ""}
                                               helperText={formData["usernameErrorText"]}
                                               onChange={(e) => {
                                                   updateFieldValue(e, "username");
                                               }}/>
                                </Grow>
                            </FormFieldContainer>
                            <FormFieldContainer>
                                <TextField value={formData["email"]} id="emailInput" label="Email"
                                           variant="outlined" required error={formData["emailErrorText"] !== ""}
                                           helperText={formData["emailErrorText"]}
                                           onChange={(e) => {
                                               updateFieldValue(e, "email");
                                           }}/>
                            </FormFieldContainer>
                            <FormFieldContainer>
                                <TextField value={formData["password"]} id="passwordInput" label="Password"
                                           variant="outlined" required error={formData["passwordErrorText"] !== ""}
                                           helperText={formData["passwordErrorText"]}
                                           onChange={(e) => {
                                               updateFieldValue(e, "password");
                                           }}/>
                            </FormFieldContainer>
                            <ProceedButtonContainer>
                                <Grow in={!isLoginActive} direction="left">
                                    <ProceedButton variant="contained"
                                                   disableElevation onClick={(e) => doAuthenticate(e)}>
                                        {isLoading ? <CircularProgress style={{color: "white"}} size={24}/> : "Sign Up"}
                                    </ProceedButton>
                                </Grow>
                                <Slide in={isLoginActive} direction="right">
                                    <ProceedButton variant="contained"
                                                   disableElevation onClick={(e) => doAuthenticate(e)}>
                                        {isLoading ? <CircularProgress style={{color: "white"}} size={24}/> : "Log In"}
                                    </ProceedButton>
                                </Slide>
                            </ProceedButtonContainer>
                        </FormControl>
                        <LoginSignUpSwitchContainer>
                            <Slide in={isLoginActive} direction="right" style={{position: "absolute"}}>
                                <div>
                                    Don't have account yet? &nbsp;
                                    <a onClick={() => changeAuthMode()}
                                       style={{textDecoration: "underline", cursor: "pointer"}}>
                                        Sign Up!
                                    </a>
                                </div>
                            </Slide>
                            <Grow in={!isLoginActive} direction="right" style={{position: "absolute"}}>
                                <div>
                                    Already have an account? &nbsp;
                                    <a onClick={() => changeAuthMode()}
                                       style={{textDecoration: "underline", cursor: "pointer"}}>
                                        Sign In!
                                    </a>
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