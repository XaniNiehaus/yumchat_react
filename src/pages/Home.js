import React, {useEffect, useState} from 'react';
import '../css/messageBubbleStyles.css'
import '../css/customScrollbar.css'
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import backgroundImage from "../assets/loginSignUpBackground.png";
import MessageAreaBackgroundImage from "../assets/cutePizza.png";
import Logo from '../assets/yumChatLogo.png';
import {theme} from "../css/cssTheme";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import {Typography} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import IconButton from "@material-ui/core/IconButton";
import {useSelector} from "react-redux";
import {auth} from "../services/firebase";

const HomeCanvas = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage}),
    linear-gradient(36deg, rgba(217,42,46,0.7) 12%, rgba(240,209,169,0.7) 79%);
  background-size: cover;
`;

const AppContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 98%;
  width: 1200px;
  background: cadetblue;
   @media only screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;

const TopBanner = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background: ${theme.colors.tertiary};
`;

const YumChatLogo = styled.img`
  -webkit-filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5));
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0,0.5));
  height: 65%;
  margin-right: 10px;
`

const WelcomeText = styled.h1`
  font-size: 30px;
  color: white;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
`

const MasterDetailContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background: ${theme.colors.secondary};
  overflow: hidden;
`;

const MasterContainer = styled(Box)`
  display: flex;
  width: 33%;
  flex-direction: column;
  background: ${theme.colors.accentTwo};
`;

const MyInformationContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  background: ${theme.colors.primary};
`;

const MyNameAndStatusContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  //height: 120px;
  width: 100%;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow-wrap: break-spaces;
`;

const CreateNewChatButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  text-overflow: ellipsis;
  overflow-wrap: break-spaces;
  background: ${theme.colors.secondary};
`;

const MasterChatItemList = styled(Box)`
  //todo make this scrollable (if and when the master items overflow)
`

const MasterChatItemContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  text-overflow: ellipsis;
  overflow-wrap: break-spaces;
  background: ${theme.colors.tertiary};
`;

const DetailContainer = styled(Box)`
  display: flex;
  width: 67%;
  flex-direction: column;
  background: ${theme.colors.secondary};
`;

const ChatNameBanner = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  flex-direction: column;
  background: ${theme.colors.accentOne};
`;

const MessageArea = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  //background: ${theme.colors.tertiary};
  //todo manually make the png more opaque
  background: url(${MessageAreaBackgroundImage}),
    linear-gradient(36deg, rgba(217,42,46,0.7) 12%, rgba(240,209,169,0.7) 79%);
  background-size: cover;
  opacity: 1;
`;

const MessageList = styled.ul`
   width: 100%;
   padding: 0;
   margin: 0;
   overflow-x: hidden;
   overflowy: scroll;
`

const SendNewMessageArea = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  flex-direction: row;
  background: ${theme.colors.accentOne};
`;

const MessageInput = styled.input`
    background: #1A1A1A;
    border-radius: 2em;
    border: none;
    //margin: 2em;
    padding: 12px;
    width: 100%;
    color: #A2A2A2;
    font-size: 1.1em;
    //padding-left: 1.5em;
    
    outline: none;
    box-shadow: 0 4px 6px -5px hsl(0, 0%, 40%), inset 0px 4px 6px -5px hsl(0, 0%, 2%)
`


const Home = () => {
    const openChats = useSelector(state => state.chatRooms);
    const availableMessages = useSelector(state => state.messages);
    const myUser = useSelector(state => state.user);
    const currentlyOpenChat = useSelector(state => state.currentlyOpenChat);

    const getAssociatedMessages = (chatId) => {
        return availableMessages.filter(message => message.chatId === chatId)
    }

    const getLatestAssociatedChatMessage = (chatId) => {
        let asMes = availableMessages.filter(message => message.chatId === chatId)[0];
        console.log(asMes);
        return asMes;
    }

    useEffect(() => {
        console.log("__Home Rerender__")
        // console.log(currentlySelectedChat);
    }, []);

    return (
        <HomeCanvas>
            <AppContainer>
                <TopBanner>
                    <YumChatLogo src={Logo} alt=""/>
                    <WelcomeText>YumChat</WelcomeText>
                </TopBanner>
                <MasterDetailContainer>
                    <MasterContainer>
                        <MyInformationContainer>
                            <Avatar alt="" src=""/>
                            <MyNameAndStatusContainer>
                                <Typography>
                                    My username goes here
                                </Typography>
                            </MyNameAndStatusContainer>
                        </MyInformationContainer>
                        <CreateNewChatButtonContainer>
                            <Button variant="contained" disableElevation>
                                New Chat
                            </Button>
                        </CreateNewChatButtonContainer>
                        <MasterChatItemList>
                            {openChats.map(chatDocument => {
                                return MasterChatItemTemplate(chatDocument, getLatestAssociatedChatMessage(chatDocument["id"]))
                            })}
                        </MasterChatItemList>
                    </MasterContainer>
                    <DetailContainer>
                        <ChatNameBanner>
                            <Typography>
                                {currentlyOpenChat && currentlyOpenChat["groupName"]}
                            </Typography>
                            {/*todo online bubble if personal chat*/}
                        </ChatNameBanner>
                        <div style={{flex: "1", display: "flex", overflow: "auto"}}>
                            <MessageArea>
                                <MessageList className="rounded-messages messages-width-large customScrollContainer">
                                    <li>Hey, how are you?</li>
                                    <li className="right-msg">Hey! Long time, I'm doing well. How about yourself?</li>
                                    <li className="time"><strong>Today</strong> 10:37am</li>
                                    <li>Yeah, it's been a long time, and I'm glad to hear you're doing well. Life's
                                        crazy,
                                        but in a good way, for me!
                                    </li>
                                </MessageList>
                                {BubbleMessageItemTemplate()}
                            </MessageArea>
                        </div>
                        <SendNewMessageArea>
                            <IconButton style={{backgroundColor: "blue"}}>
                                <AttachFileIcon/>
                            </IconButton>
                            <MessageInput/>
                            <IconButton style={{backgroundColor: "blue"}}>
                                <SendIcon/>
                            </IconButton>
                        </SendNewMessageArea>
                    </DetailContainer>
                </MasterDetailContainer>
            </AppContainer>
        </HomeCanvas>
    );
};

// let temp = <ul className="rounded-messages messages-width-large" style={{width: "100%"}}>
//     <li>Hey, how are you?</li>
//     <li className="right-msg">Hey! Long time, I'm doing well. How about yourself?</li>
//     <li className="time"><strong>Today</strong> 10:37am</li>
//     <li>Yeah, it's been a long time, and I'm glad to hear you're doing well. Life's crazy,
//         but in a good way, for me!
//     </li>
// </ul>

//todo give these components actual parameters
const BubbleMessageItemTemplate = (props) => {
    return <>

    </>
}

const MasterChatItemTemplate = (chatDocument, latestMessage) => {

        useEffect(() => {
            console.log("__Home Rerender__")
            // console.log(currentlySelectedChat);
        }, []);

    return <MasterChatItemContainer key={chatDocument["id"]}>
        <Hidden xsDown>
            <Box display="flex" flexGrow={0} flexShrink={0} pl={1}>
                <Avatar alt="" src=""/>
            </Box>
        </Hidden>
        <Box display="flex" flexGrow={1} flexShrink={0} px={2} flexDirection="column">
            <Box display="flex" flexGrow={1} flexShrink={0} flexDirection="row"
                 justifyContent="space-between">
                <Typography>
                    {chatDocument["groupName"]}
                </Typography>
                <Typography>
                    {/*todo get last message associated with this chat*/}
                    Time
                </Typography>
            </Box>
            <Box display="flex" flexGrow={1} flexShrink={0} pt={1} flexDirection="column">
                {/*todo get last message associated with this chat*/}
                {latestMessage && latestMessage["message"]}
            </Box>
        </Box>
    </MasterChatItemContainer>
}

export default Home;
