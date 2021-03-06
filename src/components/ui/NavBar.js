import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout, startLogoutClear } from '../../actions/auth'

export const NavBar = () => {
    const {name} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const handleLogout = ()=>{
        localStorage.clear();
        dispatch(startLogoutClear())
        dispatch(startLogout())
    }
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">{name.toUpperCase()}</span>
            <button className="btn btn-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Exit</span>
            </button>
        </div>
    )
}
