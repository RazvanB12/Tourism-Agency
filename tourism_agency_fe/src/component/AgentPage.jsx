import React, { useState,useEffect } from "react";
import AgentNavbar from './AgentNavbar';
import { Link, useNavigate } from "react-router-dom";
import service from '../service/destination.service';
import LocationBar from './LocationBar';


const AgentPage = () => {
    const token = sessionStorage.getItem("token");

    const [destinationsList, setDestinationsList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        service
            .getAllDestinations(token)
            .then((res) => {
                setDestinationsList(res.data);
            })
            .catch((error) => {
                navigate("/");
                console.log(error);
            })
    }, [])

    const destinationName = sessionStorage.getItem("destinationName");
    const filterByDestination = JSON.parse(sessionStorage.getItem("filterByDestination"));

    console.log(destinationName);
    console.log(filterByDestination);

    const filteredDestinations = destinationsList.filter(dest => {
        if (filterByDestination && destinationName) {
            sessionStorage.setItem("filterByDestination", JSON.stringify(false));
            return dest.location.toLowerCase().includes(destinationName.toLowerCase());
        } else {
            return true;
        }
    });

    return (
        <>
            <AgentNavbar />
            <div className='container mt-3 destination-main-container'>
                <div classNAme='row'>
                    <div className='col-md-10 offset-md-1'>
                        <div className='card destinations-container'>
                            <div className='card-header fs-3 text-center' style={{ color: "#6C757D" }}>
                                <h3>Destinatii</h3>
                            </div>

                            <div className='div-backgorund card-body table-wrapper'>
                                <table class="table table-hover text-center">
                                    <thead style={{ color: "#F6995C" }}>
                                        <tr>
                                            <th class="col-1" scope="col">Denumire</th>
                                            <th class="col-2" scope="col">Descriere</th>
                                            <th class="col-1" scope="col">Locatie</th>
                                            <th class="col-1" scope="col">Pret</th>
                                            <th class="col-1" scope="col">Reducere</th>
                                            <th class="col-1" scope="col">Capacitate</th>
                                            <th class="col-1" scope="col"></th>
                                            <th class="col-1" scope="col"></th>
                                            <th class="col-1" scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ color: "#6C757D" }}>
                                        {filteredDestinations.map(dest => (
                                            <tr>
                                                <td>{dest.title}</td>
                                                <td>{dest.description}</td>
                                                <td>{dest.location}</td>
                                                <td>{dest.price}</td>
                                                <td>{dest.sale}</td>
                                                <td>{dest.numberOfPersons}</td>
                                                <td>
                                                    <Link to={"/edit/" + dest.id} class="btn btn-secondary text-center">Editeaza</Link>                                                
                                                </td>
                                                <td>
                                                    <Link to={"/reservations/" + dest.id} class="btn btn-secondary text-center">Rezervari</Link>                                                
                                                </td>
                                                <td>
                                                    <Link to={"/situation/" + dest.id} class="btn btn-secondary text-center">Situatie</Link>                                                
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center login-button-div" style={{ paddingTop: '30px' }}>
                <Link to="/add" class="btn btn-secondary text-center">Adauga destinatie</Link>
            </div>
            <LocationBar />
        </>
    );
}


export default AgentPage;