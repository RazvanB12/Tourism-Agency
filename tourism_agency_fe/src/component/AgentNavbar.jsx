import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AgentNavbar = () => {
    const [destination, setDestination] = useState("");

    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");
    if (role !== "AGENT") {
        navigate("/");
    }

    const handleSearch = () => {
        sessionStorage.setItem("destinationName", destination);
        sessionStorage.setItem("filterByDestination", JSON.stringify(true));
        setDestination("");
    };

    const handleChange = (e) => {
        setDestination(e.target.value);
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link to="/agent" className="nav-link" aria-current="page">Destinatii</Link>
                            </li>

                        </ul>

                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Destinatie" aria-label="Destinatie" onChange={handleChange} />
                            <Link to="/agent" className="btn btn-outline-secondary" onClick={handleSearch} >Cautare</Link>
                        </form>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AgentNavbar;
