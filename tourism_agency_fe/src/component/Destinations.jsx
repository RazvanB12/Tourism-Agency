import React, { useState, useEffect } from "react";
import ClientNavbar from './ClientNavbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import service from '../service/destination.service';
import { useNavigate } from "react-router-dom";
import LocationBar from './LocationBar';


const Destinations = () => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("userId");

    const [destinationsList, setDestinationsList] = useState([]);
    const [availabilityList, setAvailabilityList] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showSaleDestinations, setShowSaleDestinations] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        service
            .getAllDestinations(token)
            .then((res) => {
                setDestinationsList(res.data);
                updateAvailability(startDate, endDate);
            })
            .catch((error) => {
                navigate("/");
                console.log(error);
            })
    }, []);

    useEffect(() => {
        updateAvailability(startDate, endDate);
    }, [startDate, endDate]);

    const updateAvailability = (startDate, endDate) => {
        const requestBody = {
            "startDate": startDate.toLocaleDateString('en-US'),
            "endDate": endDate.toLocaleDateString('en-US')
        };

        service
            .getAvailability(requestBody, token)
            .then((res) => {
                const availabilityMap = {};
                res.data.forEach(item => {
                    availabilityMap[item.destinationId] = item.available;
                });
                setAvailabilityList(availabilityMap);
            })
            .catch((error) => {
                navigate("/");
                console.log(error);
            })
    };

    const handleDateChange = (date, type) => {
        if (type === 'start') {
            setStartDate(date);
        } else if (type === 'end') {
            setEndDate(date);
        }
    };

    const handleSelectDestination = (dest) => {
        const reservation = {
            "userId": id,
            "destinationId": dest.id,
            "startDate": startDate.toLocaleDateString('en-US'),
            "endDate": endDate.toLocaleDateString('en-US'),
            "price": calculateTotalPrice(dest, startDate, endDate)
        };

        service.saveReservation(reservation, token)
            .then((res) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const destinationName = sessionStorage.getItem("destinationName");
    const filterByDestination = JSON.parse(sessionStorage.getItem("filterByDestination"));

    const filteredDestinations = destinationsList.filter(dest => {
        if (filterByDestination && destinationName) {
            sessionStorage.setItem("filterByDestination", JSON.stringify(false));
            return dest.location.toLowerCase().includes(destinationName.toLowerCase());
        } else if (showSaleDestinations) {
            return dest.sale > 0;
        } else {
            return true;
        }
    });

    const calculateTotalPrice = (dest, startDate, endDate) => {
        const noDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const final = (dest.price - (dest.price * dest.sale / 100)) * noDays;
        return final > 0 ? final : 0;
    }

    return (
        <>
            <ClientNavbar />
            <div className="mt-3 mx-auto date-div">
                <DatePicker selected={startDate} onChange={date => handleDateChange(date, 'start')} />
                <div className="arrow-icon">
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <DatePicker selected={endDate} onChange={date => handleDateChange(date, 'end')} />
            </div>      

            <div className='container mt-3 destination-main-container'>
                <div className='row'>
                    <div className='col-md-10 offset-md-1'>
                        <div className='card destinations-container'>
                            <div className='card-header fs-3 text-center' style={{ color: "#6C757D" }}>
                                <h3>Destinatii</h3>
                            </div>
                            <div className='div-backgorund card-body table-wrapper'>
                                <table className="table table-hover text-center">
                                    <thead style={{ color: "#F6995C" }}>
                                        <tr>
                                            <th className="col-2" scope="col">Denumire</th>
                                            <th className="col-2" scope="col">Descriere</th>
                                            <th className="col-2" scope="col">Locatie</th>
                                            <th className="col-1" scope="col">Pret</th>
                                            <th className="col-1" scope="col">Capacitate</th>
                                            <th className="col-1" scope="col">Total</th>
                                            <th className="col-1" scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ color: "#6C757D" }}>
                                        {filteredDestinations.map(dest => (
                                            <tr key={dest.id}>
                                                <td>{dest.title}</td>
                                                <td>{dest.description}</td>
                                                <td>{dest.location}</td>
                                                <td className={dest.sale > 0 ? "text-danger" : "text-success"}>
                                                    {dest.sale > 0 ?
                                                        `${dest.price - (dest.price * dest.sale / 100)} (-${dest.sale}%)` :
                                                        `${dest.price}`
                                                    }
                                                </td>
                                                <td>{dest.numberOfPersons}</td>
                                                <td>{calculateTotalPrice(dest, startDate, endDate)}</td>
                                                <td>
                                                    {availabilityList[dest.id] && <button className="btn btn-secondary" 
                                                    onClick={() => handleSelectDestination(dest)}>Alege</button>}
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

            <div className="mt-3 mx-auto toggle-div">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="saleDestinationsToggle"
                        checked={showSaleDestinations}
                        onChange={() => setShowSaleDestinations(!showSaleDestinations)}
                    />
                    <label className="form-check-label" htmlFor="saleDestinationsToggle">
                        Afiseaza doar reducerile
                    </label>
                </div>
            </div>
            <LocationBar />
        </>
    );
}

export default Destinations;
