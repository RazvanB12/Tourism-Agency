import React from "react";
import ClientNavbar from './ClientNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import LocationBar from './LocationBar';

const Contact = () => {
    return (
        <>
            <ClientNavbar />
            <div className='container mt-3 contact-container'>
                <div classNAme='row'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='card'>
                            <div className='card-header fs-3 text-center' style={{ color: "#6C757D" }}>
                                <h3>Contact</h3>
                            </div>
                            <div className='div-backgorund card-body description-container'>
                                <div className="contact-icon">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <h5>+40 700 000 000</h5>
                                <div className="contact-icon">
                                    <FontAwesomeIcon icon={faEnvelope} style={{ paddingTop: "20px" }}/>
                                </div>
                                <h5>rpm@travel.com</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LocationBar />
        </>
    )
}

export default Contact;