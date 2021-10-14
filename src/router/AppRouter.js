import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import '../styles.css'
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
  
export const AppRouter = () => {
    const dispatch = useDispatch()
const {uid} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

  

    return (
        <Router>
            <Switch>
                <PublicRoute exact 
                path="/login" 
                component={LoginScreen}
                isLoggedIn={!!uid}
                />
                <PrivateRoute exact
                 path="/" 
                component={CalendarScreen}
                isLoggedIn={!!uid}
                />
                <Redirect to="/"/>
            </Switch>
        </Router>
    )
}
