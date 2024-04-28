import React, { useState, useEffect } from "react";
import AgentNavbar from './AgentNavbar';
import { useNavigate, useParams } from "react-router-dom";
import destinationService from '../service/destination.service';
import userService from '../service/user.service';
import LocationBar from './LocationBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reservations = () => {
    const token = sessionStorage.getItem("token");

    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservationsAndUsers = async () => {
            try {
                const reservationsResponse = await destinationService.getReservations(id, token);
                setReservations(reservationsResponse.data);
                
                const userIds = reservationsResponse.data.map(res => res.userId);
                const usersResponse = await Promise.all(userIds.map(userId => userService.getUser(userId)));
                
                const usersMap = {};
                usersResponse.forEach(user => {
                    usersMap[user.data.id] = `${user.data.firstName} ${user.data.lastName}`;
                });
                setUsers(usersMap);
            } catch (error) {
                navigate("/");
                console.error(error);
            }
        };
        fetchReservationsAndUsers();
    }, []);

    const getDatesBetween = (startDate, endDate) => {
        const dates = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const highlightedDates = reservations.flatMap(reservation =>
        getDatesBetween(new Date(reservation.startDate), new Date(reservation.endDate))
    );

    return (
        <>
            <AgentNavbar />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <div className="text-center date-container" style={{ width: "80%" }}>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                showPopperArrow={false}
                                inline
                                highlightDates={highlightedDates}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className='container mt-3 destination-main-container'>
                            <div className='row'>
                                <div className='col-md-8 offset-md-2'>
                                    <div className='card destinations-container'>
                                        <div className='card-header fs-3 text-center' style={{ color: "#6C757D" }}>
                                            <h3>Destinatii</h3>
                                        </div>
                                        <div className='div-backgorund card-body table-wrapper'>
                                            <table className="table table-hover text-center">
                                                <thead style={{ color: "#F6995C" }}>
                                                    <tr>
                                                        <th className="col-2" scope="col">Client</th>
                                                        <th className="col-2" scope="col">Inceput</th>
                                                        <th className="col-2" scope="col">Final</th>
                                                        <th className="col-2" scope="col">Pret</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ color: "#6C757D" }}>
                                                    {reservations.map(res => (
                                                        <tr key={res.id}>
                                                            <td>{users[res.userId]}</td>
                                                            <td>{res.startDate}</td>
                                                            <td>{res.endDate}</td>
                                                            <td>{res.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LocationBar />
        </>
    );
};

export default Reservations;
