import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import service from '../service/user.service';
import LocationBar from './LocationBar';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        var value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    }

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        service
            .login(user)
            .then((res) => {
                console.log("User Logged In Successfully");
                sessionStorage.setItem("role",res.data.role);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("userId",res.data.id);
                if(res.data.role == "AGENT"){
                    navigate("/agent");
                }
                else {
                    navigate("/home");
                }
             })
            .catch((error) => {
                sessionStorage.setItem("loggedIn", false);
                console.log(error)
                setErrorMessage("Invalid Data");
                setUser({
                    name: "",
                    password: ""
                })
            })
    }

    return (
        <>
            <div className='container mt-3 login-div'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card'>
                            <div className='card-header fs-3 text-center name-div'>
                                RPM TRAVEL
                            </div>
                            {
                                "errorMessage" &&
                                <p className="fs-4 text-center text-error" style={{ color: "#FF0000" }}>{errorMessage}</p>
                            }
                            <div className='div-backgorund card-body'>
                                <div className='logo-div'>
                                    <img src="./logo.png" />
                                </div>
                                <form onSubmit={(e) => login(e)}>
                                    <div className='mb-3 col-md-6 offset-md-3'>
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.email}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3 col-md-6 offset-md-3'>
                                        <label>Parola</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.password}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-secondary text-center">LOGIN</button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center login-button-div">
                                <Link to="/register" className="btn btn-secondary text-center">CREARE CONT</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LocationBar />
        </>
    )
}

export default Login