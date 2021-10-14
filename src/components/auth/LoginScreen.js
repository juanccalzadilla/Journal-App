import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formLoginValues, handleLoginInputChange] = useForm({

        lEmail: 'testing@gmail.com',
        lPassword: '123456'
    });
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        RName:'testing',
        REmail: 'testing@gmail.com',
        RPassword1: '123456',
        RPassword2: '123456'

    });

    const { REmail, RPassword1, RName, RPassword2 } = formRegisterValues;

    const { lEmail, lPassword } = formLoginValues;


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault(); 

        if (RPassword1 !== RPassword2) {
            return Swal.fire('Error', 'Passwords do not match', 'error')
        }
        if (RPassword1.length < 6) {
            return Swal.fire('Error', 'Passwords needs almost 6 characters', 'error')
        }

        dispatch(startRegister(REmail,RPassword1, RName))
    }
    return (
        <div className="container login-container">
            <div className="row animate__animated animate__fadeIn">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                                
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    {/* ----------------------------------------------------------- Registro */}
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="RName"
                                value={RName}
                                onChange={handleRegisterInputChange}

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="REmail"
                                value={REmail}
                                onChange={handleRegisterInputChange}

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="RPassword1"
                                value={RPassword1}
                                onChange={handleRegisterInputChange}

                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="RPassword2"
                                value={RPassword2}
                                onChange={handleRegisterInputChange}

                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}