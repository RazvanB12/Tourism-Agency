import React, { useState } from 'react';
import AgentNavbar from './AgentNavbar';
import { Link } from 'react-router-dom';
import service from '../service/destination.service';
import { useNavigate } from "react-router-dom";
import LocationBar from './LocationBar';


const AddDestination = () => {
    const token = sessionStorage.getItem("token");

    const [destination, setDestination] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        numberOfPersons: "",
        sale: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setDestination({ ...destination, [e.target.name]: value });
    }

    const navigate = useNavigate();

    const saveDestination = (e) => {
        e.preventDefault();
        service
            .saveDestination(destination, token)
            .then((res) => {
                console.log(destination)
                console.log("Location Added Successfully");
                setErrorMessage("");
                navigate("/agent");
            })
            .catch((error) => {
                console.log(error)
                setSuccessMessage("");
                setErrorMessage("Date invalide");
            })
    }

    return (
        <>
            <AgentNavbar/>
            <div className='container mt-3 destination-main-container'>
                <div classNAme='row'>
                    <div className='col-md-6 offset-md-3'>
                        <div className='card'>
                            <div className='card-header fs-3 text-center' style={{ color: "#6C757D" }}>
                                Destinatie noua
                            </div>
                            {
                                successMessage &&
                                <p className="fs-4 text-center text-success">{successMessage}</p>
                            }
                            {
                                errorMessage &&
                                <p className="fs-4 text-center text-error">{errorMessage}</p>
                            }
                            <div className='card-body' style={{ color: "#F6995C" }}>
                                <form onSubmit={(e) => saveDestination(e)}>
                                    <div className='mb-3'>
                                        <label>Denumire</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={destination.title}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Descriere</label>
                                        <input
                                            type="text"
                                            name="description"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={destination.description}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Locatie</label>
                                        <input
                                            type="text"
                                            name="location"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={destination.location}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Pret</label>
                                        <input
                                            type="text"
                                            name="price"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={destination.price}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Capacitate</label>
                                        <input
                                            type="text"
                                            name="numberOfPersons"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={destination.numberOfPersons}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Reducere</label>
                                        <input
                                            type="text"
                                            name="sale"
                                            className='form-control'
                                            onChange={(e) => handleChange(e)}
                                            value={destination.sale}
                                            style={{ color: "#6C757D" }}
                                        ></input>
                                    </div>

                                    <div class="text-center">
                                        <button class="btn btn-success col-md-3 text-center">Adaugare</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center login-button-div" style={{ paddingTop: '30px', paddingBottom: '70px' }}>
                    <Link to={"/agent"} class="save-button btn btn-secondary">Inapoi</Link>
                </div>
            </div>
            <LocationBar />
        </>
    )
}


export default AddDestination;