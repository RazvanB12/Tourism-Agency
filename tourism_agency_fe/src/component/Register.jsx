import React, { useState } from 'react'
import { Link } from "react-router-dom";
import service from '../service/user.service';
import LocationBar from './LocationBar';

const Register = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        var value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    }

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const register = (e) => {
        e.preventDefault();
        service
            .saveUser(user)
            .then((res) => {
                console.log("User Added Successfully");
                setSuccessMessage("Utilizator adaugat");
                setErrorMessage("");
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    role: ""
                })
            })
            .catch((error) => {
                console.log(error)
                setSuccessMessage("");
                setErrorMessage("Date invalide");
            })
    }

    return (
        <>
            <div className='container mt-3 login-div'>
                <div classNAme='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card'>
                            <div className='card-header fs-3 text-center name-div'>
                                INREGISTRARE CONT NOU
                            </div>
                            {
                                successMessage &&
                                <p className="fs-4 text-center text-success">{successMessage}</p>
                            }
                            {
                                errorMessage &&
                                <p className="fs-4 text-center text-error">{errorMessage}</p>
                            }
                            <div className='div-backgorund card-body'>
                                <form onSubmit={(e) => register(e)}>
                                    <div className='mb-3 col-md-6 offset-md-3'>
                                        <label>Nume</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.lastName}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3 col-md-6 offset-md-3'>
                                        <label>Prenume</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.firstName}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
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
                                            type="text"
                                            name="password"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={user.password}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3 col-md-6 offset-md-3'>
                                        <label>Rol Utilizator</label>
                                        <select class="form-select" name="role" onChange={(e) => handleChange(e)} value={user.role} style={{ color: "#6C757D" }}>
                                            <option selected>Selectati rolul utilizatorului</option>
                                            <option value="AGENT">AGENT</option>
                                            <option value="CLIENT">CLIENT</option>
                                        </select>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-secondary text-center">CREARE CONT</button>
                                    </div>
                                </form>
                            </div>
                            <div class="text-center login-button-div">
                            <Link to="/" class="btn btn-secondary text-center">INAPOI</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LocationBar />
        </>
    )
}

export default Register