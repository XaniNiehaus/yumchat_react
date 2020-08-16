import React, {useEffect} from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect,} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/AuthenticationPage';
import {auth} from './services/firebase';
import {useSelector} from "react-redux";

function App() {
    const isUserLoggedIn = useSelector(state => state.isUserLoggedIn);

    useEffect(() => {
        //todo check auth login, do login stuff if he is
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/register" component={Signup}/>
                <Route exact path="/login" component={Login}/>
                {/*<PrivateRoute path="/Home" authenticated={isUserLoggedIn} component={Home}/>*/}
                {/*<PublicRoute path="/signup" authenticated={isUserLoggedIn}*/}
                {/*             component={Signup}/>*/}
                {/*<PublicRoute path="/login" authenticated={isUserLoggedIn} component={Login}/>*/}
            </Switch>
        </Router>
    )

}

function PrivateRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

function PublicRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/Home'/>}
        />
    )
}

export default App;
