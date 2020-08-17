import React, {useEffect} from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect,} from "react-router-dom";
import Home from './pages/Home';
import AuthenticationPage from './pages/AuthenticationPage';
import {auth} from './services/firebase';
import {useSelector, useDispatch} from "react-redux";
import {actions} from "./model/redux";

function App() {
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.isUserLoggedIn);

    useEffect(() => {
        if (auth().currentUser) {
            console.log("USER IS LOGGED !");
            //todo update redux
        }
        //todo check auth login, do login stuff if he is
    }, []);

    return (
        <Router>
            <Switch>
                <Route
                    exact path="/"
                    render={(props) => isUserLoggedIn === true
                        ? <Home {...props} />
                        : <Redirect to={{pathname: '/authenticate', state: {from: props.location}}}/>}
                />
                <Route
                    exact path="/home"
                    render={(props) => isUserLoggedIn === true
                        ? <Home {...props} />
                        : <Redirect to={{pathname: '/authenticate', state: {from: props.location}}}/>}
                />
                <Route exact path="/authenticate" render={(props) => <AuthenticationPage {...props} />}/>
            </Switch>
        </Router>
    )
}

export default App;
