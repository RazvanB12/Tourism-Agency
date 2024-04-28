import React, { useState, useEffect } from "react";
import AgentNavbar from './AgentNavbar';
import { useParams, useNavigate } from "react-router-dom";
import service from '../service/destination.service';
import LocationBar from './LocationBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Situation = () => {
    const token = sessionStorage.getItem("token");

    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        service
            .getStatistics(id, token)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                navigate("/");
                console.log(error);
            })
    }, []);

    return (
        <>
            <AgentNavbar />

            <div className="chart-container">
                <BarChart width={1200} height={600} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={month => monthNames[month - 1]} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reservations" fill="#8884d8" />
                </BarChart>
            </div>
            <LocationBar />
        </>
    );
}

export default Situation;
